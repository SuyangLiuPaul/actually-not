// Paul HQ backend: a tiny JSON document DB on Netlify Blobs (store "boss").
// Auth: `boss_s` session cookie (browser) OR `Authorization: Bearer $BOSS_WRITE_TOKEN` (Mac scripts).
// Env: BOSS_PASS_HASH, BOSS_SESSION_SECRET, BOSS_WRITE_TOKEN. Nothing secret lives in the repo.
import { getStore } from '@netlify/blobs'
import {
  clearCookie,
  makeSessionValue,
  readCookie,
  safeEqualStrings,
  sessionCookie,
  verifyPassword,
  verifySessionValue,
  COOKIE_NAME,
} from '../shared/boss-session.ts'

export const config = { path: '/boss/api/*' }

const COLLECTIONS = ['agents', 'tasks', 'questions', 'inbox', 'reviews', 'controls', 'meta', 'sessions']
const MAX_DOC_BYTES = 256 * 1024
const MAX_BODY_BYTES = 4 * 1024 * 1024
const MAX_BATCH = 100
const RL_MAX = 10
const RL_WINDOW_MS = 15 * 60 * 1000
const ID_RE = /^[A-Za-z0-9_][A-Za-z0-9_.-]{0,127}$/
const RESERVED = new Set(['id', 'version', 'updated_at'])

const store = () => getStore({ name: 'boss', consistency: 'strong' })
const rlStore = () => getStore({ name: 'boss-ratelimit', consistency: 'strong' })
const env = (k: string): string | undefined => process.env[k]

type Doc = Record<string, unknown> & { version: number; updated_at: string }

function json(body: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex, nofollow, noarchive',
      ...extra,
    },
  })
}
const err = (status: number, error: string, more: Record<string, unknown> = {}, h: Record<string, string> = {}) =>
  json({ error, ...more }, status, h)

const nowIso = () => new Date().toISOString()
const bytes = (s: string) => new TextEncoder().encode(s).length

// ---- auth -------------------------------------------------------------------------------------
async function authKind(req: Request): Promise<'bearer' | 'cookie' | null> {
  const auth = req.headers.get('authorization')
  const token = env('BOSS_WRITE_TOKEN')
  if (auth && token && /^Bearer /i.test(auth)) {
    if (await safeEqualStrings(auth.slice(7).trim(), token)) return 'bearer'
  }
  const cookie = readCookie(req.headers.get('cookie'), COOKIE_NAME)
  if (await verifySessionValue(env('BOSS_SESSION_SECRET'), cookie)) return 'cookie'
  return null
}

function clientIp(req: Request, ctx: { ip?: string }): string {
  const ip = ctx?.ip || req.headers.get('x-nf-client-connection-ip') || req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  return ip.trim().replace(/[^A-Za-z0-9:.]/g, '_').slice(0, 64)
}

async function loginLimited(ip: string): Promise<boolean> {
  const rec = (await rlStore().get(`login/${ip}`, { type: 'json' })) as { count: number; start: number } | null
  return !!rec && Date.now() - rec.start < RL_WINDOW_MS && rec.count >= RL_MAX
}
async function recordFailure(ip: string): Promise<void> {
  const s = rlStore()
  const rec = (await s.get(`login/${ip}`, { type: 'json' })) as { count: number; start: number } | null
  const fresh = !rec || Date.now() - rec.start >= RL_WINDOW_MS
  await s.setJSON(`login/${ip}`, { count: fresh ? 1 : rec!.count + 1, start: fresh ? Date.now() : rec!.start })
}

// ---- doc storage ------------------------------------------------------------------------------
const key = (c: string, id: string) => `${c}/${id}`

async function readDoc(c: string, id: string): Promise<{ doc: Doc; etag?: string } | null> {
  const r = await store().getWithMetadata(key(c, id), { type: 'json' })
  return r ? { doc: r.data as Doc, etag: r.etag } : null
}

async function touch(): Promise<void> {
  await store().set('_meta/last_write', nowIso())
}

type WriteOp = { op: string; collection: string; doc_id: string; data?: unknown; if_version?: number }
type WriteResult = { ok: boolean; status: number; error?: string; doc?: Doc; deleted?: boolean; current_version?: number }

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)

function cleanData(data: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(data)) if (!RESERVED.has(k)) out[k] = v
  return out
}

async function applyWrite(w: WriteOp): Promise<WriteResult> {
  const { collection: c, doc_id: id } = w
  const s = store()
  const op = w.op === 'put' ? 'set' : w.op === 'patch' || w.op === 'merge' ? 'update' : w.op

  if (op === 'delete') {
    const cur = await readDoc(c, id)
    if (w.if_version !== undefined && (cur?.doc.version ?? 0) !== w.if_version)
      return { ok: false, status: 409, error: 'version_conflict', current_version: cur?.doc.version ?? 0 }
    if (!cur) return { ok: true, status: 200, deleted: false }
    await s.delete(key(c, id))
    await s.setJSON(`_del/${c}/${id}`, { updated_at: nowIso() })
    await touch()
    return { ok: true, status: 200, deleted: true }
  }

  if (!isObj(w.data)) return { ok: false, status: 400, error: 'data_must_be_object' }
  const incoming = cleanData(w.data)

  for (let attempt = 0; attempt < 6; attempt++) {
    const cur = await readDoc(c, id)
    const curVersion = cur?.doc.version ?? 0
    if (w.if_version !== undefined && curVersion !== w.if_version)
      return { ok: false, status: 409, error: 'version_conflict', current_version: curVersion }
    const body = op === 'update' ? { ...(cur ? cleanData(cur.doc) : {}), ...incoming } : incoming
    const doc: Doc = { ...body, version: curVersion + 1, updated_at: nowIso() }
    if (bytes(JSON.stringify(doc)) > MAX_DOC_BYTES) return { ok: false, status: 413, error: 'doc_too_large' }
    // Compare-and-swap via ETag. If the store gives no ETag for an existing doc (the local `netlify dev` blob
    // server) or contention persists to the last attempt, fall back to a plain write: single-user app.
    const lastTry = attempt === 5
    const cond = !cur ? { onlyIfNew: true } : cur.etag && !lastTry ? { onlyIfMatch: cur.etag } : undefined
    if (lastTry && w.if_version !== undefined) return { ok: false, status: 409, error: 'version_conflict' }
    const res = await s.setJSON(key(c, id), doc, cond)
    if (res.modified) {
      if (!cur) await s.delete(`_del/${c}/${id}`).catch(() => {})
      await touch()
      return { ok: true, status: 200, doc }
    }
    if (w.if_version !== undefined) return { ok: false, status: 409, error: 'version_conflict' }
    // lost a race with a concurrent writer: re-read and retry
  }
  return { ok: false, status: 503, error: 'write_contention' }
}

async function listCollection(c: string): Promise<Array<Doc & { id: string }>> {
  const s = store()
  const ids: string[] = []
  const prefix = `${c}/`
  const page = await s.list({ prefix })
  for (const b of page.blobs) ids.push(b.key.slice(prefix.length))
  const out: Array<Doc & { id: string }> = []
  for (let i = 0; i < ids.length; i += 20) {
    const chunk = await Promise.all(ids.slice(i, i + 20).map(async (id) => ({ id, doc: await s.get(key(c, id), { type: 'json' }) as Doc | null })))
    for (const { id, doc } of chunk) if (doc) out.push({ id, ...doc })
  }
  return out
}

// ---- request handling -------------------------------------------------------------------------
async function readBody(req: Request): Promise<{ ok: true; value: unknown } | { ok: false; res: Response }> {
  const text = await req.text()
  if (bytes(text) > MAX_BODY_BYTES) return { ok: false, res: err(413, 'body_too_large') }
  try {
    return { ok: true, value: text ? JSON.parse(text) : {} }
  } catch {
    return { ok: false, res: err(400, 'invalid_json') }
  }
}

function validateTarget(c: unknown, id: unknown): string | null {
  if (typeof c !== 'string' || !COLLECTIONS.includes(c)) return 'unknown_collection'
  if (typeof id !== 'string' || !ID_RE.test(id)) return 'invalid_doc_id'
  return null
}

export default async (req: Request, ctx: { ip?: string }): Promise<Response> => {
  const url = new URL(req.url)
  const parts = url.pathname.replace(/^\/boss\/api\/?/, '').split('/').filter(Boolean).map(decodeURIComponent)
  const method = req.method.toUpperCase()
  const route = parts[0]

  // login / logout: no auth needed
  if (route === 'login' && method === 'POST') {
    const ip = clientIp(req, ctx)
    if (await loginLimited(ip)) return err(429, 'too_many_attempts', {}, { 'retry-after': '900' })
    const b = await readBody(req)
    if (!b.ok) return b.res
    const pw = isObj(b.value) && typeof b.value.password === 'string' ? b.value.password : ''
    const secret = env('BOSS_SESSION_SECRET')
    if (!secret) return err(500, 'server_not_configured')
    const ok = pw.length > 0 && pw.length < 1024 && (await verifyPassword(pw, env('BOSS_PASS_HASH')))
    if (!ok) {
      await recordFailure(ip)
      return err(401, 'bad_password')
    }
    return json({ ok: true }, 200, { 'set-cookie': sessionCookie(await makeSessionValue(secret)) })
  }
  if (route === 'logout' && method === 'POST') {
    return json({ ok: true }, 200, { 'set-cookie': clearCookie() })
  }

  const kind = await authKind(req)
  if (!kind) return err(401, 'unauthorized')

  // CSRF defence in depth for cookie sessions (SameSite=Lax already blocks cross-site POST)
  if (kind === 'cookie' && method !== 'GET' && method !== 'HEAD') {
    const origin = req.headers.get('origin')
    if (origin && new URL(origin).host !== url.host) return err(403, 'bad_origin')
  }

  try {
    if (route === 'changes' && method === 'GET') {
      const sinceRaw = url.searchParams.get('since')
      let since = ''
      if (sinceRaw) {
        const d = new Date(sinceRaw)
        if (Number.isNaN(d.getTime())) return err(400, 'invalid_since')
        since = d.toISOString()
      }
      const server_time = nowIso()
      const last = ((await store().get('_meta/last_write', { type: 'text' })) as string | null) ?? ''
      if (since && last && last < since) return json({ server_time, changes: [], deleted: [] })
      const changes: Array<{ collection: string; id: string; doc: Doc }> = []
      const deleted: Array<{ collection: string; id: string; updated_at: string }> = []
      for (const c of COLLECTIONS) {
        for (const d of await listCollection(c)) {
          if (!since || d.updated_at >= since) {
            const { id, ...doc } = d
            changes.push({ collection: c, id, doc: doc as Doc })
          }
        }
        const tp = `_del/${c}/`
        for (const b of (await store().list({ prefix: tp })).blobs) {
          const t = (await store().get(b.key, { type: 'json' })) as { updated_at: string } | null
          if (t && (!since || t.updated_at >= since)) deleted.push({ collection: c, id: b.key.slice(tp.length), updated_at: t.updated_at })
        }
      }
      return json({ server_time, changes, deleted })
    }

    if (route === 'batch' && method === 'POST') {
      const b = await readBody(req)
      if (!b.ok) return b.res
      const writes = isObj(b.value) ? b.value.writes : null
      if (!Array.isArray(writes)) return err(400, 'writes_must_be_array')
      if (writes.length > MAX_BATCH) return err(400, 'too_many_writes', { max: MAX_BATCH })
      const ops: WriteOp[] = []
      for (const [i, w] of writes.entries()) {
        if (!isObj(w)) return err(400, 'invalid_write', { index: i })
        const bad = validateTarget(w.collection, w.doc_id)
        if (bad) return err(400, bad, { index: i })
        if (!['set', 'update', 'delete', 'put', 'patch', 'merge'].includes(String(w.op))) return err(400, 'invalid_op', { index: i })
        if (w.if_version !== undefined && !Number.isInteger(w.if_version)) return err(400, 'invalid_if_version', { index: i })
        ops.push({ op: String(w.op), collection: w.collection as string, doc_id: w.doc_id as string, data: w.data, if_version: w.if_version as number | undefined })
      }
      const results: Array<WriteResult & { index: number }> = []
      for (const [index, w] of ops.entries()) results.push({ index, ...(await applyWrite(w)) })
      return json({ ok: results.every((r) => r.ok), results })
    }

    if (route === 'db') {
      const [, c, id] = parts
      if (!c || !COLLECTIONS.includes(c)) return err(400, 'unknown_collection')

      if (!id) {
        if (method === 'GET') return json({ collection: c, docs: await listCollection(c) })
        if (method === 'POST') {
          // create with an auto id (used by inbox notes)
          const b = await readBody(req)
          if (!b.ok) return b.res
          const newId = `${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}`
          const r = await applyWrite({ op: 'set', collection: c, doc_id: newId, data: b.value })
          return json(r.ok ? { id: newId, doc: r.doc } : { error: r.error }, r.status)
        }
        return err(405, 'method_not_allowed')
      }

      const bad = validateTarget(c, id)
      if (bad) return err(400, bad)

      if (method === 'GET') {
        const cur = await readDoc(c, id)
        return cur ? json({ id, ...cur.doc }) : err(404, 'not_found')
      }
      if (method === 'PUT' || method === 'PATCH' || method === 'DELETE') {
        let data: unknown
        let ifVersion: number | undefined
        const qv = url.searchParams.get('if_version')
        if (qv !== null) ifVersion = Number(qv)
        if (method !== 'DELETE') {
          const b = await readBody(req)
          if (!b.ok) return b.res
          // body is the doc itself; an optional if_version rides along as a reserved field
          if (isObj(b.value) && 'if_version' in b.value) {
            const { if_version, ...rest } = b.value
            ifVersion = Number(if_version)
            data = rest
          } else data = b.value
        }
        if (ifVersion !== undefined && !Number.isInteger(ifVersion)) return err(400, 'invalid_if_version')
        const r = await applyWrite({ op: method === 'PUT' ? 'set' : method === 'PATCH' ? 'update' : 'delete', collection: c, doc_id: id, data, if_version: ifVersion })
        if (!r.ok) return err(r.status, r.error ?? 'error', r.current_version !== undefined ? { current_version: r.current_version } : {})
        return json(method === 'DELETE' ? { ok: true, deleted: r.deleted } : { id, ...r.doc })
      }
      return err(405, 'method_not_allowed')
    }
  } catch (e) {
    console.error('boss-api failure', e)
    return err(500, 'internal_error')
  }

  return err(404, 'not_found')
}
