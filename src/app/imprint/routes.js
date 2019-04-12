import { DEFAULT_LOCALE } from '@/config'
import { getTranslatedAliases, getTranslatedTitles } from '@/i18n/helper'
import i18n from './i18n'

export default [
  {
    path: i18n[DEFAULT_LOCALE].imprint.url,
    alias: getTranslatedAliases(i18n, 'imprint'),
    name: 'imprint',
    component: () => import('./components/index' /* webpackChunkName: "misc" */),
    meta: {
      title: getTranslatedTitles(i18n, 'imprint')
    }
  }
]
