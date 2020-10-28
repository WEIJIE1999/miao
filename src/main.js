import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Scroller from '@/components/Scroller'
import Loading from '@/components/Loading'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 将better-srcoll作为全局组件
Vue.component('Scroller', Scroller)
// 将图片加载动画作为全局组件
Vue.component('Loading', Loading)

Vue.prototype.axios = axios

Vue.config.productionTip = false

// 图片地址过滤器
Vue.filter('setWH', (url, arg) => {
  return url.replace(/w\.h/, arg)
})
// 时间过滤器
Vue.filter('dataFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDay() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
