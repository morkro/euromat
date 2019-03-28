import i18n from './i18n'

export default [
  {
    path: '/',
    name: 'intro',
    component: () => import('./components/index' /* webpackChunkName: "intro" */),
    meta: {
      title: {
        de: i18n.de.intro.title,
        en: i18n.en.intro.title
      }
    }
  }
]
