import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import LazyLoad from 'vue-lazyload'
import store from './store' // 关于vuex的引用只能用小写
Vue.config.productionTip = false

Vue.use(LazyLoad,{
  loading:require('common/image/default.png')
})
import 'common/stylus/index.styl'

fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
