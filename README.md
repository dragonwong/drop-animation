# drop-animation

> 购物车掉落动画是电商的灵魂。—— 鲁迅

浏览器中的掉落动画 🎾

<image src="http://wx1.sinaimg.cn/mw690/4c8b519dly1fbp9qg0mlog20ho0wghdw.gif" width="320" />

## Install

```bash
npm install drop-animation --save
```

## Start

```js
import Dropper from 'drop-animation';

// 新建实例
function onClick() {
  new Dropper({
    element: '<div class="dropper"></div>',
    startPosition: {
      x: x + width / 2,
      y: y + height / 2,
    },
    endPosition,
    width,
    height,
  });
}
```

## Document

### new Dropper(Object opts)

参数 Object opts:

| 属性 | 类型 | 是否必填 | 默认值 | 说明 |
| :-: | :-: | :-: | :-: | :-: |
| element | `Element` \| `String` | 是 | - | 掉落元素
| container | `Element` | 否 | `document.body` | 父级容器
| startPosition.x | `Number` | 否 | `0` | 起点位置横坐标，单位：`px`
| startPosition.y | `Number` | 否 | `0` | 起点位置纵坐标，单位：`px`
| endPosition.x | `Number` | 否 | `0` | 终点位置横坐标，单位：`px`
| endPosition.y | `Number` | 否 | `0` | 终点位置纵坐标，单位：`px`
| width | `Number` | 否 | `0` | 掉落元素宽度，单位：`px`
| height | `Number` | 否 | `0` | 掉落元素高度，单位：`px`
| duration | `Number` | 否 | `600` | 掉落时间，单位：`ms`
| jumpHeight | `Number` | 否 | `60` | 弹跳的高度，单位：`px`
| scale | `Number` | 否 | `1` | 缩放值
| rotate | `Number` | 否 | `360` | 旋转度数
| onEnd | `Function` | 否 | `() => {}` | 动画结束回调
| endAnimation | `Boolean` | 否 | `true` | 是否需要收尾动画
| endRotate | `Number` | 否 | `360` | 收尾旋转角度
| endJumpHeight | `Number` | 否 | `40` | 收尾弹跳的高度，单位：`px`
| endAnimationDuration | `Number` | 否 | `400` | 收尾动画时间，单位：`ms`

## Demo

```bash
cd demo
npm install
npm start
```

访问 http://localhost:3000 查看
