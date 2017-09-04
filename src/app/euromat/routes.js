import Index from './components/index'
import EuroMat from './components/euromat'
import Emphasis from './components/emphasis'
import Results from './components/results'
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
    component: Index,
    children: [
      {
        path: '',
        name: 'euromat',
        component: EuroMat,
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
        component: Emphasis,
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
        component: Results,
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
