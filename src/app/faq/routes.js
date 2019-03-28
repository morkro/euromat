import { getTranslatedTitles } from '@/helper/content'
import i18n from './i18n'

export default [
  {
    path: '/faq',
    // alias: getTranslatedAliases(i18n, 'faq'),
    name: 'faq',
    component: () => import('./components/index' /* webpackChunkName: "faq" */),
    meta: {
      title: getTranslatedTitles(i18n, 'faq')
    }
  }
]
