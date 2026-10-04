#!/bin/bash
# 把 ~/Downloads 里所有 ILLU-<id>.png 导入成 public/illu/<id>.webp（已比 png 新的跳过）。
cd "$(dirname "$0")/.." || exit 1
for f in ~/Downloads/ILLU-*.png; do
  [ -f "$f" ] || continue
  b=$(basename "$f" .png); id=${b#ILLU-}; id=${id% (1)}; id=${id% (2)}
  w=public/illu/$id.webp
  if [ -f "$w" ] && [ "$w" -nt "$f" ]; then continue; fi
  node scripts/illu-import.mjs "$f" "$id"
done
