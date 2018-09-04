# 基于 Vue 的管理系统前端实践

[TOC]

## 初始化项目

使用 Vue-cli3 初始化项目<sup>1</sup>

安装 Element UI

安装 Vue-i18n，做相关配置<sup>2,3</sup>

> 原则上需要对 Element 也做 I18n 的处理，但是我觉得 Element 中已经有很完善的多语言翻译，而 Element 自身尚不支持 Vue-i18n 7+ 版本，要特殊处理，想了想算了。

## 项目结构

```
.
|-- babel.config.js
|-- package.json
|-- public
|   `-- index.html
|-- src
|   |-- App.vue
|   |-- assets      // 图片等资源文件目录
|   |-- components  // 所有非 `<router-view />` 中显示的页面的 Vue 组件
|   |   |-- mainMenu.vue    // 左侧导航
|   |   |-- pureTitle.vue   // 通用的 Title 组件，项目中有多个页面会用到
|   |   |-- search.vue      // 通用的 Search 头部组件，同样会用到
|   |   `-- userCenter.vue  // 字面意思用户中心，目前只需要显示用户名，handle 用户退出操作。可预见：下拉菜单操作、头像显示等...
|   |-- main.js  // Vue-cli 生成的项目基本文件
|   |-- router.js  // Vue-cli 生成，路由
|   |-- store  // Vuex相关
|   |   |-- index.js
|   |   |-- module
|   |   |   |-- courses.js
|   |   |   |-- manage.js
|   |   |   |-- user.js
|   |   |   `-- verify.js
|   |   `-- mutationTypes.js
|   |-- utils
|   |   |-- i18n
|   |   |   |-- index.js
|   |   |   `-- lang
|   |   |       |-- en.json
|   |   |       `-- zh.json
|   |   |-- request  // 处理所有 ajax 请求
|   |   |   |-- courses.js
|   |   |   |-- index.js
|   |   |   |-- mainPage.js
|   |   |   |-- manage.js
|   |   |   |-- user.js
|   |   |   `-- verify.js
|   |   |-- timeHelper.js  // 时间戳转换帮助函数
|   |   `-- userHelper.js  // 保存用户信息帮助函数
|   `-- views  // `<router-view /> 下内容显示组件`
|       |-- Home.vue
|       |-- InsDetail.vue
|       |-- Login.vue
|       |-- MainPage.vue
|       |-- Manage.vue
|       |-- Patrol.vue
|       |-- UserDetail.vue
|       |-- Verify.vue
|       `-- VerifyDetail.vue
`-- vue.config.js  // 更改 Vue-cli 默认配置
```

## Element 的按需加载

先看一张项目初始状态下，全局引入 Element & 按需引入打包大小的对比：

![](../pics/vue-manage-sys/2018-8-8_16-16-57.jpg)

![](../pics/vue-manage-sys/2018-8-8_16-16-27.jpg)

### How

参考：[按需引入](https://element.eleme.io/#/zh-CN/component/quickstart#an-xu-yin-ru)

需要注意的地方是：

1. 不用新建 `.babelrc` 文件，只需要更改 `babel.config.js`

2. 使用 Vue-cli 初始化项目后， `presets` 中为 `['@vue/app']`，不需要更改为 element 官网中的 `es2015` 。原因是 babel 的目前版本已经不推荐按照 JavaScript 版本来区分编译目标。（// todo：添加相关链接）

可用的 `babel.config.js` 文件如下：

```javascript
module.exports = {
  presets: [
    ['@vue/app'],
  ],
  plugins: [
    [
      'component',
      {
        'libraryName': 'element-ui',
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

## 如何保存用户信息和登陆状态



## 尚不明确

1. I18n 的方案不够完善，现在做到了语言文件的热切换，但是对业务来讲似乎没有什么必要。没有做语言字符串的按需加载（事实上是做了但没有实现），但这个似乎比热切更重要一点。

2. 按照 Vue-router 实现了懒加载及文件命名，但似乎还是会在第一次进入系统时下载所有文件，可能与路由的配置有关。

## 参考资料

1. [Vue CLI 3](https://cli.vuejs.org/guide/)

2. [Vue I18n](https://kazupon.github.io/vue-i18n/)

3. [如何让一个vue项目支持多语言（vue-i18n）](https://segmentfault.com/a/1190000015008808)

