---
title: Nginx代理GitHub Pages
date: 2022-12-29T20:32:30+08:00
draft: false
categories: []
tags: [Nginx, GitHub Pages]
---
由于国内访问GitHub Pages速度欠佳，可以选择使用CDN加速国内流量的方式来加速GitHub Pages的访问速度。此外，还可以选择使用一台海外的Nginx主机进行代理。

首先在你的域名服务商那里添加一条国内线路，解析到自己海外的Nginx主机上，然后在Nginx中输入下面的配置（注意Nginx主机的位置不能和要加速的用户的位置一样，否则可能会发生ERR_TOO_MANY_REDIRECTS）。
```nginx
server {
    listen 443 ssl http2;
    server_name www.saurlax.com;

    ssl_certificate     /path/to/ssl.cer;
    ssl_certificate_key /path/to/ssl.key;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass https://www.saurlax.com/;
    }
}
server {
    listen 80;
    server_name www.saurlax.com saurlax.com;
    return 301 https://www.saurlax.com;
}
server {
    listen 443 ssl http2;
    server_name saurlax.com;
    return 301 https://www.saurlax.com;
}
```
上面的配置中，当用户在国内访问`www.saurlax.com`的时候将会解析到我的Nginx主机，因为主机在国外，流量会通过DNS直接解析到GitHub Pages的服务器。为了实现强制https和`saurlax.com`跳转到`www.saurlax.com`，还添加了另外两个配置。监听`saurlax.com`的80和443端口301跳转到`www.saurlax.com`，监听`www.saurlax.com`的80端口跳转到https。