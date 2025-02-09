---
title: 高中数学：三角函数
date: 2022-12-29T20:04:11+08:00
tags: [高中]
---

### 任意角与弧度制

#### 角的有关概念

##### 角的分类

- 正角：一条射线绕其端点按**逆时针**方向旋转形成的角。
- 负角：一条射线绕其端点按**顺时针**方向旋转形成的角。
- 零角：一条射线没有进行任何旋转形成的角。

##### 角的相等

如果两个角的旋转方向相同且旋转量相等，那么这两个角相等。

##### 角的加减法

###### 角的加法

$\gamma=\alpha+\beta$。

###### 相反角的概念

角 $\alpha$ 的相反角是 $-\alpha$。

###### 角的减法

减去一个角等于加上这个角的相反角，即 $\alpha-\beta=\alpha+(-\beta)$。

#### 终边相同的角

所有与角 $\alpha$ 终边相同的角，包括角 $\alpha$ 自己，可构成一个集合 $S=\{\beta|\beta=\alpha+k\cdot360°,k\in \mathbb{Z}\}$。

任何一个与角 $\alpha$ 终边相同的角，都可表示成角 $\alpha$ 与 $360°k(k\in \mathbb{Z})$ 的和，即角 $\alpha$ 转过了 $k$ 圈后重合。

#### 象限角与轴线角

在平面直角坐标系中，如果角的顶点与原点重合，角的始边与 $x$ 轴的非负半轴重合，那么角的终边在第几象限就是第几象限角。如果角的终边在坐标轴上，那么这个角不属于任何一个象限角，而是轴线角。

#### 角度制、弧度制的概念

##### 角度制

角可以用度为单位进行度量，1 度角等于周角的 $\frac{1}{360}$，这种用度为单位度量角的单位制叫角度制。

##### 弧度制

弧度制是以弧度为单位度量角的单位制，符号 rad，读作弧度。1 弧度的角为长度为半径长的圆弧所对的圆心角。

##### 弧度数公式

在半径为 $r$ 的圆中，弧长为 $l$ 的弧所对的圆心角为 $\alpha \ rad$，那么 $|a|=\frac{l}{r}$。

#### 角度与弧度的换算

##### 弧度与角度的换算公式

周角的弧度数为 $2\pi$，即 $360°=2\pi rad$。

- $1°=\frac{\pi}{180}\ rad \approx0.01745 rad$
- $1rad=(\frac{180}{\pi}\approx57.30°=57°18')$

##### 用弧度表示终边相同的角

$\beta=2k\pi+\alpha(k\in \mathbb{Z})$，这些角组成的集合为 $\{\beta|\beta=2k\pi+\alpha,k\in \mathbb{Z}\}$。

#### 弧长公式、扇形面积公式

设 $R$ 为数学的半径，$n$ 为圆心角的角度数，$\alpha$ 为圆心角的弧度数，则：

- 弧长公式：$l=\alpha R=\frac{n\pi R}{180}$
- 扇形面积公式：$S=\frac{1}{2}\alpha R^2=\frac{1}{2}lR=\frac{n\pi R^2}{360}$

### 三角函数的概念

利用单位圆定义任意角的三角函数。设 $P(x,y)$ 为平面直角坐标系内单位圆上一点，那么 $y=\sin \alpha$，$x=\cos \alpha$，$\frac{y}{x}=\tan \alpha(x\neq0)$。

#### 三角函数的定义域和值域

| 三角函数        | 定义域                                                                                    | 值域         |
| --------------- | ----------------------------------------------------------------------------------------- | ------------ |
| $y=\sin \alpha$ | $\mathbb{R}$                                                                              | $[-1,1]$     |
| $y=\cos \alpha$ | $\mathbb{R}$                                                                              | $[-1,1]$     |
| $y=\tan \alpha$ | $\{\alpha\vert\alpha\in\mathbb{R},\text{且}\alpha\neq\frac{\pi}{2}+k\pi,k\in\mathbb{Z}\}$ | $\mathbb{R}$ |

#### 三角函数在各个象限的符号

| 三角函数      | 第一象限 | 第二象限 | 第三象限 | 第四象限 |
| ------------- | -------- | -------- | -------- | -------- |
| $\sin \alpha$ | +        | +        | -        | -        |
| $\cos \alpha$ | +        | -        | -        | +        |
| $\tan \alpha$ | +        | -        | +        | -        |

#### 同角三角函数的基本关系及变形

- 平方关系：$\sin^2\alpha +\cos^2\alpha=1$
- 商数关系：$\frac{\sin \alpha}{\cos \alpha}=\tan \alpha(\alpha\neq k\pi+\frac{\pi}{2}(k\in\mathbb{Z}))$
- $\sin ^4\alpha+\cos ^4\alpha=1-2\sin ^2\alpha \cos ^2\alpha$
- $\sin ^4\alpha-\cos ^4\alpha=\sin ^2\alpha-\cos ^2\alpha$
- $\frac{\cos \alpha}{1-\sin \alpha}=\frac{1+\sin \alpha}{\cos \alpha}$
- $\tan ^2\alpha-\sin ^2\alpha=\tan ^2\alpha\cdot \sin ^2\alpha$
- $\frac{1-\tan \alpha}{1+\tan \alpha}=\frac{1-2\sin \alpha \cos \alpha}{\cos ^2\alpha-\sin ^2\alpha}$
- $\sin ^2\alpha+\cos ^2\alpha=1\Rightarrow\left\{\begin{aligned}&\sin ^2=1-\cos ^2\alpha,\&\cos ^2=1-\sin ^2\alpha,\\&\sin \alpha=\pm\sqrt{1-\cos ^2\alpha},\\&\cos \alpha=\pm\sqrt{1-\sin ^2\alpha},\\&(\sin \alpha\pm \cos \alpha)^2=1\pm2\sin \alpha \cos \alpha.\end{aligned}\right.$
- $\frac{\sin \alpha}{\cos \alpha}=\tan \alpha(\cos \alpha\neq0)\Rightarrow\left\{\begin{aligned}&\sin \alpha=\tan \alpha \cos \alpha,\\&\cos \alpha=\frac{\sin \alpha}{\cos \alpha}(\tan \alpha\neq0).\end{aligned}\right.$

### 诱导公式

- $\sin (\alpha+2k\pi)=\sin \alpha(k\in\mathbb{Z})$
- $\cos (\alpha+2k\pi)=\cos \alpha(k\in\mathbb{Z})$
- $\tan (\alpha+2k\pi)=\tan \alpha(k\in\mathbb{Z})$
- $\sin(\alpha+\pi)=-\sin\alpha$
- $\cos(\alpha+\pi)=-\cos\alpha$
- $\tan(\alpha+\pi)=\tan\alpha$
- $\sin(-\alpha)=-\sin\alpha$
- $\cos(-\alpha)=\cos\alpha$
- $\tan(-\alpha)=-\tan\alpha$
- $\sin(\frac{\pi}{2}-\alpha)=\cos\alpha$
- $\cos(\frac{\pi}{2}-\alpha)=\sin\alpha$
- $\sin(\frac{\pi}{2}+\alpha)=\cos\alpha$
