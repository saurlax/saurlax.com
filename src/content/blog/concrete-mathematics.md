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

### 直线分割平面

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

## 和式

## 整值函数

## 数论

## 二项式系数

## 特殊的数

## 生成函数

## 离散概率

$$
$$
