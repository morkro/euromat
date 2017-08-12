import Vue from 'vue'
import VueSVGIcon from 'vue-svgicon'
import App from '@/app/app'
import router from './router'
import i18n from './i18n'

Vue.config.productionTip = false
Vue.use(VueSVGIcon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: { App }
})
