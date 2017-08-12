import Vue from 'vue'
import VueSVGIcon from 'vue-svgicon'
import App from '@/app/app'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueSVGIcon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
