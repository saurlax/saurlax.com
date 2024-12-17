---
title: 无穷级数
date: 2024-03-15T20:46:45+08:00
tags: [高等数学]
---

## 常数项级数

**定义**：常数项级数是指形如 $\sum_{n=1}^{\infty} a_n$ 的级数，其中 $a_n$ 是常数。

**柯西收敛原理**：对于常数项级数 $\sum_{n=1}^{\infty} a_n$，它收敛的充分必要条件是对于任意 $\varepsilon>0$，存在 $N\in \mathbb{N}$，使得对于所有 $m>n\geq N$，有 $\left| \sum_{k=n}^{m} a_k \right| < \varepsilon$ 成立。

### 常数项级数的基本性质

常数项级数的基本性质包括：

1. **线性性质**：设 $\sum_{n=1}^{\infty} a_n$ 和 $\sum_{n=1}^{\infty} b_n$ 是两个常数项级数，$\alpha$ 和 $\beta$ 是常数，则 $\sum_{n=1}^{\infty} (\alpha a_n + \beta b_n) = \alpha \sum_{n=1}^{\infty} a_n + \beta \sum_{n=1}^{\infty} b_n$。
2. **级数收敛的必要条件**：若 $\sum_{n=1}^{\infty} a_n$ 收敛，则 $\lim_{n \to \infty} a_n = 0$。
3. **级数收敛的充分条件**：若 $\lim_{n \to \infty} a_n = 0$，且级数 $\sum_{n=1}^{\infty} |a_n|$ 收敛，则 $\sum_{n=1}^{\infty} a_n$ 收敛。

## 正项级数敛散性的判别法

**正项级数收敛基本定理**：对于正项级数 $\sum_{n=1}^{\infty} a_n$，它收敛的充分必要条件是它的部分和数列 $\{S_n\}$ 有界，即存在 $M > 0$，对于所有 $n$，有 $S_n = \sum_{k=1}^{n} a_k \leq M$。

**比较判别法**：设 $\sum_{n=1}^{\infty} a_n$ 和 $\sum_{n=1}^{\infty} b_n$ 是两个正项级数，如果存在正常数 $M$ 和 $N$，使得对于所有 $n \geq N$，有 $a_n \leq M b_n$，则以下结论成立：
- 若 $\sum_{n=1}^{\infty} b_n$ 收敛，则 $\sum_{n=1}^{\infty} a_n$ 收敛；
- 若 $\sum_{n=1}^{\infty} b_n$ 发散，则 $\sum_{n=1}^{\infty} a_n$ 发散。

**比值判别法**：设 $\sum_{n=1}^{\infty} a_n$ 是正项级数，如果存在正常数 $M$，使得对于所有 $n$，有 $\frac{a_{n+1}}{a_n} \leq M$，则以下结论成立：
- 若 $\lim_{n \to \infty} \frac{a_{n+1}}{a_n} < 1$，则 $\sum_{n=1}^{\infty} a_n$ 收敛；
- 若 $\lim_{n \to \infty} \frac{a_{n+1}}{a_n} > 1$ 或 $\lim_{n \to \infty} \frac{a_{n+1}}{a_n}$ 不存在，则 $\sum_{n=1}^{\infty} a_n$ 发散。

**根值判别法**：设 $\sum_{n=1}^{\infty} a_n$ 是正项级数，如果存在正常数 $M$，使得对于所有 $n$，有 $(a_n)^{1/n} \leq M$，则以下结论成立：
- 若 $\lim_{n \to \infty} (a_n)^{1/n} < 1$，则 $\sum_{n=1}^{\infty} a_n$ 收敛；
- 若 $\lim_{n \to \infty} (a_n)^{1/n} > 1$ 或 $\lim_{n \to \infty} (a_n)^{1/n}$ 不存在，则 $\sum_{n=1}^{\infty} a_n$ 发散。

**积分判别法**：设 $f(x)$ 是一个连续、正值函数，且在 $x=n$ 处单调递减，则以下结论成立：
- 若 $\int_{1}^{\infty} f(x) \, dx$ 收敛，则 $\sum_{n=1}^{\infty} f(n)$ 收敛；
- 若 $\int_{1}^{\infty} f(x) \, dx$ 发散，则 $\sum_{n=1}^{\infty} f(n)$ 发散。