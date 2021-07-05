import Vue from 'vue'
import VueSVGIcon from 'vue-svgicon'
import VueAnalytics from 'vue-analytics'
import { init as initSentry } from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

import App from '@/app/app'
import router from '@/router'
import i18n from '@/i18n'
import storage from '@/helper/storage'
import { getCookie } from '@/helper/cookies'
import { GA_KEY, GA_COOKIE_NAME } from '@/config/analytics'

import '@/registerComponents'
import '@/registerServiceWorker'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(VueSVGIcon)
Vue.use(storage)
Vue.use(VueAnalytics, {
  id: GA_KEY,
  disabled: getCookie(GA_COOKIE_NAME) !== 'true',
  router,
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  }
})

if (process.env.NODE_ENV === 'production') {
  initSentry({
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [new Integrations.Vue({ Vue, attachProps: true })]
  })
}

new Vue({
  i18n,
  router,
  data: {
    backupStorage: {
      answers: undefined,
      emphasized: undefined
    }
  },
  render: h => h(App)
}).$mount('#app')
