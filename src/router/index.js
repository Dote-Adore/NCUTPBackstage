// import Vue from 'vue'
import Router from 'vue-router'
// import allPublish from '@/components/view/allPublish'
// import overview from '@/components/view/overview'
// import login from '@/components/login/login'
// import index from '@/components/index/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/components/index/index'], resolve),
      meta: {
        needlogin: true,
        index: true
      },
      children: [
        {
          path: 'allPublish',
          name: 'allPublish',
          component: resolve => require(['@/components/view/allPublish'], resolve),
          meta: {
            needlogin: true
          }
        },
        {
          path: 'overview',
          name: 'overview',
          component: resolve => require(['@/components/view/overview'], resolve),
          meta: {
            needlogin: true
          }
        },
        {
          path: 'myInfo',
          name: 'MyInfo',
          component: resolve => require(['@/components/view/myInfo'], resolve),
          meta: {
            needlogin: true
          }
        },
        {
          path: 'report',
          name: 'report',
          component: resolve => require(['@/components/view/report'], resolve),
          meta: {
            needlogin: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/view/login'], resolve)
    }
  ]
  //  mode: 'history',
  // base: '/backend/'
})
