---
title: Hackergame 2023 Writeup
date: 2023-11-07T12:57:20+08:00
tags: [CTF]
---

## Web

### 更深更暗
> 小 E 正在收看电视新闻。
> 
> 「诶，你知道吗，『泰坦』号潜水艇失事了！」小 E 对旁边的小 C 说。
> 
> 小 C 凑近电视机，看了一眼新闻里的画面。
> 
> 「是我眼花了吗？我刚刚有一瞬间好像在残骸上看到了一个 flag？」小 C 惊讶地说。
> 
> 「玩 CTF 玩的。」小 E 对此不以为然，「一定是你看错了。」
> 
> 小 C 却十分相信自己没有看错。

直接在页面中搜索 flag 即可。

### 赛博井字棋

> 那一年的人机大战，是 AlphaGo 对阵柯洁，最终比分 3-0。当时我看见柯洁颓坐在椅子上泣不成声，这个画面我永生难忘。那一刻我在想，如果我能成为一名棋手，我一定要赢下人工智能。如今 AI 就在眼前，我必须考虑这会不会是我此生仅有的机会。重铸人类围棋荣光，我辈义不容辞！
>
> ……
>
> 但是围棋实在太难了，你决定先从井字棋开始练习。

根据井字棋游戏的规则，如果对方没有失误，那么只能打成平手。

测试发现，每次落子时会发送携带有 `{"x":"...","y":"..."}` 的 POST 请求。可以通过 Edge 的网络控制台手动编辑重放请求来“吃掉”对方下的子。

### 组委会模拟器

> 每年比赛，组委会的一项重要工作就是时刻盯着群，并且撤回其中有 flag 的消息。今年因为人手紧张，组委会的某名同学将这项工作外包给了你，你需要连续审查 1000 条消息，准确无误地撤回其中所有含 flag 的消息，并且不撤回任何不含 flag 的消息。
>
> 本题中，你需要撤回的 "flag" 的格式为 **`hack[...]`**，其中**方括号**内均为小写英文字母，点击消息即可撤回。你需要在 3 秒内撤回消息，否则撤回操作将失败。在全部消息显示完成后等待几秒，如果你撤回的消息完全正确（撤回了全部需要撤回的消息，并且未将不需要撤回的消息撤回），就能获得本题**真正的 flag**。

分析后发现题目会请求 `/getMessages`、`/deleteMessage` 和 `/getflag` 几个 API。可以手动编写脚本完成删除任务。

```js
const url = 'http://202.38.93.111:10021'
const cookie = 'session='
async function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

fetch(url + '/api/getMessages', {
  method: 'POST',
  headers: {
    cookie
  }
})
  .then(res => res.json())
  .then(data => {
    console.log('got messages')
    const tasks = data.messages
      .filter(msg => msg.text.match(/hack\[.+/))
      .map(async (msg, i) => {
        await sleep(msg.delay * 1000)
        fetch(url + '/api/deleteMessage', {
          method: 'POST',
          body: JSON.stringify({ id: i }),
          headers: {
            cookie,
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log(i, msg.text)
            if (data.error) throw new Error(data.error)
          })
      })
    console.log('start deleting')
    return Promise.all(tasks)
  })
  .then(() => sleep(2000))
  .then(() => {
    fetch(url + '/api/getflag', {
      method: 'POST',
      headers: {
        cookie
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
  })

```

发现官方 WP 的方案更加简单，自己想复杂了。直接在控制台定时删除即可。

```js
setInterval(() =>
    Array.from(document.querySelectorAll(".fakeqq-message__bubble"))
        .filter((element) => element.innerHTML.indexOf("hack[") != -1)
        .forEach((element) => element.click())
    , 100)
```

### HTTP 集邮册

> 「HTTP 请求一瞬间就得到了响应，但是，HTTP 响应的 status line、header 和 body 都是确实存在的。如果将一个一个 HTTP 状态码收集起来，也许就能变成……变成……变成……」
>
> 「flag？」
>
> 「就能变成 flag！」

------

本题中，你可以向一个 nginx 服务器（对应的容器为**默认配置下的 `nginx:1.25.2-bookworm`**）发送 HTTP 请求。你需要获取到不同的 HTTP 响应状态码以获取 flag，其中：

- 获取第一个 flag 需要收集 5 种状态码；
- 获取第二个 flag 需要让 nginx 返回首行无状态码的响应（不计入收集的状态码中）；
- 获取第三个 flag 需要收集 12 种状态码。

关于无状态码的判断逻辑如下：

```python
crlf = buf.find(b"\r\n")
if buf.strip() != b"":
    try:
        if crlf == -1:
            raise ValueError("No CRLF found")
        status_line = buf[:crlf]
        http_version, status_code, reason_phrase = status_line.split(b" ", 2)
        status_code = int(status_code)
    except ValueError:
        buf += "（无状态码）".encode()
        status_code = None
```

- 200 OK

  ```http
  GET / HTTP/1.1\r\n
  Host: saurlax.com\r\n\r\n
  ```
- 400 Bad Request

    ```http
    GET /../ HTTP/1.1\r\n
    Host: saurlax.com\r\n\r\n
    ```

- 404 Not Found

    ```http
    GET /404 HTTP/1.1\r\n
    Host: saurlax.com\r\n\r\n
    ```

- 405 Method Not Allowed

    ```http
    POST / HTTP/1.1\r\n
    Host: saurlax.com\r\n\r\n
    ```

- 505 HTTP Version Not Supported

    ```http
    GET / HTTP/3\r\n
    Host: saurlax.com\r\n\r\n
    ```

- 无状态码

    ```http
    GET /\r\n
    Host: saurlax.com\r\n\r\n
    ```

    无状态码是我测试的时候偶然做出来的。官方 WP 对此有解释：

    > 这里实际发送的是 HTTP/0.9 请求，它只支持 `GET`，然后后面直接接 URL，没有别的。然后响应就直接响应文件内容，也没有状态码之类的东西。 

其他的没有再研究了。这里引用一下官方 WP 中各剩下状态码的做法。

- 100 Continue. 代表服务器希望客户端继续请求或者忽略。需要客户端发送 `Expect: 100-continue`。
  
    ```http
    GET / HTTP/1.1\r\n
    Host: example.com\r\n
    Expect: 100-continue\r\n\r\n
    ```
- 206 Partial Content. 一个 HTTP 请求可以只请求部分内容，服务器也会返回部分内容。
    ```http
    GET / HTTP/1.1\r\n
    Host: example.com\r\n
    Range: bytes=1-2\r\n\r\n
    ```
- 416 Range Not Satisfiable. 上面的 `Range` 是一个合法的范围，那么不合法的范围呢？就是 416。
    ```http
    GET / HTTP/1.1\r\n
    Host: example.com\r\n
    Range: bytes=114514-1919810\r\n\r\n
    ```
- 304 Not Modified. 代表文件在指定条件下没有修改过，这里用 `If-Modified-Since`：
    ```http
    GET / HTTP/1.1\r\n
    Host: example.com\r\n
    If-Modified-Since: Tue, 15 Aug 2023 17:03:04 GMT\r\n\r\n
    ```
- 412 Precondition Failed. 这个 payload 使用了 ETag + If-Match，ETag 和对应的 web 资源对应，用来区分对应资源不同的版本。客户端可以利用这个信息来节省带宽。这里 [`If-Match`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Match) 则在尝试匹配这个 ETag，如果不匹配，那就返回 412。
    ```http
    GET / HTTP/1.1\r\n
    Host: example.com\r\n
    If-Match: "bfc13a64729c4290ef5b2c2730249c88ca92d82d"\r\n\r\n
    ```
- 413 Content Too Large. 不需要真正输入很大的 payload，把 `Content-length` 弄得很大就行：
    ```http
    GET / HTTP/1.1\r\n
    Host: example.com\r\n
    Content-length: 1145141919810\r\n\r\n
    ```
- 414 URI Too Long. 大概需要很长的 URI 路径（但是又不能太长，否则 web 界面本体不会允许这样的响应）。内容详见 [414.txt](https://github.com/USTC-Hackergame/hackergame2023-writeups/blob/master/official/HTTP%20%E9%9B%86%E9%82%AE%E5%86%8C/414.txt)。

- 501 Not Implemented. 代表服务器不支持此功能。Nginx 源代码中默认配置下唯一可能触发的地方是 <https://github.com/nginx/nginx/blob/a13ed7f5ed5bebdc0b9217ffafb75ab69f835a84/src/http/ngx_http_request.c#L2008>:

    ```c
    } else {
        ngx_log_error(NGX_LOG_INFO, r->connection->log, 0,
                        "client sent unknown \"Transfer-Encoding\": \"%V\"",
                        &r->headers_in.transfer_encoding->value);
        ngx_http_finalize_request(r, NGX_HTTP_NOT_IMPLEMENTED);
        return NGX_ERROR;
    }
    ```

    `else` 上面只允许 `chunked`，所以可以：

    ```http
    GET / HTTP/1.1\r\n
    Transfer-Encoding: gzip\r\n
    Host: example.com\r\n\r\n
    ```

    `gzip` 换成除了 `chunked` 以外的任意字符串都行。