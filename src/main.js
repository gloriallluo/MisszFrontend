import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import VueRouter from 'vue-router'

import App from './App.vue'
import router from '@/router/router'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
