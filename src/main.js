import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/style.css'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'

Vue.prototype.$http = axios

// axios.defaults.baseURL = '/apis/'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
