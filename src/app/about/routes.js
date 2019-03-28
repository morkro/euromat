import i18n from './i18n'

export default [
  {
    path: '/uber-uns',
    alias: '/about-us',
    name: 'about',
    component: () => import('./components/index' /* webpackChunkName: "about" */),
    meta: {
      title: {
        de: i18n.de.about.pageTitle,
        en: i18n.en.about.pageTitle
      }
    }
  }
]
