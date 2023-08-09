---
title: uni-shop-2,
author: Fendi,
date: 2023/7/2,
details: 'A starter uniapp development project, for reference only.'
---

# uni-shop-2 微信小程序

---

## 项目结构

| 文件   | 分类 | 介绍         |
| ------ | ---- | ------------ |
| `Home` | 页面 | 主页面       |
| `Cate` | 页面 | 分类页面     |
| `Cart` | 页面 | 购物车页面   |
| `User` | 页面 | 用户信息页面 |
|        |      |              |
|        |      |              |

---

## 项目 API

**项目域名：**

- `https://www.zhengzhicheng.cn`
- `https://www.autumnfish.cn/wx`——备用
- `https://www.uinac.com`——备用

**home API**

- ==GET==请求、参数==无==：`/api/public/v1/home/swiperdata`

---

## 配置网络请求

> 由于平台限制，小程序中不支持`axios`，原生的`uni.request()`**API** 功能较为简单，**不支持拦截器**等功能，
>
> 建议在`uniapp`项目中使用第三方包`@escook/request-miniprogram`发起数据请求。

[官方文档](https://www.npmjs.com/package/@escook/request-miniprogram)

配置：

```
// 如果项目中没有 npm 环境 -> node_modules文件，下载 npm 依赖
> npm init -y
// 安装第三方包
> npm install @escook/request-miniprogram
```

```js
// main.js
// 引入第三方包对象
import {$http} from '@escook/request-miniprogram'
...

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http

// 配置请求根路径
$http.baseUrl = 'https://www.uinav.com'

// 请求拦截器 - 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
  	title: '数据加载中...'
  })
}

// 响应拦截器 - 请求完成之后做一些事情
$http.afterRequest = function () {
	uni.hideLoading()
}
...
```

---

## 小程序分包

> 将整个项目页面划分为主要页面和其余子页面，减少小程序首次首次启动时加载的时间

1. 在项目根目录中创建分包目录`subpkg`

2. 在`pages.json`，和`pages`节点平级的位置声明，`subPackages`节点，用来定义分包相关结构:

   ```json
   // pages.json
   {
       "pages": [
           ...
       ],
       "subPackages": [
           {									// 分包一
           	"root": "subpkg",				// 分包的根目录
           	"pages": []						// 分包的页面
           },
   		{									// 分包二
               ...
           }
       ]
   }
   ```

3. 此后新建页面在`subpkg`分包目录中，可以选择进入App/小程序分包：`subpkg`，

   创建完成它会自动在`pages.json`下的`subPackages`进行配置

---

## 封装 uni.$showMsg()

> 当发送请求数据 失败 / 成功 过后，开发者经常会用`uni.$showToast({})`方法来提示用户，例如：

```js
async getSwiperList(){
    const { data: res } = await uni.$http.get('../.././')
    // console.log(res);
    if(res... !== 200) {
        return uni.showToast({					// 失败
            title: '请求数据失败...',
            duration: 1500,
            icon: 'none'
        })
    }
    uni.showToast({								// 成功
        title: '请求数据成功...',
        duration: 1500,
        icon: 'none'
    })			
}
```

**我们可以全局封装一个`uni.$showMsg()`方法，来简化`uni.$showToast()`方法的调用**

在`main.js`中，为`uni`对象挂载自定义的`$showMsg()`方法：

```js
// main.js ----- 封装
uni.$showMsg = (title='数据加载失败！', duration=1500)=>{		// 默认值
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}		
```

```js
async getSwiperList(){
	const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
	// console.log(res);
	if(res.meta.status !== 200) return uni.$showMsg()		// 调用 uni.$showMsg
	this.swiperList = res.message
	uni.$showMsg('数据请求成功！')								// 调用 uni.$showMsg
}
```

---

## 优化scroll

> 在小程序中经常用到`<scroll>`，使用`<scroll>`做一二级列表分类时，用户滑动后切换时会导致滚动位置不会回到顶部。

```html
<scroll :scroll-top="scrollTop"></scroll>					// 动态绑定 scrollTop 值
```

```js
data(){
    return {
        scrollTop: 0										// 初始为 0
	}
}
```

```js
...(){														// 用户点击事件触发该函数
    this.scrollTop = this.scrollTop === 0 ? 1 : 0
}
```

---



