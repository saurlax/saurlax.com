---
title: PicoScenes 安装使用
date: 2024-12-11T17:51:33+08:00
tags: []
---

## 设备信息

- OS: Ubuntu 22.04.5 LTS x86_64
- CPU: Intel Celeron J1900 (4) @ 2.415GHz
- Memory: 4GB

## 安装过程

```bash
a302@mini:~$ sudo dpkg -i picoscenes-source-updater.deb
[sudo] password for a302:
Selecting previously unselected package picoscenes-source-updater.
(Reading database ... 78046 files and directories currently installed.)
Preparing to unpack picoscenes-source-updater.deb ...
Unpacking picoscenes-source-updater (1.2) ...
dpkg: dependency problems prevent configuration of picoscenes-source-updater:
 picoscenes-source-updater depends on virt-what; however:
  Package virt-what is not installed.

dpkg: error processing package picoscenes-source-updater (--install):
 dependency problems - leaving unconfigured
Errors were encountered while processing:
 picoscenes-source-updater
```

缺少 `virt-what`，安装即可。

```bash
sudo apt-get update
sudo apt-get install virt-what
sudo dpkg -i picoscenes-source-updater.deb
sudo apt install picoscenes-all
```

如果安装过程中出现

```bash
Failed to set capabilities on file `/usr/bin/gdb' (No such file or directory)
The value of the capability argument is not permitted for a file. Or the file is not a regular (non-symlink) file
```

是因为没有安装 `gdb`，安装即可

```bash
sudo apt-get install gdb
```

这一步最好**提前先运行一遍**，以防 `picoscenes-platform` 未安装完毕导致无法安装。可以使用

```bash
sudo dpkg --remove --force-remove-reinstreq picoscenes-platform picoscenes-plugins-demo-echoprobe-forwarder picoscenes-all
```

清除之前的安装状态。

## 验证采集功能

首次使用 PicoSenses 需要先同意 EULA 协议

```bash
a302@mini:~$ PicoScenes

-------------------------------------------------------------------------------------
      PicoScenes Platform --- Enabling Modern Wi-Fi ISAC Research!

      Manual: https://ps.zpj.io
      Issues: https://gitlab.com/wifisensing/picoscenes-issue-tracker/-/issues
      Changelog: https://zpj.io/PicoScenes/platform-changelog
      EULA: https://ps.zpj.io/eula.html

-------------------------------------------------------------------------------------

[05:51:36.723155] [Platform] [Info ] Loading PicoScenes Platform...

[05:51:36.725267] [Platform] [Error] PicoScenes crashes at the very early stage due to the following error:
------------------------------------

    PicoScenes EULA requires your affiliation information (Not your personal).
    *** Run "PSLP_UIC" and fill your affiliation information. ***
    This process is once for all.

------------------------------------
You may seek technical support by:
1. viewing the Troubleshooting page of PicoScenes Documentation <https://ps.zpj.io/troubleshooting.html>, or
2. issuing a question on the PicoScenes Issue Tracker <https://gitlab.com/wifisensing/picoscenes-issue-tracker/issues>, or
3. run PicoScenes repair script "RepairPicoScenes", or
4. (for PSLP-Pro license user only) contacting PicoScenes Technical Support on WeChat.

```

按照要求运行 `PSLP_UIC` 填写信息即可。

首先查看当前设备上所拥有的网卡

```bash
a302@mini:~$ array_status
----------------------
Device Status of Wi-Fi NIC array "all":
PhyPath DEV PHY [MON] DEV_MacAddr [MON_MacAddr] [CF_Control] [BW] [CF] ProductName
3 wlp3s0 phy0 00:21:6a:39:41:0d Ultimate N WiFi Link 5300
----------------------
```

这里是 iwl5300，需要使用特殊的固件模式

```bash
a302@mini:~$ switch5300Firmware csi
Switching to CSI measurement version...
Reloading iwlwifi module ...
```

最后启动采集命令

```bash
PicoScenes "-d debug -i 3 --mode logger --plot"
```
