import Vue from 'vue'
import Router from 'vue-router'

import { getUserSupportedLanguage } from '@/i18n/helper'
import BaseLocaleRouter from '@/components/BaseLocaleRouter'
import { getPageTitle, beforeEnter } from '@/router/helper'

import { routes as intro } from '@/app/intro'
import { routes as euromat } from '@/app/euromat'
import { routes as party } from '@/app/party'
import { routes as about } from '@/app/about'
import { routes as partner } from '@/app/partner'
import { routes as faq } from '@/app/faq'
import { routes as contact } from '@/app/contact'
import { routes as imprint } from '@/app/imprint'
import { routes as privacy } from '@/app/privacy'
import { routes as fourzerofour } from '@/app/404'

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
