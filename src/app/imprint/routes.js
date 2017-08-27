import Imprint from './components/index'
import i18n from './i18n'

export default [
  {
    path: '/impressum',
    alias: '/imprint',
    name: 'imprint',
    component: Imprint,
    meta: {
      title: {
        de: i18n.de.imprint.pageTitle,
        en: i18n.en.imprint.pageTitle
      }
    }
  }
]
