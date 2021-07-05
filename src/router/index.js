import Vue from 'vue'
import Router from 'vue-router'

import { getUserSupportedLanguage } from '@/i18n/helper'
import BaseLocaleRouter from '@/components/BaseLocaleRouter'
import { getPageTitle, beforeEnter } from '@/router/helper'

import intro from '@/app/intro/routes'
import euromat from '@/app/euromat/routes'
import party from '@/app/party/routes'
import about from '@/app/about/routes'
import partner from '@/app/partner/routes'
import faq from '@/app/faq/routes'
import contact from '@/app/contact/routes'
import imprint from '@/app/imprint/routes'
import privacy from '@/app/privacy/routes'
import fourzerofour from '@/app/404/routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/:locale',
      component: BaseLocaleRouter,
      beforeEnter,
      children: [
        ...intro,
        ...euromat,
        ...party,
        ...about,
        ...partner,
        ...faq,
        ...contact,
        ...imprint,
        ...privacy,
        ...fourzerofour,
      ],
    },
    {
      path: '*',
      redirect(to) {
        return getUserSupportedLanguage()
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    window.document.title = getPageTitle(to.meta.title)
  }

  window.scrollTo(0, 0)
  next()
})

export default router
