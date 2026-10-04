#!/bin/bash
# 把 ~/Downloads 里的 ILLU-<id>[ (n)].png 导入成 public/illu/<id>.webp：同一 id 多份时取最新的；已比它新的 webp 跳过。
cd "$(dirname "$0")/.." || exit 1
declare -A newest
for f in ~/Downloads/ILLU-*.png; do
  [ -f "$f" ] || continue
  b=$(basename "$f" .png); id=${b#ILLU-}; id=$(echo "$id" | sed -E 's/ \([0-9]+\)$//')
  if [ -z "${newest[$id]}" ] || [ "$f" -nt "${newest[$id]}" ]; then newest[$id]="$f"; fi
done
for id in "${!newest[@]}"; do
  f="${newest[$id]}"; w=public/illu/$id.webp
  if [ -f "$w" ] && [ "$w" -nt "$f" ]; then continue; fi
  node scripts/illu-import.mjs "$f" "$id"
done
