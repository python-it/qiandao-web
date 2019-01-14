import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/login'
import Welcome from '@/pages/welcome'

import {contOperaton} from '@/router/contOperation/index'
import {userManage} from '@/router/userManage/index'
import {systemSetting} from '@/router/systemSetting/index'
import {statCensus} from '@/router/statCensus/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome,
      meta: {
        title: '欢迎',
        crumbs: [
          {
            title: '欢迎',
            url: null
          }
        ]
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录',
        crumbs: [
          {
            title: '登录',
            url: '/login'
          }
        ]
      }
    },
    ...contOperaton,
    ...userManage,
    ...systemSetting,
    ...statCensus
  ]
})
