---
title: 大学物理：电磁学
date: 2025-01-08T00:16:57+08:00
tags: [大学]
---

## 静电场

### 电荷与库仑定律

电荷是物质的一种属性。同种电荷相互排斥，异种电荷相互吸引。电量 $q$ 为电荷的多少，单位为库仑（C）。

电荷是量子化的，即电荷量 $q$ 只能取 $q = n \cdot e$，其中 $e = 1.602 \times 10^{-19} \, \text{C}$ 为基本电荷。

**电荷守恒定律**：孤立系统中的总电荷量是不变的。任意时刻正负电荷的代数和保持不变。

**库仑定律**：真空中静止的两个点电荷 $q_1$ 和 $q_2$ 之间的相互作用力与两电荷之间的距离 $r$ 的平方成反比，与两电荷量的乘积成正比，方向沿着两电荷连线。即

$$
\vec{F} = \frac{1}{4\pi\varepsilon_0} \frac{q_1 q_2}{r^3} \vec{r}
$$

其中 $\varepsilon_0 = 8.85 \times 10^{-12} \, \text{C}^2/\text{N}\cdot\text{m}^2$ 为真空介电常数。

### 电场强度与场强叠加原理

电场强度 $\vec{E}$ 是电场中单位正电荷所受的力，电场强度的方向是正电荷所受的力的方向。

空间中某一点的电场强度与该点的电荷无关，只与该点周围的电荷分布有关。可表示为

$$
\vec{E} = \frac{ \vec{F} }{q_0}
$$

**场强叠加原理**：点电荷系在某一点产生的电场强度等于各个点电荷在该点产生的电场强度的矢量和。即

$$
\vec{E} = \vec{E}_1 + \vec{E}_2 + \cdots + \vec{E}_n = \sum_{i=1}^n \vec{E}_i
$$

点电荷系的场强表达式

$$
\vec{E} = \frac{1}{4\pi\varepsilon_0} \sum_{i=1}^n \frac{q_i}{r_i^2} \vec{r}_i
$$

其中 $\vec{r}_i$ 为电荷 $q_i$ 到场点的位矢。

如果带电体的电荷分布是连续的，可改为积分形式

$$
\vec{E} = \frac{1}{4\pi\varepsilon_0} \int \frac{\mathrm{d}q}{r^3} \vec{r}
$$

**电偶极子**：由两个相等大小、异号电荷组成的系统。电偶极子的电偶极矩 $\vec{p} = q \vec{l}$，其中 $q$ 为电荷量，$\vec{l}$ 为负电荷到正电荷的位矢。

电偶极子轴延长线上某一点的电场强度为

$$
E = \frac{1}{4\pi\varepsilon_0} \frac{2pr}{(r^2 - l^2/4)^2}
$$

当 $r \gg l$ 时，电偶极子的电场强度近似为

$$
\vec{E} = \frac{1}{4\pi\varepsilon_0} \frac{2\vec{p} }{r^3}
$$

可见电场强度方向与电矩的方向相同。

电偶极子中垂面上的电场强度为

$$
\vec{E} = -\frac{1}{4\pi\varepsilon_0} \frac{\vec{p} }{r^3}
$$

中垂面上的电场强度方向与电矩大小成正比，方向相反。

**无限长均匀带点直线的场强公式**：无限长均匀带电直线在距离直线 $r$ 处的电场强度为

$$
E = \frac{1}{2\pi\varepsilon_0} \frac{\lambda}{r}
$$

其中 $\lambda$ 为线电荷密度，电场强度方向垂直于直线向外。

**均匀带电细圆环的场强公式**：均匀带电细圆环在环轴上距离环心 $x$ 处的电场强度为

$$
E = \frac{1}{4\pi\varepsilon_0} \frac{qx}{(x^2 + r^2)^{3/2} }
$$

其中 $q$ 为环上的电荷量，$r$ 为环的半径。场强方向沿环轴向外。在圆环中心时场强为零；当 $x \gg r$ 时，场强近似为

$$
E = \frac{1}{4\pi\varepsilon_0} \frac{q}{x^2}
$$

**无限大均匀带电平面的场强公式**：无限大均匀带电平面在距离平面 $r$ 处的电场强度为

$$
E = \frac{\sigma}{2\varepsilon_0}
$$

### 静电场的高斯定理

**静电场的高斯定理**：闭合曲面上的电场强度的通量等于该闭合曲面内的电荷量与真空介电常数之比。即

$$
\Phi = \oint \vec{E} \cdot \mathrm{d}\vec{S} = \frac{1}{\varepsilon_0} \int\mathrm{d}q
$$

其中 $\Phi$ 为电场强度的通量，$\vec{E}$ 为电场强度，$\mathrm{d}\vec{S}$ 为曲面元，$\mathrm{d}q$ 为闭合曲面内的电荷元。

**高斯定理的微分形式**：高斯定理也可以表示为微分形式

$$
\nabla \cdot \vec{E} = \frac{\rho}{\varepsilon_0}
$$

其中 $\nabla \cdot \vec{E}$ 为电场强度的散度，$\rho$ 为电荷密度。

### 电势与场强环路定理

**场强环路定理**：在静电场中，场强沿闭合回路的环流为零。即

$$
\oint \vec{E} \cdot \mathrm{d}\vec{l} = 0
$$

说明静电场是**无旋场**，电场线不能是闭合曲线。

也可写成微分形式

$$
\nabla \times \vec{E} = 0
$$

其中 $\nabla \times \vec{E}$ 为电场强度的旋度。

**电势**：电场中单位正电荷所具有的势能称为电势。电势是标量，单位为伏特（V）。

**电势公式**：点电荷 $q$ 在距离 $r$ 处的电势为

$$
U = \frac{1}{4\pi\varepsilon_0} \frac{Q}{r}
$$

其中默认电势为零的参考点为无穷远处。

**电势的叠加原理**：电势是标量，满足叠加原理。即

$$
U = U_1 + U_2 + \cdots + U_n = \sum_{i=1}^n U_i
$$

当电荷分布连续时，电势可表示为积分形式

$$
U = \frac{1}{4\pi\varepsilon_0} \int \frac{\mathrm{d}q}{r}
$$

**电偶极子的电势**：电偶极子在距离 $r$ 处的电势为

$$
U = \frac{1}{4\pi\varepsilon_0} \frac{\vec{p} \cdot \vec{r}}{r^3}
$$

其中 $\vec{p}$ 为电偶极矩，$\vec{r}$ 为电到电偶极子中点的位矢。

**电场强度与电势的关系**：电场强度与电势之间满足

$$
U = \int \vec{E} \cdot \mathrm{d}\vec{l}
$$

也可写成微分形式

$$
\vec{E} = -\nabla U
$$

其中 $\nabla U$ 为电势的梯度。

### 静电场中的导体

**静电平衡**：当导体内部电场强度处处为零，导体表面电场强度处处垂直于导体表面时，导体处于静电平衡。即导体为等势体，表面为等势面。

实心导体内部无净电荷，电荷均匀分布在导体表面。空腔导体内部无电荷，电荷仅分布在导体外表面。

不带电的实心导体处在外电场中，其表面的的感应电荷代数和为零。带电的实心导体处在外电场中，其表面的感应电荷代数和等于导体带电量。

**导体外表面的电场强度与电荷面密度的关系**：导体外表面的电场强度与电荷面密度之间满足

$$
E = \frac{\sigma}{\varepsilon_0}
$$

其中 $E$ 为导体外表面的电场强度，$\sigma$ 为导体表面的电荷面密度。

### 静电场中的电介质

**电介质的极化**：电介质中的原子或分子在外电场作用下，正负电荷分离，使电介质内部产生极化电荷。极化电荷的总和称为极化电荷。

**电介质的极化强度**：电介质的极化强度 $\vec{P}$ 定义为单位体积内极化电荷的代数和。即

$$
\vec{P} = \frac{\sum \vec{p}}{\Delta V}
$$

其中 $\vec{p}$ 为分子电偶极矩，$\Delta V$ 为体积。电极化强度的单位为 $\text{C/m}^2$，与电荷面密度的单位相同。

当电介质中的电场强度较弱时，电介质的极化强度与电场强度之间满足线性关系

$$
\vec{P} = \varepsilon_0 \chi_\varepsilon \vec{E}
$$

其中 $\chi_\varepsilon$ 为电介质的电极化率。

极化电荷面密度为

$$
\sigma = \vec{P} \cdot \vec{n}
$$

其中 $\vec{n}$ 为法向量。

由于极化而留在电介质内部的体束缚电荷量为

$$
q_\text{in} = -q_\text{out} = -\oint \vec{P} \cdot \mathrm{d}\vec{S}
$$

**电介质中的电位移矢量**：电介质中的电位移矢量 $\vec{D}$ 定义为单位面积内的电荷量。电介质中静电场的高斯定理可表示为

$$
\oint \vec{D} \cdot \mathrm{d}\vec{S} = \int_\text{in} \mathrm{d}q_0
$$

其中电位移矢量 $\vec{D}$ 由空间中的所有电荷共同决定，包括自由电荷和束缚电荷。而电位移的通量 $\oint \vec{D} \cdot \mathrm{d}\vec{S}$ 仅与自由电荷有关。

对各向同性且电场强度较弱的电介质，可得

$$
\vec{D} = \varepsilon_0 \vec{E} + \chi_\varepsilon \varepsilon_0 \vec{E} = (1 + \chi_\varepsilon) \vec{E}
$$

设 $\varepsilon_r = (1 + \chi_\varepsilon) \varepsilon_0$，则有

$$
\vec{D} = \varepsilon_0 \varepsilon_r \vec{E} = \varepsilon \vec{E}
$$

其中 $\varepsilon_r$ 为电介质的相对介电常数，$\varepsilon = \varepsilon_r \varepsilon_0$ 为电介质的介电常数。

### 静电场中的电容器

**孤立导体的电容**：导体带电量 $Q$ 与导体电势差 $U$ 之比称为导体的电容。即

$$
C = \frac{Q}{U}
$$

电容的单位为法拉（F）。真空中的孤立导体球的电容为

$$
C = 4\pi\varepsilon_0 R
$$

**电容器**：由两块导体板组成，板间填充电介质的装置称为电容器。电容器的电容 $C$ 定义为电容器两板间的电荷量 $Q$ 与两板间的电势差 $U$ 之比。即

$$
C = \frac{Q}{U_1-U_2}
$$

**平行板电容器**：平行板电容器的电容为

$$
C = \frac{\varepsilon S}{d}
$$

其中 $S$ 为板面积，$d$ 为板间距离。

**圆柱形电容器**：圆柱形电容器由两个同轴金属圆筒组成，内外圆筒的高度均为 $L$，内外半径分别为 $R_1$ 和 $R_2$。圆柱形电容器的电容为

$$
C = \frac{2\pi\varepsilon L}{\ln(R_2/R_1)}
$$

**球形电容器**：球形电容器由两个同心金属球壳组成，内外球壳的半径分别为 $R_1$ 和 $R_2$。球形电容器的电容为

$$
C = 4\pi\varepsilon_0 \frac{R_1 R_2}{R_2 - R_1}
$$

当电容串联时，电容组的电容为

$$
\frac{1}{C} = \frac{1}{C_1} + \frac{1}{C_2} + \cdots + \frac{1}{C_n} = \sum_{i=1}^n \frac{1}{C_i}
$$

耐压能力为

$$
U = U_1 + U_2 + \cdots + U_n = \sum_{i=1}^n U_i
$$

可知，串联电容器组的电容小于任意一个电容器的电容，耐压能力为各电容器的耐压能力之和。

当电容并联时，电容组的电容为

$$
C = C_1 + C_2 + \cdots + C_n = \sum_{i=1}^n C_i
$$

可知，并联电容器组的电容为各电容器的电容之和，但耐压能力并未提高。

### 静电场的能量

**电容器的能量**：电容器的能量为

$$
W = \frac{1}{2} CU^2 = \frac{1}{2} QU
$$

**电场能量密度**：电场能量密度 $w$ 定义为单位体积内的电场能量。即

$$
w_e = \frac{1}{2} \varepsilon E^2
$$

在各向同性的电介质中，电场中储有的能量为

$$
W = \frac{1}{2} DE = \frac{1}{2} \vec{D} \cdot \vec{E}
$$

## 恒定电场

**恒定电流**：电流强度为恒定的电流称为恒定电流。恒定电流的电流强度为

$$
I = \frac{\mathrm{d}q}{\mathrm{d}t}
$$

**电流密度**：电流密度 $\vec{j}$ 定义为单位面积内的电流强度。即

$$
\vec{j} = \frac{I}{S}
$$

考虑电量为 $q$，记载流子的漂移速度为 $v_d$，单位体积内以速度 $v_d$ 运动的载流子数为 $n$，则

$$
j = nqv_d
$$

对于恒定电流，通过任意闭合曲面的电流一定等于通过另一侧流出的电流。即

$$
\oint \vec{j} \cdot \mathrm{d}\vec{S} = 0
$$

说明电流线必须是闭合曲线，不能有起点或终点。

**恒定电场**：电场强度为恒定的电场称为恒定电场。恒定电场的电场强度为

$$
\vec{E} = \frac{U}{l}
$$

**电动势**：电动势 $E$ 定义为单位正电荷在电路中的电势能。即

$$
E = \frac{A}{q}
$$

**闭合电路的欧姆定律**：设 $R, r$ 分别为电路的总电阻和内电阻，$E$ 为电动势，$I$ 为电流强度，则有

$$
I = \frac{E}{R + r}
$$

设圆柱体导线长度为 $l$，截面积为 $S$，电阻率为 $\rho$，则有

$$
U = IR = I \rho \frac{l}{S}
$$

设导线内有均匀电流，则电流密度为 $j = I/S$。因为 $U = EL$，设 $\sigma = 1/\rho$，则有欧姆定律的微分形式

$$
\vec{J} = \sigma \vec{E}
$$

可得

$$
\oint_S E \cdot \mathrm{d}S = 0
$$

说明均匀导体的恒定电流场中，处处没有净电荷，电荷均匀分布在导体表面。

## 恒定磁场

### 磁场与磁感应强度

**毕奥-萨伐尔定律**：电流元 $I\mathrm{d}l$ 产生的磁场在距离 $r$ 处的磁感应强度为

$$
d\vec{B} = \frac{\mu_0}{4\pi} \frac{I\mathrm{d}l \times \vec{r}}{r^3}
$$

其中 $\mu_0 = 4\pi \times 10^{-7} \, \mathrm{T \cdot m/A}$ 为真空中的磁导率。

由叠加原理，空间中任意一点的磁感应强度为

$$
\vec{B} = \frac{\mu_0}{4\pi} \int \frac{I\mathrm{d}l \times \vec{r}}{r^3}
$$

**无限长载流直导线的磁感应强度**：无限长载流直导线在距离 $r$ 处的磁感应强度为

$$
B = \frac{\mu_0 I}{2\pi r}
$$

**载流圆线圈的磁感应强度**：载流圆线圈在轴线上距离 $x$ 处的磁感应强度为

$$
B = \frac{\mu_0 I R^2}{2(R^2 + x^2)^{3/2}}
$$

当 $x = 0$ 时，磁感应强度最大，为

$$
B_{\max} = \frac{\mu_0 I}{2R}
$$

当 $x \gg R$ 时，磁感应强度近似为

$$
B = \frac{\mu_0 I R^2}{2 x^3}
$$

令线圈的磁矩为 $\vec{m} = IS\vec{n} = I\pi R^2 \vec{n}$，则当 $x \gg R$ 时，磁感应强度近似为

$$
B = \frac{\mu_0}{4\pi} \frac{2\vec{m}}{x^3}
$$

与电偶极子的电场

$$
E = -\frac{1}{4\pi\varepsilon_0} \frac{2\vec{p}}{r^3}
$$

形式相同，说明载流线圈在远处产生的磁场与电偶极子在远处产生的电场类似。

**有限长载流直导线的磁感应强度**：有限长载流直导线在附近产生的磁感应强度为

$$
B = \frac{\mu_0 I}{4\pi R} (\cos \theta_1 - \cos \theta_2)
$$

其中 $R$ 为观察点到导线的距离，$\theta_1$ 和 $\theta_2$ 分别为观察点到导线两端的连线与导线方向的夹角。

**无限长直螺线管的磁感应强度**：内部轴线上的磁感应强度为

$$
B = \mu_0 n I
$$

端口中心的磁感应强度为

$$
B = \frac{\mu_0 n I}{2}
$$

### 磁场的高斯定理

与电场线类似，沿曲面法线方向通过曲面的磁感应强度通量（磁通量）为

$$
\Phi_B = \int \vec{B} \cdot \mathrm{d}\vec{S}
$$

单位为 $\mathrm{Wb}$（韦伯），$1 \, \mathrm{Wb} = 1 \, \mathrm{T \cdot m^2}$。

电流元磁场的磁感应线都是圆心在电流元轴线上的同心圆，均为闭合曲线，所以通过任意闭合曲线的磁通量为零。

$$
\oint \vec{B} \cdot \mathrm{d}\vec{l} = 0
$$

其微分形式为

$$
\nabla \cdot \vec{B} = 0
$$

### 安培环路定理

在静电场中，电场强度的旋度为零，所以电场强度是一个保守场。但在磁场中，磁感应线是闭合曲线，所以磁感应强度沿闭合曲线的线积分不为零

$$
\oint \vec{B} \cdot \mathrm{d}\vec{l} = \mu_0 I_{\text{enc}}
$$

其微分形式为

$$
\nabla \times \vec{B} = \mu_0 \vec{J}
$$

### 带电粒子在磁场中的运动

**洛伦兹力**：带电粒子在磁场中受到的洛伦兹力为

$$
\vec{F} = q\vec{v} \times \vec{B}
$$

**带电粒子在磁场中的运动**：带电粒子在磁场中的运动轨迹为圆周运动，圆周运动的半径为

$$
r = \frac{mv}{qB}
$$

**霍尔效应**：当导体中有电流通过时，导体两侧会产生电势差，这种现象称为霍尔效应。设导体的宽度为 $d$，电流为 $I$，磁感应强度为 $B$，则导体两侧的电势差为

$$
U = k \frac{IB}{d}
$$

其中 $k = \frac{1}{nq}$，$n$ 为载流电子的密度，$q$ 为电子电荷。

**质谱仪**：质谱仪是一种利用带电粒子在磁场中的圆周运动的性质来测定带电粒子的质量和电荷的仪器。

$$
\frac{q}{m} = \frac{2U}{B^2r^2}
$$

可以根据两点间的距离求出荷质比。

### 磁场对电流的作用

**安培力**：导线元 $I\mathrm{d}l$ 在磁场中受到的安培力为

$$
\mathrm{d}\vec{F} = I\mathrm{d}\vec{l} \times \vec{B}
$$

一段导线 $L$ 在磁场中受到的安培力为

$$
\vec{F} = \int_L d\vec{F} = \int_L I \mathrm{d} \vec{l} \times \vec{B}
$$

### 磁介质

对于各向同性的磁介质，磁介质与磁场的关系为

$$
\vec{B} = \mu_r \vec{B}_0
$$

其中 $\mu_r$ 为相对磁导率，$\vec{B}_0$ 为外加磁场。

磁介质受外磁场作用呈现磁性的现象叫做磁化，也会因磁化产生附加磁场。磁介质可分为顺磁性、铁磁性和抗磁性。

**磁化强度**：可以用磁化强度 $\vec{M}$ 来描述磁介质的磁化程度，磁化强度的定义为

$$
\vec{M} = \frac{\Sigma \vec{m}_i}{\Delta V}
$$

其中 $\vec{m}_i$ 为磁介质中的分子磁矩，$\Delta V$ 为磁介质的体积。

在一宏观小体积元内，每个分子可等效为一个电流强度为 $i$，半径为 $a$ 的圆电流环，可得磁化强度为

$$
|M| = \frac{|\Sigma m_i|}{\Delta V} = ni \pi a^2
$$

其中 $n$ 为单位体积内的分子数。

在磁介质中做一有向闭合路径 $\vec{l}$，则闭合路径 $\vec{l}$ 上的总磁化电流为

$$
I' = \oint_L \mathrm{d}I' = \oint_L \vec{M} \cdot \mathrm{d}\vec{l}
$$

对应面束缚电流密度为该表面处磁化强度沿法线方向的分量

$$
\vec{j}' = \vec{M} \times \vec{n}
$$

磁介质中的磁感应强度为自由电流的磁感应强度 $B_0$ 和磁化电流的磁感应强度 $B'$ 的矢量和

$$
\vec{H} = \vec{B}_0 + \vec{B}'
$$

**磁场强度**：磁场强度 $\vec{H}$ 定义为

$$
\vec{H} = \frac{\vec{B}}{\mu_0} - \vec{M}
$$

**磁介质中磁场的安培环路定理**：磁介质中的磁场强度满足

$$
\oint \vec{H} \cdot \mathrm{d}\vec{l} = \Sigma I_0
$$

其中磁场强度 $\vec{H}$ 的单位为 $\mathrm{A \cdot m^{-1}}$。

一般地，任一点的磁化强度 $\vec{M}$ 与磁场强度 $\vec{H}$ 之间的关系为

$$
\vec{M} = \chi_m \vec{H}
$$

各向同性磁介质的相对磁导率 $\mu_r$ 与磁化率 $\chi_m$ 之间的关系为

$$
\mu_r = 1 + \chi_m
$$

因此

$$
\vec{B} = \mu_0 \mu_r \vec{H} = \mu \vec{H}
$$

其中 $\mu = \mu_0 \mu_r$ 为磁导率。

### 铁磁质

以铁、钴、镍及其合金或氧化物为代表的铁磁质对外磁场有很大影响，由许多特点：

- 其相对磁导率 $\mu_r$ 为 $10^2 \sim 10^4$；
- $\mu_r$ 随外磁场的变化而变化；
- 有明显的磁滞现象；
- 在一定温度 $T_C$ 以上，铁磁质会失去铁磁性；
- 较弱的外磁场就能使铁磁质磁化到饱和。

**磁化曲线**：铁磁质在外磁场作用下，磁化强度 $\vec{M}$ 随外磁场强度 $\vec{H}$ 的变化关系称为磁化曲线。

铁磁质的磁化曲线分为磁化曲线的上升支和下降支，上升支称为磁化曲线的磁化过程，下降支称为磁化曲线的消磁过程。

**磁滞回线**：铁磁质在外磁场作用下，磁化曲线的上升支和下降支不重合，形成的闭合曲线称为磁滞回线。

## 电磁感应

### 法拉第电磁感应定律

当穿过闭合回路的磁通量发生变化时，回路中就会产生感应电动势 $\varepsilon$，其大小与磁通量的变化率 $\frac{\mathrm{d}\Phi}{\mathrm{d}t}$ 成正比，方向由法拉第右手定则确定。

$$
\varepsilon = -\frac{\mathrm{d}\Phi}{\mathrm{d}t}
$$

对 $N$ 匹绕组的螺线管，其感应电动势为

$$
\varepsilon = -\frac{\mathrm{d}\Psi}{\mathrm{d}t} = -N\frac{\mathrm{d}\Phi}{\mathrm{d}t}
$$

判断感应电动势方向时，应先确定回路 $L$ 中的正绕向，与正绕向一致的方向为电动势的正方向。

**楞次定律**：感应电动势的方向总是使产生它的磁通变化量的方向相反。

### 动生电动势

长为 $l$ 的导体以速度 $v$ 在磁感应强度为 $B$ 的磁场中运动，某时刻穿过回路所围面积的磁通量为

$$
\Phi = BS = Blx
$$

其感应电动势为

$$
\varepsilon = -\frac{\mathrm{d}\Phi}{\mathrm{d}t} = -Bl\frac{\mathrm{d}x}{\mathrm{d}t} = -Blv
$$

动生电动势由洛伦兹力引起，此时的非静电力为洛伦兹力，当导体棒运动时，棒内每个自由电子受到的洛伦兹力为

$$
\vec{F} = ev\times \vec{B}
$$

对应电动势为

$$
\varepsilon = \int \vec{v} \times \vec{B} \cdot \mathrm{d}\vec{l}
$$

**法拉第圆盘的动生电动势**：半径为 $L$ 的金属圆盘，在垂直均匀磁场 $B$ 中以角速度 $\omega$ 绕轴旋转，其感应电动势为

$$
\varepsilon = \frac{1}{2}B\omega L^2
$$

### 感生电动势

感生电动势是由于磁场的变化而产生的电动势，其大小与磁场的变化率有关。感生电场是由于磁场的变化而产生的电场，其方向垂直于磁场的变化方向，且不是保守场，其环路积分不为零。

$$
\varepsilon = -\frac{d\Phi}{dt} = \oint_L \vec{E} \cdot \mathrm{d}\vec{l}
$$

也可表示为

$$
\varepsilon = -\frac{\mathrm{d}}{\mathrm{d}t}\iint_S \vec{B} \cdot \mathrm{d}\vec{S} = -\iint_S \frac{\partial \vec{B}}{\partial t} \cdot \mathrm{d}\vec{S}
$$

其中，$d\vec{l}$ 为回路 $L$ 上的位移元，$d\vec{S}$ 为面元，$\vec{E}$ 为感生电场。

**圆柱形磁场空间的感生电场**：半径为 $R$ 的圆柱形磁场空间中，磁感应强度以恒定速率 $\frac{dB}{dt}$ 变化，则距离轴的距离为 $r$ 的地方，感生电场的大小为

$$
E = -\frac{R^2}{2r}\frac{dB}{dt}
$$

**电磁阻尼**：导体在磁场中运动时，感生电动势使导体内部产生感生电流，感生电流在导体内部产生感生磁场，感生磁场与外磁场相互作用，使导体受到阻力，这种现象称为电磁阻尼。

**涡电流**：感生电动势产生的电流称为涡电流，涡电流的方向由法拉第右手定则确定。金属块在涡旋电场中会产生涡电流，释放出大量焦耳热，可用于感应加热。

### 互感与自感

当一个导体线圈中的电流随时间变化时，它周围空间中的磁场也随之变化，这种变化的磁场穿过附近的导体线圈，使其产生感应电动势，这种现象称为互感。

设线圈 1 所激发的磁场通过线圈 2 的全磁通为 $\Psi_{21}$，则其与线圈 1 中的电流成正比

$$
\Psi_{21} = M_{21}I_1
$$

同理，线圈 2 所激发的磁场通过线圈 1 的全磁通 $\Psi_{12}$为

$$
\Psi_{12} = M_{12}I_2
$$

其中，$M_{21}和M_{12}$ 分别为线圈 1 和线圈 2 的互感系数，单位为亨利（H）。且有 $M_{21} = M_{12}$。

线圈 1 中电流发生变化时，在线圈 2 中产生的感应电动势为

$$
\varepsilon_{12} = -\frac{\mathrm{d}\Psi_{21}}{\mathrm{d}t} = -M\frac{\mathrm{d}I_1}{\mathrm{d}t}
$$

同理，线圈 2 中电流发生变化时，在线圈 1 中产生的感应电动势为

$$
\varepsilon_{21} = -\frac{\mathrm{d}\Psi_{12}}{\mathrm{d}t} = -M\frac{\mathrm{d}I_2}{\mathrm{d}t}
$$

既然导体线圈激发的磁场会穿过其他导体线圈，自然也会穿过自身，这种现象称为自感。穿过线圈自身的全磁通为

$$
\Psi = LI
$$

其中，$L$ 为线圈的自感系数。其感应电动势为

$$
\varepsilon = -\frac{\mathrm{d}\Psi}{\mathrm{d}t} = -L\frac{\mathrm{d}I}{\mathrm{d}t}
$$

**螺线管的自感**：单层密绕空气芯螺线管长度为 $l$，单位长度线圈数为 $n$，横截面积为 $S$，当其中通有电流 $I$ 时，其自感系数为

$$
L = \frac{\Psi}{I} = \mu_0n^2Sl
$$

### 磁场的能量

一个载流线圈在其磁场中存储有一定能量，来源于其电流建立过程中电源克服自感电动势做的功 $A_L$。这个功等于线圈中的磁场所储存的能量 $W_m$。

$$
W_m = A_L = \int_0^t -\varepsilon_L i \mathrm{d}q = \int_0^I Li \mathrm{d}i = \frac{1}{2}LI^2
$$

**磁场能量密度**：单位体积磁场能量为

$$
w_m = \frac{W_m}{V} = \frac{1}{2}\frac{B^2}{\mu} = \frac{1}{2}\mu H^2 = \frac{1}{2} BH
$$

在非均匀磁场中，磁场能量为

$$
W_m = \int w_m \mathrm{d}V = \frac{1}{2} BH \mathrm{d}V
$$

**匀速运动点电荷的磁场**：点电荷 $q$ 以速度 $v$ 运动，其产生的磁场为

$$
\vec{B} = \frac{q}{4\pi \varepsilon_0 c^2 r^3} \cdot \frac{1 - v^2 / c^2}{1 - \sin^2 \theta (v^2 / c^2)} (\vec{v} \times \vec{r})
$$

其中，$c$ 为光速，$\theta$ 为磁场方向与速度方向的夹角。

## 麦克斯韦方程组

### 全电流安培环路定理

**位移电流**：当电场强度随时间变化时，电场强度的变化率 $\frac{\partial \vec{E}}{\partial t}$ 产生的感生电场，称为位移电流，其大小为

$$
I_D = \frac{\mathrm{d}\Phi_D}{\mathrm{d}t} = \frac{\mathrm{d}}{\mathrm{d}t}\oiint_S \vec{D} \cdot \mathrm{d}\vec{S} = \oiint_S \frac{\partial \vec{D}}{\partial t} \cdot \mathrm{d}\vec{S}
$$

其中，$\vec{J}_D = \frac{\partial \vec{D}}{\partial t}$ 为位移电流密度。

传导电流与位移电流之和为全电流，全电流安培环路定理为

$$
\oint_L \vec{H} \cdot \mathrm{d}\vec{r} = I + I_D
$$

### 麦克斯韦方程组

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

$$
\vec{D} = \varepsilon \vec{E}, \quad \vec{B} = \mu \vec{H}, \quad \vec{J} = \sigma \vec{E}
$$

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

$$
\vec{D} = \varepsilon \vec{E}, \quad \vec{B} = \mu \vec{H}
$$

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

### 电磁波的能量

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

$$
\vec{S} = \frac{1}{\mu_0} \vec{E} \times \vec{B} = \vec{E} \times \vec{H}
$$

其大小为

$$
S = \frac{1}{\mu_0} EB = c\varepsilon_0 E^2 = cw
$$

电磁波以速度 $c$ 传播时，其能量也以速度 $c$ 传播。

### 电磁势

电磁场的电磁势为

$$
\vec{A} = \frac{\mu_0}{4\pi} \iiint_V \frac{\vec{J}}{r} \mathrm{d}V, \quad \varphi = \frac{1}{4\pi\varepsilon_0} \iiint_V \frac{\rho}{r} \mathrm{d}V
$$

其中，$\vec{A}$ 为磁矢势，$\varphi$ 为电势。

电磁场的电磁场强度和磁场强度分别为

$$
\vec{E} = -\nabla \varphi - \frac{\partial \vec{A}}{\partial t}, \quad \vec{B} = \nabla \times \vec{A}
$$
