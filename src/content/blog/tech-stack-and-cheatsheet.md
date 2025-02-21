---
title: Tech Stack & Cheatsheet
date: 2025-02-17T16:39:49+08:00
tags: []
pin: true
---

Here is all the tech stack I used and cheatsheet for quickstart.

## Frontend / Fullstack

### Frameworks

- [Astro](https://docs.astro.build/zh-cn/getting-started/)
- [Nuxt](https://nuxt.com/docs/guide/directory-structure/app)
- [Next.js](https://nextjs.org/docs/app/getting-started/project-structure)
- [Vite](https://cn.vite.dev/guide/cli.html)

### UI Libraries

- [Element Plus](https://element-plus.org/zh-CN/component/overview.html)
- [PrimeVue](https://primevue.org/setup/)
- [Radix UI](https://www.radix-ui.com/themes/docs/overview/getting-started)
- [Naive UI](https://www.naiveui.com/zh-CN/os-theme/components/button)
- [Ant Design](https://ant.design/components/overview-cn/?locale=zh-CN)
- [Nuxt UI](https://ui.nuxt.com/components/accordion)

### Styles

- [Iconify](https://icon-sets.iconify.design/)
- [Headless UI](https://headlessui.com/)
- [UnoCSS](https://unocss.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs/styling-with-utility-classes)

### Others

- [Prisma ORM](https://www.prisma.io/docs/orm/prisma-schema/data-model/models)
- [mongoose](https://mongoosejs.com/docs/guide.html)
- [postgres](https://github.com/porsager/postgres)
- [micromark](https://github.com/micromark/micromark): marked 替代
- [pagefind](https://pagefind.app/docs/)
- [dayjs](https://day.js.org/): 轻量 moment.js 替代
- [aframe](https://aframe.io/): WebVR 框架
- [Giscus](https://giscus.app/zh-CN): 基于 GitHub Discussions 的评论系统

## Backend

- [Gin](https://gin-gonic.com/zh-cn/docs/examples/)
- [FastAPI](https://fastapi.tiangolo.com/tutorial/first-steps/)

## Client

- [Electron](https://www.electronjs.org/zh/docs/latest/)
- [Tauri](https://tauri.app/zh-cn/start/create-project/): 基于 Rust 的轻量级 Electron 替代
- [WinUI 3](https://learn.microsoft.com/zh-cn/windows/apps/winui/winui3/): `dotnet new winui3 -n MyWinUI3App`
- [MAUI](https://learn.microsoft.com/zh-cn/dotnet/maui/get-started/installation): `dotnet new maui -n MyMauiApp`

## IoT

- PlatformIO: VSCode 插件
- [Keil Studio](https://www.keil.arm.com/): 开发 STM32 的新时代。但是坑居多，可以参考[朋友的博客](https://blog.katorly.com/STM32-VSCode-with-Keil-Studio/)

## Machine Learning

- [potry](https://python-poetry.org/docs/): Python 项目依赖管理工具
- [seaborn](https://seaborn.pydata.org/api.html): 更好的 matplotlib
- [matplotlib](https://matplotlib.org/stable/api/index.html): 但是 seaborn 没法绘制一些控件
- [plotly](https://plotly.com/python-api-reference/): 交互式图表
- [onnx-go](https://github.com/oramasearch/onnx-go): 目前还不支持很多算子

## Computer Graphics

- [wgpu](https://wgpu.rs/): Rust 图形库
- [Silk.NET](https://dotnet.github.io/Silk.NET/): C# 图形库封装

## Game Dev

- [Bevy](https://bevyengine.org/learn/quick-start/getting-started/): Rust 游戏引擎
- [Godot](https://godotengine.org/): 开源游戏引擎

## DevOps / XaaS / Projects

- [Vercel](https://vercel.com/pricing): 免费部署 Serverless 全栈项目
- [Netlify](https://www.netlify.com/pricing/): 免费部署 Serverless 全栈项目
- [Zeaber](https://zeabur.com/zh-CN/pricing): 免费部署 Serverless 全栈项目，还可以部署 Docker（付费）
- [Prisma Postgres](https://www.prisma.io/pricing):白嫖 Postgres 数据库
- [MongoDB Atlas](https://www.mongodb.com/pricing): 白嫖 MongoDB 数据库
- [Cloudflare](https://www.cloudflare.com/zh-cn/plans/)

---

- [1Panel](https://1panel.cn/docs/installation/online_installation/): Linux 服务器管理面板
- [哪吒探针](https://nezha.wiki/): 界面很漂亮
- [Umami](https://umami.is/): 自建网站访问统计
- [Nginx Proxy Manager](https://nginxproxymanager.com/guide/): 用于管理 Nginx 反向代理
- [Caddy](https://caddyserver.com/docs/): 一个自带 HTTPS 的 Web 服务器，可以用来代理和部署静态网站
- [frp-panel](https://github.com/VaalaCat/frp-panel): 群友写的 frp 内网穿透的 Web 管理面板

---

- [Halo](https://docs.halo.run/getting-started/install/docker-compose): 开源的博客系统

## Tools

- [WindTerm](https://github.com/kingToolbox/WindTerm): Windows 上的终端模拟器
- [Wireshark](https://www.wireshark.org/): 网络抓包工具
- [Postman](https://www.postman.com/): API 调试工具
- [MQTTX](https://mqttx.app/zh): MQTT 客户端工具
- [SQLiteStudio](https://sqlitestudio.pl/)
- [pgAdmin](https://www.pgadmin.org/)
- [Studio 3T](https://studio3t.com/)：MongoDB 可视化工具

---

- [Inkscape](https://inkscape.org/zh-hans/): 矢量图绘制工具
- [draw.io](https://app.diagrams.net/): 好看的矢量图绘制工具
- [Typora](https://typora.io/): 我的 md2pdf 工具
- [Obsidian](https://obsidian.md/): Markdown 知识库管理工具

---

- [Netch](https://github.com/netchx/netch): p2p 游戏加速
- [TeamSpeak](https://teamspeak.com/zh-CN/downloads/#server): 自建语音聊天服务器
