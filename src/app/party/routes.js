import { DEFAULT_LOCALE } from '@/config'
import { getTranslatedTitles, getTranslatedAliases } from '@/helper/content'
import i18n from './i18n'

export default [
  {
    path: `/${i18n[DEFAULT_LOCALE].party.url}/:token`,
    alias: getTranslatedAliases(i18n, 'party').map(alias => `${alias}/:token`),
    name: 'party',
    component: () => import('./components/index' /* webpackChunkName: "party" */),
    meta: {
      title: getTranslatedTitles(i18n, 'party')
    }
  }
]