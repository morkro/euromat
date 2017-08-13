import Vue from 'vue'
import Router from 'vue-router'

import { routes as intro } from '@/app/intro'
import { routes as euromat } from '@/app/euromat'
import { routes as faq } from '@/app/faq'
import { routes as press } from '@/app/press'
import { routes as imprint } from '@/app/imprint'
import { routes as fourzerofour } from '@/app/404'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    ...intro,
    ...euromat,
    ...faq,
    ...press,
    ...imprint,
    ...fourzerofour
  ]
})
