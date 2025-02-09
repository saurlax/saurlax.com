---
title: Ubuntu 配置时间、时区和时间同步
date: 2024-09-11T10:34:35+08:00
tags: [Linux]
---

## 查看当前 timedatectl 状态

```bash
$ timedatectl
               Local time: Wed 2024-09-11 10:36:26 CST
           Universal time: Wed 2024-09-11 02:36:26 UTC
                 RTC time: Wed 2024-09-11 02:36:26
                Time zone: Asia/Shanghai (CST, +0800)
System clock synchronized: yes
              NTP service: active
          RTC in local TZ: no
```

## 设置时区

```bash
$ sudo timedatectl set-timezone Asia/Shanghai
```

## 设置时间

```bash
$ sudo timedatectl set-time "2024-09-11 10:36:26"
```

## 启用 NTP 时间同步

```bash
$ sudo timedatectl set-ntp true
```

## 修改 NTP 服务器

```bash
$ sudo vi /etc/systemd/timesyncd.conf
#  This file is part of systemd.
#
#  systemd is free software; you can redistribute it and/or modify it
#  under the terms of the GNU Lesser General Public License as published by
#  the Free Software Foundation; either version 2.1 of the License, or
#  (at your option) any later version.
#
# Entries in this file show the compile time defaults.
# You can change settings by editing this file.
# Defaults can be restored by simply deleting this file.
#
# See timesyncd.conf(5) for details.

[Time]
NTP=time.dlut.edu.cn
#FallbackNTP=ntp.ubuntu.com
#RootDistanceMaxSec=5
#PollIntervalMinSec=32
#PollIntervalMaxSec=2048
```

重启 systemd-timesyncd 服务来使配置生效：

```bash
$ sudo systemctl restart systemd-timesyncd
```
