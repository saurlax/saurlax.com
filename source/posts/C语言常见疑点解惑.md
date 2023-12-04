---
title: C语言常见疑点解惑
date: 2023-11-14T21:05:40+08:00
categories: [C]
tags: [C]
---

## 运算符优先级

<table>
  <tbody>
    <tr>
      <th>优先级</th>
      <th>运算符</th>
      <th>描述</th>
      <th>结合性</th>
    </tr>
    <tr>
      <th rowspan="6">1</th>
      <td><code>++</code> <code>--</code></td>
      <td>后缀自增与自减</td>
      <td rowspan="6">从左到右</td>
    </tr>
    <tr>
      <td><code>()</code></td>
      <td>函数调用</td>
    </tr>
    <tr>
      <td><code>[]</code></td>
      <td>数组下标</td>
    </tr>
    <tr>
      <td><code>.</code></td>
      <td>结构体与联合体成员访问</td>
    </tr>
    <tr>
      <td><code>-&gt;</code></td>
      <td>结构体与联合体成员通过指针访问</td>
    </tr>
    <tr>
      <td><code>(<i>type</i>){<i>list</i>}</code></td>
      <td>复合字面量</td>
    </tr>
    <tr>
      <th rowspan="8">2</th>
      <td><code>++</code> <code>--</code></td>
      <td>前缀自增与自减</td>
      <td rowspan="8">从右到左</td>
    </tr>
    <tr>
      <td><code>+</code> <code>-</code></td>
      <td>一元加与减</td>
    </tr>
    <tr>
      <td><code>!</code> <code>~</code></td>
      <td>逻辑非与逐位非</td>
    </tr>
    <tr>
      <td><code>(<i>type</i>)</code></td>
      <td>转型</td>
    </tr>
    <tr>
      <td><code>*</code></td>
      <td>间接（解引用）</td>
    </tr>
    <tr>
      <td><code>&amp;</code></td>
      <td>取址</td>
    </tr>
    <tr>
      <td><code>sizeof</code></td>
      <td>取大小</td>
    </tr>
    <tr>
      <td><code>_Alignof</code></td>
      <td>对齐要求</td>
    </tr>
    <tr>
      <th>3</th>
      <td><code>*</code> <code>/</code> <code>%</code></td>
      <td>乘法、除法及余数</td>
      <td rowspan="11">从左到右</td>
    </tr>
    <tr>
      <th>4</th>
      <td><code>+</code> <code>-</code></td>
      <td>加法及减法</td>
    </tr>
    <tr>
      <th>5</th>
      <td><code>&lt;&lt;</code> <code>&gt;&gt;</code></td>
      <td>逐位左移及右移</td>
    </tr>
    <tr>
      <th rowspan="2">6</th>
      <td><code>&lt;</code> <code>&lt;=</code></td>
      <td>分别为 &lt; 与 ≤ 的关系运算符</td>
    </tr>
    <tr>
      <td><code>&gt;</code> <code>&gt;=</code></td>
      <td>分别为 &gt; 与 ≥ 的关系运算符</td>
    </tr>
    <tr>
      <th>7</th>
      <td><code>==</code> <code>!=</code></td>
      <td>分别为 = 与 ≠ 关系</td>
    </tr>
    <tr>
      <th>8</th>
      <td><code>&amp;</code></td>
      <td>逐位与</td>
    </tr>
    <tr>
      <th>9</th>
      <td><code>^</code></td>
      <td>逐位异或（排除或）</td>
    </tr>
    <tr>
      <th>10</th>
      <td><code>|</code></td>
      <td>逐位或（包含或）</td>
    </tr>
    <tr>
      <th>11</th>
      <td><code>&amp;&amp;</code></td>
      <td>逻辑与</td>
    </tr>
    <tr>
      <th>12</th>
      <td><code>||</code></td>
      <td>逻辑或</td>
    </tr>
    <tr>
      <th>13</th>
      <td><code>?:</code></td>
      <td>三元条件</td>
      <td rowspan="6">从右到左</td>
    </tr>
    <tr>
      <th rowspan="5">14</th>
      <td><code>=</code></td>
      <td>简单赋值</td>
    </tr>
    <tr>
      <td><code>+=</code> <code>-=</code></td>
      <td>以和及差赋值</td>
    </tr>
    <tr>
      <td><code>*=</code> <code>/=</code> <code>%=</code></td>
      <td>以积、商及余数赋值</td>
    </tr>
    <tr>
      <td><code>&lt;&lt;=</code> <code>&gt;&gt;=</code></td>
      <td>以逐位左移及右移赋值</td>
    </tr>
    <tr>
      <td><code>&amp;=</code> <code>^=</code> <code>|=</code></td>
      <td>以逐位与、异或及或赋值</td>
    </tr>
    <tr>
      <th>15</th>
      <td><code>,</code></td>
      <td>逗号</td>
      <td>从左到右</td>
    </tr>
  </tbody>
</table>

## 数组

如果初始化数组但不赋值，那么数组的内容是随机的。如果使用 `{}` 初始化数组，那么没有显示声明的元素都会默认初始化为 0。

```c
int fa[] = {};
int a[10];

// int a[];
// error: 不允许使用不完整的类型

int b[2] = {};

// int b[2] = {1, 2, 3};
// error: 初始值设定项太多
```

## 二维数组

```c
int c[][5] = {{1, 2}, {1}};

// int c[][2] = {{1, 2, 3}};
// error: 初始值设定项太多

// int c[5][];
// error: 数组不能包含此类型的元素
```

## 指针

数组名实际上是一个带有长度参数的指向数组首元素的静态指针。`指针 + 1` 实际上是 `指针指向的地址 + sizeof(指针类型)`。

```c
  int f[] = {10, 20};
  printf("%x %d %d\n", f, f[0], *f);
  // 52bffb08 10 10
  printf("%x %d %d\n", f + 1, f[1], *(f + 1));
  // 52bffb0c 20 20
  printf("%x %d %d\n", (void *)f + 1, f[1], *(int *)((void *)f + 1));
  // 52bffb09 20 335544320
```

指针传参数组时，只有最外层的数组长度可以不同（实际上是因为最外层的数组退化成了指针，丢失了长度信息）。

```c
void fun(int p[4][2])
{
  for (int i = 0; i < 4; i++)
  {
    for (int j = 0; j < 2; j++)
      printf("%d ", p[i][j]);
    printf("\n");
  }
}

int a[3][2] = {1, 2, 3, 4, 5, 6};
int b[3][1], c[3][3];
fun(a);
// 1 2 
// 3 4
// 5 6
// -1475524368 371
// 超出的内容会直接溢出

// fun(b);
// cannot convert 'int (*)[1]' to 'int (*)[2]'

// fun(c);
// cannot convert 'int (*)[3]' to 'int (*)[2]'
```

