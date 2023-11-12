---
title: Pwn ret2xxx总结
date: 2023-10-31T17:02:51+08:00
categories: [CTF]
tags: [CTF]
---

## ret2csu

一般的程序都会使用到 libc，而 libc 的初始化函数 `__lib_csu_init` 中存储两个我们可以用于修改寄存器的 gadgets：

```assembly
.text:0000000000401280 ; void _libc_csu_init(void)
.text:0000000000401280                 public __libc_csu_init
.text:0000000000401280 __libc_csu_init proc near               ; DATA XREF: _start+1A↑o
.text:0000000000401280 ; __unwind {
.text:0000000000401280                 endbr64
.text:0000000000401284                 push    r15
.text:0000000000401286                 lea     r15, __frame_dummy_init_array_entry
.text:000000000040128D                 push    r14
.text:000000000040128F                 mov     r14, rdx
.text:0000000000401292                 push    r13
.text:0000000000401294                 mov     r13, rsi
.text:0000000000401297                 push    r12
.text:0000000000401299                 mov     r12d, edi
.text:000000000040129C                 push    rbp
.text:000000000040129D                 lea     rbp, __do_global_dtors_aux_fini_array_entry
.text:00000000004012A4                 push    rbx
.text:00000000004012A5                 sub     rbp, r15
.text:00000000004012A8                 sub     rsp, 8
.text:00000000004012AC                 call    _init_proc
.text:00000000004012B1                 sar     rbp, 3
.text:00000000004012B5                 jz      short loc_4012D6
.text:00000000004012B7                 xor     ebx, ebx
.text:00000000004012B9                 nop     dword ptr [rax+00000000h]
.text:00000000004012C0
.text:00000000004012C0 loc_4012C0:                             ; CODE XREF: __libc_csu_init+54↓j
.text:00000000004012C0                 mov     rdx, r14
.text:00000000004012C3                 mov     rsi, r13
.text:00000000004012C6                 mov     edi, r12d
.text:00000000004012C9                 call    ds:(__frame_dummy_init_array_entry - 403E10h)[r15+rbx*8]
.text:00000000004012CD                 add     rbx, 1
.text:00000000004012D1                 cmp     rbp, rbx
.text:00000000004012D4                 jnz     short loc_4012C0
.text:00000000004012D6
.text:00000000004012D6 loc_4012D6:                             ; CODE XREF: __libc_csu_init+35↑j
.text:00000000004012D6                 add     rsp, 8
.text:00000000004012DA                 pop     rbx
.text:00000000004012DB                 pop     rbp
.text:00000000004012DC                 pop     r12
.text:00000000004012DE                 pop     r13
.text:00000000004012E0                 pop     r14
.text:00000000004012E2                 pop     r15
.text:00000000004012E4                 retn
.text:00000000004012E4 ; } // starts at 401280
.text:00000000004012E4 __libc_csu_init endp
```

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

**gadgets2**

配合 gadgets1，可以实现修改函数调用的前三个参数 rdx(r14)、rsi(r13) 和 edi(r12d) 的值，并执行 r15+rbx*8 处的函数。

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

