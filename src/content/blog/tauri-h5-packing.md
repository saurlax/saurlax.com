---
title: Tauri 打包 H5 应用
date: 2025-03-05T18:40:36+08:00
tags: [Rust]
---

Tauri v2 支持了打包到移动端。对于已经开发好的网页应用想要套壳到移动端，除了自己打开 Android Studio 或者 Xcode 手动打包，还可以使用 Tauri 来打包。

要使用 Tauri，首先要确保 Rust 和 Node.js 环境已经安装好。具体请见[先决条件](https://v2.tauri.org.cn/start/prerequisites/)。

## 创建项目

首先初始化 Tauri 项目：

```bash
pnpm create tauri-app
# 注意不要使用默认的 Identifier
# 如果没有其他需求，使用 Vanilla 即可
cd tauri-app
pnpm install
```

之后修改一下 `package.json` 中的运行脚本：

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "tauri:dev": "tauri dev",
    "tauri:build": "tauri build"
  },
```

此时运行 `pnpm tauri:dev`，稍等片刻，就可以看到一个窗口弹出来，展示了默认模板页面。

## 加载网页 URL

有两种方式，第一种是可以直接把 `src/main.ts` 中的内容替换成：

```typescript
document.location.href = "https://example.com/";
```

这样当 APP 启动后会立即跳转到指定的网页。

此外也可以修改 `tauri.conf.json`，在 `app.windows` 字段下添加 `url` 字段：

```json
  "app": {
    "withGlobalTauri": true,
    "windows": [
      {
        "title": "wiguard",
        "width": 800,
        "height": 600,
        "url": "https://example.com/"
      }
    ],
    "security": {
      "csp": null
    }
  },
```

## 打包到移动端

为了打包到安卓，需要提前安装好 Android Studio，并且配置好 `JAVA_HOME`、`ANDROID_HOME` 和 `NDK_HOME` 环境变量。

```bash
pnpm tauri andorid init
pnpm tauri andorid build
```
