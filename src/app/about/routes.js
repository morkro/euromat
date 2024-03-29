import { DEFAULT_LOCALE } from '@/config'
import { getTranslatedTitles, getTranslatedAliases } from '@/i18n/helper'
import i18n from './i18n'

export default [
  {
    path: i18n[DEFAULT_LOCALE].about.url,
    alias: getTranslatedAliases(i18n, 'about'),
    name: 'about',
    component: () => import('./components/About' /* webpackChunkName: "about" */),
    meta: {
      title: getTranslatedTitles(i18n, 'about'),
    },
  },
]
