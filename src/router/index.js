import Vue from 'vue'
import Router from 'vue-router'

import * as i18n from '@/i18n/helper'
import BaseLocaleRouter from '@/components/base-locale-router'
import { getPageTitle, beforeEnter } from '@/router/helper'

import { routes as intro } from '@/app/intro'
import { routes as euromat } from '@/app/euromat'
import { routes as party } from '@/app/party'
import { routes as about } from '@/app/about'
import { routes as faq } from '@/app/faq'
import { routes as press } from '@/app/press'
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
        ...faq,
        ...press,
        ...imprint,
        ...privacy,
        ...fourzerofour
      ]
    },
    {
      path: '*',
      redirect (to) {
        return i18n.getUserSupportedLanguage()
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    window.document.title = getPageTitle(to.meta.title)
  }

  window.scrollTo(0, 0)
  next()
})

export default router
