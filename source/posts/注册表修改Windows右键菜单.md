---
title: 注册表修改Windows右键菜单
date: 2023-11-16T21:31:30+08:00
draft: true
categories: []
tags: []
---

在注册表中，有三个目录分别控制着在不同位置右键时右键菜单显示的内容：

- 在文件上右键时：`HKEY_CLASSES_ROOT\*\shell`
- 在桌面和文件夹内右键时：`HKEY_CLASSES_ROOT\Directory\Background\shell`
- 在文件夹上右键时：`HKEY_CLASSES_ROOT\Directory\shell`

https://blog.csdn.net/yang382197207/article/details/80079052
