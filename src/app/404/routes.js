import { getTranslatedTitles } from '@/i18n/helper'
import i18n from './i18n'

export default [
  {
    path: '*',
    name: '404',
    component: () => import('./components/NotFound' /* webpackChunkName: "404" */),
    meta: {
      title: getTranslatedTitles(i18n, 'fourzerofour'),
    },
  },
]
