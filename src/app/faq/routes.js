import { getTranslatedTitles } from '@/i18n/helper'
import i18n from './i18n'

export default [
  {
    path: 'faq',
    // alias: getTranslatedAliases('faq'),
    name: 'faq',
    component: () => import('./components/index' /* webpackChunkName: "faq" */),
    meta: {
      title: getTranslatedTitles(i18n, 'faq')
    }
  }
]
