# 你不知道的 JavaScript （笔记

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

## summary 

上来第一张就是编译原理，看起来很高大上，实际上半本书在复述 mdn 文档，半本书在输出作者个人私货。

一边说使用箭头函数是在回避使用 this，一边又鼓吹用“委托”代替对象（我觉得按作者理论这也是在回避 JavaScript 的特点）

翻译有的地方也很迷。e.g.代码片段里的注释，分明是代码运行后的输出，却被翻译成了中文。那为什么代码里不一起翻译呢，误解来源。（这一段可以作为为什么不要读中文版本的技术书籍的证据）

不过话说回来，只有看过之后才可以这么讲，求都不懂的同学还是好好学习不要急着批判。

# 中卷

1 - 4 章基本也是抄 mdn

document.all -> 假值对象 -> 浏览器对象，不再支持

假值对象是作者生造的概念，如果对象中一个属性以前是一个对象，但新版本不再支持，那么本质上，他就是一个值

再也不用写 ‘string’.indexOf('s') === -1 了！ ~'string'.indexOf('s') 更酷 // 不过并没有什么卵用 可以用 includes

比较 的转换比较生僻，a <= b 会被转化为 !(a > b)。在比较两个对象时会出现：

a < b  //false
a == b //false 
a > b  //false

a <= b // true

逗号运算符（就是 for 循环里第一个条件中申明多个变量的操作）

也可以用在 赋值操作 & 返回语句 中，返回值是最右边的值

### 运算符优先级

总之，和我的常识没有出入

## 第二部分

异步操作的副作用，

1. 无限滚动加载的列表。

可以通过设置状态量|标识位，

（一般情况下，都需要客户端发送请求时提供 start & end 参数）这样的话，也可以通过比较 length 和 end 是否一致来判断需要发起请求还是忽略。

2. 依赖两个请求的结果。

比如一个权限菜单，一个接口获取所有权限列表，一个接口获取当前用户拥有的权限。 -> 简单的使用 Promise.all() 等待两个请求完成是最佳实践。


Promise -> 基于 job queue

setTimeout -> 基于 task queue

Promise 的作用不仅仅是让代码更好看，重要的是解决了 回调被调用多次|不被调用的问题，因为只会 resolve 一次。

//（终于快到我最喜欢的 micro task & macro task 环节了！) 

关于 第三方代码 的信任问题 太真实了！

如果他们把回调调用了5次怎么办 

赞美这一章！（划掉

... 一夜没睡（误，回调被调5次是伪需求啊。一次 HTTP 请求 成功 | 失败，也只会产生一次回调，像作者举例，使用第三方支付，如果只是根据请求返回的数据回调，根本不可能被调用5次啊。唯一的可能是使用别人的SDK，但 Promise 也无法避免使用第三方 SDK 产生的问题啊。乍一看很有道理，仔细想想胡说八道。

### 生成器

生成器 -> 迭代器

e.g.(不是书中的例子)

1. 产生一个自增的值

```
function IncreaseNum() {
  let num = 0

  return function() {
    return num++
  }
}

let n = new IncreaseNum()
n() // 0
n() // 1
n() // 2
```

and now:
```
function *IncreaseNum() {
  let num = 0

  while(true) {
    yield num++
  }
}

let n = IncreaseNum()

n.next().value // 0
n.next().value // 1
n.next().value // 2
```

### 性能

1. `new Date().getTime()` -> end - start -> 不准确，和JS引擎定时器精度有关

2. benchmark.js

对于特定实现的性能测试是没必要的（比如标准库），影响太小、引擎底层实现策略。 -> “微性能”

