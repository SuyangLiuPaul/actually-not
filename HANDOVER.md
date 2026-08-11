# 交接文档

写给接手这个项目的人（或 AI）。读完这一份就能上手，不需要翻聊天记录。

---

## 0. 一句话

「其实不是」是一个中文静态站点，收录 61 条**听起来天经地义、但证据并不支持**的生活常识
（早上不吃饭伤身、洗完头不吹干有湿气、骨头汤补钙……），每条附出处。
纯前端，无后端，无数据库，无环境依赖。

| | |
|---|---|
| 本地路径 | `/Users/pliu0036/Documents/CodingProject/actually-not` |
| 线上 | https://actually-not.netlify.app |
| 仓库 | https://github.com/SuyangLiuPaul/actually-not （**公开**） |
| Netlify 站点 ID | `1345bcb2-6a9c-4ec8-9ae0-f52cc3933551` |
| 技术栈 | React 19 · TypeScript · Vite 8 · Tailwind v4 · vite-plugin-pwa |

**所有东西都在上面那一个文件夹里**，没有任何文件散落在别处。
克隆仓库 + 补一个 `.env.local`（见第 3 节）就是完整环境。

---

## 1. 五分钟上手

```bash
cd /Users/pliu0036/Documents/CodingProject/actually-not
npm install
npm run dev          # http://localhost:5173
```

常用命令：

| 命令 | 作用 |
|---|---|
| `npm run dev` | 开发服务器（**Service Worker 在这个模式下是关的**） |
| `npm run check` | lint + 类型检查 + 676 条内容测试。**提交前跑这个** |
| `npm test` | 只跑内容测试 |
| `npm run build` | 构建到 `dist/` |
| `npm run preview` | 跑构建产物 → 要测 PWA / 离线**必须用这个**，不能用 dev |
| `npm run icons` | 改了 `assets/*.svg` 之后重新生成所有图标 |
| `./scripts/status.sh` | 一眼看清 git / CI / Netlify / 线上 的状态 |
| `./scripts/deploy.sh` | 手动部署（应急用，平时不需要） |

---

## 2. 怎么发布

### 正常流程：推 GitHub 就够了

```bash
npm run check
git add -A
git commit -m "说明改了什么"
git push origin main
```

推上去之后**自动发生两件事**，不需要任何手动操作：

1. **GitHub Actions** 跑 lint + 类型检查 + 内容测试 + 构建 + 校验产物齐全（约 25 秒）
2. **Netlify** 从 main 分支拉代码、构建、上线（约 1 分钟）

两者是**独立**的：CI 失败不会阻止 Netlify 部署。所以别把 `npm run check` 跳过——
它是你唯一的守门员。

查看结果：

```bash
./scripts/status.sh
```

或者 `gh run list` 看 CI，https://app.netlify.com 看部署。

### 应急流程：直接传构建产物

GitHub 挂了、或者 Netlify 的 CI 构建卡住时用：

```bash
./scripts/deploy.sh
```

它会先验令牌、跑检查、构建、打包 `dist/`、上传、等到上线为止。
**注意**：这样传上去的版本和仓库代码就脱节了，事后记得把代码也推上去。

### 认证是怎么配的

- **GitHub**：`gh` CLI 已用账号 `SuyangLiuPaul` 登录（凭据在系统 keychain）。
  换机器的话跑 `gh auth login`。
- **Netlify**：仓库已通过 Netlify 的 GitHub App 关联（installation id `38261963`），
  所以 push 即部署。这个不需要令牌。令牌只有 `deploy.sh` 手动部署时才用到。

---

## 3. 密钥

**这个仓库是公开的。任何令牌都绝不能进被提交的文件。**

真实令牌放在 `.env.local`，这个文件**不会被提交**（`.gitignore` 里 `.env*` 已覆盖）。
换机器 / 重新克隆时：

```bash
cp .env.example .env.local
# 然后填上真实的 NETLIFY_AUTH_TOKEN
```

自己验证一次它确实被忽略了：

```bash
git check-ignore -v .env.local     # 应该输出一行匹配规则
git status --short | grep env      # 应该什么都没有
```

需要新令牌时到 https://app.netlify.com/user/applications 生成。
**注意这是账号级令牌**，能操作该账号下所有站点，不只是这个项目。

> 顺带一提：`../DailyNews/scripts/auto-deploy.sh` 里硬编码了一个**已失效**的
> Netlify 令牌（返回 401）。别从那儿复制，那个文件本身也建议清理掉。

---

## 4. 文件结构

```
actually-not/
├── HANDOVER.md              ← 你正在读的
├── README.md                面向普通访客的介绍
├── .env.local               密钥（不提交，需自己创建）
├── .env.example             密钥模板
│
├── src/
│   ├── data/
│   │   ├── myths.ts         ★ 全部 61 条内容都在这一个文件里
│   │   └── myths.test.ts    内容完整性测试（676 条断言）
│   ├── types.ts             数据结构 + 分类 + 风险等级的定义
│   ├── hooks/
│   │   └── useReadProgress.ts 已读进度（localStorage，自动过滤已删除的 id）
│   ├── App.tsx              页面主体：搜索、筛选、卡片网格、主题切换、已读进度
│   ├── components/
│   │   ├── MythCard.tsx     卡片
│   │   ├── MythDetail.tsx   点开后的详情弹层（含分享、已读、相关条目、纠错入口）
│   │   ├── Quiz.tsx         测验「你中了几条」（/quiz，含成绩分享图）
│   │   ├── Strike.tsx       红笔划掉的描边动画
│   │   ├── ErrorBoundary.tsx 渲染出错时的兜底页
│   │   └── UpdatePrompt.tsx  有新版本时右下角的提示
│   ├── index.css            主题变量（纸/墨/红笔）+ 深浅色
│   ├── entry-server.tsx     ★ 预渲染入口（只进 SSR bundle，不进客户端）
│   └── main.tsx             入口（有预渲染 HTML 就 hydrate，否则从头渲染）
│
├── assets/                  图标源文件（SVG，手工维护）
│   ├── icon.svg             主图标
│   ├── icon-maskable.svg    Android 自适应版（内容缩进安全区）
│   └── og.svg               分享图 1200×630
│
├── public/                  会被原样复制到 dist/
│   ├── icons/               ★ 生成物，不要手改
│   ├── og/                  ★ 生成物：每条的 OG 分享图（npm run og）
│   ├── favicon.ico/.svg     ★ 生成物
│   ├── og.png               ★ 生成物
│   ├── _redirects           SPA 回退（Netlify 直传时生效）
│   └── _headers             缓存与安全头（Netlify 直传时生效）
│
├── scripts/
│   ├── prerender.ts         ★ 构建期预渲染 62 页 + sitemap.xml + robots.txt
│   ├── generate-icons.mjs   从 assets/*.svg 生成全部图标
│   ├── generate-og.mjs      为每条内容生成 OG 分享图（改了文案要重跑）
│   ├── check-links.mts      出处链接体检（真实浏览器，不是 curl）
│   ├── deploy.sh            手动部署
│   └── status.sh            状态总览
│
├── netlify.toml             构建配置 + 重定向 + 头（CI 构建时生效）
├── vite.config.ts           Vite + Tailwind + PWA 配置
└── .github/workflows/ci.yml GitHub Actions
```

---

## 5. 想做什么，改哪里

| 你要做的事 | 改这里 |
|---|---|
| 加 / 改 / 删一条内容 | `src/data/myths.ts`，然后 `npm test` 和 `npm run og` |
| 加一个新分类 | `src/types.ts` 的 `CATEGORIES` |
| 改配色、深浅色 | `src/index.css` 顶部的 CSS 变量 |
| 改卡片长相 | `src/components/MythCard.tsx` |
| 改详情页长相 | `src/components/MythDetail.tsx` |
| 换图标 | 改 `assets/*.svg` → `npm run icons` → 提交生成物 |
| 改分享卡片文案 | `assets/og.svg` → `npm run icons` |
| 改网页标题 / SEO / meta | `index.html` |
| 改 PWA 名称、快捷方式 | `vite.config.ts` 里的 `manifest` |
| 改缓存策略 | **`netlify.toml` 和 `public/_headers` 两个都要改**（见第 7 节） |

### 加一条内容的格式

```ts
{
  id: 'kebab-case-唯一-英文',      // 会变成它的网址 /xxx，必须小写短横线
  category: 'eat',                  // eat | body | sleep | move | life | urgent
  belief:  '你以为的那句话',
  truth:   '一句话说清其实是什么',
  detail:  '展开讲证据。段落之间用 \n\n 分隔。',
  origin:  '这个说法当初怎么传开的',
  instead: '那到底该怎么做',
  stakes:  'risky',                 // risky 可能有害 | wasteful 白费功夫 | harmless 无伤大雅
  sources: [
    { label: '作者, 期刊 年份 —— 标题', url: 'https://...' },
    { label: '只有文献信息、链接确认不了的，就不写 url' },
  ],
  related: ['另一个条目的id'],       // 可选。写了就必须双向互链（测试会查对称性）
},
```

写完跑 `npm test`，它会检查 id 唯一性、字段非空、出处存在且是合法 https 等等。

---

## 6. 内容的编辑原则（重要，别破坏）

这个站的全部价值在于**它自己不能也变成一个乱讲的地方**。以下四条是硬约束：

1. **区分「证据不足以支持」和「已被推翻」。**
   防蓝光眼镜是前者（Cochrane 说证据不足），一万步是后者（那是个商品名）。
   正文里必须让读者看出区别，不能都写成「这是假的」。

2. **有争议、有例外的地方要留余地。**
   例：不吃早饭在随机对照试验里不会让人变胖，**但**同批研究里 LDL 胆固醇偏高——
   两边都得写。把一个过度简化的说法换成另一个过度简化的说法，并没有变好。

3. **每条都要有出处**，优先系统综述 > 随机对照试验 > 卫生机构指南 > 科普媒体。

4. **不给医疗建议。** 讲的是人群层面的一般规律，页脚的免责声明不要删。

---

## 7. 陷阱（这些地方很容易踩）

**① 核对出处链接时，curl 会骗你。**
Mayo Clinic、CDC、JAMA、BMJ、Cochrane、NEJM 这些站对 curl 一律返回 403/412，
**不管路径对不对**。不要因为 403 就判定链接失效并删掉。要验证就跑
`npm run links`（真实浏览器体检，见下）；其中 BMJ、NICE 等 7 个站连
headless Chrome 都拦，脚本会把它们单列为「被反爬拦截」，要人工开浏览器复核。
（当初就是这样才发现真正失效的只有个位数，其余几十个 403 全是误报。）

**② 图标和 OG 图不要放进 CI 生成。**
`npm run icons` / `npm run og` 只在本地跑，产物提交进仓库。因为 `og.svg`
和每条的分享图里有中文字，构建机上不一定装了中文字体。
CI 里跑会得到一张字体错乱的分享图。

**③ 缓存头要改两个地方。**
`netlify.toml` 只在 **CI 构建**时生效；`./scripts/deploy.sh` 这种直传 `dist/` 的方式
读不到它，走的是 `public/_headers`。两个文件内容必须保持一致，否则两条发布路径行为会不同。

**④ `sw.js` / `index.html` / `manifest.webmanifest` 必须保持 `max-age=0`。**
如果给它们加了长缓存，用户会**永久卡在旧版本上**，而且没法自救。这是 PWA 最经典的坑。

**⑤ 测 PWA 必须用 `npm run preview`。**
`npm run dev` 里 Service Worker 是禁用的（`devOptions.enabled: false`），
在 dev 模式下测离线永远测不出问题来。

**⑥ 新建 Netlify 站点后的第一次 CI 构建可能会永久卡在 `building`。**
当初就遇到了。取消掉、再推一个提交就正常了。别急着怀疑构建配置。

**⑦ 内容测试的长度阈值是按字段分别设的。**
中文很密，「吃辣会吃出胃溃疡」八个字就是完整一句。别改回一刀切的阈值，会误报。

**⑧ `vite.config.ts` 里 `prerenderPlugin()` 必须排在 `VitePWA()` 前面。**
closeBundle 按插件顺序执行：先预渲染出 62 个 HTML，PWA 才生成 sw.js 的
预缓存清单。顺序反了，预渲染页面就进不了离线缓存（build 不会报错，要查 sw.js 才知道）。
另外 `vite preview` 对 `/wet-hair` 这种无斜杠路径会走 SPA 回退（看不到预渲染页），
加 trailing slash 或看 Netlify 线上才是真实行为。

---

## 8. 一些设计决定，和为什么

以下都是权衡后的选择，不是随手写的。要改可以，但先知道当初为什么这么定：

- **内容全在一个 `myths.ts` 里，没有用 CMS / markdown / 数据库。**
  61 条纯文本，一个文件最好改、好搜索、好做 diff review，也让测试能静态检查全部内容。

- **图标只用几何图形，不含文字。**
  原本是「对」字加红线，但那依赖系统字体，且 16px 下糊成一团。
  现在是「对勾被红笔划掉」，任何环境渲染一致。红线特意比对勾细、接近水平，
  否则两笔会糊在一起。

- **更新提示不做静默重载。**
  `registerType: 'prompt'`，让用户读完再刷新。自动重载会把人正在看的内容换掉。

- **ErrorBoundary 里有「清除缓存后重试」。**
  PWA 万一缓存到一个坏版本，普通刷新救不回来，必须能反注册 SW + 清 caches。

- **真实路径路由（`/wet-hair`）+ 构建期预渲染，不是 hash 路由。**
  原来是 `#/xxx`，但 hash 部分搜索引擎抓不到，61 条内容在搜索眼里只有一页。
  现在构建时 `scripts/prerender.ts` 用 SSR bundle 渲染 62 个独立 HTML
  （各自带 title/description/canonical/og + sitemap.xml），客户端 hydrate 接管。
  旧的 `#/xxx` 链接由 index.html 里的内联脚本在应用启动前重写到 `/xxx`，
  已经分享出去的链接不断。

---

## 9. 交接前的自检

接手后跑一遍，全绿说明环境是好的：

```bash
cd /Users/pliu0036/Documents/CodingProject/actually-not
npm install
npm run check              # 应该：lint 无输出、类型通过、676 tests passed
npm run build              # 应该：生成 dist/，PWA precache 约 22 entries
./scripts/status.sh        # 应该：CI success、Netlify ready、线上全 200
git check-ignore .env.local # 应该：输出 .env.local（说明不会被提交）
```

再手动确认一次离线能用：

```bash
npm run preview
# 浏览器打开 http://localhost:4173，等几秒让 Service Worker 装好
# 然后把 preview 进程杀掉，刷新页面 —— 内容应该照常显示
```

---

## 10. 当前状态

- 61 条内容，6 个分类（吃 20 / 身体 15 / 生活 8 / 关键时刻 7 / 运动 6 / 睡 5）
- 其中 19 条标记为「可能有害」
- 所有出处链接都做过真实浏览器体检（`npm run links`）；失效的已修，
  确认不了的只保留文献信息、不放死链；GitHub Actions 每月自动复查
- 真实路径路由 + 63 页预渲染 + sitemap/robots；旧 `#/xxx` 链接自动重写
- 已读进度、详情分享按钮、搜索高亮、相关条目、详情页纠错入口、
  测验「你中了几条」（/quiz + 成绩分享图）、FAQ JSON-LD 结构化数据、
  PWA「随便看一条」快捷方式都已上线
- CI 通过，Netlify 自动部署正常，PWA 离线实测通过
- 每条内容有自己的 OG 分享图（`public/og/`，预渲染时按路由注入 og:image）
- Lighthouse 四项全 100；对比度全部 ≥4.5:1；`prefers-reduced-motion`
  已用真实浏览器实测（reduce 时 transition 降到 0.01ms）。
  屏幕阅读器（VoiceOver/NVDA）真机过一遍详情页仍未做
- 没有已知 bug，没有待办

可以做的方向（都不是必须的）：继续加条目、给条目加配图、
做一个「每日一条」的推送、把内容拆成中英双语。
