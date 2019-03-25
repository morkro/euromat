import Vue from 'vue'
import VueSVGIcon from 'vue-svgicon'

import App from '@/app/app'
import router from '@/router'
import i18n from '@/i18n'
import storage from '@/helper/storage'

import '@/registerComponents'
import '@/registerServiceWorker'

Vue.config.productionTip = false
Vue.use(VueSVGIcon)
Vue.use(storage)

new Vue({
  router,
  i18n,
  data: {
    backupStorage: {
      answers: undefined,
      emphasized: undefined
    }
  },
  render: h => h(App)
}).$mount('#app')
