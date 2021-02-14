import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueCustomElement from 'vue-custom-element'
// (optional) 'Custom elements polyfill'
import 'document-register-element/build/document-register-element'
require('./plugins')

Vue.config.productionTip = false
Vue.use(vueCustomElement)

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

App.store = store
App.router = router
Vue.customElement('pos-widget', App)