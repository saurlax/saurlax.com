---
title: 麦克斯韦方程组与电磁场
date: 2024-11-24T17:36:17+08:00
tags: [大学物理]
---

## 全电流安培环路定理

**位移电流**：当电场强度随时间变化时，电场强度的变化率 $\frac{\partial \vec{E}}{\partial t}$ 产生的感生电场，称为位移电流，其大小为

$$I_D = \frac{\mathrm{d}\Phi_D}{\mathrm{d}t} = \frac{\mathrm{d}}{\mathrm{d}t}\oiint_S \vec{D} \cdot \mathrm{d}\vec{S} = \oiint_S \frac{\partial \vec{D}}{\partial t} \cdot \mathrm{d}\vec{S}$$

其中，$\vec{J}_D = \frac{\partial \vec{D}}{\partial t}$ 为位移电流密度。

传导电流与位移电流之和为全电流，全电流安培环路定理为

$$\oint_L \vec{H} \cdot \mathrm{d}\vec{r} = I + I_D$$

## 麦克斯韦方程组

麦克斯韦方程组积分形式为

$$
\begin{aligned}
& (1) \quad \oiint_S \vec{D} \cdot \mathrm{d}\vec{S} = \Sigma_i Q_i \\
& (2) \quad \oint_L \vec{E} \cdot \mathrm{d}\vec{r} = -\iint_S \frac{\partial \vec{{B}}}{\partial t} \cdot \mathrm{d} \vec{S} \\
& (3) \quad \oiint_S \vec{B} \cdot \mathrm{d}\vec{S} = 0 \\
& (4) \quad \oint_L \vec{H} \cdot \mathrm{d}\vec{r} = \Sigma_i I_i + I_D
\end{aligned}
$$

- 方程（1）为电场的高斯定理（电场通量定理），它给出了电场强度和电荷的关系，其包含了电荷产生的、变化磁场产生的的电荷；
- 方程（2）为法拉第电磁感应定律（电场环流定理），说明了变化的磁场产生有旋电场；
- 方程（3）为磁场的高斯定理（磁场通量定理），说明了磁场无源；
- 方程（4）为全电流安培环路定理（磁场环流定理），说明了电流和变化的电场都能产生磁场。

均匀各向同性电磁介质也适用，只需带入

$$\vec{D} = \varepsilon \vec{E}, \quad \vec{B} = \mu \vec{H}, \quad \vec{J} = \sigma \vec{E}$$

麦克斯韦方程组微分形式为

$$
\begin{aligned}
& \nabla \cdot \vec{D} = \rho \\
& \nabla \cdot \vec{B} = 0 \\
& \nabla \times \vec{E} = -\frac{\partial \vec{B}}{\partial t} \\
& \nabla \times \vec{H} = \vec{j} + \frac{\partial \vec{D}}{\partial t}
\end{aligned}
$$

## 电磁波

由麦克斯韦方程组微分形式中的 $\frac{\partial \vec{B}}{\partial t}$ 和 $\frac{\partial \vec{D}}{\partial t}$ 可知，随时间变化的磁场会激发有旋电场，随时间变化的电场会激发有旋磁场。当空间中无电荷、无传导电流时，由

$$\vec{D} = \varepsilon \vec{E}, \quad \vec{B} = \mu \vec{H}$$

可将麦克斯韦方程组化简为

$$
\begin{aligned}
& \nabla \cdot \vec{D} = \rho \\
& \nabla \cdot \vec{H} = 0 \\
& \nabla \times \vec{E} = -\mu \frac{\partial \vec{H}}{\partial t} \\
& \nabla \times \vec{H} = \varepsilon \frac{\partial \vec{E}}{\partial t}
\end{aligned}
$$

假设电磁场沿 $x$ 方向传播，则 $\vec{E}$ 和 $\vec{H}$ 都是关于 $x$ 和 $t$ 的函数，与 $y$ 和 $z$ 无关，即可得到

- 电磁波为横波；
- 当 $\vec{E}$ 沿 $y$ 轴时，$\vec{H}$ 沿 $z$ 轴；
- 电磁波的波速为 $u = 1 / \sqrt{\varepsilon \mu}$；
- $\vec{E}$ 和 $\vec{H}$ 同频同相位，且 $\vec{E}, \vec{H}$ 和波速 $\vec{u}$ 成右手螺旋关系。

## 电磁波的能量

真空中电磁波的能量密度可写为

$$
\begin{aligned}
w &= w_e + w_m = \frac{\varepsilon_0 E^2}{2} + \frac{B^2}{2\mu_0} \\
&= \frac{\varepsilon_0 E^2}{2} + \frac{\varepsilon_0 (cB)^2}{2} \\
&= 2w_e = 2w_m \\
&= \varepsilon_0 E^2 = \frac{B^2}{\mu_0}
\end{aligned}
$$

电磁波的能流密度为

$$\vec{S} = \frac{1}{\mu_0} \vec{E} \times \vec{B} = \vec{E} \times \vec{H}$$

其大小为

$$S = \frac{1}{\mu_0} EB = c\varepsilon_0 E^2 = cw$$

电磁波以速度 $c$ 传播时，其能量也以速度 $c$ 传播。

## 电磁势

电磁场的电磁势为

$$\vec{A} = \frac{\mu_0}{4\pi} \iiint_V \frac{\vec{J}}{r} \mathrm{d}V, \quad \varphi = \frac{1}{4\pi\varepsilon_0} \iiint_V \frac{\rho}{r} \mathrm{d}V$$

其中，$\vec{A}$ 为磁矢势，$\varphi$ 为电势。

电磁场的电磁场强度和磁场强度分别为

$$\vec{E} = -\nabla \varphi - \frac{\partial \vec{A}}{\partial t}, \quad \vec{B} = \nabla \times \vec{A}$$
