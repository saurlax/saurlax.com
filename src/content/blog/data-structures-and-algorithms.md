---
title: 数据结构与算法
date: 2024-09-16T17:31:32+08:00
tags: []
---

## 绪论

### 数据结构

1. 在链接存储结构中，要求每个结点占用一片连续的存储区域。
2. 数据结构由逻辑结构、存储结构和基本操作构成。
3. 可以用数据元素、数据关系和基本操作定义一个完整的抽象数据类型。
4. 顺序存储结构中的数据元素之间的逻辑关系是由存储位置表示的，链接存储结构中的数据元素之间的逻辑关系是由指针表示的。

### 算法设计与分析

1. 算法指的是对特定问题求解步骤的一种描述，是指令的有限序列。
2. 算法所必须具备的特性：有穷性、确定性、可行性、输入、输出。
3. 算法的时间复杂度属于一种事前分析估算的方法。

## 线性表

### 顺序表

### 链表

### 栈

### 队列

双端队列

### 字符串

字符串的模式匹配

朴素的模式匹配算法（BF 模式匹配算法）：模式 P 与文本 T 从左到右逐个字符比较，若匹配失败，则模式 P 向右移动一位，继续比较。

```cpp
int naive_match(const char *text, const char *pattern) {
    int i = 0, j = 0;
    while (text[i] && pattern[j]) { // 遇到字符串结尾 '\0' 时停止
        if (text[i] == pattern[j]) {
            i++;
            j++;
        } else {
            i = i - j + 1;
            j = 0;
        }
    }
    if (pattern[j] == '\0') {
        return i - j;
    }
    return -1;
}
```

KMP 模式匹配算法：在模式 P 与文本 T 从左到右逐个字符比较的过程中，当遇到不匹配的字符时，根据模式 P 的前缀与后缀的最长公共子串，将模式 P 向右移动一定的位数，以减少比较次数。

```cpp
void get_next(const char *pattern, int *next) {
    int i = 0, j = -1;
    next[0] = -1;
    while (pattern[i]) {
        if (j == -1 || pattern[i] == pattern[j]) {
            i++;
            j++;
            next[i] = j;
        } else {
            j = next[j];
        }
    }
}

int kmp_match(const char *text, const char *pattern) {
    int i = 0, j = 0;
    int next[strlen(pattern)];
    get_next(pattern, next);
    while (text[i] && pattern[j]) {
        if (j == -1 || text[i] == pattern[j]) {
            i++;
            j++;
        } else {
            j = next[j];
        }
    }
    if (pattern[j] == '\0') {
        return i - j;
    }
    return -1;
}
```

## 树

### 二叉树

完全二叉树

满二叉树

二叉树的遍历

### 二叉搜索树

### AVL 树

### 堆

### Huffman 树

### 树与森林

## 图

### 图的遍历

### 最小生成树

### 最短路径

### 拓扑排序

### 关键路径

## 查找

### 静态查找

### 动态查找

B 树

B+树

### 散列查找

## 排序

### 插入排序

### 交换排序

### 选择排序

### 归并排序

### 基数排序
