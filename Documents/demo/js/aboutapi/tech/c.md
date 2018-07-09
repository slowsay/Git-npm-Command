# C语言

## 语法

### 关于int main(int argc,chat *argv[])解析
* argc是argv的长度
>在运行程序时一般，在命令行，只有a.out

argc=1;argv[0]='./a.out';

* argv是字符型 指针数组

命令行多一个100

argc=2;argv[0]='./a.out';argv[1]='100';

### 宏定义/头文件/条件编译 #define 标识符 字符串
* 是预处理功能
* 是替换，不作计算，也不做表达式求解
* 宏名一般用大写


* #define PI 3.141516
* #define DEAFUALT [RCOUT PCjack]



* 条件宏编译是指在一定条件下满足才进行编译

* define.cpp文件内编写
* 变量定义分配内存，其他不分配
* 无类型


```
* #ifdef语句1
* //程序2
* #endif
```

用条件编译和printf的区别是，
*printf调试完后，需要一一删除
*条件编译不需要

#### #ifdef
* #define debug--------------删除,就不会输出printf
* #ifdef debug
* printf("sss",file);
* #endif

#### #ifndef
* #ifndef  标识符
* //todo one
* #else
* //todo two
* #endif

标识符未被定义，就执行one，否则执行two.

#### #if
* #if 表达式
* //todo one
* #else
* //todo two
* #endif

#### #if defined(x)
#if defined (x)，x代表一个宏

其实 #ifdef 和 #if defined(x) 的用法一致，而#ifndef也和#if !defined(x)的用法一致。


### 终止宏定义
* #undef


## Debug