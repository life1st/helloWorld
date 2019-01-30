# Overview2018 

效果演示

## 技术栈

react & react-router & react-transition-group

## Point

### router 切换动画

`animateRoute.js`:

```javascript

render() {
  return (
    <Route render={({ location }) => (
      <TransitionGroup>
        <CSSTransition key={location.pathname} classNames={this.props.animateName} timeout={{ enter: 600, exit: 600 }}>
          <Switch key={location.key} location={location}>
            {this.props.children}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )} />
  )
}
```

animateName 就是 transition 的 classNames，通过 props 传进来，根据每个页面的不同配置，可以做到每个页面都有自定义的动画

页面的配置写在了 `/pages/pageConfig.js` 中：
```javascript

// 页面路径的映射
export const PATH = {
  index: '/index',
  map: '/map',
  final: '/final'
}

// 真正使用的路由表 在 `index.js` 中用 map 循环出来
export default [
  {
    path: PATH.index,
    next: PATH.map,
    component: IndexPage
  },
  {
    path: `${PATH.book}/inside`,
    component: BookInside
  },
  {
    path: `${PATH.book}/article`,
    component: BookArticle
  },
]
```

因为在一级页面上需要支持滑动切换页面，所以需要知道上一个页面 || 下一个页面的 path，这里直接写到了当前页面配置的 prev || next 中。
考虑过通过数组的 index 来查找，但比如 `${path}/inside` || `${path}/article` 这样的页面也写在同一层级，区分困难，在当前页面中指定路径更简单直接。
这也是为什么用对象映射路径字符串的原因（需要多次复用的字符串考虑用常量映射

### 动画

css animation，transition，react-transition-group

### 图片

#### 压缩

图片巨多（每个页面 1张题图 1张文字

png 格式，原始容量 250Kb+，

使用 [tinypng](https://tinypng.com)压缩后， 80Kb+ 100Kb-，减少 70% 左右，

有 webpack 插件，需要申请 apiKey，可以缓存。为什么不用？线上图片文件夹和开发不是同一个路径，仍然需要手动更改。

尝试让设计同学输出 jpg 格式，原始容量100Kb+，压缩后差不多。感觉没有必要。

其他压缩工具：腾讯[智图](https://zhitu.isux.us/)，默认效果较差（同样图片压缩后130Kb+）。同样容量图片损失 > Tinypng，同样图片质量容量 > Tinypng. 没有插件。

#### 预加载

线上环境所有图片在同一全局变量下（window.__imgPath__)

Object.keys() 遍历出所有图片地址

new Image() 然后设置 src 为当前图片地址。

每次从数组中取出 2 张图片地址，加载完成后接着取出两张递归

考虑到浏览器同时加载的连接数

有点简单粗暴，细心用户会发现打开页面后流量跑得飞快

#### 交互

实现单张图片分区点击

eg.地图

上层覆盖大小和图片相同的 div ，div 中绝对定位每个小的区域（百分比。因为 div 大小和图片大小一直相同 ➡️ 相对位置也相同 ➡️ 缩放不会导致点击错位

又，图片高度固定（60vh，通过 img.onload 获取到图片对象，获取到图片 offsetWidth 赋值给外层 div

小 icon 也是这样定位的（eg.猫、摄影师、箭头

