---
title: Koishi 插件开发
date: 2024-09-06T11:34:57+08:00
tags: [Koishi, Node.js]
---

Koishi 是一款跨平台可拓展的聊天机器人框架，支持 QQ、飞书、Telegram、Discord 等多个平台。本文主要简单介绍如何开发 Koishi 插件，以及插件的基本结构和使用方法。

参考资料：[Koishi 官方文档](https://koishi.chat/)

{{<github repo="koishijs/koishi">}}

## 准备工作

首先需要在本地配置好 Koishi 环境。

```bash
npm init koishi@latest
```

之后运行以下命令，创建一个新的插件项目。

```bash
npm run setup [name]
```

name 为插件的名字，可以省略 `koishi-plugin-` 前缀，命令会自动添加。

创建成功后，根目录下会多出一个 `external` 文件夹，其中存放着各类插件的源码，文件名即为插件名。其中几个比较重要的文件如下：

```
external
└─example-plugin
    │  package.json
    │
    ├─lib
    └─src
            index.ts
```

插件的主入口在 `index.ts` 中，而插件的一些元数据可以在 `package.json` 中配置。

```typescript
// index.ts
// 插件的名称
export const name = "example-plugin";

// 插件的配置
export interface Config {
  alert: boolean;
  platform: string;
  selfId: string;
  groups: string[];
}

// 插件的配置元数据，包括默认值、描述等
export const Config: Schema<Config> = Schema.object({
  alert: Schema.boolean().description("是否开启通知").default(false),
  platform: Schema.string().description("机器人平台"),
  selfId: Schema.string().description("机器人账号"),
  groups: Schema.array(Schema.string()).description("通知群组"),
});

// 插件的主入口
export function apply(ctx: Context) {
  ctx.on("message", (session) => {
    if (session.content === "天王盖地虎") {
      session.send("宝塔镇河妖");
    }
  });
}
```

## ctx 对象

在插件的主入口中，可以使用 `ctx` 对象来注册命令、监听事件等。

### 注册命令

```typescript
ctx
  .command("example-command [arg:number]", "实例命令")
  .usage("具体使用描述，使用 help example-command 查看")
  .action(async (_, arg) => {
    // 命令的具体逻辑
  });
```

### 监听事件

```typescript
ctx.on("message", (session) => {
  // 监听事件的具体逻辑
});
```

### bot 对象

```typescript
ctx.bots[`${platform}:${bot}`].sendMessage("Hello World!");
```

## 依赖与服务

在插件开发中，可能会使用到一些依赖以及其他插件提供的服务。依赖可以正常使用 `npm i` 安装，但是对于其他插件提供的服务，还需要在插件的 `index.ts` 中进行注册。

例如这里我们需要使用 `koishi-plugin-cron` 插件提供的定时任务功能以及 koishi 自带的 database 服务。

首先需要安装 `koishi-plugin-cron` 插件。

```bash
npm i koishi-plugin-cron
```

然后在 `index.ts` 中声明依赖。

```typescript
export const inject = ["database", "cron"];
```

此外还需要在 `package.json` 中声明依赖。

```json
// ...
  "koishi": {
    "description": {
      "en": "Example plugin for Koishi",
      "zh": "Koishi 插件示例"
    },
    "service": {
      "required": [
        "database",
        "cron"
      ]
    }
  },
// ...
```

之后我们就可以在 ctx 中使用这两个服务了。

```typescript
ctx.cron("0 * * * *", async () => {
  // cron job here
});
```

cron 表达式的具体语法可以参考 [cron-parser](https://www.npmjs.com/package/cron-parser)。

### 数据库服务

使用数据库服务之前，我们需要声明好自己的数据库模型。

```typescript
export interface ExampleModel {
  // 数据库条目必须含有 id 字段
  id: number;
  url: string;
  title: string;
}

// 声明数据库模型
declare module "koishi" {
  interface Tables {
    "example-table": ExampleModel;
  }
}

export function apply(ctx: Context, config: Config) {
  // 拓展数据库模型
  ctx.model.extend("example-table", {
    id: "unsigned",
    url: "string",
    title: "string",
  });
}
```

之后就可以使用 ctx.database 对象来操作数据库了。

```typescript
ctx.database.create("example-table", data);
ctx.database.get(
  "example-table",
  { url: "xxx" },
  { limit: count, sort: { id: "desc" } }
);
```

具体可以参考 [数据库操作](https://koishi.chat/zh-CN/api/database/database.html)。

## 发布插件

插件开发完成后，可以通过以下命令发布插件。

```bash
npm run pub [...name]
```

如果需要更新插件，可以使用下面的更新版本号命令。

```bash
npm run bump [...name] [-1|-2|-3|-p|-v <ver>]
```

- -1：更新 major 版本号，例如 `1.0.0` -> `2.0.0`
- -2：更新 minor 版本号，例如 `1.0.0` -> `1.1.0`
- -3：更新 patch 版本号，例如 `1.0.0` -> `1.0.1`
- -p：更新预发布版本号
- -v <ver>：指定版本号

具体可见 [更新插件版本](https://koishi.chat/zh-CN/guide/develop/publish.html#%E6%9B%B4%E6%96%B0%E6%8F%92%E4%BB%B6%E7%89%88%E6%9C%AC)。

插件发布后等待约 15 分钟左右就可以在面板中的插件市场中搜索到了。如果想要立即使用最新的版本的话，可以在面板的依赖管理中手动下载最新的版本。
