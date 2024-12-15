---
title: Windows 双击打开 .jar 文件
date: 2023-09-17T11:55:32+08:00
tags: [Java, Windows]
---

高版本的 OpenJDK 似乎不能直接使用 `javaw <jarfile>` 的方式运行 jar 文件，需要指定 `-jar` 参数。而 Windows 默认的打开方式是直接传入文件名的，所以导致无法正常双击运行 jar 文件，需要手动加入 `-jar` 参数。

**步骤**

1. 按下 `Win+R`，打开运行窗口，输入 `regedit` 打开注册表编辑器
2. 在注册表编辑器中打开路径 `HKEY_CLASSES_ROOT\Applications\javaw.exe\shell\open\command`，将值从原本的 `"path\to\javaw.exe" "%1"` 修改为 `"path\to\javaw.exe" -jar "%1" %*` 即可

以我安装的 OpenJDK 20 为例，最终修改的结果即为 `"C:\Program Files\java\jdk-20.0.2\bin\javaw.exe" -jar "%1" %*`，自此可以通过直接双击运行 jar 文件。
