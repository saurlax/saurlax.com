---
title: 高等数学：一元函数微分学
date: 2023-12-04T22:01:53+08:00
tags: [大学]
---

## 导数的概念

### 导数的定义

**定义**：设函数 $y=f(x)$ 在点 $x_0$ 的某个邻域内有定义，当自变量 $x$ 在 $x_0$ 处有增量 $\Delta x$ 时，相应的函数增量为 $\Delta y$，如果差商的极限 $\lim\limits_{\Delta x\to0}\frac{\Delta y}{\Delta x}=\lim\limits_{\Delta x\to0}\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}$ 存在，则称函数 $y=f(x)$ 在点 $x_0$ 处可导。这个极限值称为函数 $y=f(x)$ 在点 $x_0$ 处的**导数**（微商、变化率），记作

$$
f'(x_0)=\lim\limits_{\Delta x\to0}\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}
$$

若记 $x=x_0+\Delta x$，还可表示为

$$
f'(x_0)=\lim\limits_{x\to x_0}\frac{f(x)-f(x_0)}{x-x_0}
$$

此外，导数的记号还有 $y'(x_0),y'|_{x=x_0},\frac{dy}{dx}|_{x=x_0},\frac{df(x)}{dx}|_{x=x_0}$ 等。

若此极限不存在，则称函数 $y=f(x)$ 在点 $x_0$ 处不可导，$x_0$ 为函数 $y=f(x)$ 的不可导点。

**定义**：如果函数 $y=f(x)$ 在开区间 $I=(a,b)$ 内的每点处都可导，则称函数 $f(x)$ 在开区间 $I$ 内可导。

若函数 $y=f(x)$ 在开区间 $I$ 内可导，则对 $I$ 内的每一点 $x$，都有一个导数值 $f'(x)$ 与之对应，称其为 $f(x)$ 的**导函数**，记作 $y'(x),f'(x),\frac{dy}{dx},\frac{df(x)}{dx}$。

### 导数的几何意义

设函数 $y=f(x)$ 在点 $x_0$ 处可导，则导数 $f'(x_0)$ 是曲线 $y=f(x)$ 在点 $M(x_0,y_0)$ 处的切线斜率，即 $f'(x_0)=\tan\alpha$，切线方程为

$$
y-y_0=f'(x_0)
$$

法线方程为

$$
y-y_0=-\frac1{f'(x_0)}(x-x_0)
$$

### 导数存在的充要条件

**定义**：$f'_-(x_0)=\lim\limits_{\Delta x\to0-}\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}$ 为 $f(x)$ 在点 $x_0$ 处的**左导数**。$f'_+(x_0)=\lim\limits_{\Delta x\to0+}\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}$ 为 $f(x)$ 在点 $x_0$ 处的**右导数**。

**导数存在的充要条件**：$f'(x_0)$ 存在 $\iff f'_-(x_0),f'_+(x_0)$ 存在且相等。

**连续性与可导性的关系**：区间上的可导函数一定是连续函数，但连续函数不一定是可导函数。

## 求导法则

### 导数的运算

若 $u(x),v(x)$ 可导，则：

- $[u(x)\pm v(x)]'=u'(x)\pm v'(x)$
- $[u(x)v(x)]'=u'(x)v(x)+u(x)v'(x)$
- $[cu(x)]'=cu'(x)$
- $[\frac{u(x)}{v(x)}]'=\frac{u'(x)v(x)-u(x)v'(x)}{v^2(x)},v(x)\ne0$

设函数 $u=\varphi(x)$ 在点 $x$ 处可导，函数 $y=f(u)$ 在点 $u=\varphi(x)$ 处可导，且复合运算 $f(\varphi(x))$ 有意义，则复合函数 $y=f(\varphi(x))$ 在点 $x$ 处可导，且 $\frac{dy}{dx}=\frac{dy}{du}=\frac{du}{dx},[f(\varphi(x))]'=f'(\varphi(x))\cdot\varphi'(x)$。

即复合函数的导数等于因变量对中间变量的导数乘中间变量对自变量的导数。

**反函数的求导法则**：如果 $x=\varphi(y)$ 在 $I_y$ 上单调增加（单调减小）并可导，且 $\varphi'(y)\ne0$，则 $x=\varphi(y)$ 的反函数 $y=f(x)$ 在 $I_x$ 上单调增加（单调减小）并可导，且 $f'(x)=\frac1{\varphi'(y)}|_{y=f(x)}$。

**幂函数求导法**：幂指函数是指形如 $f(x)=u(x)^{v(x)},u(x)>0$ 的函数，可将 $f(x)$ 改写为 $e^{v(x)\ln u(x)}$ 后利用复合函数求导法进行求解。即

$$
f'(x)=f(x)[v'(x)\ln u(x)+\frac{v(x)}{u(x)}u'(x)]
$$

### 基本初等函数导数公式

- $\frac{dC}{dx}=0$
- $\frac{d}{dx}x^\alpha=\alpha x^{\alpha-1}$
- $\frac{d}{dx}\sin x=\cos x$
- $\frac{d}{dx}\cos x=-\sin x$
- $\frac{d}{dx}\log_ax=\frac{1}{x\ln a},\ (a>0,a\ne1)$
- $\frac{d}{dx}\ln x=\frac{1}{x}$
- $\frac{d}{dx}a^x=a^x\ln a,\ (a>0,a\ne1)$
- $\frac{d}{dx}e^x=e^x$
- $\frac{d}{dx}\tan x=\frac{1}{\cos^2x}=\sec^2x$
- $\frac{d}{dx}\cot x=-\frac{1}{\sin^2x}=-\csc^2x$
- $\frac{d}{dx}\sec x=\sec x\tan x$
- $\frac{d}{dx}\csc x=-\csc x\cot x$
- $\frac{d}{dx}\arcsin x=\frac{1}{\sqrt{1-x^2}}$
- $\frac{d}{dx}\arccos x=-\frac{1}{\sqrt{1-x^2}}$
- $\frac{d}{dx}\arctan x=\frac{1}{1+x^2}$
- $\frac{d}{dx}\text{arccot}x=-\frac{1}{1+x^2}$

## 函数的微分

**定义**：设函数 $y=f(x)$ 在某区间 $I$ 内有定义，$x_0$ 及 $x_0+\Delta x\in I$，如果函数 $y=f(x)$ 的增量 $\Delta y=f(x_0+\Delta x)-f(x_0)$ 可表示为

$$
\Delta y=A\cdot\Delta x+o(\Delta x)
$$

其中 $A$ 是与 $\Delta x$ 无关的常量，则称函数 $y=f(x)$ 在点 $x_0$ 处**可微**，并称 $A\cdot\Delta x$ 为函数 $y=f(x)$ 在点 $x_0$ 处相应与自变量的增量 $\Delta x$ 的微分，记作 $dy$，即

$$
dy=A\cdot\Delta x
$$

**定理**：函数 $y=f(x)$ 在点 $x_0$ 处可微的充要条件是函数 $y=f(x)$ 在点 $x_0$ 处可导，并且 $A=f'(x_0)$，即有

$$
dy=f'(x_0)\Delta x
$$

微分的特点：

- 当 $f'(x_0)$ 不为零时，微分 $dy$ 是函数的增量 $\Delta y$ 的主要部分，因此可以用微分 $dy$ 近似代替增量 $\Delta y$。

- 因为 $y=x$ 的导数恒为 1，此时 $dx=x'\Delta x=\Delta x$，因此可以在任何函数的微分表达式中用 $dx$ 代替 $\Delta x$，即

  $$
  dy=f'(x_0)dx \\
  \Delta y=f'(x_0)dx+o(\Delta x)=dy+o(\Delta x) \\
  \Delta y-dy=o(\Delta x)
  $$

  即 $\Delta y=dy$ 是比自变量的增量 $\Delta x$ 更高阶的无穷小量。

- 当 $f'(x_0)\ne0$ 时，$dy$ 与 $\Delta y$ 是等价无穷小量。后汉书 $y=f(x)$ 在任意点 $x$ 处的微分称为函数的微分，记作 $dy$ 或 $df(x)$，即 $dy=f'(x)dx$。

- 如果把自变量的增量写成 $x-x_0$，那么 $f(x)=f(x_0)+f'(x_0)(x-x_0)+o(x-x_0),(x\to x_0)$。当 $|x-x_0|$ 充分小时，$f(x)\approx f(x_0)+f'(x_0)(x-x_0)$。即函数值 $f(x)$ 可近似地由右边 $x$ 的线性函数替代。此外，因为此式是在点 $(x_0,f(x_0))$ 处曲线 $y=f(x)$ 的切线方程，因此表明曲线 $y=f(x)$ 在该点附近可以用直线来代替。

### 微分的运算法则

**基本初等函数的微分公式**

- $dC=0$
- $d(x^\mu)=\mu x^{\mu-1}dx$
- $d(\sin x)=\cos xdx$
- $d(\cos x)=-\sin xdx$
- $d(\log_ax)=\frac{1}{x\ln a}dx,\ (a>0,a\ne1)$
- $d(\ln x)=\frac{1}{x}dx$
- $d(a^x)=a^x\ln adx,\ (a>0,a\ne1)$
- $d(e^x)=e^xdx$
- $d(\tan x)=\sec^2xdx$
- $d(\cot x)=-\csc^2xdx$
- $d(\sec x)=\sec x\tan xdx$
- $d(\csc x)=-\csc x\cot xdx$
- $d(\arcsin x)=\frac{1}{\sqrt{1-x^2}}dx$
- $d(\arccos x)=-\frac{1}{\sqrt{1-x^2}}dx$
- $d(\arctan x)=\frac{1}{1+x^2}dx$
- $d(\text{arccot}x)=-\frac{1}{1+x^2}dx$

**函数的微分的四则运算法则**

设函数 $u=u(x),v=v(x)$ 均可微，则：

- $d(Cu)=Cdu$
- $d(u\pm v)=du\pm dv$
- $d(uv)=vdu+udv$
- $d(\frac uv)=\frac{vdu-udv}{v^2},(v\ne0)$

**微分的形式不变性**

设 $y=f(u),u=\varphi(x)$ 都是可微函数，并且复合函数 $y=f(\varphi(x))$ 有意义，则复合函数 $y=f(\varphi(x))$ 的微分为

$$
dy=[f(\varphi(x))]'dx=f'(\varphi(x))\varphi'(x)dx
$$

将 $u=\varphi(x),du=\varphi'(x)dx$ 代入，得 $dy=f'(u)du$，当 $u$ 为自变量时，函数 $y=f(u)$ 的微分也为 $dy=f'(u)du$。不论 $u$ 是自变量还是中间变量，函数 $y=f(u)$ 的一阶微分形式是不变的。而导数不具备这样的性质。因此，在描述导数的时候我们需要指明是对哪一个变量的导数，而微分则不需要。

## 高阶导数与高阶微分

### 高阶导数

一般地，如果函数 $y=f(x)$ 的导数 $y'=f'(x)$ 任仍然是 $x$ 的函数，并且对 $x$ 可导，则 $y'=f'(x)$ 的导数称为 $y=f(x)$ 的二阶导数，记作 $(y')'=y''$ 或 $\frac d{dx}(\frac{dy}{dx})=\frac{d^2y}{dx^2}$。类似地，$n-1$ 阶导数的导数称为 $n$ 阶导数，记作 $y^{(n)}$ 或 $\frac{d^ny}{dx^n}$。若函数具有 $n$ 阶导数，则称函数为 $n$ 阶可导。二阶及以上的导数称为**高阶导数**。

**Leibniz 公式**：设函数 $u,v$ 在区间 $I$ 上都有 $n$ 阶导数，那么乘积 $uv$ 的在区间 $I$ 上也有 $n$ 阶导数，为

$$
(uv)^{(n)}=\sum^n_{m=0}C^m_nu^{(n-m)}v^{(m)}=\sum_{i+j=n}\frac{n!}{i!j!}u^{(i)}v^{(j)}
$$

常用函数的 $n$ 阶导数公式：

- $(a^x)^{(n)}=a^x(\ln a)^n,(a>0,a\ne1)$
- $(\sin x)^{(n)}=\sin(x+n\cdot\frac\pi2)$
- $(\cos x)^{(n)}=\cos(x+n\cdot\frac\pi2)$
- $(x^m)^{(n)}=m(m-1)\cdots(m-n+1)x^{m-n},(m\ge n)$
- $[\ln(1+x)]^{(n)}=\frac{(-1)^{n-1}(n-1)!}{(1+x)^n}$
- $(\frac1{x+a})^{(n)}=\frac{(-1)^nn!}{(x+a)^{n+1}}$

### 高阶微分

设 $y=f(x)$ 可微，则 $dy=f'(x)dx$ 仍是 $x$ 的函数，如果 $f'(x)$ 仍可微，则可计算 $dy$ 的微分，记作 $d^2y=d(dy)$。称 $d^2y$ 为 $y=f(x)$ 的二阶微分。类似地，$y$ 的 $n$ 阶微分即为 $d^ny$。二阶及以上的微分称为**高阶微分**。

一般地，如果 $y=f(x)$ 在 $x$ 处有 $n$ 阶导数，那么

$$
d^ny=f^{(n)}(x)dx^n
$$

需要注意的是，复合函数的高阶微分不具有微分的形式不变性。例如 $y=e^u,u=x^3$，复合函数为 $y=e^{x^3}$，$dy=3x^2e^{x^3}dx$，则

$$
d^2y=(3x^2e^{x^3}dx)'dx=(6x+9x^4)e^{x^3}dx^2 \\
e^udu^2=9x^4e^{x^3}dx^2 \\
d^2y\ne e^udu^2
$$

## 微分中值定理

**Rolle 定理**：如果函数 $f(x)$ 在闭区间 $[a,b]$ 上连续，在开区间 $(a,b)$ 上可导，且$f(a)=f(b)$，则在 $(a,b)$ 内至少存在一点 $\xi$，使得 $f'(\xi)=0$。

**Lagrange 中值定理**（有限增量定理、微分中值定理）：如果函数 $f(x)$ 在闭区间 $[a,b]$ 上连续，在开区间 $(a,b)$ 上可导，则在 $(a,b)$ 内至少存在一点 $\xi$ 使得

$$
f'(\xi)=\frac{f(b)-f(a)}{b-a}
$$

可以发现，Rolle 定理是 Lagrange 中值定理的特例。此外，Lagrange 中值定理还可表示为

- $f(b)-f(a)=f'(\xi)(b-a)$
- $f(x+\Delta x)-f(x)=f'(\xi)\Delta x,(x<\xi<x+\Delta x)$
- 记 $\theta=\frac{\xi-x}{\Delta x},0<\theta<1,\xi=x+\theta\Delta x$，则 $f(x+\Delta x)-f(x)=f'(x+\theta\Delta x)\Delta x$

**推论**：如果函数 $f(x)$ 在 $[a,b]$ 上连续，在 $(a,b)$ 上可导，则函数 $f(x)$ 在 $[a,b]$ 上为常数的充要条件是 $f'(x)=0$ 在 $(a,b)$ 上成立。

**推论**：若两函数 $f(x),g(x)$ 在 $(a,b)$ 上满足 $f'(x)=g'(x)$，则在 $(a,b)$ 内，$f(x)=g(x)+C$。

**Cauchy 中值定理**：设函数 $f(x),F(x)$ 在区间 $[a,b]$ 上连续，区间 $(a,b)$ 上可导，且当 $x\in(a,b)$ 时，$F'(x)\ne0$，则存在一点 $\xi\in(a,b)$，使得

$$
\frac{f(b)-f(a)}{F(b)-F(a)}=\frac{f'(\xi)}{g'(\xi)}
$$

可以发现，Lagrange 中值定理是 Cauchy 中值定理的特例。Cauchy 中值定理将两个函数增量比转化为导数的比进行讨论，可以用于讨论不定式的极限。若 $f(x_0)=F(x_0)=0$，那么

$$
\frac{f(x)}{F(x)}=\frac{f(x)-f(x_0)}{F(x)-F(x_0)}=\frac{f'(\xi)}{F'(\xi)}\quad(\min\{x,x_0\}<\xi<\max\{x,x_0\})
$$

## L'Hospital 法则

一般地，如果 $\lim\limits_{x\to x_0}f(x)=\lim\limits_{x\to x_\alpha}f(x)=0$ 或 $\infty$，这时 $\lim\limits_{x\to\alpha}\frac{f(x)}{g(x)}$ 可能存在，也可能不存在。这种极限叫做**未定式**，并分别称为 $\frac00$ 型未定式或 $\frac\infty\infty$ 型未定式。常见的其他未定式还有 $0\cdot\infty$ 型、$\infty-\infty$ 型、$0^0$ 型和 $1^\infty$ 型。

**$\frac00$ 型未定式的洛必达法则**：设函数 $f(x),g(x)$ 都在点 $x_0$ 的某去心邻域内有定义，且满足 $\lim\limits_{x\to x_0}f(x)=\lim\limits_{x\to x_0}g(x)=0$，$f'(x),g'(x)$ 在邻域内都存在且 $g'(x)\ne0$，$\lim\limits_{x\to x_0}\frac{f'(x)}{g'(x)}$ 存在或为无穷大，则

$$
\lim\limits_{x\to x_0}\frac{f(x)}{g(x)}=\lim\limits_{x\to x_0}\frac{f'(x)}{g'(x)}
$$

**$\frac\infty\infty$ 型未定式的洛必达法则**：设函数 $f(x),g(x)$ 都在点 $x_0$ 的某去心邻域内有定义，且满足 $x\to x_0,f(x)\to\infty,g(x)\to\infty$，$f'(x),g'(x)$ 在邻域内都存在且 $g'(x)\ne0$，$\lim\limits_{x\to x_0}\frac{f'(x)}{g'(x)}$ 存在或为无穷大，则

$$
\lim\limits_{x\to x_0}\frac{f(x)}{g(x)}=\lim\limits_{x\to x_0}\frac{f'(x)}{g'(x)}
$$

若结果仍为 $\frac00$ 型或 $\frac\infty\infty$ 型，且同样满足条件，则可以继续使用洛必达法则求解。

**其他类型的未定式**：对于类似 $0\cdot\infty,\infty-\infty,0^0,1^\infty,\infty^0$ 型等的其他未定式，可以变形为 $\frac00$ 型或 $\frac\infty\infty$ 型未定式来求解。

- $0\cdot\infty$ 型：取倒数恒等变形为 $\frac0{\frac1\infty}$ 或 $\frac\infty{\frac10}$。
- $\infty-\infty$ 型：构造分母通分为 $\frac00$ 或 $\frac\infty\infty$。
  例：$\lim\limits_{x\to\frac\pi2}(\sec x-\tan x)=\lim\limits_{x\to\frac\pi2}\frac{1-\sin x}{\cos x}=\lim\limits_{x\to\frac\pi2}\frac{-\cos x}{\sin x}=0$
- $0^0,1^\infty,\infty^0$ 型：$\lim u^v$ 变形为 $e^{\lim v\ln u}$。

## Taylor 公式

**定义**：设函数 $f(x)$ 在点 $x_0$ 处有直到 $n$ 阶的导数，则

$$
P_n(x)=f(x_0)+f'(x_0)(x-x_0)+\frac{f''(x_0)}{2!}(x-x_0)^2+\cdots+\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n
$$

称为 $f(x)$ 在 $x_0$ 处的 $n$ 阶 Taylor 多项式。

**Taylor 定理**：设函数 $f(x)$ 在点 $x_0$ 处有直到 $n$ 阶的导数，则有

$$
f(x)=P_n(x)+o((x-x_0)^n)\quad(x\to x_0)
$$

其中，$R_n(x)=o((x-x_0)^n)$ 称为 Peano 余项。

**Taylor 中值定理**：如果函数 $f(x)$ 在 $(a,b)$ 内具有直到 $n+1$ 阶的导数，$x_0,x\in(a,b)$ 且 $x\ne x_0$，则 $x$ 和 $x_0$ 直接存在一点 $\xi$，使得

$$
\begin{aligned}
f(x) =& P_n(x)=R_n(x) \\
=& f(x)+f'(x_0)(x-x_0)+\frac{f''(x_0)}{2!}(x-x_0)^2+\cdots+ \\
& \frac{f^{(n)}(x_0)}{n!}(x-x_0)^n+\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}
\end{aligned}
$$

其中，$R_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}$ 称为 Lagrange 余项。

当 $n=0$ 时，Taylor 公式变成 Lagrange 中值公式。因此 Taylor 中值定理是 Lagrange 中值定理的推广。对于固定的 $n$，只要 $x$ 适当解决 $x_0$，就可使 $|R_n(x)|$ 小于预先要求的误差值。对于固定的 $x$，只要选取适当大的 $n$，就可使 $|R_n(x)|$ 小于预先要求的误差值。

**Maclaurin 公式**：$x_0=0$ 的 Taylor 公式称为 Maclaurin 公式，即

$$
f(x)=f(0)+f'(0)x+\frac{f''(0)}{2!}x^2+\cdots+\frac{f^{(n)}(0)}{n!}x^n+o(x^n)
$$

下面是一些常见函数的 Maclaurin 公式：

- $\sin x=x-\frac{x^3}{3!}+\frac{x^5}{5!}+\cdots+\frac{(-1)^nx^{2n+1}}{(2n+1)!}+o(x^{2n+1})$
- $\cos x=1-\frac{x^2}{2!}+\frac{x^4}{4!}+\cdots+\frac{(-1)^nx^{2n}}{(2n)!}+o(x^{2n})$
- $e^x=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots+\frac{x^n}{n!}+o(x^n)$
- $\frac1{1-x}=1+x+x^2+\cdots+x^n+o(x^n)\quad x\in(-1,1)$
- $\frac1{1+x}=1-x+x^2+\cdots+(-1)^nx^n+o(x^n)\quad x\in(-1,1)$
- $\ln (1+x)=x-\frac{x^2}2+\frac{x^3}3+\cdots+\frac{(-1)^{n-1}x^n}n+o(x^n)\quad x\in(-1,1]$
- $\arctan x=x-\frac{x^3}3+\frac{x^5}5+\cdots+\frac{(-1)^nx^{2n+1}}{2n+1}+o(x^{2n+1})\quad x\in[-1,1]$
- $(1+x)^a=1+ax+\frac{a(a-1)}{2!}x^2+\cdots+\frac{a(a-1)\cdots(a-n+1)}{n!}x^n+o(x^n)\quad x\in(-1,1)$

## 函数的性态

### 函数的单调性

设函数 $y=f(x)$ 在 $[a,b]$ 上连续，在 $(a,b)$ 内可导。如果在 $(a,b)$ 内 $f'(x)>0$，那么函数 $y=f(x)$ 在 $[a,b]$ 上单调增加。反之则单调减少。

### 函数的极值

**定义**：设函数 $f(x)$ 在 $(a,b)$ 内有定义，点 $x_0\in(a,b)$，如果存在点 $x_0$ 的某去心邻域，使得对于邻域内任意点 $x$，有 $f(x)<f(x_0)$（或 $f(x)>f(x_0)$），那么撑 $f(x_0)$ 是函数的一个**极大值**（或**极小值**），$x_0$ 称为 $f(x)$ 的一个**极大值点**（或**极小值点**）。函数的极大值与极小值统称为函数的**极值**，使函数取得极值的点称为**极值点**。

**定义**：满足 $f'(x_0)=0$ 的点 $x_0$ 称为函数 $f(x)$ 的**驻点**（或稳定点、临界点）。

**必要条件**：若函数 $f(x)$ 在其极值点 $x_0\in(a,b)$ 处可导，则必有 $f'(x_0)=0$。

因此，函数的驻点和不可导点是函数的**可疑极值点**。

**一阶充分条件**：设函数 $f(x)$ 在点 $x_0$ 处连续，且在 $x_0$ 的某去心邻域 $\mathring U(x_0,\delta)$ 内可导，且 $x_0$ 是 $f(x)$ 的可疑极值点，那么若 $x\in(x_0-\delta,x_0)$ 时 $f'(x)>0$，当 $x\in(x_0,x_0+\delta)$ 时 $f'(x)>0$，则 $f(x)$ 在点 $x_0$ 处取得极大值。反之则取得极小值。

**二阶充分条件**：设函数 $f(x)$ 在点 $x_0$ 处二阶可导，且 $f'(x_0)=0$，那么当 $f''(x)>0$ 时，函数 $f(x)$ 在点 $x_0$ 处取得极小值。反之则为极大值。

### 函数的最值

**定义**：函数的最大值 $M$ 与最小值 $m$ 统称为**最值**，取到最值的点称为**最值点**。最值是唯一的，但最值点不一定唯一。

如果 $f(x)$ 在 $(a,b)$ 内有有限个可疑极值点 $x_1,x_2,\cdots,x_n$，则

$$
M=\max\{f(x_1),f(x_2),\cdots,f(x_n),f(a),f(b)\} \\
m=\min\{f(x_1),f(x_2),\cdots,f(x_n),f(a),f(b)\}
$$

如果 $f(x)$ 在 $[a,b]$ 上单调递增，那么 $f(a)$ 是最小值， $f(b)$ 是最大值。反之则 $f(a)$ 是最大值，$f(b)$ 是最小值。

如果 $f(x)$ 在区间 $I$ 上处处可导，且有唯一驻点 $x_0$，$f(x_0)$ 是极大值，那么 $f(x_0)$ 就是最大值，反之则为最小值。

### 函数的凹凸性与拐点

**定义**：设函数 $f(x)$ 在区间 $I$ 上连续，对 $I$ 上的任意两点 $x_1,x_2$ 和任意实数 $\lambda\in(0,1)$，如果总有

$$
f(\lambda x_1+(1-\lambda)x_2)<\lambda f(x_1)+(1-\lambda)f(x_2)
$$

则称曲线 $y=f(x)$ 在 $I$ 上是凹的，反之则是凸的。

**定理**：设 $f(x)$ 在区间 $I$ 上有二阶导数。如果 $f''(x)>0$，则曲线 $y=f(x)$ 在区间 $I$ 上是凹的，反之则为凸的。

**定义**：设函数 $f(x)$ 的曲线在某区间内是连续的凹弧，则称该区间是去心的凹区间，反之则为凸区间。如果区间 $y=f(x)$ 经过点 $(x_0,f(x_0))$ 时凹凸性发生了变化，则称点 $(x_0,f(x_0))$ 是曲线的**拐点**。

因此，当 $f''(x_0)=0$ 或 $f''(x_0)$ 不存在时，且 $f''(x_0)$ 在 $x_0$ 左右两侧的符号相反时，点 $(x_0,f(x_0))$ 则为拐点。

### 函数的渐近线

若曲线 $y=f(x)$ 上的动点 $M$ 沿着曲线无限地原理原点时，点 $M$ 与某一直线 $l$ 的距离趋于 0，则称直线 $l$ 为曲线 $y=f(x)$ 的一条**渐近线**。

如果 $\lim\limits_{x\to\infty}f(x)=c$，则称直线 $y=c$ 是函数 $y=f(x)$ 的图形的**水平渐近线**。

如果 $\lim\limits_{x\to x_0}f(x)=\infty$，则称直线 $x=x_0$ 是函数 $y=f(x)$ 的图形的**铅直渐近线**。

如果 $\lim\limits_{x\to\infty}[f(x)-(kx+b)]=0,(k\ne0)$，则称直线 $y=kx+b$ 是函数 $y=f(x)$ 的图形的**斜渐近线**。

要求函数图形的斜渐近线，可以先求斜率 $\lim\limits_{x\to\infty}\frac{f(x)}x=k$，然后再求截距 $\lim\limits_{x\to\infty}[f(x)-kx]=b$。

### 函数的曲率

**弧微分公式**

$$
ds=\sqrt{1+y'^2}dx
$$

当 $ds$ 非负时，也可写作

$$
ds=\sqrt{(dx)^2+(dy)^2}
$$

当曲线用参数方程 $\left\{\begin{array}{ll}x=\varphi(t),\\y=\psi(t),\end{array}\right.\alpha\le t\le\beta$ 表示时，弧微分公式为

$$
ds=\sqrt{\varphi'^2(t)+\psi'^2(t)}dt
$$

当曲线哦那个极坐标方程 $r=r(\theta),\alpha\le\theta\le\beta$ 表示时，弧微分公式为

$$
ds=\sqrt{r'^2(\theta)+r^2(\theta)}d\theta
$$

设曲线 $C$ 是光滑的，在曲线上选定一点 $M_0$ 作为度量弧 $s$ 的基点。设曲线上的点 $M$ 对应弧 $s$，在点 $M$ 处切线的倾角为 $\alpha$，曲线上的另一点 $M'$ 对应于弧 $s+\Delta s$，在点 $M'$ 处切线的倾角为 $\alpha+\Delta\alpha$，那么弧段 $\overset{\LARGE\frown}{MM'}$ 的长度为 $|\Delta s|$，动点从 $M$ 移动到 $M'$ 时切线转过的角度为 $|\Delta\alpha|$。单位弧段上切线转过的角度的大小叫做弧段的**平均曲率**，记作 $\overline K=|\frac{\Delta\alpha}{\Delta s}|$。当 $\Delta s\to0$ 时，平均曲率的极限叫做曲线 $C$ 在点 $M$ 处的**曲率**，记作 $K=\lim\limits_{\Delta s\to0}|\frac{\Delta\alpha}{\Delta s}|$。若 $\lim\limits_{\Delta s}\frac{\Delta\alpha}{\Delta s}=\frac{d\alpha}{ds}$ 存在，也可表示为 $K=|\frac{d\alpha}{ds}|$。

$$
K=\frac{|y''|}{(1+y'^2)^\frac32}
$$

当 $|y'|\ll1$ 时，可使用近似公式 $K=|y''|$。

当曲线用参数方程 $\left\{\begin{array}{ll}x=\varphi(t),\\y=\psi(t),\end{array}\right.\alpha\le t\le\beta$ 表示时，曲率公式为

$$
K=\frac{|\varphi'(t)\psi''(t)-\varphi''(t)\psi'(t)|}{[\varphi'^2(t)+\psi'^2(t)]^{\frac32}}
$$

当曲线哦那个极坐标方程 $r=r(\theta),\alpha\le\theta\le\beta$ 表示时，弧微分公式为

$$
K=\frac{|r^2+2r'^2-rr''|}{[r^2+r'^2]^{\frac32}}
$$

若曲线 $y=f(x)$ 在点 $M$ 处的曲率为 $K\ne0$，过点 $M$ 做曲线的发现，并在凹的一侧取一点 $D$ 使得 $|DM|=\frac1K=\rho$，以 $D$ 为圆心，$\rho$ 为半径的圆称为曲线在点 $M$ 处的**曲率圆**。曲率圆的圆心叫做**曲率中心**，曲率圆的半径 $\rho=\frac1K$ 称为**曲率半径**。
