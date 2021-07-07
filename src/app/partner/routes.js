import { DEFAULT_LOCALE } from '@/config'
import { getTranslatedTitles, getTranslatedAliases } from '@/i18n/helper'
import i18n from './i18n'

export default [
  {
    path: i18n[DEFAULT_LOCALE].partner.url,
    alias: getTranslatedAliases(i18n, 'partner'),
    name: 'partner',
    component: () => import('./components/Partner' /* webpackChunkName: "partner" */),
    meta: {
      title: getTranslatedTitles(i18n, 'partner'),
    },
  },
]
