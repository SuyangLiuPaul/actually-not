#!/usr/bin/env bash
#
# 手动部署到 Netlify（跳过 CI，直接上传构建产物）。
#
#   ./scripts/deploy.sh
#
# 平时不需要用这个 —— 推到 GitHub main 分支就会自动部署。
# 这个脚本用于：GitHub 挂了、想在推之前先看效果、或者 CI 构建卡住时兜底。
#
set -euo pipefail

cd "$(dirname "$0")/.."

# ── 读取密钥 ────────────────────────────────────────────────
if [[ ! -f .env.local ]]; then
  echo "✗ 找不到 .env.local。先执行：cp .env.example .env.local 再填上令牌。" >&2
  exit 1
fi
# shellcheck disable=SC1091
set -a; source .env.local; set +a

: "${NETLIFY_AUTH_TOKEN:?.env.local 里缺少 NETLIFY_AUTH_TOKEN}"
: "${NETLIFY_SITE_ID:?.env.local 里缺少 NETLIFY_SITE_ID}"

api() { curl -sS -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" "$@"; }

# ── 先确认令牌还有效，别等传完才发现 401 ────────────────────
echo "→ 检查 Netlify 令牌…"
who=$(api "https://api.netlify.com/api/v1/user" \
      | python3 -c 'import sys,json;print(json.load(sys.stdin).get("email",""))' 2>/dev/null || true)
if [[ -z "$who" ]]; then
  echo "✗ 令牌无效或已过期。到 https://app.netlify.com/user/applications 重新生成，更新 .env.local。" >&2
  exit 1
fi
echo "  已登录：$who"

# ── 构建前先跑检查，别把坏内容传上去 ────────────────────────
echo "→ 检查（lint / 类型 / 内容测试）…"
npm run check

echo "→ 构建…"
npm run build

# ── 打包 dist ───────────────────────────────────────────────
zip_path="$(mktemp -t actually-not-deploy).zip"
trap 'rm -f "$zip_path"' EXIT
( cd dist && zip -qr "$zip_path" . )
echo "→ 已打包 $(du -h "$zip_path" | cut -f1)"

# ── 上传 ────────────────────────────────────────────────────
echo "→ 上传到 Netlify…"
deploy_id=$(api -X POST "https://api.netlify.com/api/v1/sites/$NETLIFY_SITE_ID/deploys" \
  -H "Content-Type: application/zip" --data-binary "@$zip_path" \
  | python3 -c 'import sys,json;print(json.load(sys.stdin)["id"])')

# ── 等待上线 ────────────────────────────────────────────────
for _ in $(seq 1 40); do
  state=$(api "https://api.netlify.com/api/v1/deploys/$deploy_id" \
          | python3 -c 'import sys,json;print(json.load(sys.stdin).get("state",""))')
  case "$state" in
    ready)  echo "✓ 已上线：https://actually-not.netlify.app"; exit 0 ;;
    error)  api "https://api.netlify.com/api/v1/deploys/$deploy_id" \
              | python3 -c 'import sys,json;print("✗ 部署失败：",json.load(sys.stdin).get("error_message"))' >&2
            exit 1 ;;
    *)      printf '  %s…\r' "$state"; sleep 5 ;;
  esac
done

echo "✗ 等待超时。到 https://app.netlify.com 看部署日志。" >&2
exit 1
