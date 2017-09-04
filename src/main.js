import Vue from 'vue'
import VueSVGIcon from 'vue-svgicon'
import VueFeatherIcon from 'vue-feather-icon'

import App from '@/app/app'
import router from './router'
import i18n from './i18n'
import storage from '@/helper/storage'

Vue.config.productionTip = false
Vue.use(VueSVGIcon)
Vue.use(VueFeatherIcon)
Vue.use(storage)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: { App },
  data: {
    backupStorage: {
      answers: undefined,
      emphasized: undefined
    }
  }
})
