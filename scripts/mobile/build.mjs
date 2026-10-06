import { build } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs'

await build({ configFile:false, plugins:[react(),tailwindcss(), {name:'native-entry', transformIndexHtml: {order:'pre',handler:html => html.replace('/src/main.tsx','/src/native/main.tsx').replace(/<script>[^]*?<\/script>/g,'')}}], define:{ 'import.meta.env.VITE_APP_SHELL':'"true"' }, build:{ outDir:'dist-app',emptyOutDir:true }, base:'/' })
// 本地应用无需首次访问语言重定向、旧 hash 路由脚本或 service worker。
// 入口使用同一套双语数据；应用语言在 App 内选择。
mkdirSync('dist-app', { recursive:true })
writeFileSync('dist-app/app-build.json', JSON.stringify({version:'1.0.0',builtAt:new Date().toISOString(),entries:227}))

const html=readFileSync('dist-app/index.html','utf8').replace(/<script>[^]*?<\/script>/g,'')
writeFileSync('dist-app/index.html',html)
// 分享预览图和独立网页小镇不参与应用功能，不随离线包重复分发。
for (const path of ['og','town','_headers','_redirects']) rmSync(`dist-app/${path}`,{recursive:true,force:true})
