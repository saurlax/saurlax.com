---
title: 高等数学：函数、极限与连续
date: 2023-11-13T23:32:16+08:00
tags: [大学]
---

微积分是高等数学最重要的一个部分，而极限的概念则是微积分中最重要的基石。通过对函数连续性的研究，我们能够更加严谨地分析函数的变化过程。

## 集合与函数

### 集合及其运算

**集合**是对象的全体，组成集合的对象称为**元素**。

- 用大写字母 $A,B,C,\cdots$ 来表示集合。
- 用小写字母 $a,b,c,\cdots$ 来表示元素。
- 用 $a\in A$ 表示 $a$ 是 $A$ 的元素，用 $a\notin A$ 表示 $a$ 不是 $A$ 的元素。

含有限个元素的集合称为**有限集**，含无穷多个元素的几个称为**无限集**。不含任何元素的集合称为**空集**，记作 $\varnothing$。常见的数集有自然数集 $\mathbb N$，正整数集 $\mathbb N_+$，整数集 $\mathbb Z$，有理数集 $\mathbb Q$，实数集 $\mathbb R$，复数集 $\mathbb C$。组成集合的元素不仅可以是数，也可以是任何研究对象。例如网站里的每一篇文章可以组成一个文集。

集合可以通过**列举法**、**描述法**、**Venn 图法**来表示。在描述集合和函数时，会使用两个**全称量词**：$\forall$（任意）和 $\exists$（存在）。

设 $A,B$ 是两个集合，则有以下关系：

- 若 $\forall x \in A, x \in B$，则 $A \subseteq B$ 或 $B \supseteq A$。
- 若 $A \subseteq B, B \subseteq A$，则 $A=B$。
- 若 $A \subseteq B, A \neq B$，则 $A \subset B$。

此外，集合间还有四种常见的运算关系：

- 由既属于 $A$ 又属于 $B$ 的元素组成的集合称为 $A$ 与 $B$ 的交集，记作 $A \cap B$。
- 由属于 $A$ 或属于 $B$ 的元素组成的集合称为 $A$ 与 $B$ 的并集，记作 $A \cup B$。
- 由属于 $A$ 但不属于 $B$ 的元素组成的集合称为 $A$ 与 $B$ 的差集，记作 $A \setminus B$。
- 由 $A$ 中的任意元素 $x$ 与 $B$ 中的任意元素 $y$ 构成的有序组 $(x,y)$ 构成的集合称为 $A$ 与 $B$ 的 **Descartes 积**，记作 $A \times B$。$n$ 个 $A$ 的 Descartes 积 $A \times A \times \cdots \times A$ 记作 $A^n$。

### 实数集与确界存在定理

实数集具有以下重要性质：

- 封闭性：有理数与有理数的四则运算结果仍为有理数，实数与实数的加、减、乘、除、乘方仍为实数。
- 有序性：任意两个实数 $a,b$，$a<b,a=b,a>b$ 有且只有一个成立。
- 稠密性：任意两个实数之间必存在无穷多个实数。
- 完备性（连续性）：每一个实数都可以与数轴上的一个点一一对应。

实数集中可以通过以下记号取值：

- 闭区间：$[a,b]=\{x|a\leq x \leq b\}$。
- 开区间：$(a,b)=\{x|a<x<b\}$。
- 半开半闭区间：$[a,b)=\{a\leq x<b\},(a,b]=\{a<x\leq b\}$。
- 无穷区间：$(a,+\infty),[a,+\infty),(-\infty,a),(-\infty,a]$。
- **δ 邻域**：$U(a,\delta)=(a-\delta,a+\delta)$
- **去心 δ 邻域**：$\mathring U (a,\delta)=U(a,\delta)\setminus\{a\}$

**定义**：设 $A$ 为非空实数集，若 $\exists M \in \mathbb R$ 使得 $\forall x \in A,x\leq M$，则称 $A$ 有**上界**，$M$ 为 $A$ 的一个上界。**下界**同理。

**定义**：设 $A$ 是非空实数集，若 $A$ 有上界，则称 $A$ 最小上界为 $A$ 的**上确界**，记作 $\sup A$。**下确界**同理，记作 $\inf A$。

显然，上确界也是 $A$ 的上界，下确界也是 $A$ 的下界。

**确界存在定理**：有上（下）界的非空实数集必有上（下）确界。

### 映射与函数

**定义**：设 $X,Y$ 为两个非空集合。如果按照某种对应法则 $f$，对于每个 $x \in X$，都存在唯一的 $y\in Y$ 与之对应，则称 $f$ 为从 $X$ 到 $Y$ 的一个**映射**，记作 $f:X\to Y$，或 $f:x\mapsto y=f(x),x\in X$。

其中，$y$ 称为 $x$ 在 $f$ 下的**像**，$x$ 称为 $y$ 在 $f$ 下的**原像**。$X$ 称为 $f$ 的**定义域**，记作 $D(f)$，$f(X)$ 称为 $f$ 的**值域**。

映射有两个基本要素，定义域和对应法则。如果两个映射 $f,g$ 的定义域相同，且 $\forall x \in D(f),f(x)=g(x)$，则这两个映射相等，记作 $f=g$。

**定义**：设 $X,Y$ 为两个非空实数集，则 $f:X \to Y$ 为定义在 $X$ 上的一个**一元函数**。

一下是一些常见的函数：

- 符号函数：$y=sgn(x)=\begin{cases}1, & x>0, \\ 0, & x=0, \\ -1, & x<0. \end{cases}$
- 取整函数：$y=[x]=n,x\in [n,n+1)$
- Dirichlet 函数：$D(x)=\begin{cases}1, &x\in\mathbb Q ,\\0, &x \in\mathbb R\setminus\mathbb Q.\end{cases}$

### 函数的初等性质与运算

- 单调性：若函数在 $D(f)$ 上**单调递增**（**单调递减**），则称函数为 $D(f)$ 上的**单调函数**。
- 奇偶性：若 $\forall x\in D(f),f(-x)=f(x)$，则称 $f(x)$ 为偶函数。若 $\forall x\in D(f),f(-x)=-f(x)$，则称 $f(x)$ 为奇函数。
- 周期性：若存在正数 $T$，使得 $\forall x\in D(f),x\pm T\in D(f)$ 且 $f(x+T)=f(x)$，则称 $f$ 是以 $T$ 为周期的**周期函数**。
- 有界性：若一个函数的值域有界，则该函数有界。

设两个函数 $f(x),g(x)$ 的定义域的交集为 $D\neq \varnothing$，则有以下四则运算与复合运算：

- $(f\pm g)(x)=f(x)\pm g(x)$
- $(f\cdot g)(x)=f(x)\cdot g(x)$
- $\frac fg(x)=\frac{f(x)}{g(x)},g(x)\neq 0$
- $(f\circ g)(x)=f(g(x)),D(f)\cap g(x)\neq \varnothing$

### 逆映射与反函数

**定义**：设 $X,Y$ 为两个非空集合，$f:X\to Y$ 为一个映射，若 $\forall x_1, x_2 \in X, x_1 \neq x_2, f(x_1)\neq f(x_2)$，则称 $f$ 为**单射**。若 $\forall y\in Y, \exists x\in X,y=f(x)$，则称 $f$ 为**满射**。既是单射又是满射则为一一映射。

**定义**：若函数 $f:X\to Y$ 是一一映射，则称其逆映射 $f^{-1}:Y\to X$ 为 $f$ 的**反函数**。

由此可以得到各种反三角函数：

- 反正弦函数：$x=\arcsin y,y\in[-1,1]$
- 反余弦函数：$x=\arccos y,y\in[-1,1]$
- 反正切函数：$x=\arctan y$
- 反余切函数：$x=arccot\ y$

### 初等函数与重要非初等函数

- 双曲正弦函数：$\sinh x=\frac{e^x-e^{-x}}2$
- 双曲余弦函数（悬链线）：$\cosh x=\frac{e^x+e^{-x}}2$
- 双曲正切函数：$\tanh x=\frac{e^x-e^{-x}}{e^x+e^{-x}}$
- 反双曲正弦函数：$x=arcsinh\ y=\ln (y+\sqrt{y^2+1})$
- 反双曲余弦函数：$x=arccosh\ y=\ln (y+\sqrt{y^2-1}),y\in[1,+\infty)$
- 反双曲正切函数：$x=arctanh\ y=\frac12 \ln\frac{1+y}{1-y},y\in(-1,1)$
- 隐函数
- 摆线：$\begin{cases}x=a(t-\sin t),\\y=a(1-\cos t),\end{cases}a>0$

## 数列极限

**定义**：$\{a_n\}$ 为一数列，$A$ 为一实数，若随着 $n$ 的增大，$a_n$ 无限趋近于 $A$，则称 $\{a_n\}$ 的极限为 $A$，记作 $\lim\limits_{n\to\infty}a_n=A$ 或 $a_n\to A (n\to\infty)$。

如果数列 $\{a_n\}$ 存在极限，则称 $\{a_n\}$ **收敛**，否则称 $\{a_n\}$ **发散**。

**ε-N 定义**：$\{a_n\}$ 为一数列，$A$ 为一实数，若 $\forall \epsilon>0,\exists N\in\mathbb N_+$，当 $n>N$ 时，均有 $|a_n-A|<\varepsilon$，则称 $\{a_n\}$ 的极限为 $A$，记作 $\lim\limits_{n\to\infty}a_n=A$ 或 $a_n\to A (n\to\infty)$。

- $\varepsilon$ 具有确定性和任意性。任意 $\varepsilon>0$，但给定了之后就是一个固定的数。即要多小给多小。
- 显然，$N$ 的取法不唯一，但通常 $N$ 会随着 $\varepsilon$ 的变化而变化，常用 $N_\varepsilon$ 表示这种**依赖关系**（不是函数关系）。

### 数列极限的性质

**定义**：设 $\{a_n\}$ 是一个数列，$0<n_1<n_2<\cdots<n_k<\cdots$ 是一列无穷多的自然数，则称数列 $\{a_{n_k}\}$ 是 $\{a_n\}$的子列。

- 唯一性：若数列 $\{a_n\}$ 收敛，则它的极限是唯一的。
- 在收敛数列中任意添加、删除或改变有限项，不会改变该数列的收敛性和极限的值。
- 数列 $\{a_n\}$ 收敛于 $A$ 当且仅当它的任何子列都收敛于 $A$。
- 有界性：收敛数列 $\{a_n\}$ 必有界（任取一个 $N$，当小于 $n<N$ 时，有限个 $a_n$ 中必能找到上下界；当 $n>N$ 时，因为是收敛数列，所以也能找到上下界）。
- 保号性：设数列 $\{a_n\}$ 收敛于 $A$，数列 $\{b_n\}$ 收敛于 $B$。若 $A>B$，则 $\exists N\in\mathbb N_+$，当 $n>N$ 时，$a_n>b_n$。反之也成立。

**数列极限的四则运算法则**：设 $\lim\limits_{n\to\infty}a_n=A,\lim\limits_{n\to\infty}b_n=B$，则：

- 对任意实数 $c$，有 $\lim\limits_{n\to\infty}(ca_n)=cA$。
- $\lim\limits_{n\to\infty}(a_n\pm b_n)=A\pm B$。
- $\lim\limits_{n\to\infty}a_nb_n=AB$。
- 若 $b_n\neq0,B\neq0$，则 $\lim\limits_{n\to\infty}\frac{a_n}{b_n}=\frac AB$。

**夹逼定理**：设数列 $\{a_n\},\{b_n\},\{c_n\}$ 满足 $\forall n_0\in\mathbb N_+$，当 $n>n_0$ 时，$a_n\leq b_n\leq c_n$，且 $\lim\limits_{n\to\infty}a_n=\lim\limits_{n\to\infty}c_n=A$，则 $\lim\limits_{n\to\infty}b_n=A$。

**单调有界收敛定理**：单调递增（单调递减）且有上（下）界的数列必收敛，极限为数列的上（下）确界。

## 函数极限

### 函数极限的概念

**当 $x\to x_0$ 时的极限**

**定义**：设函数 $f(x)$ 在点 $x_0$ 的某个去心邻域内有定义，若存在实数 $A$，使 $\forall\varepsilon>0,\exists\delta>0$，当 $0<|x-x_0|<\delta$ 时，$|f(x)-A|<\varepsilon$，则称函数 $f(x)$ 在点 $x_0$ 处的极限为 $A$，或当 $x$ 趋于 $x_0$ 时，$f(x)$ 趋于 $A$。记作 $\lim\limits_{x\to x_0}f(x)=A$，或 $f(x)\to A (x\to x_0)$。

还可以用邻域的语言写作：$\lim\limits_{x\to x_0}f(x)=A\iff \forall\varepsilon<0,\exists\delta>0$，当 $x\in \mathring U(x_0,\delta)$ 时，有 $f(x)\in U(A,\varepsilon)$。

**定义**：设函数 $f$ 在点 $x_0$ 的左（右）邻域内有定义，若存在实数 $A$，使 $\forall\varepsilon>0,\exists\delta>0$，当 $0<x_0-x<\delta$（$0<x-x_0<\delta$）时，有 $|f(x)-A|<\varepsilon$，则称 $f(x)$ 在点 $x_0$ 处的**左极限**（**右极限**）为 $A$，或当 $x$ 趋于 $x_0^-$（$x_0^+$）时，$f(x)$ 趋于 $A$。记作 $\lim\limits_{x\to x_0^-}f(x)=A$（$\lim\limits_{x\to x_0^+}f(x)=A$），或 $f(x)\to A (x\to x_0^-)$（$f(x)\to A (x\to x_0^+)$）。左右极限统称为**单侧极限**。

**函数极限存在的充要条件**：$\lim\limits_{x\to x_0}f(x)=A\iff\lim\limits_{x\to x_0^-}f(x)=\lim\limits_{x\to x_0^+}f(x)=A$。

**当 $x\to \infty$ 时的极限**

与 $x\to x_0$ 时同理。其充要条件为 $\lim\limits_{x\to \infty}f(x)=A\iff\lim\limits_{x\to -\infty}f(x)=\lim\limits_{x\to +\infty}f(x)=A$。

### 函数极限的性质

- 唯一性：若函数极限存在，则极限值唯一。
- 局部有界性：若 $\lim\limits_{x\to x_0}f(x)$ 存在，则存在 $\delta>0,M>0$，当 $x\in \mathring U(x_0,\delta)$ 时，有 $|f(x)|<M$。
- 局部保号性：设 $\lim\limits_{x\to x_0}f(x)=A,\lim\limits_{x\to x_0}g(x)=B$。
  - 若 $A>B$，则存在 $\delta>0$，当 $x\in \mathring U(x_0,\delta)$ 时，有 $f(x)>g(x)$。
  - 若存在 $\rho>0$，当 $x\in \mathring U(x_0,\delta)$ 时，有 $f(x)\geq g(x)$，则 $A\geq B$。这里的等号不能去除，一个比较常见的例子是 $f(x)=\frac 1x,g(x)=-\frac 1x(x\to\infty)$。

**四则运算法则**：设 $\lim\limits_{n\to x_0}f(x)=A,\lim\limits_{n\to x_0}g(x)=B$，则：

- 对任意实数 $c$，有 $\lim\limits_{n\to x_0}[cf(x)]=cA$。
- $\lim\limits_{n\to x_0}(f(x)\pm g(x))=A\pm B$。
- $\lim\limits_{n\to x_0}f(x)g(x)=AB$。
- 若 $B\neq0$，则 $\lim\limits_{n\to x_0}\frac{f(x)}{g(x)}=\frac AB$。

**夹逼定理**：设函数 $f(x),g(x),h(x)$ 在点 $x_0$ 的去心邻域内有定义，且在该邻域内满足 $f(x)\leq g(x)\leq h(x),\lim\limits_{x\to x_0}f(x)=\lim\limits_{x\to x_0}h(x)=A$，则 $\lim\limits_{x\to x_0}g(x)=A$。

以上性质对于 $x\to\infty,x\to x_0^-,x\to x_0^+,x\to-\infty,x\to+\infty$ 均适用。

**重要极限**：

- $\lim\limits_{x\to0}\frac{\sin x}x=1$
- $\lim\limits_{x\to\infty}(1+\frac1x)^x=e$（$1^\infty$ 型）

其中，通过第一个重要极限可以得到以下衍生等式：

- $\lim\limits_{x\to0}\frac{\tan x}x=\lim\limits_{x\to0}\frac{\arcsin x}x=\lim\limits_{x\to0}\frac{\arctan x}x=1$
- $\lim\limits_{x\to0}\frac{1-\cos x}{x^2}=\lim\limits_{x\to0}\frac{\tan x-\sin x}{x^3}=\frac 12$

**复合函数的极限**：

- 若 $\lim\limits_{x\to x_0}g(x)=u_0,\lim\limits_{x\to x_0}f(x)=A$，当 $x\neq x_0$ 时 $g(x)\neq u_0$，则 $\lim\limits_{x\to x_0}f(g(x))=A$。
- 若 $\lim\limits_{x\to x_0}g(x)=u_0,\lim\limits_{x\to x_0}f(x)=f(u_0)$，则 $\lim\limits_{x\to x_0}f(g(x))=f(u_0)$。

### 函数极限的存在准则

**归结原则**：$\lim\limits_{x\to x_0}f(x)=A\iff$ 在点 $x_0$ 的去心邻域内，任意一个收敛于 $x_0$ 的点列 $\{x_n\}$ 均有 $\lim\limits_{x\to x_0}f(x_n)=A$。

**Cauchy 收敛原理**：$\lim\limits_{x\to x_0}f(x)$ 存在 $\iff\forall\varepsilon>0,\exists\delta>0$，当 $x\in\mathring U(x_0,\delta)$时，$|f(x_1)-f(x_2)|<\varepsilon$。

## 无穷小量与无穷大量

### 无穷小量

**定义**：若 $\lim\limits_{x\to x_0}f(x)=0$，则称函数 $f(x)$ 为当 $x\to x_0$ 时的**无穷小量**。记作 $f(x)=o(1)(x\to x_0)$。

**定义**：设函数 $f(x)$ 与 $g(x)$ 为当 $x\to x_0$ 时的无穷小量，且在点 $x_0$ 的去心邻域内，$g(x)\neq0$。

- 若 $\lim\limits_{x\to x_0}\frac{f(x)}{g(x)}=0$，则称当 $x\to x_0$ 时，$f(x)$ 是比 $g(x)$ 高阶的无穷小量，$g(x)$ 是比 $f(x)$ 低阶的无穷小量，记作 $f(x)=o(g(x))(x\to x_0)$。
- 若 $\lim\limits_{x\to x_0}\frac{f(x)}{g(x)}=c\neq0$，则称当 $x\to x_0$ 时，$f(x)$ 是与 $g(x)$ 同阶的无穷小量。当 $c=1$ 时，称 $f(x)$ 与 $g(x)$ 为等价无穷小量，记作 $f(x)\sim g(x)(x\to x_0)$。
- 若 $\exists l\in\mathbb N_+$，使 $\lim\limits_{x\to x_0}\frac{f(x)}{(x-x_0)^k}=c\neq0$，则称当 $x\to x_0$ 时，$f(x)$ 是 $k$ 阶的无穷小量。

由此可知：

- $\lim\limits_{x\to x_0}f(x)=A\iff f(x)=A+o(1)(x\to x_0)$
- $o(1)\pm o(1)=o(1)(x\to x_0)$
- $o(1)\cdot o(1)=o(1)(x\to x_0)$
- $o(x^m)+o(x^n)=o(x^m),(m\geq n)$
- $o(x^m)\cdot o(x^n)=o(x^{m+n})$

需要注意的几点：

- $o(x^k)$ 表示比 $x^k$ 高阶的无穷小量，并不代表与 $x^k$ 同阶。任何无穷小量都可以是 $o(1)$。
- $o(1)\neq0$，无穷小量只代表不断趋近 0 的过程，本质是一个极限，并不能直接代表 0。

**等价无穷小替换**：若当 $x\to x_0$ 时，$f(x)$ 与 $f_1(x)$，$g(x)$ 与 $g_1(x)$ 是等价无穷小量，且在点 $x_0$ 的去心邻域内，$f_1(x)\neq0,g_1(x)\neq0,\lim\limits_{x\to x_0}\frac{f_1(x)}{g_1(x)}$ 存在或为无穷，则 $\lim\limits_{x\to x_0}\frac{f(x)}{g(x)}=\lim\limits_{x\to x_0}\frac{f_1(x)}{g_1(x)}$。证明

$$
\because\lim\limits_{x\to x_0}\frac{f(x)}{f_1(x)}=\lim\limits_{x\to x_0}\frac{g_1(x)}{g(x)}=1, \\
\therefore\lim\limits_{x\to x_0}\frac{f(x)}{g(x)}=\lim\limits_{x\to x_0}\frac{f(x)}{f_1(x)}\cdot \frac{f_1(x)}{g_1(x)}\cdot \frac{g_1(x)}{g(x)}=\lim\limits_{x\to x_0}\frac{f_1(x)}{g_1(x)}
$$

由此可知，等价无穷小可以直接在乘除法中进行替换，下面讨论等价无穷小在加减法中的替换规则：

实际上，等价无穷小就是非常粗略的泰勒展开。等价无穷小只取了泰勒展开的首项。在乘除法中，因为始终是最大的项起作用，所以不会出现问题，例如

$$
\begin{aligned}
\lim\limits_{x\to0}\frac{\sin x\tan x}{x^4}
&=\lim\limits_{x\to0}\frac{(x-\frac{x^3}{3!}+o(x^3))(x+\frac{x^3}3+o(x^3))}{x^4} \\
&=\lim\limits_{x\to0}\frac{x^2+k_1x^3+k_2x^4+o(x^4)}{x^4}=\infty
\end{aligned}
$$

而在加减法中，因为加减法可能会刚好把首项消掉，此时就需要比较第二项。而在等价无穷小中只包含首项，精度不足，所以就出现了问题。例如

$$
\begin{aligned}
\lim\limits_{x\to0}\frac{\sin x-\tan x}{x^3}
&=\lim\limits_{x\to0}\frac{(x-\frac{x^3}6+o(x^3))-(x+\frac{x^3}3+o(x^3))}{x^3} \\
&=\lim\limits_{x\to0}\frac{-\frac{x^3}2+o(x^3)}{x^3}=-\frac12
\end{aligned}
$$

可以看到，在这个式子中，第一项 $x$ 刚好消掉了，需要第二项 $x^3$ 出来比较。如果是使用等价无穷小的话，因为第二项被忽略了，就导致结果直接变为 0 了。

**等价无穷小替换法则\***：若当 $x\to x_0$ 时，$f(x)$ 与 $f_1(x)$，$g(x)$ 与 $g_1(x)$ 是等价无穷小量

- 乘除可直接替换，但要注意替换后的 $f_1(x),g_1(x)$ 在 $x_0$ 的去心领域内不可为 0。
- 加减需要判断替换后是否会消去等价无穷小。即对于 $f(x)\pm g(x)$，要保证 $\frac{f_1(x)}{g_1(x)}\ne\mp1$。

以下是两种常见的错误：

- $\lim\limits_{x\to0}\sin(x\sin\frac 1x)=\lim\limits_{x\to0}x\sin \frac 1x=\lim\limits_{x\to0}\frac xx=1$。$x\sin\frac 1x$ 在 $x\to0$ 时可能为 0，例如当 $x=\frac 1\pi$ 时。
- $\lim\limits_{x\to0}\frac{\sin x-\tan x}{x^3}=\lim\limits_{x\to0}\frac{x-x}x=0$。$\sin x$ 与 $\tan x$ 是等价无穷小，相减时不能直接替换。

**常用等价无穷小**：当 $😺\to0$ 时：

- $\sin 😺\sim\tan 😺\sim\arcsin 😺\sim\arctan 😺\sim 😺$
- $1-\cos😺\sim\tan😺-\sin😺\sim\frac 12😺^2$
- $\tan😺-😺\sim😺-\arctan😺\sim\frac 13😺^3$
- $😺-\sin😺\sim\arcsin😺-😺\sim\frac 16😺^3$
- $1-\cos a😺\sim\frac {a^2}2😺^2$
- $\ln(1+😺)\sim e^😺-1\sim 😺$
- $\log_a(1+😺)\sim\frac😺{\ln a}$
- $(1+😺)^a-1\sim a😺$
- $a^😺-1\sim😺\ln a$
- $😺-\ln(1+😺)\sim\frac 12😺^2$
- $\ln(😺+\sqrt{1+😺^2})\sim😺$

以上结论对于 $x$ 趋于其他值也成立。

### 无穷大量

**定义**：

- 设 $\{a_n\}$ 是一个数列。若 $\forall M>0,\exists N\in\mathbb N_+$，当 $n>N$ 时，有 $|a_n|>M$，则称数列 $\{a_n\}$ 为当 $n\to\infty$ 时的无穷大量。记作 $\lim\limits_{n\to\infty}=\infty$ 或 $a_n\to\infty(n\to\infty)$。
- 设 $\{a_n\}$ 是一个数组。若 $\forall M>0,\exists N\in\mathbb N_+$，当 $n>N$ 时，有 $a_n>M$（$a_n<-M$），则称数列 $\{a_n\}$ 为当 $n\to\infty$ 时的正无穷大量（负无穷大量）。记作 $\lim\limits_{n\to\infty}=+\infty$ 或 $a_n\to+\infty(n\to\infty)$（$\lim\limits_{n\to\infty}=-\infty$ 或 $a_n\to-\infty(n\to\infty)$）。
- 设函数 $f(x)$ 在点 $x_0$ 的某个去心邻域内有定义，若 $\forall M>0,\exists\delta>0$，当 $x\in\mathring U(x_0,\delta)$ 时，有 $|f(x)|>M$，则称 $f(x)$ 为当 $x\to x_0$ 时的**无穷大量**，记作 $\lim\limits_{x\to x_0}f(x)=\infty$ 或 $f(x)\to\infty(x\to x_0)$。

**定理**：无穷大量的倒数为无穷小量，非零的无穷小量的倒数为无穷大量。

## 实数理论

### 区间套定理

**定义**：设 $\{[a_n,b_n\}^\infty_{n=1}$ 是一系列的闭区间，若 $\forall n \in\mathbb N_+,[a_{n+1},b_{n+1}]\subseteq[a_n,b_n]$ 且 $\lim\limits_{n\to\infty}(b_n-a_n)=0$，则称 $\{[a_n,b_n\}^\infty_{n=1}$ 为一个**闭区间套**。

**区间套定理**：设 $\{[a_n,b_n\}^\infty_{n=1}$ 为一个闭区间套，则存在唯一的 $\xi$ ，使得 $\bigcap\limits^\infty_{n=1}[a_n,b_n]=\{\xi\}$，即 $\forall n\in\mathbb N_+,\xi\in[a_n,b_n]$。

### 致密性定理（Bolzano-Weierstrass 定理）

**致密性定理**：有界数列必有收敛子列。

### Cauchy 收敛原理

**定义**：若数列 $\{x\}$ 满足 $\forall \varepsilon>0,\exists N\in\mathbb N_+$，当 $n,m>N$ 时，$|x_n-x_m|<\varepsilon$，则 $\{x\}$ 是 Cauchy 列。

**Cauchy 收敛定理**：数列 $\{x\}$ 收敛的充分必要条件是 $\{x\}$ 为 Cauchy 列。

## 函数的连续性

**定义**：设函数 $f(x)$ 在点 $x_0$ 的某个邻域内有定义，当自变量从 $x_0$ 变化到 $x$ 时，对应的函数值从 $f(x_0)$ 变化到 $f(x)$，称 $\Delta x=x-x_0$ 为自变量的增量，$\Delta y=f(x)-f(x_0)$ 为因变量的增量，若 $\lim\limits_{\Delta x\to0}\Delta y=0$，则称函数 $f(x)$ 在点 $x_0$ 处连续。即函数 $f(x)$ 在点 $x_0$ 处连续 $\iff \lim\limits_{x\to x_0}f(x)=f(x_0)$。

**定义**：若 $\lim\limits_{x\to x_0^-}f(x)=f(x_0)$，则称函数 $f(x)$ 在点 $x_0$ 处**左连续**。若 $\lim\limits_{x\to x_0^+}f(x)=f(x_0)$，则称函数 $f(x)$ 在点 $x_0$ 处**右连续**。

**定理**：函数 $f(x)$ 在在点 $x_0$ 处连续的充要条件是函数 $f(x)$ 在在点 $x_0$ 处既左连续又右连续。

**定义**：若函数 $f(x)$ 在区间 $(a,b)$ 内每点处均连续，则称 $f(x)$ 在 $(a,b)$ 内**连续**。若函数 $f(x)$ 在 $(a,b)$ 内连续，且在点 $a$ 处右连续，点 $b$ 处左连续，则称函数在区间 $[a,b]$ 上连续。在区间 $(a,b)$ 内连续的所有函数构成集合 $C(a,b)$。在区间 $[a,b]$ 内连续的所有函数构成集合 $C[a,b]$。

**定义**：若函数 $f(x)$ 在点 $x_0$ 的某去心邻域内有定义，且在点 $x_0$ 处不连续，则称函数 $f(x)$ 在点 $x_0$ 处**间断**。

**定义**：设函数 $f(x)$ 在点 $x_0$ 处间断。若 $\lim\limits_{x\to x_0-}f(x),\lim\limits_{x\to x_0+}f(x)$ 均存在，则称点 $x_0$ 为**第一类间断点**，否则为**第二类间断点**。

- 第一类间断点：
  - **跳跃间断点**：$\lim\limits_{x\to x_0-}f(x)\neq\lim\limits_{x\to x_0+}f(x)$。
  - **可去间断点**：函数 $f(x)$ 在点 $x_0$ 处有定义但 $\lim\limits_{x\to x_0}f(x)\neq f(x_0)$，或函数 $f(x)$ 在点 $x_0$ 处没有定义。
- 第二类间断点：
  - **无穷间断点**：$\lim\limits_{x\to x_0}f(x)=\infty$。
  - **振荡间断点**。

**函数连续性的四则运算法则**：设函数 $f(x),g(x)$ 均在点 $x_0$ 处连续，则：

- 函数 $cf(x),f(x)\pm g(x),f(x)g(x)$ 均在点 $x_0$ 处连续。
- 当 $g(x)\neq0$ 时，$\frac{f(x)}{g(x)}$ 在点 $x_0$ 处连续。

**函数连续性的符合运算**：设函数 $g(x)$ 在点 $x=x_0$ 处连续，函数 $f(u)$ 在点 $u=g(x_0)$ 处连续，则复合函数 $(f\circ g)(x)$ 在点 $x_0$ 处连续。

### 闭区间上连续函数的性质

**零点存在定理**：设函数 $f(x)\in C[a,b],f(a)f(b)<0$，则 $\exists\xi\in(a,b),f(\xi)=0$。

**介值定理**：设函数 $f(x)\in C[a,b],f(a)\neq f(b)$，则对介于 $f(a)$ 与 $f(b)$ 之间的任何一个实数 $c,\exists\xi\in(a,b),f(\xi)=c$。

**不动点定理**：设函数 $f(x)\in C[a,b]$，其值域 $R(f)\subseteq[a,b]$，则 $\exists\xi\in[a,b],f(\xi)=\xi$。

介值定理和不动点定理是零点存在定理的推广，可以分别构造函数 $f(a)f(b)-c$ 和 $f(a)f(b)-x$ 来证明介值定理和不动点定理。实际上我们常通过零点存在定理构造函数的方式来证明各种存在性问题。

**定义**：使用 $\langle a,b\rangle$ 表示 $(a,b),[a,b),(a,b],[a,b]$。

**引理**：设函数 $f(x)\in C\langle a,b\rangle$，则 $f(x)$ 的值域 $R(f)$ 构成一个区间。

**引理**：设函数 $f(x)$ 在 $\langle a,b\rangle$ 上单调，且值域 $R(f)$ 构成一个区间，则 $f(x)\in C\langle a,b\rangle$。

**反函数连续性定理**：设函数 $y=f(x)$ 在 $\langle a,b\rangle$ 上单调、连续。其值域为 $J$，则其反函数 $x=f^{-1}(y)$ 在 $J$ 上连续。

**定理**：每一个初等函数均为其定义区间上的连续函数。

**有界性定理**：设函数 $f(x)\in C[a,b]$，则 $f(x)$ 在 $[a,b]$ 上有界。

**最大值最小值定理**：设函数 $f(x)\in C[a,b]$，则 $\exists\xi,\eta\in[a,b],f(\xi)\leq f(x)\leq f(\eta),x\in[a,b]$。

### 函数的一致连续性

**定义**：设函数 $f(x)$ 在区间 $I$ 上有定义。若 $\forall \varepsilon>0,\exists\delta_\varepsilon>0$，使得 $\forall x,y\in I$，当 $|x-y|<\delta_\varepsilon$ 时，$|f(x)-f(y)|<\varepsilon$，则称 $f(x)$ 在区间 $I$ 上**一致连续**。

一致连续是连续的充分条件。一致连续也被称作为均匀连续，其要求 $f(a)$ 与 $f(b)$ 的距离与 $a,b$ 的位置无关。表面上看是限制住了函数的“增速”，与导数相关，但一致连续与导数有界有一定区别，具体见 [TODO]()。

**一致连续的充要条件**：函数 $f(x)$ 在区间 $I$ 上一致连续当且仅当对任意两个数列 $\{x_n\},\{y_n\}\subseteq I$，当 $\lim\limits_{n\to\infty}(x_n-y_n)=0$ 时，均有 $\lim\limits_{n\to\infty}[f(x_n)-f(y_n)]=0$。

**Cantor 定理**：若函数 $f(x)$ 在 $[a,b]$ 上连续，则 $f(x)$ 在 $[a,b]$ 上一致连续。
