#!/usr/bin/env bash
#
# 一眼看清现在是什么状态：git、CI、Netlify、线上站点。
#
#   ./scripts/status.sh
#
set -uo pipefail
cd "$(dirname "$0")/.."

echo "━━━ Git ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "分支    : $(git rev-parse --abbrev-ref HEAD)"
echo "最新提交: $(git log --oneline -1)"
ahead=$(git rev-list --count '@{u}..HEAD' 2>/dev/null || echo '?')
echo "未推送  : ${ahead} 个提交"
dirty=$(git status --porcelain | wc -l | tr -d ' ')
echo "未提交  : ${dirty} 个改动"

echo
echo "━━━ GitHub Actions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v gh >/dev/null 2>&1; then
  gh run list --limit 3 2>/dev/null || echo "（gh 未登录）"
else
  echo "（未安装 gh）"
fi

echo
echo "━━━ Netlify ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [[ -f .env.local ]]; then
  # shellcheck disable=SC1091
  set -a; source .env.local; set +a
  curl -sS -H "Authorization: Bearer ${NETLIFY_AUTH_TOKEN:-}" \
    "https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID:-}/deploys?per_page=3" \
    | python3 -c '
import sys, json
try:
    ds = json.load(sys.stdin)
except Exception:
    print("（读取失败，令牌可能已过期）")
    raise SystemExit
if isinstance(ds, dict):
    print("（API 返回错误：%s）" % ds.get("message"))
    raise SystemExit
for d in ds:
    state = d.get("state", "?")
    ref = (d.get("commit_ref") or "手动上传")[:7]
    when = d.get("created_at", "")[:19]
    print("%-9s %-9s %s" % (state, ref, when))
'
else
  echo "（没有 .env.local，跳过）"
fi

echo
echo "━━━ 线上站点 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
for p in / /manifest.webmanifest /sw.js /favicon.ico /og.png; do
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "https://actually-not.netlify.app$p")
  printf "%-24s HTTP %s\n" "$p" "$code"
done
