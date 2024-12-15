---
title: 从零开发一个 Node.js CLI 程序
date: 2023-10-21T22:30:07+08:00
tags: [Node.js, CLI]
---
在进行 Node.js 开发时，我们常常会用到一些命令行界面（CLI）工具。例如 Vite：

```bash
$ npm create vite@latest
Need to install the following packages:
create-vite@4.4.1
Ok to proceed? (y)
√ Project name: ... vite-project
√ Select a framework: » Vue
√ Select a variant: » TypeScript

Scaffolding project in path/to/vite-project...

Done. Now run:

  cd vite-project
  npm install
  npm run dev

```

静态博客建站工具 Hexo：

```bash
$ hexo init my-site
INFO  Cloning hexo-starter https://github.com/hexojs/hexo-starter.git
INFO  Install dependencies
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

最终的静态网站生成器成品已经发布到了 npm 上，并且已经基本具备了一个完整的静态网站生成器的各种功能。在此欢迎各位读者参考与使用：[Vivia](https://github.com/viviajs/vivia)。

## 初始化项目

首先为我们的 CLI 项目创建一个文件夹。在本文中，我们使用 npm 作为我们的包管理器。

```bash
$ mkdir vivia
$ cd vivia
$ npm init -y
Wrote to path/to/vivia/package.json:

{
  "name": "vivia",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

配置 TypeScript：

```bash
$ tsc --init --module es2022

Created a new tsconfig.json with: 

  target: es2016
  module: es2022
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true

You can learn more at https://aka.ms/tsconfig
```

若读者之前没有安装过 TypeScript，可以先使用下面的命令全局安装 TypeScript 后，再执行上面的命令初始化 TypeScript。

```bash
$ npm i typescript -g
```

配置 ESLint：

```bash
$ npm init @eslint/config
√ How would you like to use ESLint? · style
√ What type of modules does your project use? · esm
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · node
√ How would you like to define a style for your project? · guide
√ Which style guide do you want to follow? · standard-with-typescript
√ What format do you want your config file to be in? · JSON
Checking peerDependencies of eslint-config-standard-with-typescript@latest
The config that you've selected requires the following dependencies:

eslint-config-standard-with-typescript@latest @typescript-eslint/eslint-plugin@^6.4.0 eslint@^8.0.1 eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 || ^16.0.0  eslint-plugin-promise@^6.0.0 typescript@*
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · npm
Installing eslint-config-standard-with-typescript@latest, @typescript-eslint/eslint-plugin@^6.4.0, eslint@^8.0.1, eslint-plugin-import@^2.25.2, eslint-plugin-n@^15.0.0 || ^16.0.0 , eslint-plugin-promise@^6.0.0, typescript@*

up to date, audited 219 packages in 8s

95 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Successfully created .eslintrc.json file in path/to/vivia
```

随后，打开 `tsconfig.json`，指定要编译的 TypeScript 文件在 `src` 目录下，并将编译结果输出到 `dist` 文件夹：

```json
  "outDir": "./dist",    
  "include": [
    "src/**/*"
  ]
```

再打开 `.eslintrc.json`，配置使用 `tsconfig.json` 中的规则进行解析。

```json
  "parserOptions": {
    ...
    "project": "./tsconfig.json"
  },
```

现在，让我们创建一个用于存放源代码的 `src` 文件夹，在其中新建一个 `cli.js` 文件作为程序的入口，并写入以下内容：

```javascript
console.log('Hello Node.js CLI!')
```

现在，我们可以编译并使用 `node` 命令执行我们 JavaScript 代码了：

```bash
$ tsc --build
$ node ./dist/main.js
Hello Node.js CLI!
```

编辑 `package.json`，写入以下内容：

```json
  "scripts": {
    "dev": "tsc --watch"
  }
```

现在，我们可以通过执行 `npm run dev` 来实时编译我们的代码了。如果读者使用 VSCode 来开发项目，还可以右键资源管理器，勾选“npm 脚本”选项来快速查看和运行 `package.json` 中定义的所有脚本。读者还可以选择安装 ESLint、Error Lens 来获得更直观的错误提示，并使用 Prettier-Standard 一键格式化代码为 standard 风格。

## 通过命令运行程序

作为一个 Node.js CLI 程序，首先应该能像 `ls`、`cat` 等命令一样直接在控制台运行，而不是使用 `node <filename>` 这种笨拙的方式。继续编辑 `package.json`，并加入以下内容：

```json
  "bin": {
    "vivia": "dist/cli.js"
  },
```

其中，`bin` 的每一键都代表一个命令，而其对于的值则是实际要执行的 JavaScript 文件位置。

然后，运行 `npm i -g`，全局安装本项目。此时如果读者尝试直接执行 `vivia` 命令的话，会得到一个 `Windows Script Host` 的错误。显然，Windows 将我们的 `cli.js` 文件误以为成了 Microsoft JScript 文件了。实际上，我们应该使用 `node` 来执行。我们可以通过在 `cli.ts` 文件开头加上

```ts
#!/usr/bin/env node
```

来告诉操作系统使用 `node` 来执行我们的脚本。

现在，重新编译文件，再次尝试运行 `vivia` 命令，可以发现程序已经能正常运行了。

```bash
$ vivia    
Hello Node.js CLI!
```
