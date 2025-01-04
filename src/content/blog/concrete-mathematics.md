---
title: 具体数学：计算机数学基础
date: 2025-01-03T17:46:21+08:00
tags: []
---

## 递归问题

### 汉诺塔

设 $n$ 个盘子的汉诺塔问题需要 $T_n$ 步。

$$
\begin{aligned}
T_n &= \left\{
\begin{aligned}
1, & \quad n = 1 \\
2T_{n-1} + 1, & \quad n > 1
\end{aligned}
\right. \\
&= 2^n - 1
\end{aligned}
$$

### 平面上的直线

设 $n$ 条直线分割平面的最大区域数为 $L_n$，即第 $n$ 条直线与前 $n-1$ 条直线相交。

$$
\begin{aligned}
L_n &= \left\{
\begin{aligned}
1, & \quad n = 0 \\
L_{n-1} + n, & \quad n > 0
\end{aligned}
\right. \\
&= \frac{n(n+1)}{2} + 1
\end{aligned}
$$

如果换成是 $n$ 个圆分割平面，也是让圆与前面的圆相交即可。

$$
\begin{aligned}
C_n &= \left\{
\begin{aligned}
2, & \quad n = 1 \\
C_{n-1} + 2(n-1), & \quad n > 1
\end{aligned}
\right. \\
&= n(n-1) + 2
\end{aligned}
$$

重点是判断出新增加的交点与新增的区域的关系。

### 约瑟夫问题

设 $n$ 个人围成一圈，从第 1 个人开始，每隔 1 个人删去一个人，问最后剩下的人是第几个。

$$
\begin{aligned}
J(1) &= 1, \\
J(2n) &= 2J(n) - 1, \quad n \geq 1 \\
J(2n+1) &= 2J(n) + 1, \quad n \geq 1
\end{aligned}
$$

可以神秘地得到

$$
J(2^m + l) = 2l + 1, \quad m \geq 0, 0 \leq l < 2^m
$$

其中 $n = 2^m + l$，$l$ 为最后剩下的人的位置。

**成套方法**（清单法、套路）：

对于

$$
\begin{aligned}
f(1) &= \alpha, \\
f(2n) &= 2f(n) + \beta, \quad n \geq 1 \\
f(2n+1) &= 2f(n) + \gamma, \quad n \geq 1
\end{aligned}
$$

可以假设

$$
f(n) = A(n)\alpha + B(n)\beta + C(n)\gamma
$$

显然，易知

$$
A(n) = 2^m \tag{1}
$$

接下来可以通过带入特殊的数来求解。首先带入 $f(n)=1$，可以得到

$$
\alpha=1,\beta=-1,\gamma=-1
$$

即

$$
A(n)-B(n)-C(n)=1 \tag{2}
$$

然后带入 $f(n)=n$，可以得到

$$
\begin{aligned}
\alpha=1,\beta=0,\gamma=1
\end{aligned}
$$

即

$$
A(n)+C(n)=n \tag{3}
$$

之后，设 $l=n-2^m$，联立 $(1)$、$(2)$ 和 $(3)$ 可以得到

$$
\begin{aligned}
A(n) &= 2^m \\
B(n) &= 2^m - 1 - l \\
C(n) &= l
\end{aligned}
$$

即

$$
f(n) = 2^m \alpha + (2^m - 1 - l) \beta + l \gamma
$$

## 和式

### 表示法

### 和与递归

## 整值函数

## 数论

## 二项式系数

## 特殊的数

## 生成函数

## 离散概率

$$
$$
