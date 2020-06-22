import Vue from 'vue'
import './plugins/firebase'
import './plugins/vuefire'
import './plugins/maps'
import './registerServiceWorker'
import './filters'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import './scss/print.scss'

if (process.env.NODE_ENV === 'production') {
  import('./plugins/firebase/analytics').catch()
  import('./plugins/sentry').catch()
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
