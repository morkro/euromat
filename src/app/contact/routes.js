import { DEFAULT_LOCALE } from '@/config'
import { getTranslatedTitles, getTranslatedAliases } from '@/i18n/helper'
import i18n from './i18n'

export default [
  {
    path: i18n[DEFAULT_LOCALE].contact.url,
    alias: getTranslatedAliases(i18n, 'contact'),
    name: 'contact',
    component: () => import('./components/index' /* webpackChunkName: "contact" */),
    meta: {
      title: getTranslatedTitles(i18n, 'contact'),
    },
  },
]
