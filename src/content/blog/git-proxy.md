---
title: Git 配置代理
date: 2024-09-06T20:04:00+08:00
tags: [Git]
---

Git 不会自动从终端代理设置中读取代理信息，所以需要手动配置代理。

```bash
git config --global http.proxy proxy_url
git config --global https.proxy proxy_url
```

如果只需要临时使用代理，使用参数指定代理地址：

```bash
git clone repo_url -c http.proxy=proxy_url
```

此外，还可以尝试使用镜像仓库服务，例如对于 `https://github.com/example/repo.git`，可以使用以下命令：

```bash
git clone https://mirror.ghproxy.com/https://github.com/example/repo.git
```
