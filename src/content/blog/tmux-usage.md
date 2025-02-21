---
title: Tmux 使用
date: 2025-01-17T21:34:35+08:00
tags: [Linux]
---

在 Linux 系统中，`tmux` 和 `screen` 都是常用的终端复用工具，它们允许用户在一个终端会话中运行多个终端会话，并在会话之间切换。虽然 `screen` 是一个经典的工具，但 `tmux` 提供了一些更现代和强大的功能，使其成为许多用户的首选。

Tmux 的优势：

- `tmux` 提供了更灵活的分屏功能，可以轻松地在同一个窗口中创建多个垂直和水平分屏，并且可以自由调整分屏的大小。
- `tmux` 提供了丰富的命令行接口，可以通过脚本自动化许多操作，例如启动多个会话、窗口和分屏。
- `tmux` 的配置文件（通常是 `~/.tmux.conf`）更加直观和易于管理，用户可以轻松地自定义快捷键和其他设置。
- `tmux` 社区提供了许多插件，可以通过插件管理器（如 `tpm`）轻松安装和管理插件，扩展 `tmux` 的功能。
- `tmux` 的状态栏可以高度自定义，用户可以添加各种信息，如时间、系统状态、当前会话和窗口信息等。

### 会话管理

启动 tmux 会话：

```bash
tmux
```

启动带名称的 tmux 会话：

```bash
tmux new -s mysession
```

分离当前会话：

```bash
Ctrl+B d
```

列出所有会话：

```bash
tmux ls
```

连接到指定会话：

```bash
tmux attach -t mysession
```

关闭指定会话：

```bash
tmux kill-session -t mysession
```

### 窗口管理

创建新窗口：

```bash
Ctrl+B c
```

切换到下一个窗口：

```bash
Ctrl+B n
```

切换到上一个窗口：

```bash
Ctrl+B p
```

### 分屏管理

水平分屏：

```bash
Ctrl+B %
```

垂直分屏：

```bash
Ctrl+B "
```

切换到下一个分屏：

```bash
Ctrl+B o
```

关闭当前分屏：

```bash
Ctrl+B x
```
