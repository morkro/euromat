import { DEFAULT_LOCALE } from '@/config'
import i18n from '@/i18n'
import localI18n from './i18n'
import { storageAvailable } from '@/helper/storage'
import { getTranslatedAliases, getTranslatedTitles } from '@/i18n/helper'

function hasAnswers (to, from, next) {
  if (storageAvailable('sessionStorage') && !sessionStorage.getItem('euromat-answers')) {
    next({ path: `/${i18n.locale}/` })
  }
  next()
}

export default [
  {
    path: localI18n[DEFAULT_LOCALE].theses.url,
    alias: getTranslatedAliases(localI18n, 'theses'),
    component: () => import('./components/index' /* webpackChunkName: "euromat" */),
    children: [
      {
        path: '',
        name: 'euromat',
        component: () => import('./components/euromat' /* webpackChunkName: "euromat" */),
        meta: {
          title: getTranslatedTitles(localI18n, 'theses')
        }
      },
      {
        path: 'emphasis',
        alias: getTranslatedAliases(localI18n, 'emphasis'),
        name: 'emphasis',
        component: () => import('./components/emphasis' /* webpackChunkName: "euromat" */),
        beforeEnter: hasAnswers,
        meta: {
          title: getTranslatedTitles(localI18n, 'emphasis')
        }
      },
      {
        path: 'results',
        alias: getTranslatedAliases(localI18n, 'results'),
        name: 'results',
        component: () => import('./components/results' /* webpackChunkName: "euromat" */),
        beforeEnter: hasAnswers,
        meta: {
          title: getTranslatedTitles(localI18n, 'results')
        }
      }
    ]
  }
]
