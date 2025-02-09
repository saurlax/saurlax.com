---
title: patchelf 与 glibc-all-in-one
date: 2023-12-18T19:42:12+08:00
tags: [CTF]
---

刚开始做 Pwn 时，如果遇到需要进行本地调试的题，我们在本地运行时，可能会发现远程服务器的结果与本地的结果不一样，或遇到以下错误：

```bash
$ ./pwn
*** stack smashing detected ***: terminated
Aborted
```

这通常是因为我们没有给程序配置上正确的环境。程序所依赖的 libc 和本地上默认的 libc 版本不一致。此时，我们可以手动给程序 patch 上正确的依赖。

首先，可以使用 ldd 命令查看当前程序的依赖：

```bash
$ ldd ./pwn
    linux-vdso.so.1 (0x00007ffdae7bb000)
    libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f716013e000)
    /lib64/ld-linux-x86-64.so.2 (0x00007f7160331000)

```

可以发现，程序使用的是本地 `/lib` 文件夹下的依赖。要想给程序 patch 上正确的 libc，我们首先需要知道程序使用的 libc 版本。一般题目会附带一个 libc 文件供我们查看版本。

```bash
$ strings ./libc.so.6 | grep GNU
GNU C Library (Ubuntu GLIBC 2.31-0ubuntu9.9) stable release version 2.31.
Compiled by GNU CC version 9.4.0.
```

可以看到，这个 libc 的版本是 2.31-0ubuntu9.9。

## glibc-all-in-one

有了 libc 之后，我们还需要对应的链接器 ld。可以通过 glibc-all-in-one 快速获取各个版本的 glibc 及其配套文件。

```bash
$ sudo git clone https://github.com/matrix1001/glibc-all-in-one.git
cd glibc-all-in-one
```

运行 `./update_list` 更新 glibc 列表。之后便可以查看当前可下载的 glibc：

```bash
$ cat list
2.23-0ubuntu11.3_amd64
2.23-0ubuntu11.3_i386
2.23-0ubuntu3_amd64
2.23-0ubuntu3_i386
2.27-3ubuntu1.5_amd64
2.27-3ubuntu1.5_i386
2.27-3ubuntu1.6_amd64
2.27-3ubuntu1.6_i386
2.27-3ubuntu1_amd64
2.27-3ubuntu1_i386
2.31-0ubuntu9.12_amd64
2.31-0ubuntu9.12_i386
2.31-0ubuntu9.7_amd64
2.31-0ubuntu9.7_i386
2.31-0ubuntu9_amd64
2.31-0ubuntu9_i386
2.35-0ubuntu3.4_amd64
2.35-0ubuntu3.4_i386
2.35-0ubuntu3_amd64
2.35-0ubuntu3_i386
2.37-0ubuntu2.1_amd64
2.37-0ubuntu2.1_i386
2.37-0ubuntu2_amd64
2.37-0ubuntu2_i386
2.38-1ubuntu6_amd64
2.38-1ubuntu6_i386
2.38-3ubuntu1_amd64
2.38-3ubuntu1_i386

```

要使用对应的 glibc，只需要运行 `./download 版本号` 即可。例如 `./download 2.31-0ubuntu9_amd64`。

如果列表中没有我们需要的 glibc，我们还可以在 https://launchpad.net/ubuntu/+source/glibc 上下载。

进入对应的 glibc 版本页面，这里我们需要的是 2.31-0ubuntu9.9，对应的链接就是 [https://launchpad.net/ubuntu/+source/glibc/2.31-0ubuntu9.9](https://launchpad.net/ubuntu/+source/glibc/2.31-0ubuntu9.9)。

在右侧 Builds 中点击对应的架构，在这里我们需要的是 amd64 架构，之后下载对应的 deb 文件到 debs 文件夹中即可，即 [libc6-dbg_2.31-0ubuntu9.9_amd64.deb](https://launchpad.net/ubuntu/+source/glibc/2.31-0ubuntu9.9/+build/23546070/+files/libc6-dbg_2.31-0ubuntu9.9_amd64.deb)。

手动提取出其中的文件：

```bash
./extract debs/libc6-dbg_2.31-0ubuntu9.9_amd64.deb libs
x - debian-binary
x - control.tar.xz
x - data.tar.xz
/glibc

```

之后，就可以看见在 libs 文件夹下新增了一个 `2.31-0ubuntu9.9_amd64` 文件夹，其中便是我们所需要的 glibc。

## patchelf

使用 `--set-interpreter` 和 `--add-needed` 分别设置链接器和依赖即可。

```bash
$ patchelf ./pwn --set-interpreter path/to/ld-linux-x86-64.so.2
$ patchelf ./pwn --add-needed path/to/libc.so.6
$ ldd ./fmt2
    linux-vdso.so.1 (0x00007fff1a1a5000)
    path/to/libc.so.6 (0x00007f6ca08ca000)
    path/to/ld-linux-x86-64.so.2 => /lib64/ld-linux-x86-64.so.2 (0x00007f6ca0ac5000)

```
