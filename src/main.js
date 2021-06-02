import Vue from 'vue'
import ElementUI from 'element-ui'
import Antd from 'ant-design-vue'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import 'ant-design-vue/dist/antd.css'
import VueRouter from 'vue-router'

import App from './App.vue'
import router from '@/router/router'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Antd)
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
