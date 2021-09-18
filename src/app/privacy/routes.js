import { DEFAULT_LOCALE } from '@/config'
import { getTranslatedTitles, getTranslatedAliases } from '@/i18n/helper'
import i18n from './i18n'

export default [
  {
    path: i18n[DEFAULT_LOCALE].privacy.url,
    alias: getTranslatedAliases(i18n, 'privacy'),
    name: 'privacy',
    component: () => import('./components/Privacy' /* webpackChunkName: "misc" */),
    meta: {
      title: getTranslatedTitles(i18n, 'privacy'),
    },
  },
]
