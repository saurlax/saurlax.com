---
title: 从零开发一个Node.js CLI程序：以静态网站生成器为例
date: 2023-10-21 22:30:07
categories: []
tags: []
---
在进行 Node.js 开发时，我们常常会用到一些命令行界面（CLI）工具。例如 `npm create vite` 或 `hexo init <folder>`：

```bash
$ npm create vite@latest
Need to install the following packages:
create-vite@4.4.1
Ok to proceed? (y)
√ Project name: ... vite-project
√ Select a framework: » Vue
√ Select a variant: » TypeScript

Scaffolding project in D:\Projects\test\vite-project...

Done. Now run:

  cd vite-project
  npm install
  npm run dev

```

```bash
$ hexo init my-site
INFO  Cloning hexo-starter https://github.com/hexojs/hexo-starter.git
INFO  Install dependencies
warning hexo > warehouse > cuid@2.1.8: Cuid and other k-sortable and non-cryptographic ids (Ulid, ObjectId, KSUID, all UUIDs) are all insecure. Use @paralleldrive/cuid2 instead.
INFO  Start blogging with Hexo!
```

这些工具能够极大地简化我们的配置工作或是给我们提供一个方便的接口来调用别人写好的库。在这篇文章中，我们将充分利用 Node.js 的生态系统，从零开始编写一个简单易用、具有高拓展性的静态网站生成器（SSG）。我们将会涉及到以下内容：

- 使用 TypeScript 和 ESLint 规范我们的代码
- 通过命令调用我们的 Node.js 代码
- 简单的命令参数分析与处理
- 使用 `npm create` 命令来调用我们的程序
- 将我们的包发布到 npm 以供更多人使用

如果读者对于如何编写一个静态网站生成器感兴趣，也可以继续查阅后面的章节，了解如何一步步构建出一个简单快速、高拓展性的静态网站生成器，我们将会涉及到以下内容：

- 一个基本的静态网站生成器的基本要素
- 数据读取、配置加载、模板管理和主题继承
- 通过 `fs.watch()` 实现热重载功能
- 使用 `Promise` 实现异步渲染管线
- 通过 `ES Module` 实现插件拓展功能

最终的静态网站生成器成品已经发布到了 npm 上，并且已经基本具备了一个完整的静态网站生成器的各种功能。在此欢迎各位读者参考与使用：https://github.com/viviajs/vivia。

## 初始化项目

