import { getTranslatedTitles } from '@/helper/content'
import i18n from './i18n'

export default [
  {
    path: '*',
    name: '404',
    component: () => import('./components/index' /* webpackChunkName: "404" */),
    meta: {
      title: getTranslatedTitles(i18n, 'fourzerofour')
    }
  }
]
