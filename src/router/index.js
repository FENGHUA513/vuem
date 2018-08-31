import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Login from '@/pages/login'
import Chatzh from '@/pages/chatroom/chinese'
import Chaten from '@/pages/chatroom/english'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/chatzh',
      name: 'Chatzh',
      component: Chatzh
    },
    {
      path: '/chaten',
      name: 'Chaten',
      component: Chaten
    }
  ]
})
