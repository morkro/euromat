import { DEFAULT_LOCALE } from '@/config'
import { getTranslatedTitles, getTranslatedAliases } from '@/i18n/helper'
import i18n from './i18n'

export default [
  {
    path: i18n[DEFAULT_LOCALE].press.url,
    alias: getTranslatedAliases(i18n, 'press'),
    name: 'press',
    component: () => import('./components/index' /* webpackChunkName: "press" */),
    meta: {
      title: getTranslatedTitles(i18n, 'press')
    }
  }
]
