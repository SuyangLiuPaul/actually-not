#!/bin/bash
# 导入以 ILLU-<id>.png 命名的下载（页面里用 <a download> 存盘，文件名即 id）。
# 用法：scripts/illu-import-named.sh id1 id2 ...
cd "$(dirname "$0")/.." || exit 1
for id in "$@"; do
  f=~/Downloads/ILLU-$id.png
  if [ -f "$f" ]; then node scripts/illu-import.mjs "$f" "$id"; else echo "缺文件：$f"; fi
done
