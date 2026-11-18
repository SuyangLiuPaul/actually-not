// Password gate for /boss/*. No valid `boss_s` cookie -> a self-contained login page (zero external requests).
// Valid cookie -> pass through to the static files. /boss/api/* and the PWA files are excluded (see config).
import { COOKIE_NAME, readCookie, verifySessionValue } from '../shared/boss-session.ts'

export const config = {
  path: ['/boss', '/boss/*'],
  excludedPath: [
    '/boss/api/*',
    '/boss/manifest.webmanifest',
    '/boss/icon-180.png',
    '/boss/icon-192.png',
    '/boss/icon-512.png',
  ],
}

const NOINDEX = 'noindex, nofollow, noarchive'

const LOGIN_HTML = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow, noarchive">
<meta name="theme-color" content="#0b1324">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Paul HQ">
<link rel="manifest" href="/boss/manifest.webmanifest">
<link rel="apple-touch-icon" href="/boss/icon-180.png">
<title>Paul 的大楼 · Paul HQ</title>
<style>
:root{--navy:#0b1324;--navy2:#111c36;--gold:#e0b45c;--gold2:#f3d58a;--ink:#e9edf7;--mute:#8d99b5}
*{box-sizing:border-box}
html,body{height:100%;margin:0}
body{background:var(--navy);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;
  display:flex;align-items:center;justify-content:center;
  padding:max(24px,env(safe-area-inset-top)) max(16px,env(safe-area-inset-right)) max(24px,env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left));
  background:radial-gradient(900px 520px at 50% -8%,#1c2f5e 0%,rgba(28,47,94,0) 70%),radial-gradient(700px 420px at 50% 110%,rgba(224,180,92,.10),rgba(224,180,92,0) 70%),var(--navy);
  overflow:hidden}
.stars{position:fixed;inset:0;pointer-events:none;opacity:.55;
  background-image:radial-gradient(1.2px 1.2px at 12% 18%,#fff 50%,transparent 51%),radial-gradient(1px 1px at 78% 12%,#cfe 50%,transparent 51%),radial-gradient(1.4px 1.4px at 88% 40%,#fff 50%,transparent 51%),radial-gradient(1px 1px at 24% 62%,#fff 50%,transparent 51%),radial-gradient(1.2px 1.2px at 60% 28%,#fde 50%,transparent 51%),radial-gradient(1px 1px at 40% 8%,#fff 50%,transparent 51%),radial-gradient(1px 1px at 6% 84%,#fff 50%,transparent 51%),radial-gradient(1.2px 1.2px at 92% 78%,#fff 50%,transparent 51%)}
.card{position:relative;width:100%;max-width:380px;text-align:center;padding:36px 28px 30px;border-radius:24px;
  background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02));
  border:1px solid rgba(224,180,92,.28);box-shadow:0 30px 80px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.08);
  backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.card:before{content:"";position:absolute;left:24px;right:24px;top:-1px;height:2px;border-radius:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}
.tower{width:76px;height:76px;margin:0 auto 18px;display:block;filter:drop-shadow(0 6px 18px rgba(224,180,92,.35))}
h1{margin:0;font-size:26px;font-weight:700;letter-spacing:.06em;color:var(--gold2)}
.sub{margin:6px 0 26px;font-size:13px;letter-spacing:.32em;text-transform:uppercase;color:var(--mute)}
form{display:flex;flex-direction:column;gap:14px}
input{width:100%;font:inherit;font-size:16px;color:var(--ink);background:rgba(7,12,26,.7);border:1px solid rgba(141,153,181,.3);border-radius:14px;padding:15px 16px;text-align:center;letter-spacing:.2em;outline:none;transition:border-color .2s,box-shadow .2s}
input::placeholder{letter-spacing:.05em;color:#5d6a88}
input:focus{border-color:var(--gold);box-shadow:0 0 0 4px rgba(224,180,92,.16)}
button{font:inherit;font-size:16px;font-weight:700;letter-spacing:.12em;color:#1a1306;border:0;border-radius:14px;padding:15px 16px;cursor:pointer;
  background:linear-gradient(180deg,var(--gold2),var(--gold));box-shadow:0 8px 24px rgba(224,180,92,.3);transition:transform .12s,filter .2s}
button:active{transform:scale(.98)}
button:disabled{filter:grayscale(.5) brightness(.8);cursor:progress}
.msg{min-height:20px;margin:14px 0 0;font-size:14px;color:#ff9b8f}
.shake{animation:shake .38s}
@keyframes shake{20%{transform:translateX(-8px)}40%{transform:translateX(7px)}60%{transform:translateX(-5px)}80%{transform:translateX(3px)}}
@media (prefers-reduced-motion:reduce){.shake{animation:none}}
</style>
</head>
<body>
<div class="stars"></div>
<main class="card" id="card">
  <svg class="tower" viewBox="0 0 80 80" aria-hidden="true">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3d58a"/><stop offset="1" stop-color="#c8923a"/></linearGradient></defs>
    <rect x="22" y="22" width="36" height="52" rx="3" fill="none" stroke="url(#g)" stroke-width="2.4"/>
    <rect x="30" y="10" width="20" height="12" rx="2" fill="none" stroke="url(#g)" stroke-width="2.4"/>
    <path d="M40 10V3" stroke="url(#g)" stroke-width="2.4" stroke-linecap="round"/>
    <g fill="url(#g)"><rect x="28" y="30" width="6" height="6" rx="1"/><rect x="37" y="30" width="6" height="6" rx="1"/><rect x="46" y="30" width="6" height="6" rx="1"/>
    <rect x="28" y="42" width="6" height="6" rx="1"/><rect x="37" y="42" width="6" height="6" rx="1" opacity=".45"/><rect x="46" y="42" width="6" height="6" rx="1"/>
    <rect x="28" y="54" width="6" height="6" rx="1" opacity=".45"/><rect x="37" y="54" width="6" height="6" rx="1"/><rect x="46" y="54" width="6" height="6" rx="1"/></g>
    <rect x="35" y="64" width="10" height="10" rx="1.5" fill="url(#g)"/>
  </svg>
  <h1>Paul 的大楼</h1>
  <div class="sub">Paul HQ</div>
  <form id="f" autocomplete="on">
    <input id="pw" name="password" type="password" autocomplete="current-password" placeholder="密码 Password" autofocus required>
    <button id="go" type="submit">进入 Enter</button>
  </form>
  <p class="msg" id="msg" role="alert"></p>
</main>
<script>
(function(){
var f=document.getElementById('f'),pw=document.getElementById('pw'),go=document.getElementById('go'),msg=document.getElementById('msg'),card=document.getElementById('card');
f.addEventListener('submit',function(e){
  e.preventDefault();msg.textContent='';go.disabled=true;
  fetch('/boss/api/login',{method:'POST',headers:{'content-type':'application/json'},credentials:'same-origin',body:JSON.stringify({password:pw.value})})
  .then(function(r){
    if(r.ok){location.reload();return}
    go.disabled=false;
    msg.textContent=r.status===429?'尝试次数过多，请稍后再试 Too many attempts':'密码不对 Wrong password';
    card.classList.remove('shake');void card.offsetWidth;card.classList.add('shake');pw.select();
  }).catch(function(){go.disabled=false;msg.textContent='网络出错 Network error'});
});
})();
</script>
</body>
</html>`

export default async (request: Request, context: { next: () => Promise<Response> }): Promise<Response> => {
  const cookie = readCookie(request.headers.get('cookie'), COOKIE_NAME)
  const secret = Netlify.env.get('BOSS_SESSION_SECRET') ?? Deno.env.get('BOSS_SESSION_SECRET')

  if (await verifySessionValue(secret, cookie)) {
    const res = await context.next()
    const h = new Headers(res.headers)
    h.set('x-robots-tag', NOINDEX)
    h.set('cache-control', 'private, no-cache')
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h })
  }

  const path = new URL(request.url).pathname
  const wantsPage = path.endsWith('/') || !/\.[A-Za-z0-9]+$/.test(path)
  const headers = {
    'x-robots-tag': NOINDEX,
    'cache-control': 'no-store',
    'x-frame-options': 'DENY',
  }
  if (!wantsPage || (request.method !== 'GET' && request.method !== 'HEAD')) {
    return new Response('Unauthorized', { status: 401, headers: { ...headers, 'content-type': 'text/plain; charset=utf-8' } })
  }
  return new Response(request.method === 'HEAD' ? null : LOGIN_HTML, {
    status: 200,
    headers: { ...headers, 'content-type': 'text/html; charset=utf-8' },
  })
}
