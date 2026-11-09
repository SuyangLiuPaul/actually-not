import { build } from 'vite'
import { MYTHS } from '../../src/data/myths.ts'
import { MYTHS_EN } from '../../src/data/myths-en.ts'
import { filterMythsForPlatform, excludedCategoriesFor } from '../../src/data/platform.ts'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs'

// 平台：ios（默认，含全部内容）| android（不含 urgent / body 分类，见 src/data/platform.ts）。
// Google Play 个人开发者账号不能发布含「医疗」功能的应用，所以 Android 包整体排除这两个分类。
const platform = process.env.APP_PLATFORM || 'ios'
if (!['ios', 'android'].includes(platform)) throw new Error(`未知 APP_PLATFORM：${platform}（可用 ios | android）`)
// node 里没有 VITE_APP_PLATFORM，MYTHS 是完整列表；用同一个过滤函数算出这个平台的真实条目数。
const platformMyths = filterMythsForPlatform(MYTHS, platform)
const expectedEntries = platformMyths.length
const excludedIds = MYTHS.filter(m => excludedCategoriesFor(platform).includes(m.category)).map(m => m.id)

// 被排除分类的条目不只是「界面上看不到」——正文也不进安装包：把数据模块替换成已过滤的 JSON。
const dataRoot = resolve('src/data')
const platformData = {
  name: 'platform-data',
  enforce: 'pre',
  load(id) {
    const file = id.split('?')[0]
    if (excludedIds.length === 0) return null
    if (file === resolve(dataRoot, 'myths.ts')) return `export const MYTHS = ${JSON.stringify(platformMyths)}`
    if (file === resolve(dataRoot, 'myths-en.ts')) return `export const MYTHS_EN = ${JSON.stringify(Object.fromEntries(platformMyths.map(m => [m.id, MYTHS_EN[m.id]])))}`
    return null
  },
}
console.log(`app:build 平台 = ${platform}，条目 ${expectedEntries}`)

await build({ configFile:false, plugins:[platformData,react(),tailwindcss(), {name:'native-entry', transformIndexHtml: {order:'pre',handler:html => html.replace('/src/main.tsx','/src/native/main.tsx').replace(/<script>[^]*?<\/script>/g,'')}}], define:{ 'import.meta.env.VITE_APP_SHELL':'"true"', 'import.meta.env.VITE_APP_PLATFORM':JSON.stringify(platform) }, build:{ outDir:'dist-app',emptyOutDir:true }, base:'/' })
// 本地应用无需首次访问语言重定向、旧 hash 路由脚本或 service worker。
// 入口使用同一套双语数据；应用语言在 App 内选择。
mkdirSync('dist-app', { recursive:true })
writeFileSync('dist-app/app-build.json', JSON.stringify({version:'1.1.0',platform,builtAt:new Date().toISOString(),entries:expectedEntries}))

const html=readFileSync('dist-app/index.html','utf8').replace(/<script>[^]*?<\/script>/g,'')
writeFileSync('dist-app/index.html',html)
// 分享预览图和独立网页小镇不参与应用功能，不随离线包重复分发。
for (const id of excludedIds) rmSync(`dist-app/illu/${id}.webp`,{force:true})
for (const path of ['og','town','_headers','_redirects']) rmSync(`dist-app/${path}`,{recursive:true,force:true})
