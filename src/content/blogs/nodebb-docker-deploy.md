---
title: Nodebb Docker 部署
date: 2024-09-10T19:03:43+08:00
tags: [Docker, Node.js]
---

目前市面上有很多开源的论坛框架，例如基于 php 的 Discuz、phpBB，基于 Python 的 FlaskBB，基于 Java 的 JForum ，基于 Node.js 的 NodeBB 等。这里我们选择使用 NodeBB。NodeBB 是一个开源的论坛框架，使用 Node.js 开发，支持插件扩展，界面友好，社区活跃。

{{<github repo="NodeBB/NodeBB">}}

因为 NodeBB 的官方文档中并没有详细说明如何通过 Docker 部署，而 Docker Hub 上官方的 NodeBB 镜像也是很久没有更新了，所以笔者在这里记录一下如何通过 Docker 部署 NodeBB。

## 安装 MongoDB

首先需要安装数据库，NodeBB 支持的数据库有 Redis、MongoDB、PostgreSQL，这里我们选择 MongoDB。

```bash
sudo docker run -d --name mongodb -v /opt/mongodb:/data -p 27017:27017 -it --restart=unless-stopped mongo
```

其中 /data 目录下有 configdb 和 db 两个目录，分别存放配置和数据。使用 `-it` 参数能够提前为容器分配一个伪终端，方便在容器内部执行命令。

需要注意的是，MongoDB 默认关闭了登录验证，如果服务部署在公网上，需要在启动命令后追加 `--auth` 参数，启用登录验证。

## 安装 NodeBB

因为 NodeBB 官方的 nodebb/docker 已经很近没有更新了，所以这里使用 Elestio 编译的最新的 NodeBB 镜像启动容器。

```bash
sudo docker run -d --name nodebb -v /opt/nodebb/uploads:/usr/src/app/public/uploads -p 4567:4567 --restart=unless-stopped elestio/nodebb
```

因为 docker 的挂载行为是将宿主机的目录直接挂载到容器内，所以如果需要对 NodeBB 进行深度定制，将容器内整个 node 项目文件夹暴露到宿主机上，来直接修改代码和配置文件，会导致容器内的 node 项目文件夹被宿主机的空文件覆盖。

这种情况下推荐从 GitHub 上下载最新的 NodeBB 源码，然后手动构建容器镜像。
