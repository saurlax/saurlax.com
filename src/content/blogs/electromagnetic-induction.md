---
title: 电磁感应
date: 2024-11-24T16:31:51+08:00
tags: [大学物理]
---

## 法拉第电磁感应定律

当穿过闭合回路的磁通量发生变化时，回路中就会产生感应电动势 $\varepsilon$，其大小与磁通量的变化率 $\frac{\mathrm{d}\Phi}{\mathrm{d}t}$ 成正比，方向由法拉第右手定则确定。

$$\varepsilon = -\frac{\mathrm{d}\Phi}{\mathrm{d}t}$$

对 $N$ 匹绕组的螺线管，其感应电动势为

$$\varepsilon = -\frac{\mathrm{d}\Psi}{\mathrm{d}t} = -N\frac{\mathrm{d}\Phi}{\mathrm{d}t}$$

判断感应电动势方向时，应先确定回路 $L$ 中的正绕向，与正绕向一致的方向为电动势的正方向。

**楞次定律**：感应电动势的方向总是使产生它的磁通变化量的方向相反。

## 动生电动势

长为 $l$ 的导体以速度 $v$ 在磁感应强度为 $B$ 的磁场中运动，某时刻穿过回路所围面积的磁通量为

$$\Phi = BS = Blx$$

其感应电动势为

$$\varepsilon = -\frac{\mathrm{d}\Phi}{\mathrm{d}t} = -Bl\frac{\mathrm{d}x}{\mathrm{d}t} = -Blv$$

动生电动势由洛伦兹力引起，此时的非静电力为洛伦兹力，当导体棒运动时，棒内每个自由电子受到的洛伦兹力为

$$\vec{F} = ev\times \vec{B}$$

对应电动势为

$$\varepsilon = \int \vec{v} \times \vec{B} \cdot \mathrm{d}\vec{l}$$

**法拉第圆盘的动生电动势**：半径为 $L$ 的金属圆盘，在垂直均匀磁场 $B$ 中以角速度 $\omega$ 绕轴旋转，其感应电动势为

$$\varepsilon = \frac{1}{2}B\omega L^2$$

## 感生电动势

感生电动势是由于磁场的变化而产生的电动势，其大小与磁场的变化率有关。感生电场是由于磁场的变化而产生的电场，其方向垂直于磁场的变化方向，且不是保守场，其环路积分不为零。

$$\varepsilon = -\frac{d\Phi}{dt} = \oint_L \vec{E} \cdot \mathrm{d}\vec{l}$$

也可表示为

$$\varepsilon = -\frac{\mathrm{d}}{\mathrm{d}t}\iint_S \vec{B} \cdot \mathrm{d}\vec{S} = -\iint_S \frac{\partial \vec{B}}{\partial t} \cdot \mathrm{d}\vec{S}$$

其中，$d\vec{l}$ 为回路 $L$ 上的位移元，$d\vec{S}$ 为面元，$\vec{E}$ 为感生电场。

**圆柱形磁场空间的感生电场**：半径为 $R$ 的圆柱形磁场空间中，磁感应强度以恒定速率 $\frac{dB}{dt}$ 变化，则距离轴的距离为 $r$ 的地方，感生电场的大小为

$$E = -\frac{R^2}{2r}\frac{dB}{dt}$$

**电磁阻尼**：导体在磁场中运动时，感生电动势使导体内部产生感生电流，感生电流在导体内部产生感生磁场，感生磁场与外磁场相互作用，使导体受到阻力，这种现象称为电磁阻尼。

**涡电流**：感生电动势产生的电流称为涡电流，涡电流的方向由法拉第右手定则确定。金属块在涡旋电场中会产生涡电流，释放出大量焦耳热，可用于感应加热。

## 互感与自感

当一个导体线圈中的电流随时间变化时，它周围空间中的磁场也随之变化，这种变化的磁场穿过附近的导体线圈，使其产生感应电动势，这种现象称为互感。

设线圈 1 所激发的磁场通过线圈 2 的全磁通为 $\Psi_{21}$，则其与线圈 1 中的电流成正比

$$\Psi_{21} = M_{21}I_1$$

同理，线圈 2 所激发的磁场通过线圈 1 的全磁通 $\Psi_{12}$为

$$\Psi_{12} = M_{12}I_2$$

其中，$M_{21}和M_{12}$ 分别为线圈 1 和线圈 2 的互感系数，单位为亨利（H）。且有 $M_{21} = M_{12}$。

线圈 1 中电流发生变化时，在线圈 2 中产生的感应电动势为

$$\varepsilon_{12} = -\frac{\mathrm{d}\Psi_{21}}{\mathrm{d}t} = -M\frac{\mathrm{d}I_1}{\mathrm{d}t}$$

同理，线圈 2 中电流发生变化时，在线圈 1 中产生的感应电动势为

$$\varepsilon_{21} = -\frac{\mathrm{d}\Psi_{12}}{\mathrm{d}t} = -M\frac{\mathrm{d}I_2}{\mathrm{d}t}$$

既然导体线圈激发的磁场会穿过其他导体线圈，自然也会穿过自身，这种现象称为自感。穿过线圈自身的全磁通为

$$\Psi = LI$$

其中，$L$ 为线圈的自感系数。其感应电动势为

$$\varepsilon = -\frac{\mathrm{d}\Psi}{\mathrm{d}t} = -L\frac{\mathrm{d}I}{\mathrm{d}t}$$

**螺线管的自感**：单层密绕空气芯螺线管长度为 $l$，单位长度线圈数为 $n$，横截面积为 $S$，当其中通有电流 $I$ 时，其自感系数为

$$L = \frac{\Psi}{I} = \mu_0n^2Sl$$

## 磁场的能量

一个载流线圈在其磁场中存储有一定能量，来源于其电流建立过程中电源克服自感电动势做的功 $A_L$。这个功等于线圈中的磁场所储存的能量 $W_m$。

$$W_m = A_L = \int_0^t -\varepsilon_L i \mathrm{d}q = \int_0^I Li \mathrm{d}i = \frac{1}{2}LI^2$$

**磁场能量密度**：单位体积磁场能量为

$$w_m = \frac{W_m}{V} = \frac{1}{2}\frac{B^2}{\mu} = \frac{1}{2}\mu H^2 = \frac{1}{2} BH$$

在非均匀磁场中，磁场能量为

$$W_m = \int w_m \mathrm{d}V = \frac{1}{2} BH \mathrm{d}V$$

**匀速运动点电荷的磁场**：点电荷 $q$ 以速度 $v$ 运动，其产生的磁场为

$$\vec{B} = \frac{q}{4\pi \varepsilon_0 c^2 r^3} \cdot \frac{1 - v^2 / c^2}{1 - \sin^2 \theta (v^2 / c^2)} (\vec{v} \times \vec{r})$$

其中，$c$ 为光速，$\theta$ 为磁场方向与速度方向的夹角。
