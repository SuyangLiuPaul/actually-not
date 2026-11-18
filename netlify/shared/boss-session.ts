// Shared by the boss-api function (Node) and the boss-gate edge function (Deno).
// Web Crypto only. No secrets here: the secret is passed in by the caller.

export const COOKIE_NAME = 'boss_s'
export const SESSION_SECONDS = 30 * 24 * 3600

const enc = new TextEncoder()

function b64url(buf: ArrayBuffer): string {
  let s = ''
  for (const b of new Uint8Array(buf)) s += String.fromCharCode(b)
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function b64decode(s: string): Uint8Array {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'))
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

async function hmac(secret: string, msg: string): Promise<ArrayBuffer> {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  return crypto.subtle.sign('HMAC', key, enc.encode(msg))
}

/** Constant-time equality on equal-length byte arrays (length difference is not secret here). */
export function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i]
  return diff === 0
}

/** Compare two strings without leaking content via timing: compare their HMACs under a throwaway key. */
export async function safeEqualStrings(a: string, b: string): Promise<boolean> {
  const k = crypto.getRandomValues(new Uint8Array(16)).join('')
  const [ha, hb] = await Promise.all([hmac(k, a), hmac(k, b)])
  return timingSafeEqual(new Uint8Array(ha), new Uint8Array(hb))
}

export async function makeSessionValue(secret: string, nowMs = Date.now()): Promise<string> {
  const exp = Math.floor(nowMs / 1000) + SESSION_SECONDS
  const payload = `v1.${exp}`
  return `${payload}.${b64url(await hmac(secret, payload))}`
}

export async function verifySessionValue(secret: string | undefined, value: string | undefined, nowMs = Date.now()): Promise<boolean> {
  if (!secret || !value) return false
  const parts = value.split('.')
  if (parts.length !== 3 || parts[0] !== 'v1') return false
  const exp = Number(parts[1])
  if (!Number.isFinite(exp) || exp * 1000 < nowMs) return false
  const expected = b64url(await hmac(secret, `${parts[0]}.${parts[1]}`))
  return safeEqualStrings(expected, parts[2])
}

export function readCookie(header: string | null | undefined, name: string): string | undefined {
  if (!header) return undefined
  for (const part of header.split(';')) {
    const i = part.indexOf('=')
    if (i > 0 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim()
  }
  return undefined
}

export function sessionCookie(value: string): string {
  return `${COOKIE_NAME}=${value}; HttpOnly; Secure; SameSite=Lax; Path=/boss; Max-Age=${SESSION_SECONDS}`
}
export function clearCookie(): string {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/boss; Max-Age=0`
}

/** `pbkdf2$<iter>$<salt_b64>$<hash_b64>` (standard base64). */
export async function verifyPassword(password: string, stored: string | undefined): Promise<boolean> {
  if (!stored) return false
  const [scheme, iterStr, saltB64, hashB64] = stored.split('$')
  const iter = Number(iterStr)
  if (scheme !== 'pbkdf2' || !Number.isInteger(iter) || iter < 200_000 || !saltB64 || !hashB64) return false
  const want = b64decode(hashB64)
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: b64decode(saltB64), iterations: iter },
    key,
    want.length * 8,
  )
  return timingSafeEqual(new Uint8Array(bits), want)
}
