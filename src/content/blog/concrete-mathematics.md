---
title: 计算机数学基础
date: 2025-01-03T17:46:21+08:00
tags: [大学]
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

清单法：

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

设 $n=2^m+l$，显然，易知

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

之后，联立 $(1)$、$(2)$ 和 $(3)$ 可以得到

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

对于其他递归式，也可以通过类似的方法求解。常见的取值有 $f(n)=1,n,n^2$ 等，此外，如果遇到特殊情况，也可以尝试 $2^n$ 等值。

## 和式

### 表示法

### 和与递归

> 死去的高中数列记忆突然猛烈地攻击我！

可以将形如 $a_nT_n=b_nT_{n-1}+c_n$ 的递归式转化为和式。关键在于找到一个**求和因子** $s_n$，使得

$$
\begin{aligned}
S_n &= s_na_nT_n \\
s_nb_n &= s_{n-1}a_{n-1}
\end{aligned}
$$

从而可以通过求解

$$
S_n = S_{n-1}+s_nc_n
$$

来得到原递归式的解

$$
T_n=\frac1{s_na_n}\left(s_1b_1T_0+\sum^n_{k=1}s_kc_k\right)
$$

其中

$$
s_n=\frac{a_{n-1}a_{n-2}\cdots a_1}{b_nb_{n-1}\cdots b_2}
$$

注意除数不能为 0！

### 多重和式

**Chebyshev 单调不等式**：由

$$
\sum_{j=1}^n a_j \sum_{j=1}^n b_j = n\sum_{k=1}^n a_kb_k - \sum_{1\leq j<k\leq n}(a_k-a_k)(b_k-b_j)
$$

可得

$$
\begin{aligned}
\sum_{j=1}^n a_j \sum_{j=1}^n b_j \leq n\sum_{k=1}^n a_kb_k, \quad a_1 \leq \cdots \leq a_n, b_1 \leq \cdots \leq b_n \\
\sum_{j=1}^n a_j \sum_{j=1}^n b_j \geq n\sum_{k=1}^n a_kb_k, \quad a_1 \leq \cdots \leq a_n, b_1 \geq \cdots \geq b_n \\
\end{aligned}
$$

### 一般性的方法

#### 扰动法

将和表达成两种不同形式，并且分别化为待求值的（线性）多项式，最后通过解方程得到待求值。最常见的方式是分离出 $S_n$ 的首项和尾项。

#### 成套方法

对于

$$
\begin{aligned}
R(n) &= \alpha \\
R(n) &= R(n-1)+\beta n+\gamma
\end{aligned}
$$

分别取 $R(n)=1,n,n^2$ ，可得

$$
\begin{aligned}
& \alpha=1,\beta=0,\gamma=0 \\
& \alpha=0,\beta=0,\gamma=1 \\
& \alpha=0,\beta=2,\gamma=-1
\end{aligned}
$$

从而解得

$$
A(n) = 1,B(n)=\frac{n(n+1)}2,C(n) = n
$$

### 积分

## 整值函数

## 二项式系数

特殊值：

$$
\binom r0 = 1, \binom r1 = r
$$

交换等式：

$$
\binom rk = \binom r{r-k}, \quad 0 \leq k \leq r
$$

吸收等式：

$$
\binom rk = \frac rk \binom {r-1}{k-1}, \quad k \neq 0
$$

加法等式：

$$
\binom rk = \binom {r-1}k + \binom {r-1}{k-1}
$$

相伴等式：

$$
(r-k) \binom rk = r \binom {r-1}k
$$

### 母函数

$$
\begin{aligned}
\frac1{(1-z)^{n+1}} &= \sum_{k=0}^\infty \binom {n+k}n z^k, \quad n \geq 0 \\
\frac{z^n}{(1-z)^{n+1}} &= \sum_{k=0}^\infty \binom kn z^k, \quad n \geq 0
\end{aligned}
$$

## 特殊的数

### 斯特林数

#### 第二类斯特林数

第二类斯特林数 $\left\{\begin{matrix} n \\ k \end{matrix}\right\}$ 表示将 $n$ 个元素分成 $k$ 个非空集合的方法数。

$$
\left\{\begin{matrix} n \\ k \end{matrix}\right\} =
k\left\{\begin{matrix} n-1 \\ k \end{matrix}\right\} +
\left\{\begin{matrix} n-1 \\ k-1 \end{matrix}\right\}
$$

其有以下特殊值：

$$
\begin{aligned}
\left\{\begin{matrix} n \\ 0 \end{matrix}\right\} &=
\left\{\begin{aligned}
& 1, \quad n = 0 \\
& 0, \quad n > 0
\end{aligned}\right. \\

\left\{\begin{matrix} n \\ 1 \end{matrix}\right\} &=
\left\{\begin{aligned}
& 0, \quad n = 0 \\
& 1, \quad n > 0
\end{aligned}\right. \\

\left\{\begin{matrix} n \\ 2 \end{matrix}\right\} &= 2^{n-1}-1, \quad n > 0 \\

\left\{\begin{matrix} n \\ n \end{matrix}\right\} &= 1, \quad n \geq 0 \\

\left\{\begin{matrix} n \\ n-1 \end{matrix}\right\} &= \binom n2
\end{aligned}
$$

注意第二类斯特拉数是无序的，即划分 ${A}\cup{B}={B}\cup{A}$。如果需要得到有序的结果，只需要乘以 $k!$ 即可，即

$$
\left\{\begin{matrix} n \\ k \end{matrix}\right\}k!
$$

如果允许空集，那么结果为

$$
\sum_{i=0}^k\left\{\begin{matrix} n \\ i \end{matrix}\right\}
$$

#### 第一类斯特林数

第一类斯特林数 $\left[\begin{matrix} n \\ k \end{matrix}\right]$ 表示将 $n$ 个元素分成 $k$ 个轮换的方法数。例如下面都是同一个轮换：

$$
[A,B,C] = [B,C,A] = [C,A,B]
$$

其有以下递推式

$$
\left[\begin{matrix} n \\ k \end{matrix}\right] =
(n-1)\left[\begin{matrix} n-1 \\ k \end{matrix}\right] +
\left[\begin{matrix} n-1 \\ k-1 \end{matrix}\right]
$$

其有以下特殊值：

$$
\begin{aligned}
\left[\begin{matrix} n \\ 1 \end{matrix}\right] &= (n-1)!, \quad n > 0 \\

\left[\begin{matrix} n \\ n \end{matrix}\right] &= 1, \quad n \geq 0 \\

\left[\begin{matrix} n \\ n-1 \end{matrix}\right] &= \binom n2
\end{aligned}
$$

两类斯特林数之间的关系：

$$
\begin{aligned}
\left[\begin{matrix} n \\ k \end{matrix}\right] &> \left\{\begin{matrix} n \\ k \end{matrix}\right\}, \quad k \geq 0 \\
\end{aligned}
$$

## 离散概率
