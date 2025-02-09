---
title: C 语言程序设计基础
date: 2023-11-14T21:05:40+08:00
tags: [C/C++]
---

## 数据类型

变量名只能由字母、数字和 `_` 组成，且不能以字母开头。此外，变量名不可以为关键词。下面是 C 语言中常见的一些关键词。

`auto`，`break`，`case`，`char`，`const`，`continue`，`default`，`do`，`double`，`else`，`enum`，`extern`，`float`，`for`，`goto`，`if`，`inline`，`int`，`long`，`register`，`restrict`，`return`，`short`，`signed`，`sizeof`，`static`，`struct`，`switch`，`typedef`，`union`，`unsigned`，`void`，`volatile`，`while`。

### 基础数据类型

| 类型               | 大小      | 范围                                                                                                     |
| ------------------ | --------- | -------------------------------------------------------------------------------------------------------- |
| char               | 1         | -128 到 127 或 0 到 255（取决于是否带符号）                                                              |
| unsigned char      | 1         | 0 到 255                                                                                                 |
| short              | 2         | -32,768 到 32,767                                                                                        |
| unsigned short     | 2         | 0 到 65,535                                                                                              |
| int                | 4         | -2,147,483,648 到 2,147,483,647                                                                          |
| unsigned int       | 4         | 0 到 4,294,967,295                                                                                       |
| long               | 4 或 8    | -2,147,483,648 到 2,147,483,647 或 -9,223,372,036,854,775,808 到 9,223,372,036,854,775,807（取决于系统） |
| unsigned long      | 4 或 8    | 0 到 4,294,967,295 或 0 到 18,446,744,073,709,551,615（取决于系统）                                      |
| long long          | 8         | -9,223,372,036,854,775,808 到 9,223,372,036,854,775,807                                                  |
| unsigned long long | 8         | 0 到 18,446,744,073,709,551,615                                                                          |
| float              | 4         | 大约 6~9 位精度，范围为 1.2e-38 到 3.4e38                                                                |
| double             | 8         | 大约 15 位精度，范围为 2.3e-308 到 1.7e308                                                               |
| long double        | 16 或更多 | 大约 19 位精度，范围为 3.4e-4932 到 1.1e4932（取决于系统）                                               |

### ASCII 码表

| 序号 | 字符             | 序号 | 字符   | 序号 | 字符 | 序号 | 字符       |
| ---- | ---------------- | ---- | ------ | ---- | ---- | ---- | ---------- |
| 0    | NUL (空)         | 32   | (空格) | 64   | @    | 96   | `          |
| 1    | SOH (标题开始)   | 33   | !      | 65   | A    | 97   | a          |
| 2    | STX (正文开始)   | 34   | "      | 66   | B    | 98   | b          |
| 3    | ETX (正文结束)   | 35   | #      | 67   | C    | 99   | c          |
| 4    | EOT (传送结束)   | 36   | $      | 68   | D    | 100  | d          |
| 5    | ENQ (询问)       | 37   | %      | 69   | E    | 101  | e          |
| 6    | ACK (确认)       | 38   | &      | 70   | F    | 102  | f          |
| 7    | BEL (响铃)       | 39   | '      | 71   | G    | 103  | g          |
| 8    | BS (退格)        | 40   | (      | 72   | H    | 104  | h          |
| 9    | HT (横向制表)    | 41   | )      | 73   | I    | 105  | i          |
| 10   | LF (换行)        | 42   | \*     | 74   | J    | 106  | j          |
| 11   | VT (纵向制表)    | 43   | +      | 75   | K    | 107  | k          |
| 12   | FF (换页)        | 44   | ,      | 76   | L    | 108  | l          |
| 13   | CR (回车)        | 45   | -      | 77   | M    | 109  | m          |
| 14   | SO (移出)        | 46   | .      | 78   | N    | 110  | n          |
| 15   | SI (移入)        | 47   | /      | 79   | O    | 111  | o          |
| 16   | DLE (退出数据链) | 48   | 0      | 80   | P    | 112  | p          |
| 17   | DC1 (设备控制 1) | 49   | 1      | 81   | Q    | 113  | q          |
| 18   | DC2 (设备控制 2) | 50   | 2      | 82   | R    | 114  | r          |
| 19   | DC3 (设备控制 3) | 51   | 3      | 83   | S    | 115  | s          |
| 20   | DC4 (设备控制 4) | 52   | 4      | 84   | T    | 116  | t          |
| 21   | NAK (反确认)     | 53   | 5      | 85   | U    | 117  | u          |
| 22   | SYN (同步空闲)   | 54   | 6      | 86   | V    | 118  | v          |
| 23   | ETB (传输块结束) | 55   | 7      | 87   | W    | 119  | w          |
| 24   | CAN (取消)       | 56   | 8      | 88   | X    | 120  | x          |
| 25   | EM (媒介结束)    | 57   | 9      | 89   | Y    | 121  | y          |
| 26   | SUB (替换)       | 58   | :      | 90   | Z    | 122  | z          |
| 27   | ESC (退出)       | 59   | ;      | 91   | [    | 123  | {          |
| 28   | FS (文件分隔符)  | 60   | <      | 92   | \    | 124  | \|         |
| 29   | GS (组分隔符)    | 61   | =      | 93   | ]    | 125  | }          |
| 30   | RS (记录分隔符)  | 62   | >      | 94   | ^    | 126  | ~          |
| 31   | US (单元分隔符)  | 63   | ?      | 95   | \_   | 127  | DEL (删除) |

参考：https://zh.cppreference.com/w/cpp/language/ascii

### 复合数据类型

**结构体**：一种能够存储不同类型数据的集合。

```c
#include <stdio.h>

// 定义一个结构体
struct Person {
    char name[20];
    int age;
    float height;
};

int main() {
    // 声明一个结构体变量并初始化
    struct Person person1 = {"Alice", 25, 1.75};

    // 访问结构体成员并打印信息
    printf("Person's name: %s\n", person1.name);       // Person's name: Alice
    printf("Person's age: %d\n", person1.age);         // Person's age: 25
    printf("Person's height: %.2f\n", person1.height); // Person's height: 1.75

    return 0;
}
```

**联合体**：与结构体类似，但所有成员共享同一块内存空间。

```c
#include <stdio.h>

// 定义一个联合
union Data {
    int i;
    float f;
    char str[20];
};

int main() {
    // 声明一个联合变量并使用
    union Data data;

    data.i = 10;
    printf("data.i: %d\n", data.i);   // data.i: 10

    data.f = 3.14; // 覆盖整型成员，为浮点型成员赋值
    printf("data.f: %.2f\n", data.f); // data.f: 3.14

    printf("data.i after changing data.f: %d\n", data.i);
    // data.i after changing data.f: 1078523331

    return 0;
}
```

## 表达式与运算符

C 语言中常见的几类运算符：

- 算术运算符：`+`, `-`, `*`, `/`, `%`
- 关系运算符：`!=`, `==`, `>`, `<`, `>=`, `<=`
- 逻辑运算符：`!`, `&&`, `||`
- 赋值运算符：`=`, `+=`, `-=`, …
- 自增自减运算符：`++`, `--`
- 条件运算符：`?`, `:`
- 位运算符：`&`, `|`, `~`, `^`
- 特殊运算符：`&`, `.`, `->`

### 运算符优先级

运算符优先级决定了一个带有多个运算符的表达式如何进行计算。常见需要注意的是：

- `&&` 优先于 `||`。例如要判断 `a` 在 `[30, 40]` 之间，或者是 0 的话，可以直接写作 `a == 0 || a > 30 && a < 40`。
- `[]` 优先于 `*`。例如 `*p[0]` 指的是 `p` 的第 1 项解引用，也说明了 `p` 是一个指针数组（数组元素是指针），而 `(*p)[]` 则说明先解引用再取数组下标，代表 `p` 是一个数组指针（指针指向数组）。

<table>
  <tbody>
  <tr>
    <th>优先级</th>
    <th>运算符</th>
    <th>描述</th>
    <th>结合性</th>
  </tr>
  <tr>
    <th rowspan="5">1</th>
    <td><code>++</code> <code>--</code></td>
    <td>后缀自增与自减</td>
    <td rowspan="5">从左到右</td>
  </tr>
  <tr>
    <td><code>()</code></td>
    <td>函数调用</td>
  </tr>
  <tr>
    <td><code>[]</code></td>
    <td>数组下标</td>
  </tr>
  <tr>
    <td><code>.</code></td>
    <td>结构体与联合体成员访问</td>
  </tr>
  <tr>
    <td><code>-&gt;</code></td>
    <td>结构体与联合体成员通过指针访问</td>
  </tr>
  <tr>
    <th rowspan="7">2</th>
    <td><code>++</code> <code>--</code></td>
    <td>前缀自增与自减</td>
    <td rowspan="7">从右到左</td>
  </tr>
  <tr>
    <td><code>+</code> <code>-</code></td>
    <td>一元加与减</td>
  </tr>
  <tr>
    <td><code>!</code> <code>~</code></td>
    <td>逻辑非与逐位非</td>
  </tr>
  <tr>
    <td><code>(<i>type</i>)</code></td>
    <td>转型</td>
  </tr>
  <tr>
    <td><code>*</code></td>
    <td>间接（解引用）</td>
  </tr>
  <tr>
    <td><code>&amp;</code></td>
    <td>取址</td>
  </tr>
  <tr>
    <td><code>sizeof</code></td>
    <td>取大小</td>
  </tr>
  <tr>
    <th>3</th>
    <td><code>*</code> <code>/</code> <code>%</code></td>
    <td>乘法、除法及余数</td>
    <td rowspan="11">从左到右</td>
  </tr>
  <tr>
    <th>4</th>
    <td><code>+</code> <code>-</code></td>
    <td>加法及减法</td>
  </tr>
  <tr>
    <th>5</th>
    <td><code>&lt;&lt;</code> <code>&gt;&gt;</code></td>
    <td>逐位左移及右移</td>
  </tr>
  <tr>
    <th rowspan="2">6</th>
    <td><code>&lt;</code> <code>&lt;=</code></td>
    <td>分别为 &lt; 与 ≤ 的关系运算符</td>
  </tr>
  <tr>
    <td><code>&gt;</code> <code>&gt;=</code></td>
    <td>分别为 &gt; 与 ≥ 的关系运算符</td>
  </tr>
  <tr>
    <th>7</th>
    <td><code>==</code> <code>!=</code></td>
    <td>分别为 = 与 ≠ 关系</td>
  </tr>
  <tr>
    <th>8</th>
    <td><code>&amp;</code></td>
    <td>逐位与</td>
  </tr>
  <tr>
    <th>9</th>
    <td><code>^</code></td>
    <td>逐位异或（排除或）</td>
  </tr>
  <tr>
    <th>10</th>
    <td><code>|</code></td>
    <td>逐位或（包含或）</td>
  </tr>
  <tr>
    <th>11</th>
    <td><code>&amp;&amp;</code></td>
    <td>逻辑与</td>
  </tr>
  <tr>
    <th>12</th>
    <td><code>||</code></td>
    <td>逻辑或</td>
  </tr>
  <tr>
    <th>13</th>
    <td><code>?:</code></td>
    <td>三元条件</td>
    <td rowspan="6">从右到左</td>
  </tr>
  <tr>
    <th rowspan="5">14</th>
    <td><code>=</code></td>
    <td>简单赋值</td>
  </tr>
  <tr>
    <td><code>+=</code> <code>-=</code></td>
    <td>以和及差赋值</td>
  </tr>
  <tr>
    <td><code>*=</code> <code>/=</code> <code>%=</code></td>
    <td>以积、商及余数赋值</td>
  </tr>
  <tr>
    <td><code>&lt;&lt;=</code> <code>&gt;&gt;=</code></td>
    <td>以逐位左移及右移赋值</td>
  </tr>
  <tr>
    <td><code>&amp;=</code> <code>^=</code> <code>|=</code></td>
    <td>以逐位与、异或及或赋值</td>
  </tr>
  <tr>
    <th>15</th>
    <td><code>,</code></td>
    <td>逗号</td>
    <td>从左到右</td>
  </tr>
  </tbody>
</table>

参考：https://zh.cppreference.com/w/c/language/operator_precedence

## 控制结构

### 顺序结构

按照语句的顺序执行，没有特定的控制流程。

```c
int a = 5;
int b = 10;
int sum = a + b; // 顺序执行，计算a和b的和
```

### 选择结构

**if-else 语句**：根据条件选择执行不同的代码块。

```c
int x = 15;
if (x > 10) {
  printf("x大于10\n");
} else {
  printf("x不大于10\n");
}
```

**switch 语句**：根据不同的情况选择执行不同的代码块。

```c
int day = 3;
switch (day) {
  case 1:
    printf("星期一\n");
    break;
  case 2:
    printf("星期二\n");
    break;
  default:
    printf("其他天\n");
}
```

### 循环结构

**while 循环**：在条件为真时重复执行代码块。

```c
// while循环
int i = 0;
while (i < 5) {
  printf("%d\n", i);
  i++;
}
```

**do-while 循环**：先执行一次代码块，然后在条件为真时重复执行。

```c
int j = 0;
do {
  printf("%d\n", j);
  j++;
} while (j < 5);
```

**for 循环**：按照给定的初始化、条件和递增/递减来重复执行代码块。

```c
for (int k = 0; k < 5; k++) {
  printf("%d\n", k);
}
```

### 跳转结构

**break 语句**：在循环或 switch 语句中，用于跳出当前循环或 switch。

```c
for (int m = 0; m < 10; m++) {
  if (m == 5) {
    break; // 当m等于5时跳出循环
  }
  printf("%d\n", m);
}
```

**continue 语句**：在循环中，用于跳过剩余的循环体并开始下一次迭代。

```c
for (int n = 0; n < 5; n++) {
  if (n == 2) {
    continue; // 当n等于2时跳过当前迭代
  }
  printf("%d\n", n);
}
```

**goto 语句**：通过标签跳转到代码的不同位置。

```c
int number = 0;
loop: // 标签
if (number < 5) {
  printf("%d\n", number);
  number++;
  goto loop; // 跳转到标签loop处
}
```

## 作用域与生命周期

### 作用域

- **函数作用域**：在函数内部声明的变量具有函数作用域，只能在声明它们的函数内部使用。这些变量在函数执行期间存在，并在函数执行结束后被销毁。
- **文件作用域**：在函数外部声明的变量具有文件作用域，它们在整个文件内可见，但不能被其他文件访问。这些变量在程序执行期间存在，直到程序结束。
- **块作用域**：在代码块（由大括号 `{}` 包围的部分）内声明的变量具有块作用域，只能在该块内部使用。

### 生命周期修饰符

- **auto**：默认的存储类别修饰符，用于声明具有函数作用域的变量。变量在函数内部自动分配内存，其生命周期与函数调用周期相同。
- **static**：静态存储类别修饰符。在全局变量中，`static` 修饰符使变量具有文件作用域，只在声明它的文件内可见。在局部变量中，`static` 使变量具有函数作用域，并且其生命周期会延长到程序的整个执行过程。静态局部变量的值在函数调用之间保持不变，不会像普通局部变量一样在函数调用结束后销毁。它们的值在第一次函数调用时初始化，并在后续调用中保持之前的值。
- **extern**：用于声明变量或函数的外部链接性，在一个文件中声明变量或函数，然后在其他文件中使用它们。`extern` 关键字告诉编译器该标识符在其他地方定义，而不是在当前文件中定义。声明具有 `extern` 关键字的变量或函数时，不分配存储空间，只是引用其他地方定义的标识符。

## 数组与指针

如果初始化数组但不赋值，那么数组的内容是随机的。如果使用 `{}` 初始化数组，那么没有显示声明的元素都会默认初始化为 0。

```c
int fa[] = {};
int a[10];

// int a[];
// error: 不允许使用不完整的类型

int b[2] = {};

// int b[2] = {1, 2, 3};
// error: 初始值设定项太多
```

对于多维数组，仅允许空缺最高维。

```c
int c[][5] = {{1, 2}, {1}};

// int c[][2] = {{1, 2, 3}};
// error: 初始值设定项太多

// int c[5][];
// error: 数组不能包含此类型的元素
```

数组名实际上是一个带有长度参数的指向数组首元素的静态指针。`指针 + 1` 实际上是 `指针指向的地址 + sizeof(指针类型)`。

```c
  int f[] = {10, 20};
  printf("%x %d %d\n", f, f[0], *f);
  // 52bffb08 10 10
  printf("%x %d %d\n", f + 1, f[1], *(f + 1));
  // 52bffb0c 20 20
  printf("%x %d %d\n", (void *)f + 1, f[1], *(int *)((void *)f + 1));
  // 52bffb09 20 335544320
```

指针传参数组时，只有最外层的数组长度可以不同（实际上是因为最外层的数组退化成了指针，丢失了长度信息）。

```c
void fun(int p[4][2])
{
  for (int i = 0; i < 4; i++)
  {
  for (int j = 0; j < 2; j++)
    printf("%d ", p[i][j]);
  printf("\n");
  }
}

int a[3][2] = {1, 2, 3, 4, 5, 6};
int b[3][1], c[3][3];
fun(a);
// 1 2
// 3 4
// 5 6
// -1475524368 371
// 超出的内容会直接溢出

// fun(b);
// cannot convert 'int (*)[1]' to 'int (*)[2]'

// fun(c);
// cannot convert 'int (*)[3]' to 'int (*)[2]'
```

### 基础排序算法

**冒泡排序**：一次比较两个元素，如果它们的顺序错误就将它们交换。

```c
void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}
```

**选择排序**：每次从未排序的部分选择最小的元素，放到已排序部分的末尾。

```c
void selectionSort(int arr[], int n) {
  int minIndex;
  for (int i = 0; i < n - 1; i++) {
    minIndex = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    int temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
}
```

**插入排序**：将未排序的元素插入到已排序部分的合适位置。

```c
void insertionSort(int arr[], int n) {
  int key, j;
  for (int i = 1; i < n; i++) {
    key = arr[i];
    j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}
```

## 字符串

声明字符串的两种方式：

- `char \*str`：字符串常量。存储在只读内存段，不可修改。
- `char str[]`：字符数组。可以修改。

### 常用字符串库函数

- `strlen()`：计算字符串的长度，不包括字符串末尾的空字符 `\0`。

  ```c
  char str[] = "Hello";
  size_t length = strlen(str);
  printf("Length of string: %zu\n", length); // Output: Length of string: 5
  ```

- `strcpy()`：将一个字符串拷贝到另一个字符串中。

  ```c
  char source[] = "Hello";
  char destination[20];
  strcpy(destination, source);
  printf("Destination: %s\n", destination); // Output: Destination: Hello
  ```

- `strcat()`：将一个字符串追加到另一个字符串的末尾。

  ```c
  char str1[20] = "Hello";
  char str2[] = " World";
  strcat(str1, str2);
  printf("Concatenated string: %s\n", str1); // Output: Concatenated string: Hello World
  ```

- `strcmp()`：比较两个字符串的大小关系。

  ```c
  char str1[] = "apple";
  char str2[] = "banana";
  int result = strcmp(str1, str2);
  if (result < 0) {
    printf("str1 is less than str2\n");
  } else if (result > 0) {
    printf("str1 is greater than str2\n");
  } else {
    printf("str1 is equal to str2\n");
  }
  ```

- `strstr()`：在一个字符串中查找另一个字符串第一次出现的位置。

  ```c
  char str[] = "Hello, how are you?";
  char substr[] = "how";
  char* found = strstr(str, substr);
  if (found != NULL) {
    printf("Substring found at position: %ld\n", found - str); // Output: Substring found at position: 7
  } else {
    printf("Substring not found\n");
  }
  ```

## 其他

### 输入与输出

- `printf(const char *format, ...)`：将格式化数据输出到控制台。
- `scanf(const char *format, ...)`：从控制台读取输入数据。
- `puts(const char *str)`：输出字符串到控制台，并自动添加换行符。
- `gets(char *str)`：从标准输入中获取一行字符串。（**存在安全隐患，不推荐使用**）
- `putchar(int character)`：将一个字符输出到控制台。
- `getchar(void)`：从标准输入中获取一个字符。

**格式字符串**

| 格式符号 | 含义                                              |
| -------- | ------------------------------------------------- |
| `%d`     | 以十进制形式输出整数                              |
| `%ld`    | 以长整型（long）十进制形式输出整数                |
| `%u`     | 以无符号十进制形式输出整数                        |
| `%lu`    | 以无符号长整型（unsigned long）十进制形式输出整数 |
| `%x`     | 以十六进制形式输出整数（小写字母）                |
| `%X`     | 以十六进制形式输出整数（大写字母）                |
| `%o`     | 以八进制形式输出整数                              |
| `%c`     | 输出字符                                          |
| `%s`     | 输出字符串                                        |
| `%f`     | 以十进制形式输出浮点数                            |
| `%e`     | 以指数形式输出浮点数（小写字母 e）                |
| `%E`     | 以指数形式输出浮点数（大写字母 E）                |
| `%g`     | 根据值的大小决定是用`%f`还是`%e`                  |
| `%G`     | 根据值的大小决定是用`%f`还是`%E`                  |
| `%p`     | 输出指针的地址                                    |
| `%%`     | 输出百分号 `%`                                    |
| `%5d`    | 输出宽度为 5 的十进制整数，右对齐                 |
| `%-5d`   | 输出宽度为 5 的十进制整数，左对齐                 |
| `%05d`   | 输出宽度为 5 的十进制整数，用 0 填充空白          |
| `%8.2f`  | 输出宽度为 8 的浮点数，保留 2 位小数              |
| `%-8.2f` | 输出宽度为 8 的浮点数，保留 2 位小数，左对齐      |
| `%10s`   | 输出宽度为 10 的字符串，右对齐                    |
| `%-10s`  | 输出宽度为 10 的字符串，左对齐                    |

### 随机数

在 C 语言中，可以使用 `rand()` 函数来生成伪随机数。通常情况下，随机数的范围在 0 到 32767 之间。

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
  int i, n;
  // 设置随机数种子
  srand(time(0));

  n = rand();      // 生成随机数
  n = rand() % 10; // 生成0到10之间的随机数

  return 0;
}
```

### 链表

链表是一种常见的线性数据结构，它由一系列节点组成，每个节点包含两部分：数据部分和指向下一个节点的指针。链表中的节点按照线性顺序排列，但在内存中可以不是连续存储的。

```c
#include <stdio.h>
#include <stdlib.h>

struct Node {
  int data;
  struct Node* next;
};

void append(struct Node* head , int data) {
  struct Node* p = head;
  struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
  new_node->data = data;
  new_node->next = NULL;

  while (p->next != NULL) {
    p = p->next;
  }
  p->next = new_node;
}
```
