import { DEFAULT_LOCALE } from '@/config'
import { getTranslatedTitles, getTranslatedAliases } from '@/helper/content'
import i18n from './i18n'

export default [
  {
    path: '/' + i18n[DEFAULT_LOCALE].about.url,
    alias: getTranslatedAliases(i18n, 'about'),
    name: 'about',
    component: () => import('./components/index' /* webpackChunkName: "about" */),
    meta: {
      title: getTranslatedTitles(i18n, 'about')
    }
  }
]
