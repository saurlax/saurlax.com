---
title: Ubuntu 使用 netplan 配置网络
date: 2024-06-11T16:34:49+08:00
tags: [Linux]
---

安装相关软件包：

```bash
$ sudo apt install network-manager wpasupplicant wireless-tools
```

查看网卡信息：

```bash
$ ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: enp1s0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state DOWN group default qlen 1000
    link/ether e4:3a:6e:7c:97:a2 brd ff:ff:ff:ff:ff:ff
3: enp2s0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state DOWN group default qlen 1000
    link/ether e4:3a:6e:7c:97:a3 brd ff:ff:ff:ff:ff:ff
4: wlo1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 00:21:6a:95:ed:80 brd ff:ff:ff:ff:ff:ff
```

其中 lo 代表本地回环接口，en 代表有线以太网接口，wl 代表无线局域网接口，后面的 p1s0 分别代表网卡对应的第几个总线和插槽。

如果有网卡没有识别到，可能是没有启用网卡：

```bash
sudo ifconfig wlo1 up
```

扫描无线网络：

```bash
$ sudo iwlist wlo1 scan
```

编辑 netplan 配置文件：

```bash
$ cd /etc/netplan/
$ ls
00-installer-config-wifi.yaml  00-installer-config.yaml
```

如果需要配置有线网络，可以修改 `00-installer-config.yaml`，如果需要配置无线网络，可以修改 `00-installer-config-wifi.yaml`。不同系统可能默认的文件不一样，但只要在 `/etc/netplan/` 目录下都会被使用的。

配置有线网络：

```yaml
network:
  ethernets:
    enp1s0:
      # 是否自动获取 IP 地址
      dhcp4: false
      # 可选：IP 地址和子网掩码
      addresses:
        - 10.0.2.15/24
      # 可选：静态路由配置
      routes:
        - to: default
          via: 10.0.2.2
      # 可选：DNS 服务器配置
      nameservers:
        addresses:
          - 114.114.114.114
          - 8.8.8.8
      enp2s0:
        dhcp4: true
  version: 2
```

配置无线网络：

```yaml
network:
  version: 2
  wifis:
    wlo1:
      dhcp4: true
      # 接入点配置
      access-points:
        # WiFi 名称
        "mywifi":
          password: "my_password"
        # 无密码用 {} 表示
        "ourwifi": {}
```

测试并应用 netplan 配置：

```bash
$ netplan try
$ netplan apply
$ ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: enp1s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether e4:3a:6e:7c:97:a2 brd ff:ff:ff:ff:ff:ff
    inet6 fe80::e63a:6eff:fe7c:97a2/64 scope link
       valid_lft forever preferred_lft forever
3: enp2s0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state DOWN group default qlen 1000
    link/ether e4:3a:6e:7c:97:a3 brd ff:ff:ff:ff:ff:ff
5: wlo1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 00:21:6a:95:ed:80 brd ff:ff:ff:ff:ff:ff
    inet 192.168.31.250/24 brd 192.168.31.255 scope global dynamic wlo1
       valid_lft 43180sec preferred_lft 43180sec
    inet6 fe80::221:6aff:fe95:ed80/64 scope link
       valid_lft forever preferred_lft forever
```

其中 inet 和 inet6 即为获取到的 ip 地址。
