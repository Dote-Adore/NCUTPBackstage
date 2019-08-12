// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'
// import ElementUI from 'element-ui'
import apisetting from './components/axios/ApiSetting'
import http from './components/axios/Http'
// import 'element-ui/lib/theme-chalk/index.css'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
Vue.prototype.$username = ''
Vue.prototype.$http = http
Vue.prototype.$api = apisetting
Vue.config.productionTip = false
Vue.use(ELEMENT)

let haslogin = false

router.beforeEach((to, from, next) => {
  if (haslogin) {
    next()
    return
  }
  if (to.meta.needlogin) {
    // 没有session
    if (!window.localStorage.data) {
      console.log('需要登录')
      next('/login')
      // 有session，自动登录
    } else {
      // 找用户名
      console.log(window.localStorage.data)
      http(apisetting.login, {session: window.localStorage.data}).then((res) => {
        if (res.success) {
          Vue.prototype.$username = res.user
          haslogin = true
        } else {
          next('/login')
        }
      })
      next()
    }
  } else {
    next()
  }
  if (to.meta.index) {
    next('/overview')
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>',
  created () {

  }
})
