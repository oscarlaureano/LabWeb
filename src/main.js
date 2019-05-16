import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.options.root = 'http://52.191.252.19:3000/'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
