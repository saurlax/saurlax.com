---
title: VSCode Markdown Frontmatter Snippets
date: 2024-12-23T17:22:21+08:00
tags: [VSCode]
---

按下 `Ctrl + Shift + P`，输入 `Snippets: Configure Snippets`，选择 `markdown.json`，输入以下内容：

```json
{
  "Frontmatter": {
    "scope": "markdown",
    "prefix": "frontmatter",
    "body": [
      "---",
      "title: $TM_FILENAME_BASE",
      "date: $CURRENT_YEAR-$CURRENT_MONTH-${CURRENT_DATE}T$CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND+08:00",
      "tags: []",
      "---",
      "$0"
    ],
    "description": "Frontmatter"
  }
}
```

然后输入 `Change Language Mode`，选择 `配置 Markdown 语言基础设置…`，在弹出的 `settings.json` 中添加以下内容：

```json
  "[markdown]": {
    "editor.wordWrap": "on",
    "editor.quickSuggestions": {
      "other": "on",
      "comments": "off",
      "strings": "off"
    }
  }
```

现在，每次新建 Markdown 文件时，只需要输入 `frontmatter`，按下 `Tab` 键，就会自动插入 Frontmatter，方便快捷。

如果只想要在工作区内生效的话，将对应的内容填写到 `.vscode/markdown.code-snippets` 和 `.vscode/settings.json` 中即可。
