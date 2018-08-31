import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Login from '@/pages/login'
import Chatzh from '@/pages/chatroom/chat-zh'
import Chaten from '@/pages/chatroom/chat-en'
import Chatjp from '@/pages/chatroom/chat-jp'
import Chatfra from '@/pages/chatroom/chat-fra'

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
    },
    {
      path: '/chatjp',
      name: 'Chatjp',
      component: Chatjp
    },
    {
      path: '/chatfra',
      name: 'Chatfra',
      component: Chatfra
    }
  ]
})
