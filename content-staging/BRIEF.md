# 内容研究任务书（所有研究员共用）

你在为 https://actually-not.com（「其实不是」/ Actually, Not）写新条目。这是一个中英双语卡片站：
**一个人人都信的说法 → 一句纠正 → 可核对的出处**。护城河是**准确**，不是数量。

先读这三样（路径都在 `/Users/pliu0036/Documents/CodingProject/not-so-fast/site/`）：
1. `HANDOVER.md` 第 6 节「内容的编辑原则」——四条硬约束，必须遵守。
2. `src/types.ts`——条目的数据结构。
3. `src/data/myths.ts` 和 `src/data/myths-en.ts` 开头各 3 条——**学语气、详略和格式**
   （中文、克制、有证据、留余地，不说教不嘲讽）。

## 红线（逐条遵守）
- **每个事实都要联网核实**（WebSearch / WebFetch）。**绝不凭记忆写出处、引文、年份、页码。**
  抓不到页面、页面不支持你的说法 → 这条**弃掉**，写进日志「放弃的候选 + 原因」。
  一个诚实的「放弃」比一个凑数的条目好。
- **出处链接必须是你实际打开过、且页面确实支持该论断的真实 https 链接。** 没有稳定链接的文献，
  只写 label 不写 url（不要编 DOI）。
- **区分「确定是别人说的 / 确定是另一回事」与「查无出处」。**
  前者写出真正的来源；后者写「迄今查不到可靠出处，最早能查到的是 ____（年份、文献）」，
  **不要写成「这是假的」**。confidence：找到确切真源 = `strong`；只能证明"查无出处" = `limited`；
  学界有分歧 = `debated`，并把几方理由写进 detail。
- 有争议、有例外的地方要留余地；不嘲讽相信的人（他们是被误导的普通人）；不涉及当代在世政治人物；
  不贬低任何宗教；不给医疗建议。
- 内容必须**正面、长期有效（不蹭热点）、不侵犯版权**：引用名言只引必要的短句（一句话），
  不大段转抄别人的文章；用自己的话写 detail。
- **不要** `rm`（要归档就 `mv`）、**不要** git commit/push、**不要**改 `src/`、`public/`、`scripts/` 下任何文件。
  你只能写自己被分配的那个输出文件和日志文件。**不要把命令放到后台**（前台跑，设够超时）。
- 对 bible-api / quoteinvestigator / wikiquote 等站点不要高并发狂刷；被限流就等一等再试。

## 条目格式（输出 JSON 数组，UTF-8，缩进 2 空格）
```json
{
  "id": "kebab-case-英文-唯一",
  "category": "quote | film | origin   (按你被分配的板块)",
  "belief": "卡片正面那句人人耳熟能详的话（名言类写成：「……」——某某）",
  "truth": "一句话给出结论",
  "detail": "展开证据，2–4 段，段落用 \\n\\n 分隔，用自己的话",
  "origin": "这个说法是怎么传开的（谁、何时、怎么变形的）",
  "instead": "那应该怎么引用/怎么理解/怎么看（具体、可操作）",
  "stakes": "harmless | wasteful | risky",
  "confidence": "strong | limited | debated",
  "sources": [{ "label": "作者/机构, 文献 年份 —— 标题", "url": "https://…（可省）" }],
  "en": {
    "belief": "…", "truth": "…", "detail": "…", "origin": "…", "instead": "…",
    "sources": [{ "label": "英文说明", "url": "与中文版完全相同（没有就省略）" }]
  },
  "scene": "English, 6–14 words: ONE concrete drawable still-life scene for the card illustration. Objects, not concepts. NO real people, NO portraits, NO text/letters in the picture. e.g. 'a ceramic coffee cup beside a stack of handwritten manuscript pages'",
  "verification": "（不发布，给审稿人看）你实际打开了哪些 URL、各自显示了什么、凭什么下的结论"
}
```
约束：中文 `belief` ≥5 字、`truth` ≥10 字、`detail` ≥40 字、`origin` ≥15 字、`instead` ≥15 字；
`id` 只能含小写字母数字和短横线，且**不得与 `src/data/myths.ts` 里现有 id 重复**
（用 `grep -o "id: '[a-z0-9-]*'" src/data/myths.ts` 查）；英文版的 `sources` 数量和 url 必须与中文版一致。

## 交付
1. 输出文件：任务指定的 `content-staging/<name>.json`。
2. 日志：同名 `.log.md`——逐条一行：采用 / 放弃 + 原因；放弃的候选也写，别人以后不用再查。
3. 最后回复一段简短汇报：交付几条、放弃几条、你最没把握的 3 条是哪些、为什么。
**宁可 8 条绝对扎实，也不要 16 条里混 3 条没验证的。** 找不到足够多就如实少交。
