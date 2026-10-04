#!/bin/bash
# 批量导入：按下载时间从早到晚，把 ~/Downloads 里最新的 N 张 png 依次对应到传入的 id。
# 用法：scripts/illu-import-batch.sh id1 id2 id3   （下载顺序必须和 id 顺序一致）
cd "$(dirname "$0")/.." || exit 1
n=$#
i=0
ls -tr ~/Downloads/*.png | tail -n "$n" | while IFS= read -r f; do
  i=$((i+1)); id="${!i}"
  node scripts/illu-import.mjs "$f" "$id"
done
