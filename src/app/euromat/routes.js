import { DEFAULT_LOCALE } from '@/config'
import i18n from '@/i18n'
import localI18n from './i18n'
import { storageAvailable } from '@/helper/storage'
import { getTranslatedTitles, getTranslatedAliases } from '@/i18n/helper'

function hasAnswers(to, from, next) {
  if (
    !to.params.result &&
    storageAvailable('sessionStorage') &&
    !sessionStorage.getItem('euromat-answers')
  ) {
    next({ path: `/${i18n.locale}/` })
  }
  next()
}

export default [
  {
    path: localI18n[DEFAULT_LOCALE].theses.url,
    alias: getTranslatedAliases(localI18n, 'theses'),
    component: () => import('./components/Euromat' /* webpackChunkName: "euromat" */),
    children: [
      {
        path: '',
        name: 'theses',
        component: () => import('./components/Theses' /* webpackChunkName: "euromat" */),
        meta: {
          title: getTranslatedTitles(localI18n, 'theses'),
        },
      },
      {
        path: localI18n[DEFAULT_LOCALE].emphasis.url,
        alias: getTranslatedAliases(localI18n, 'emphasis'),
        name: 'emphasis',
        component: () => import('./components/Emphasis' /* webpackChunkName: "euromat" */),
        beforeEnter: hasAnswers,
        meta: {
          title: getTranslatedTitles(localI18n, 'emphasis'),
        },
      },
      {
        path: localI18n[DEFAULT_LOCALE].results.url,
        alias: getTranslatedAliases(localI18n, 'results'),
        name: 'results',
        component: () => import('./components/Results' /* webpackChunkName: "euromat" */),
        beforeEnter: hasAnswers,
        meta: {
          title: getTranslatedTitles(localI18n, 'results'),
        },
        children: [
          {
            path: ':result',
            alias: 'results',
            component: () => import('./components/Results' /* webpackChunkName: "euromat" */),
            meta: {
              title: getTranslatedTitles(localI18n, 'results'),
            },
          },
        ],
      },
    ],
  },
]
