import Vue from 'vue'
import VueSVGIcon from 'vue-svgicon'
import VueFeatherIcon from 'vue-feather-icon'

import App from '@/app/app'
import router from './router'
import i18n from './i18n'
import storage from '@/helper/storage'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(VueSVGIcon)
Vue.use(VueFeatherIcon)
Vue.use(storage)

/* eslint-disable no-new */
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
