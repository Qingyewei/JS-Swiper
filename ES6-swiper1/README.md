```
     _      ____                               _
    | |___ / ___|__ _ _ __ ___  _   _ ___  ___
 _  | / __| |   / _` | '__/ _ \| | | / __|/ _ \
| |_| \__ \ |__| (_| | | | (_) | |_| \__ \  __/
 \___/|___/\____\__,_|_|  \___/ \__,_|___/\___|_
                                                 

  .--,       .--,
 ( (  \.---./  ) )
  '.__/o   o\__.'
     {=  ^  =}
      >  -  <
     /       \
    //       \\
   //|   .   |\\
   "'\       /'"_.-~^`'-.
      \  _  /--'         `
    ___)( )(___
   (((__) (__)))    高山仰止,景行行止.虽不能至,心向往之。

   *Author : lisniuse

```
## 一、介绍

用ES6语法写轮播类，代码清晰干净。 纯原生JS编写无任何第三方库依赖，可根据父容器尺寸自适应，兼容所有设备屏幕，代码可扩展。

## 二、简易教程

首先编写轮播图的静态HTML代码像这样：
```html
<div id="carousel" class="container">
    <ul>
        <li>
            <a href="http://baidu.com/">
                <img src="img/1.jpg" alt="">
            </a>
        </li>
        <li>
            <img src="img/2.jpg" alt="">
        </li>
        <li>
            <img src="img/3.jpg" alt="">
        </li>
        <li>
            <img src="img/4.jpg" alt="">
        </li>
    </ul>
</div>
```

接着实例化一个Carousel类。

```js
let playBox = new Carousel({
    containerId: 'carousel',
    showSwitchBtn: false,
    showSwitchCtrl: true,
    playSlowMotion: true,
    playAuto: true,
    playInterval: 2000,
    playFn: function() {
        console.log(playBox.index);
    }
});
```

其中：

| Options name      | Data type     | intro
| ------------- |:-------------:| -----:
| ``containerId``   | String  | 代表容器的ID，例如：carousel
| ``showSwitchBtn``      | Boolean     |   是否显示左右两边的切换按钮
| ``showSwitchCtrl`` | Boolean    |    是否显示底部的轮播控制按钮 
| ``playSlowMotion``   | Boolean  | 是否启用缓动播放 
| ``playAuto``      | Boolean     |  是否自动播放 
| ``playInterval`` | Boolean    |    播放速度（单位毫秒） 
| ``playFn`` | Function    |    播放钩子函数|
 

### API方法
**可以根据API方法自行扩展轮播功能**

| Api Name  |  type    | return  | intro
| ------------- |:---------:|:--------:|-------------:
| ``index``   | Attr  | 索引值 | 获取当前的索引
| ``set(Number:index)`` | Method  | 索引值 | 立即跳转到第index张图片索引的位置
| ``previous(null)`` | Method    | 索引值 |  跳转到上一张，返回跳转后的索引index
| ``next(null)``   | Method  | 索引值 |跳转到下一张，返回跳转后的索引index
| ``reset(null)``  | Method    | 无  |  重置轮播图 |

 
