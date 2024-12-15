---
title: 一元函数积分学
date: 2023-12-14T10:57:19+08:00
tags: [高等数学]
---

## 不定积分

**定义**：如果在某区间 $I$ 上，$F'(x)=f(x)$ 或者 $dF(x)=f(x)dx$，那么称 $F(x)$ 是函数 $f(x)$ 的一个**原函数**。

**定义**：设 $F(x)$ 是函数 $f(x)$ 在某区间 $I$ 上的一个原函数，则函数族 $F(x)+C$ 表示 $f(x)$ 在 $I$ 上的一切原函数，称为 $f(x)$ 的**不定积分**，记作
$$
\int f(x)dx=F(x)+C
$$
其中 $x$ 为积分变量，$f(x)$ 为被积函数，$f(x)dx$ 为被积表达式，$\int$ 为积分符号。

不定积分有以下性质：
$$
[\int f(x)dx]'=f(x)+C \\
d(\int f(x)dx)=f(x)dx+C
$$
**定理**：若函数 $f(x)$ 在区间 $I$ 上连续，则 $f(x)$ 在 $I$ 上存在原函数 $F(x)$。

### 基本积分公式与积分运算法则

- $\int kdx=kx+C$
- $\int x^\alpha dx=\frac1{\alpha+1}x^{\alpha+1}+C,(\alpha\ne-1)$
- $\int\frac{dx}x=\ln|x|+C$
- $\int a^xdx=\frac{a^x}{\ln a}+C,(a>0,a\ne1)$
- $\int e^xdx=e^x+C$
- $\int\cos xdx=\sin x+C$
- $\int \sin xdx=-\cos x+C$
- $\int\sec^2xdx=\int\frac1{\cos^2x}dx=\tan x+C$
- $\int\csc^2xdx=\int\frac1{\sin^2x}dx=-\cot x+C$
- $\int\sec x\tan xdx=\sec x+C$
- $\int\csc x\cot xdx=-\csc x+C$
- $\int\frac{dx}{\sqrt{1-x^2}}=\arcsin x+C$
- $\int\frac{dx}{1+x^2}=\arctan x+C$
- $\int\sinh xdx=\cosh x+C$
- $\int\cosh xdx=\sinh x+C$

**积分的线性运算法则**：若函数 $f(x),g(x)$ 的不定积分都存在，则对不全为 0 的任意常数 $k_1,k_2$，有
$$
\int[k_1f(x)=k_2g(x)]dx=k_1\int f(x)dx+k_2\int g(x)dx
$$

### 不定积分的计算

**第一类换元法**（凑微分法）：设 $\int f(x)dx=F(x)+C,u=\varphi(x)$ 是可微函数，则有换元公式
$$
\int f(\varphi(x))\varphi'(x)dx=\int f(u)du=F(u)+C=F(\varphi(x))+C
$$
以下是常见的凑微分法：

- $\int\frac{f(\sqrt x)}{2\sqrt x}dx=\int f(\sqrt x)d(\sqrt x)$
- $\int\frac1{x^2}f(\frac1x)dx=-\int f(\frac1x)d(\frac1x)$​
- $\int f(ax^n+b)x^{n-1}dx=\frac1{na}\int f(ax^n+b)d(ax^n+b)$
- $\int(1-\frac1{x^2})f(x+\frac1x)dx=\int f(x+\frac1x)d(x+\frac1x)$
- $\int(1+\frac1{x^2})f(x-\frac1x)dx=\int f(x-\frac1x)d(x-\frac1x)$​
- $\int e^xf(e^x)dx=\int f(e^x)d(e^x)$
- $\int\frac{f(\ln x)}xdx=\int f(\ln x)d(\ln x)$
- $\int(1+\ln x)f(x\ln x)dx=\int f(x\ln x)d(x\ln x)$
- $\int f(\sin x)\cos xdx=\int f(\sin x)d(\sin x)$
- $\int f(\cos x)\sin xdx=\int f(\cos x)d(\cos x)$
- $\int f(\tan x)\sec^2xdx=\int f(\tan x)d(\tan x)$
- $\int f(\cot x)\csc^2xdx=\int f(\cot x)d(\cot x)$
- $\int f(\sec x)\sec x\tan xdx=\int f(\sec x)d(\sec x)$
- $\int f(\csc x)\csc x\cot xdx=\int f(\csc x)d(\csc x)$
- $\int\frac{f(\arcsin x)}{\sqrt{1-x^2}}dx=\int f(\arcsin x)d(\arcsin x)$
- $\int\frac{f(\arccos x)}{\sqrt{1-x^2}}=-\int f(\arccos x)d(\arccos x)$
- $\int\frac{f(\arctan x)}{1+x^2}=\int f(\arctan x)d(\arctan x)$
- $\int\frac{f(arccot x)}{1+x^2}=-\int f(arccot x)d(arccot x)$

**有理函数的不定积分法**

设有理函数 $R(x)=\frac{P(x)}{Q(x)}$，其中 $P(x),Q(x)$ 分别是 $n,m$ 次多项式。若 $n<m$，则称 $R(x)$ 为真分式。若 $n\ge m$，则 $R(x)$ 可分解为多项式与真分式的和。其中，真分式能分解为以下四种最简分式的和：
$$
\frac A{x-a},\frac A{(x-a)^k},\frac{bx+D}{x^2+px+q},\frac{Bx+D}{(x^2+px+q)^k}\quad k=2,3,\cdots,p^2-4q<0
$$
其中 $A,B,D$ 的值可以利用待定系数法求解。例如
$$
\begin{aligned}
\frac{2x^2-x-1}{(x+1)(x^3+1)} =& \frac{2x^2-x-1}{(x+1)^2(x^2-x+1)} \\
 =& \frac A{x+1}+\frac B{(x+1)^2}+\frac{Cx+D}{x^2-x+1}
\end{aligned}
$$
之后由
$$
\begin{aligned}
& A(x+1)^2+A(x^2-x+1)+B(x+1)+ \\
& B(x^2-x+1)+(Cx+D)(x+1)+(Cx+D)(x+1)^2 \\
=& (A+C)x^3+(B+2C+D)x^2+(C+2D-B)x+(A+B+D)
\end{aligned}
$$
可解出每个字母所对应的值。

对于前两种最简分式，可直接得到
$$
\begin{aligned}
\int \frac{A}{x-a}dx =& A\ln|x-a|+C \\
\int \frac{A}{(x-a)^k}dx =& -\frac{A}{(k-1)(x-a)^{k-1}}+C \\
\end{aligned}
$$
对于后两种最简分式，可以使用凑微分法，如
$$
\begin{aligned}
\int\frac{x-\frac23}{x^2-x+1}dx
=& \frac12\int\frac{(2x-1)-\frac13}{x^2-x+1}dx \\
=& \frac12\int\frac{(x^2-x+1)'}{x^2-x+1}dx-\frac16\int\frac1{x^2-x+1}dx \\
=& \frac12\int\frac{d(x^2-x+1)}{x^2-x+1}-\frac16\int\frac1{(x-\frac12)^2+(\frac{\sqrt3}2)^2}dx \\
=& \frac12\ln(x^2-x+1)-\frac1{3\sqrt3}\arctan\frac{2x-1}{\sqrt3}+C
\end{aligned}
$$
最后出现的不定积分可以使用分部积分法计算。这里直接给出后两种的不定积分的公式
$$
\begin{aligned}
\int\frac{bx+D}{x^2+px+q} =&\frac B2\ln(x^2+px+q)+\frac1a(D-\frac{pB}2)\arctan\frac ta+C \\
\int \frac{Bx+D}{(x^2+px+q)^k} =& \frac B{2(1-k)(x^2+px+q)^{k-1}}+(D-\frac{pB}2)\int\frac{dt}{(t^2+a^2)^k}
\end{aligned}
$$
其中，$t=x+\frac p2,a=\sqrt{q-\frac{p^2}4}$。

**三角函数有理式的不定积分法**

一般来说，当 $R(\sin x,-\cos x)=-R(\sin x,\cos x)$ 时，可令 $u=\sin x$。当 $R(-\sin x,\cos x)=-R(\sin x,\cos x)$ 时，可令 $u=\cos x$。当 $R(-\sin x,-\cos x)=-R(\sin x,\cos x)$ 时，可令 $u=\tan x$。

**第二类换元法**：设 $f(x)$ 是连续函数，$x=\varphi(t)$ 有连续导数，$\varphi'(t)\ne0$，则
$$
\int f(x)dx=\int f(\varphi(t))\varphi'(t)dt=\int g(t)dt \bigg|_{t=\varphi^{-1}(x)}
$$
**三角代换**：若被积函数中含有 $\sqrt{a^2-x^2},\sqrt{a^2+x^2},\sqrt{x^2-a^2}$，常使用 $x=a\sin t,x=a\tan t,x=a\sec t$ 来去除根号。

**分部积分法**：设 $u=u(x),v=v(x)$ 都有连续导数，则
$$
\int uv'dx=uv-\int vu'dx
$$

## 定积分

**定义**：设函数 $f(x)$ 在闭区间 $[a,b]$ 上有定义，任取 $[a,b]$ 的一个分割 $\Delta$：
$$
a=x_0<x_1<\cdots<x_{n-1}<x_n=b
$$
TODO

## 点火公式
