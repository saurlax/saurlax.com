---
title: RSA加密算法
date: 2023-11-18T16:54:03+08:00
categories: [CTF, Crypto, RSA]
tags: [CTF, Crypto, RSA]
---

| 步骤     | 数学表示                           | 实现                  |
| -------- | ---------------------------------- | --------------------- |
| 选择质数 | $p,q$                              | `getPrime()`          |
| 质数相乘 | $n=p\times q$                      | `n = p * q`           |
| 欧拉函数 | $phi=(p-1)\times(q-1)$             | `phi = (p-1) * (q-1)` |
| 选择公钥 | $1<e<phi$ 且 $e$ 不是 $phi$ 的因子 |                       |
| 计算私钥 | $(d\times e)\mod phi=1$            | `d = inverse(e, phi)` |
| 加密     | $e=m^e\mod n$                      | `c = pow(m, e, n)`    |
| 解密     | $m=e^d\mod n$                      | `m = pow(c, d, n)`    |

其中，公钥对为 (e, n)，私钥对为 (d, n)，原文为 m，密文为 c。
