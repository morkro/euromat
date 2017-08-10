import Vue from 'vue'
import Router from 'vue-router'

import { routes as euromat } from '@/app/euromat'
import { routes as results } from '@/app/results'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    ...euromat,
    ...results
  ]
})
