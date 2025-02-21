---
title: Tech Stack & Cheatsheet
date: 2025-02-17T16:39:49+08:00
tags: []
---

Here is all the tech stack I used and cheatsheet for quickstart.

## Frontend / Fullstack

### Frameworks

- [Vite](https://cn.vite.dev/guide/cli.html): `npm create vite@latest`
- [Nuxt](https://nuxt.com/docs/guide/directory-structure/app): `npx nuxi@latest init`
- [Next.js](https://nextjs.org/docs/app/getting-started/project-structure): `npx create-next-app@latest`

### UI Libraries

- [Element Plus](https://element-plus.org/zh-CN/component/overview.html): `pnpm install element-plus`
  - Nuxt: `pnpm install -D @element-plus/nuxt`
- [PrimeVue](https://primevue.org/setup/): 很漂亮
- [Naive UI](https://www.naiveui.com/zh-CN/os-theme/components/button): `pnpm install naive-ui`
  - [Nuxt](https://www.naiveui.com/zh-CN/os-theme/docs/nuxtjs): `npx nuxi module add nuxtjs-naive-ui`. 感觉有点难用
- [Ant Design](https://ant.design/components/overview-cn/?locale=zh-CN)
- [Nuxt UI](https://ui.nuxt.com/components/accordion): 一般般
- [Iconify](https://icon-sets.iconify.design/): 搭配 UnoCSS 使用更佳
- [UnoCSS](https://unocss.dev/guide/): `pnpm add -D unocss`
  - [Vite](https://unocss.dev/integrations/vite)
  - [Nuxt](https://unocss.dev/integrations/nuxt): `pnpm add -D @unocss/nuxt`
  - [Astro](https://unocss.dev/integrations/astro)

```ts
// unocss.config.ts
import { defineConfig, presetIcons, presetTypography, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetTypography(), presetIcons()],
  preflights: [{ getCSS: () => '[class^="i-"] { display: inline-block; }' }],
});
```

- [Tailwind CSS](https://tailwindcss.com/docs/styling-with-utility-classes): 只在别人的项目中或使用自带 Tailwind 的 UI 库时使用，所以不太熟悉配置方法

### Others

- [Prisma ORM](https://www.prisma.io/docs/orm/prisma-schema/data-model/models): 有点小坑，但是还算好用。`@prisma/nuxt` 不好用
- [mongoose](https://mongoosejs.com/docs/guide.html): MongoDB 的 ORM
- [postgres](https://github.com/porsager/postgres): 比 pg 库简洁，可以用 `` sql`xxx` ``这种语法
- [micromark](https://github.com/micromark/micromark): 比 marked 好用。如果需要更多功能的话可以用 remark 和 rehype
- [pagefind](https://pagefind.app/docs/)
- [dayjs](https://day.js.org/): 比 moment.js 小很多
- [aframe](https://aframe.io/): 开发 VR 小玩意
- [Giscus](https://giscus.app/zh-CN): 评论系统

## Backend

- [Gin](https://gin-gonic.com/zh-cn/docs/examples/): 我不要写 Go 😭
- [FastAPI](https://fastapi.tiangolo.com/tutorial/first-steps/): 我一般只用来暴露 ML 模型

## Client

- [Electron](https://www.electronjs.org/zh/docs/latest/): 可是它实在是太好用了 🥺
- [Tauri](https://tauri.app/zh-cn/start/create-project/): 轻量，现在还能打包到移动端了
- [WinUI 3](https://learn.microsoft.com/zh-cn/windows/apps/winui/winui3/): `dotnet new winui3 -n MyWinUI3App`
- [MAUI](https://learn.microsoft.com/zh-cn/dotnet/maui/get-started/installation): `dotnet new maui -n MyMauiApp`, 感觉有点不太好用

## IoT

- PlatformIO: VSCode 插件，项目结构很清晰
- [Keil Studio](https://www.keil.arm.com/): 开发 STM32 的新时代。但是坑居多，可以参考[朋友的博客](https://blog.katorly.com/STM32-VSCode-with-Keil-Studio/)

## Machine Learning

- [potry](https://python-poetry.org/docs/): Python 项目依赖管理工具
- [seaborn](https://seaborn.pydata.org/api.html): better matplotlib
- [matplotlib](https://matplotlib.org/stable/api/index.html): 但是 seaborn 没法绘制一些控件
- [plotly](https://plotly.com/python-api-reference/): 交互式图表
- [onnx-go](https://github.com/oramasearch/onnx-go): 目前还不支持很多算子

## Computer Graphics

- [wgpu](https://wgpu.rs/): Rust 图形库 🦀
- [Silk.NET](https://dotnet.github.io/Silk.NET/): C#上的图形库封装，比 OpenTK 好用

## Game Dev

- [Bevy](https://bevyengine.org/learn/quick-start/getting-started/)
- [Godot](https://godotengine.org/)

## DevOps / XaaS

- [Vercel](https://vercel.com/pricing): 可以免费部署 Serverless 全栈项目，有 Serverless Postgres 但是不太好用
- [Netlify](https://www.netlify.com/pricing/): 可以免费部署 Serverless 全栈项目
- [Zeaber](https://zeabur.com/zh-CN/pricing): 可以免费部署 Serverless 全栈项目，还可以部署 Docker（付费）
- [Prisma Postgres](https://www.prisma.io/pricing):可以白嫖 Postgres 数据库
- [MongoDB Atlas](https://www.mongodb.com/pricing): 可以白嫖 MongoDB 数据库
- [Cloudflare](https://www.cloudflare.com/zh-cn/plans/): 可以白嫖云函数 Workers，基于 SQLite 的 D1 数据库，还有穿透内网服务用的 Tunnel

---

- [1Panel](https://1panel.cn/docs/installation/online_installation/): Linux 服务器管理面板，但是装了面板之后就不方便自己操作 docker 和 openresty 了
- [哪吒探针](https://nezha.wiki/): 界面很漂亮
- [Umami](https://umami.is/): 自建网站访问统计
- [Nginx Proxy Manager](https://nginxproxymanager.com/guide/): 用于管理 Nginx 反向代理
- [Caddy](https://caddyserver.com/docs/): 一个自带 HTTPS 的 Web 服务器，可以用来代理和部署静态网站
- [frp-panel](https://github.com/VaalaCat/frp-panel): 群友写的 frp 内网穿透的 Web 管理面板

---

- [Halo](https://docs.halo.run/getting-started/install/docker-compose): Java 写的 CMS，最起码比 WordPress 好用

## Tools

- [WindTerm](https://github.com/kingToolbox/WindTerm): Windows 上的终端模拟器，可以快速输入密码
- [Wireshark](https://www.wireshark.org/): 网络抓包工具
- [Postman](https://www.postman.com/): API 调试工具
- [MQTTX](https://mqttx.app/zh): MQTT 客户端工具
- [SQLiteStudio](https://sqlitestudio.pl/)
- [pgAdmin](https://www.pgadmin.org/)
- [Studio 3T](https://studio3t.com/)：MongoDB 可视化工具

---

- [Inkscape](https://inkscape.org/zh-hans/): 矢量图绘制工具
- [draw.io](https://app.diagrams.net/): 好看的矢量图绘制工具
- [Typora](https://typora.io/): 已经成为我的 md2pdf 工具了，平时主要是用 VSCode
- [Obsidian](https://obsidian.md/): 目前主要使用 VSCode

---

- [Netch](https://github.com/netchx/netch): p2p 游戏加速
- [TeamSpeak](https://teamspeak.com/zh-CN/downloads/#server): 自建语音聊天服务器
