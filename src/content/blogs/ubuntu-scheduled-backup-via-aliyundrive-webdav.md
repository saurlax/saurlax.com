---
title: Ubuntu 通过阿里云盘 WebDAV 实现定时备份
date: 2024-09-18T20:57:53+08:00
tags: []
---

## 安装 aliyundrive-webdav

[messense/aliyundrive-webdav](https://github.com/messense/aliyundrive-webdav) 是一个通过 WebDAV 协议访问阿里云盘的工具，可以通过 WebDAV 协议将阿里云盘挂载到本地文件系统，从而实现通过文件系统的方式访问阿里云盘。

首先在 [releases](https://github.com/messense/aliyundrive-webdav/releases) 上找到最新的版本，然后下载并安装：

```bash
wget https://github.com/messense/aliyundrive-webdav/releases/download/v2.3.3/aliyundrive-webdav_2.3.3_amd64.deb
sudo dpkg -i aliyundrive-webdav_2.3.3_amd64.deb
```

然后运行

```bash
aliyundrive-webdav qr login
```

扫描二维码登录，登录成功后返回一个 `refresh_token`。之后运行

```bash
sudo vi /etc/aliyundrive-webdav/refresh_token
```

将刚刚得到的 `refresh_token` 写入文件中。最后启动服务：

```bash
sudo systemctl enable aliyundrive-webdav.service
sudo systemctl start aliyundrive-webdav.service
```

aliyundrive-webdav 默认会将 webdav 服务暴露在 `http://0.0.0.0:8080`，并且没有密码认证。如果需要修改端口或者添加密码认证，可以使用下面的命令修改服务参数：

```bash
sudo systemctl edit --full aliyundrive-webdav.service
```

在其中 `ExecStart=/usr/bin/aliyundrive-webdav --auto-index -w /etc/aliyundrive-webdav` 后面添加参数即可。

- `--host <addr>`：监听地址
- `--port <port>`：监听端口
- `-U <username>`：用户名
- `-W <password>`：密码

## 安装 rclone

Rclone 是一个命令行工具，用于同步文件和目录到不同的云存储服务。首先安装 rclone：

```bash
sudo apt install rclone
```

之后配置 rclone：

```bash
rclone config
```

选择新建一个远程。注意这里会将配置文件保存到用户目录下，如果需要全局配置，可以使用 `sudo rclone config`。

```bash
2024/09/19 15:19:16 NOTICE: Config file "/home/username/.config/rclone/rclone.conf" not found - using defaults
No remotes found - make a new one
n) New remote
s) Set configuration password
q) Quit config
n/s/q> n
```

然后输入一个名字，并选择 `webdav` 类型

```bash
name> aliyun
Type of storage to configure.
Enter a string value. Press Enter for the default ("").
Choose a number from below, or type in your own value
 1 / 1Fichier
   \ "fichier"
 2 / Alias for an existing remote
   \ "alias"
...
29 / Webdav
   \ "webdav"
...
Storage> 29
```

然后配置好 WebDAV 的地址。根据 aliyundrive-webdav 的推荐，我们选择 Nextcloud 模式

```bash
** See help for webdav backend at: https://rclone.org/webdav/ **

URL of http host to connect to
Enter a string value. Press Enter for the default ("").
Choose a number from below, or type in your own value
 1 / Connect to example.com
   \ "https://example.com"
url> http://127.0.0.1:8080
Name of the Webdav site/service/software you are using
Enter a string value. Press Enter for the default ("").
Choose a number from below, or type in your own value
 1 / Nextcloud
   \ "nextcloud"
 2 / Owncloud
   \ "owncloud"
 3 / Sharepoint
   \ "sharepoint"
 4 / Other site/service or software
   \ "other"
vendor> 1
```

因为我没有设置任何密码和 token，所以后面均留空或选择 no。

```bash
Enter a string value. Press Enter for the default ("").
user>
Password.
y) Yes type in my own password
g) Generate random password
n) No leave this optional password blank
y/g/n> n
Bearer token instead of user/pass (eg a Macaroon)
Enter a string value. Press Enter for the default ("").
bearer_token>
Edit advanced config? (y/n)
y) Yes
n) No
y/n> n
Remote config
--------------------
[aliyun]
url = http://127.0.0.1:8080
vendor = nextcloud
--------------------
y) Yes this is OK
e) Edit this remote
d) Delete this remote
y/e/d> y
```
