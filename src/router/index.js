import Vue from 'vue'
import Router from 'vue-router'

import getPageTitle from './getPageTitle'
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
  // mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash',
  mode: 'history',
  routes: [
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
})

router.beforeEach((to, from, next) => {
  if (to.meta.title && to.meta.title.de && to.meta.title.en) {
    window.document.title = getPageTitle(to.meta.title)
  }

  window.scrollTo(0, 0)
  next()
})

export default router
