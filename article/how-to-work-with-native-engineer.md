
## 背景

我厂使用 [rexxar](https://github.com/douban/rexxar-web) 进行 APP 开发。

因此，前端不免需要了解如何与 native 交互，又因此不免需要与客户端同学沟通。

如何高效的与客户端同学沟通？需要了解以下姿势。

## 前置姿势

https://github.com/douban/rexxar-web/blob/master/README.md

## 协议

native 与 webView 交互的过程分为两个部分：

- webView 发送消息通知 native

对应文档中的 `dispatch`，具体参考 [Github](https://github.com/douban/rexxar-web#%E4%BD%BF%E7%94%A8)

- 接收 native 发送的消息（创建 Event listener）

上一步的消息体中，会发送一个 key 形如 `callback` 的字符串，native 会通过调用 js 中和 callback 同名的函数来传递数据。

因此，通过 `callbackListener` 注册同名的全局函数，native 发送消息时就能通过回调接收。这里回调的参数通常是字符串。例如 `'1,2,3'`，代表 `[1, 2, 3]`，注意类型转换。

需要和 native 同学沟通的是形如：

1. 定义如何交互：
```
  douban://rexxar-container/widget/quiz?data=
	{
		status: ‘finish’|’cancel’|’’
	}
```

2. 定义页面路径(map.json)：

https://github.intra.douban.com/jiaoyang/frodo-rexxar/blob/master/app/src/user/map.json

