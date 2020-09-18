import Vue from 'vue'
import App from './App.vue'
// import 'bulma/css/bulma.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import i18n from './i18n'

Vue.config.productionTip = false

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
