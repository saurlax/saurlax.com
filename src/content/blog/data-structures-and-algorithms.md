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

图是由顶点的有穷非空集合和顶点之间的边的集合组成的。

### 图的存储结构

邻接矩阵表示法：

$$
A=\left[\begin{array}{cccc}
0 & 1 & 0 & 1 \\
1 & 0 & 1 & 1 \\
0 & 1 & 0 & 1 \\
1 & 1 & 1 & 0
\end{array}\right]
$$

邻接表表示法：

### 图的遍历

**深度优先搜索**：类似于树的先序遍历，从图中某个顶点出发，沿着一条路径访问图中的所有顶点，直到路径末端，然后回溯到前一个顶点，继续访问其他顶点。

**广度优先搜索**：类似于树的层次遍历，从图中某个顶点出发，依次访问该顶点的所有邻接顶点，然后再依次访问这些邻接顶点的邻接顶点，直到访问完所有顶点。

### 最小生成树

**Prim 算法**：设生成树中的顶点集合为 $u$，未加入生成树的顶点集合为 $v$，每次从 $u$ 中选取一个顶点 $i$，从 $v$ 中选取一个顶点 $j$，使得 $i$ 到 $j$ 的边权值最小，将 $j$ 加入 $u$，直到 $v$ 为空。

Prim 算法的时间复杂度为 $O(n^2)$。

**Kruskal 算法**：将图中的所有边按照权值从小到大排序，依次选取权值最小的边，若该边的两个顶点不在同一个连通分量中，则将这两个顶点合并。否则选取下一条边。

Kruskal 算法的时间复杂度为 $O(e\log e)$。

### 最短路径

**Dijkstra 算法**（单源最短路径）：设 $D[i]$ 表示从源点到顶点 $v_i$ 的最短路径长度，$P[i]$ 表示从源点到顶点 $v_i$ 的最短路径上的前一个顶点，$V$ 表示图中的所有顶点，$S$ 表示已经找到最短路径的顶点集合，$V-S$ 表示未找到最短路径的顶点集合。每次从 $V-S$ 中选取一个顶点 $v_i$，使得 $D[i]$ 最小，将 $v_i$ 加入 $S$，更新 $V-S$ 中的顶点的最短路径长度。

| 顶点/S   |           | $\{v_2\}$ | $\{v_2,v_1\}$ | $\{v_2,v_1,v_4\}$ | $\{v_2,v_1,v_4,v_3\}$ | $\{v_2,v_1,v_4,v_3,v_5\}$ |
| -------- | --------- | --------- | ------------- | ----------------- | --------------------- | ------------------------- |
| $v_1$    | 12        | <u>12</u> |
| $v_2$    | <u>10</u> |
| $v_3$    | ∞         | 60        | 60            | <u>50</u>         |
| $v_4$    | 30        | 30        | <u>30</u>     |
| $v_5$    | 100       | 100       | 100           | 90                | <u>60</u>             |
| 最短路径 | $v_0v_2$  | $v_0v_1$  | $v_0v_4$      | $v_0v_4v_3$       | $v_0v_4v_3v_5$        |
| 新顶点   | $v_2$     | $v_1$     | $v_4$         | $v_3$             | $v_5$                 |                           |
| 路径长度 | 10        | 12        | 30            | 50                | 60                    |                           |

Dijkstra 算法的时间复杂度为 $O(n^2)$。若使用优先队列实现，则时间复杂度为 $O(n\log n)$。

**Floyd 算法**（多源最短路径）：设 $D[i][j]$ 表示顶点 $v_i$ 到顶点 $v_j$ 的最短路径长度，$P[i][j]$ 表示顶点 $v_i$ 到顶点 $v_j$ 的最短路径上的前一个顶点，$V$ 表示图中的所有顶点。每次从 $V$ 中选取一个顶点 $v_k$，使得 $D[i][j]$ 最小，更新 $D[i][j]$ 和 $P[i][j]$。

Floyd 算法的时间复杂度为 $O(n^3)$。

### 拓扑排序

每次从图中选取一个入度为 0 的顶点，将该顶点加入拓扑序列，并将该顶点的所有邻接顶点的入度减 1。如果最后还剩下顶点，但是没有入度为 0 的顶点，则说明图中存在环。

### 关键路径

AOE 网络：用顶点表示事件，用边表示活动，用边上的权值表示活动持续的时间。

- 活动 $a_i$ 的持续事件 $d(v_j, v_k)$ 表示从事件 $v_j$ 到事件 $v_k$ 的持续时间。
- 事件 $v_i$ 的最早发生时间 $ve(v_i) = \max\{ve(v_j) + d(v_j, v_i)\}$，其中 $v_j$ 是 $v_i$ 的前驱事件。
- 事件 $v_i$ 的最迟发生时间 $vl(v_i) = \min\{vl(v_j) - d(v_i, v_j)\}$，其中 $v_j$ 是 $v_i$ 的后继事件。
- 活动 $a_i$ 的最早开始时间 $e(a_i) = ve(v_i)$，其中 $v_i$ 是活动 $a_{i}$ 的前驱事件。
- 活动 $a_i$ 的最迟开始时间 $l(a_i) = vl(v_j) - d(v_i, v_j)$，其中 $v_j$ 是活动 $a_{i}$ 的后继事件。
- 活动 $a_i$ 的时间余量为 $l(a_i) - e(a_i)$。
- 活动 $a_i$ 是关键活动当 $l(a_i) = e(a_i)$。

## 查找

### 静态查找

**顺序查找法**：从表头开始逐个比较，直到找到目标元素或者遍历完整个表。

- $\mathrm{ASL}=\frac{n+1}{2}$

**折半查找法**（二分查找法）：在有序表中，每次将查找区间缩小一半，直到找到目标元素或者查找区间为空。

- $\mathrm{ASL}=\log_2(n+1)-1$

```cpp
int binary_search(int *arr, int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}
```

**分块查找法**：将表分为若干块，块间有序，块内无序。首先通过二分查找出目标元素所在的块，然后在该块中进行顺序查找。

- $\mathrm{ASL} \approx \log_2(\frac nm + 1) + \frac m2$

### 动态查找

**B 树**:树中每个节点至多有 $m$ 个子节点，根节点至少有 2 个子节点，非根节点至少有 $\lceil m/2 \rceil$ 个子节点。所有叶子节点都在同一层。

2-3 树：每个节点至多有 3 个子节点，根节点至少有 2 个子节点，非根节点至少有 1 个子节点。所有叶子节点都在同一层。

- 2-3 树的插入：每次插入到最底层，若插入后节点的子节点个数超过 3，则将节点分裂为两个节点，中间节点上移。
- 2-3 树的删除：
  - 从包含 2 个记录的叶子节点中删除 1 个记录：直接删除。
  - 从包含 1 个记录的叶子节点中删除 1 个记录：将兄弟节点中的一个记录移动到父节点中，然后用父节点中的记录替换被删除的记录。若兄弟节点不够借（即兄弟节点中的记录数均小于 2），则将兄弟节点与父节点合并。

**B+树**

### 散列查找

## 排序

| 排序算法     | 时间复杂度（最好情况） | 时间复杂度（平均情况） | 时间复杂度（最坏情况） | 空间复杂度  | 稳定性 |
| ------------ | ---------------------- | ---------------------- | ---------------------- | ----------- | ------ |
| 直接插入排序 | $O(n)$                 | $O(n^2)$               | $O(n^2)$               | $O(1)$      | 稳定   |
| 希尔排序     |                        | $O(n^{1.3})$           |                        | $O(1)$      | 不稳定 |
| 直接选择排序 | $O(n^2)$               | $O(n^2)$               | $O(n^2)$               | $O(1)$      | 不稳定 |
| 堆排序       | $O(n\log n)$           | $O(n\log n)$           | $O(n\log n)$           | $O(1)$      | 不稳定 |
| 冒泡排序     | $O(n)$                 | $O(n^2)$               | $O(n^2)$               | $O(1)$      | 稳定   |
| 快速排序     | $O(n\log n)$           | $O(n\log n)$           | $O(n^2)$               | $O(\log n)$ | 不稳定 |
| 归并排序     | $O(n\log n)$           | $O(n\log n)$           | $O(n\log n)$           | $O(n)$      | 稳定   |
| 基数排序     | $O(dn)$                | $O(dn)$                | $O(dn)$                | $O(n)$      | 稳定   |

排序算法的选择：

| \\元素数量<br>稳定排序\\ | 少                           | 多                                 |
| ------------------------ | ---------------------------- | ---------------------------------- |
| 不要求                   | 直接选择排序（元素不为逆序） | 快速排序（元素随机分布）<br>堆排序 |
| 要求                     | 直接插入排序                 | 归并排序（内存空间充足）           |

### 插入排序

**直接插入排序**：每次将一个待排序的记录插入到已经排好序的有序表中。

- 时间复杂度：$O(n^2)$
- 稳定排序

```cpp
void insert_sort(int *arr, int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
```

**折半插入排序**：在直接插入排序的基础上，使用二分查找法找到插入位置。

- 时间复杂度：$O(n^2)$
- 稳定排序

```cpp
void binary_insert_sort(int *arr, int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int low = 0, high = i - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] > key) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        for (int j = i - 1; j >= low; j--) {
            arr[j + 1] = arr[j];
        }
        arr[low] = key;
    }
}
```

**希尔排序**：将待排序的记录按照一定的增量分组，对每组进行直接插入排序，然后逐渐减小增量，直到增量为 1。

### 交换排序

**冒泡排序**：每次比较相邻的两个元素，若逆序则交换。

- 时间复杂度：$O(n^2)$
- 稳定排序

```cpp
void bubble_sort(int *arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
}
```

**快速排序**：每次选取一个基准元素，将小于基准元素的元素放在基准元素的左边，将大于基准元素的元素放在基准元素的右边，然后递归地对左右两部分进行排序。

- 时间复杂度：$O(n\log n)$
- 不稳定排序
- 不适用于基本有序的序列

```cpp
void quick_sort(int *arr, int low, int high) {
    if (low < high) {
        int pivot = partition(arr, low, high);
        quick_sort(arr, low, pivot - 1);
        quick_sort(arr, pivot + 1, high);
    }
}
```

分割策略一：取两个指针 left 和 right，重复执行以下操作，直到 left 和 right 相遇：

- 从右向左找到第一个小于基准元素的元素，将该元素放在 left 的位置。
- 从左向右找到第一个大于基准元素的元素，将该元素放在 right 的位置。

```cpp
int partition(int *arr, int low, int high) {
    int pivot = arr[low];
    while (low < high) {
        while (low < high && arr[high] >= pivot) {
            high--;
        }
        arr[low] = arr[high];
        while (low < high && arr[low] <= pivot) {
            low++;
        }
        arr[high] = arr[low];
    }
    arr[low] = pivot;
    return low;
}
```

分割策略二：取两个指针 left 和 right，重复执行以下操作，直到 left 和 right 相遇：

- 从右向左找到第一个小于基准元素的元素。
- 从左向右找到第一个大于基准元素的元素。
- 交换这两个元素。

```cpp
int partition(int *arr, int low, int high) {
    int pivot = arr[low];
    int left = low, right = high;
    while (left < right) {
        while (left < right && arr[right] >= pivot) {
            right--;
        }
        while (left < right && arr[left] <= pivot) {
            left++;
        }
        std::swap(arr[left], arr[right]);
    }
    std::swap(arr[low], arr[left]);
    return left;
}
```

### 选择排序

**简单选择排序**：每次选取最小的元素放在已排序的序列的末尾。

- 时间复杂度：$O(n^2)$
- 不稳定排序

```cpp
void select_sort(int *arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        int min = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        std::swap(arr[i], arr[min]);
    }
}
```

**堆排序**：将待排序的序列构建成一个大顶堆，然后将堆顶元素与堆尾元素交换，调整堆，直到堆中只剩下一个元素。

- 时间复杂度：$O(n\log n)$
- 不稳定排序

### 归并排序

自顶向下的归并排序：将待排序的序列递归地分成两部分，然后将两部分合并。

- 时间复杂度：$O(n\log n)$
- 稳定排序

```cpp
void merge_sort(int *arr, int low, int high) {
    if (low < high) {
        int mid = low + (high - low) / 2;
        merge_sort(arr, low, mid);
        merge_sort(arr, mid + 1, high);
        merge(arr, low, mid, high);
    }
}
```

自底向上的归并排序：先将序列中的每个元素看作一个长度为 1 的有序序列，然后两两合并，直到合并成一个长度为 $n$ 的有序序列。

- 时间复杂度：$O(n\log n)$
- 稳定排序

```cpp
void merge_sort(int *arr, int n) {
    for (int step = 1; step < n; step *= 2) {
        for (int i = 0; i < n - step; i += 2 * step) {
            int low = i, mid = i + step - 1, high = std::min(i + 2 * step - 1, n - 1);
            merge(arr, low, mid, high);
        }
    }
}
```

### 基数排序

**高位优先（MSDF）法**：从最高位开始，依次对每一位进行计数排序。

**低位优先（LSD）法**：从最低位开始，依次对每一位进行计数排序。
