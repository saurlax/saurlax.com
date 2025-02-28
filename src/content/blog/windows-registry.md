---
title: Windows 注册表常用配置
date: 2025-02-25T13:45:35+08:00
tags: [Windows]
---

按 `Win + R` 打开运行对话框，输入 `regedit` 并执行，打开注册表编辑器。

## 文件类型映射

以下涉及到 `HKEY_CLASSES_ROOT\<file_extension>` 的内容，如果配置了对应的文件映射，例如 `HKEY_CLASSES_ROOT\.txt` 的默认值是 `txtfile`，则在 `HKEY_CLASSES_ROOT\txtfile` 下配置也是可以的。

## 右键菜单

在注册表中，有三个目录分别控制着在不同位置右键时右键菜单显示的内容：

- `HKEY_CLASSES_ROOT\*\shell`：在任意文件上右键时。
- `HKEY_CLASSES_ROOT\Directory\shell`：在文件夹上右键时。
- `HKEY_CLASSES_ROOT\Directory\Background\shell`：在文件夹背景或桌面上右键时。
- `HKEY_CLASSES_ROOT\<file_extension>\shell`：在特定后缀的文件上右键时。

这些目录下每一个子目录都代表一个右键菜单项，例如要配置使用 VSCode 打开文件夹，可以在 `HKEY_CLASSES_ROOT\Directory\shell` 下新建一个子目录，命名为 `vscode`，在其上可以进行以下配置：

- 默认值：若设置了默认值，则右键菜单显示的文字为该值，否则显示子目录名。这里可以设置为 `Open with VSCode`。
- Icon：右键菜单显示的图标，可以是 exe 文件的路径，也可以是 dll 文件中的图标资源。

然后在 `vscode` 目录下继续创建 `command` 子目录，将其默认值设置为 `path\to\code.exe "%1"`，其中 `%1` 代表右键时选中的文件或文件夹的路径。

如果觉得太麻烦了，可以尝试使用 [ContextMenuManager](https://github.com/BluePointLilac/ContextMenuManager) 这个工具。

## 打开方式

文件的打开方式由以下项控制：

- `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\FileExts\<file_extension>\OpenWithList`：指定文件的打开方式列表。
- `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\FileExts\<file_extension>\UserChoice`：指定文件的默认打开方式。
- `HKEY_CLASSES_ROOT\<file_extension>\shell\open\command`：指定文件的打开命令。该项优先级低于 `UserChoice`，只有没有配置 `UserChoice` 时才会生效。
- `HKEY_CLASSES_ROOT\Applications\<application_name>\shell\open\command`：指定应用程序的打开命令。

> 注意， `UserChoice` 的配置涉及 `Applications` 目录下的配置，且需要计算对应的哈希值，因此不建议直接修改 `UserChoice`。

例如，要配置使用 OpenJDK 运行 jar 文件，可以在 `HKEY_CLASSES_ROOT\Applications\javaw.exe\shell\open\command` 下进行以下配置：

- 默认值：设置为 `"path\to\javaw.exe" -jar "%1" %*`，其中 `%1` 代表双击时选中的文件路径，`%*` 代表传递给程序的其他参数。

之后右键 `.jar` 文件，选择 `打开方式`，此时应该可以看到 `OpenJDK Platform Binary` 选项。选择后可以发现，`...\.jar\OpenWithList` 中会多出一个 `a` 的键值，其值为 `javaw.exe`。

如果选择了始终使用该程序打开，则会在 `UserChoice` 中的 `Progid` 中添加一个 `Applications\javaw.exe` 的值。

> 其实一般情况下，大部分软件都会注册好自己的打开方式。就算没有，也可以在打开方式中选择 `其他应用`，然后找到对应软件的可执行程序。之所以 OpenJDK 需要这样配置，是因为选择 `其他应用` 时，系统自动生成的打开命令是 `path\to\javaw.exe "%1"`，其并没有考虑到 `-jar` 参数。

## Win11 恢复 Win10 右键菜单

```powershell
reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve
```

运行完成后重启资源管理器即可。
