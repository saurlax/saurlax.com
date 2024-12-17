---
title: 基于 Xinetd 部署 Pwn 靶场环境
date: 2024-09-01T20:16:14+08:00
tags: [CTF, Pwn, Docker]
---

xinetd 是一个 Linux 系统下的超级服务器，可以监听多个端口，根据不同的端口号调用不同的服务程序。xinetd 通过配置文件来管理服务，配置文件一般位于 `/etc/xinetd.d/` 目录下。基于 xinetd 将程序的标准输入输出流重定向到 TCP 连接上，可以通过 nc 来连接题目。

## 部署

首先目标机器上需要提前安装好 Docker。然后克隆 ctf_xinetd。这里我基于原本的 ctf_xinetd 进行了一些修改，使得能够支持 ctfd 等平台的动态 flag，并且能够在容器环境中编译题目。

```bash
git clone https://github.com/saurlax/ctf_xinetd.git
```

{{<github repo="saurlax/ctf_xinetd">}}

克隆好仓库后，可以安装 README.md 的提示进行修改和部署。可以在 `pwn.c` 中编写题目，`build.sh`中自定义要关闭的保护规则。

修改好相应的文件后，可以通过

```bash
docker build -t hello_pwn .
```

构建镜像，然后通过

```bash
docker run -d -p 9999:9999 -e FLAG="flag{test_flag}" hello_pwn
```

运行容器，这样就可以通过 nc 连接到 9999 端口来获取 flag 了。

## 自定义

### pwn.c

注意需要提前关闭缓冲区，否则在 xinetd 中会导致输出不全的问题。

```c
setvbuf(stdout, NULL, _IONBF, 0);
setvbuf(stdin, NULL, _IONBF, 0);
setvbuf(stderr, NULL, _IONBF, 0);
```

### ctf.xinetd

在这里可以配置应用的内部端口和一些安全限制，最终这个文件会被复制到 `/etc/xinetd.d/` 目录下来启动服务。

```conf
service ctf
{
    disable     = no
    socket_type = stream
    protocol    = tcp
    wait        = no
    user        = root
    type        = UNLISTED
    port        = 9999
    bind        = 0.0.0.0
    server      = /root/pwn
    banner_fail = /etc/banner_fail
    # safety options
    per_source	= 10 # the maximum instances of this service per source IP address
    rlimit_cpu	= 20 # the maximum number of CPU seconds that the service may use
    #rlimit_as  = 1024M # the Address Space resource limit for the service
    #access_times = 2:00-9:00 12:00-24:00
}
```

如果测试的时候发现服务启动失败，可以进入容器查看日志。

```bash
docker exec -it <container_id> /bin/bash
xinetd -d
```

### build.sh

在这里可以自定义编译选项，比如关闭保护规则，如果不希望用户可以查看到题目源代码，需要在最后删除源码。

```bash
#!/bin/sh
gcc ./pwn.c -o ./pwn
rm pwn.c
```

常见的 gcc 编译选项：

- NX: `-z execstack`/`-z noexecstack`，开启/关闭栈可执行。
- Canary: `-fstack-protector`/`-fno-stack-protector`，开启/关闭栈保护。
- PIE: `-fPIE -pie`/`-no-pie`，开启/关闭地址随机化。
- RELRO: `-z now`/`-z lazy`/`-z norelro`，开启/部分开启/关闭 RELRO。

### start.sh

一般对于静态的内容推荐放在 build.sh 中，而对于动态的内容，比如 flag，可以放在 start.sh 中设置。

```bash
#!/bin/sh
echo $FLAG > /flag;
/etc/init.d/xinetd start;
sleep infinity;
```
