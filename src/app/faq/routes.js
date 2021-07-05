import { DEFAULT_LOCALE } from '@/config'
import { getTranslatedAliases, getTranslatedTitles } from '@/i18n/helper'
import i18n from './i18n'

export default [
  {
    path: i18n[DEFAULT_LOCALE].faq.url,
    alias: getTranslatedAliases(i18n, 'faq'),
    name: 'faq',
    component: () => import('./components/index' /* webpackChunkName: "faq" */),
    meta: {
      title: getTranslatedTitles(i18n, 'faq'),
    },
  },
]
