## 作用域

只有函数作用域的时代( var )

在条件语句中声明一个变量（if） -> 在条件语句之外该变量仍然可用

e.g. 

```javascript
  var foo = true
  if (foo) {
    var bar = function () {
      console.log('1')
    }
  }

  bar()  // it works
```

ES6块级作用域( let )

polyfill：with && catch -> since ES3

e.g.

```javascript
  let foo = true
  if (foo) {
    let bar = function () {
      console.log('1')
    }
  }

  bar() // ReferenceError.
```

两个阶段: ①编译 -> ②运行

①：函数声明、变量声明
②：函数调用、变量赋值

=> 变量（函数）提升

变量引用查找 -> 调用栈 && !作用域链

动态作用域：运行时确定；
词法作用域：写代码时确定；

## 闭包

函数记住并可访问所在地词法作用域，即使在当前词法作用域外执行

分为两部分: // todo

应用：回调、模块管理、

## this

混用 this 和 词法作用域

本质上，箭头函数 使用 词法作用域 代替了 this

e.g. P145,注释里的内容为什么要翻译呢，这里很明显是方法调用后的output

## prototype

添加属性时，（可能会）屏蔽原型链上层属性：

if 原型链上找到了

- 属性只读：什么都不变

- 属性有定义 setter：调用 setter

调用 Object.defineProperty({...}) 不限制

## 类

委托 代替 类 -> 我觉得不可取。

