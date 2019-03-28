import i18n from './i18n'
import { storageAvailable } from '@/helper/storage'

function hasAnswers (to, from, next) {
  if (storageAvailable('sessionStorage') && !sessionStorage.getItem('euromat-answers')) {
    next({ path: '/' })
  }
  next()
}

export default [
  {
    path: '/thesen',
    alias: '/theses',
    component: () => import('./components/index' /* webpackChunkName: "euromat" */),
    children: [
      {
        path: '',
        name: 'euromat',
        component: () => import('./components/euromat' /* webpackChunkName: "euromat" */),
        meta: {
          title: {
            de: i18n.de.euromat.euromat.pageTitle,
            en: i18n.en.euromat.euromat.pageTitle
          }
        }
      },
      {
        path: 'gewichtung',
        alias: 'emphasis',
        name: 'emphasis',
        component: () => import('./components/emphasis' /* webpackChunkName: "euromat" */),
        beforeEnter: hasAnswers,
        meta: {
          title: {
            de: i18n.de.euromat.emphasis.pageTitle,
            en: i18n.en.euromat.emphasis.pageTitle
          }
        }
      },
      {
        path: 'ergebnis',
        alias: 'results',
        name: 'results',
        component: () => import('./components/results' /* webpackChunkName: "euromat" */),
        beforeEnter: hasAnswers,
        meta: {
          title: {
            de: i18n.de.euromat.results.pageTitle,
            en: i18n.en.euromat.results.pageTitle
          }
        }
      }
    ]
  }
]
