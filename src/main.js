// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import toast from './plugins/toast'
import request from './plugins/request'
import 'assets/styles/common.less'
Vue.config.productionTip = false
Vue.use(toast)
Vue.use(request)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
