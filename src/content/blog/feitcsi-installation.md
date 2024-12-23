---
title: FeitCSI 安装使用
date: 2024-12-23T16:26:50+08:00
tags: []
---

FeitCSI 是一个支持 AX210 系列网卡的开源 CSI 采集工具，相比 PicoScenes 在设备和许可证上的限制更小。

## 安装过程

FeitCSI 分为 feitcsi-iwlwifi 驱动部分和 feitcsi 主体部分，其提供了 .deb 形式的安装包，其将会自动编译安装内核模块。

首先需要安装必要的编译套件工具：

```bash
sudo apt install linux-headers-generic flex bison
```

然后安装 feitcsi-iwlwifi 驱动模块：

```bash
wget https://github.com/KuskoSoft/FeitCSI/releases/download/v1.1.0/feitcsi-iwlwifi_1.1.0_all.deb
# feitcsi-iwlwifi 安装过程中会覆盖系统自带的 iwlwifi 驱动
sudo dpkg -i --force-overwrite ./feitcsi-iwlwifi_1.1.0_all.deb
```

最后安装 feitcsi 主体部分：

```bash
wget https://github.com/KuskoSoft/FeitCSI/releases/download/v1.1.0/feitcsi_1.1.0_all.deb
sudo apt install ./feitcsi_1.1.0_all.deb
```

## 使用教程

```bash
feitcsi --frequency 5180 --channel-width 160 --format HESU --output-file csi.dat
```

## 参考资料

- https://feitcsi.kuskosoft.com/installation_and_upgrade/
- https://github.com/KuskoSoft/FeitCSI/issues/1
