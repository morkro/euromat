import { DEFAULT_LOCALE } from '@/config'
import { getTranslatedTitles, getTranslatedAliases } from '@/helper/content'
import i18n from './i18n'

export default [
  {
    path: '/' + i18n[DEFAULT_LOCALE].privacy.url,
    alias: getTranslatedAliases(i18n, 'privacy'),
    name: 'privacy',
    component: () => import('./components/index' /* webpackChunkName: "misc" */),
    meta: {
      title: getTranslatedTitles(i18n, 'privacy')
    }
  }
]