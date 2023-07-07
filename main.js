import App from './App'
import { $http } from '@escook/request-miniprogram'

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

uni.$showMsg = (title='数据加载失败！', duration=1500)=>{			// 默认值
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif