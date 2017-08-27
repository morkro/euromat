import Privacy from './components/index'
import i18n from './i18n'

export default [
  {
    path: '/datenschutz',
    alias: '/privacy',
    name: 'privacy',
    component: Privacy,
    meta: {
      title: {
        de: i18n.de.privacy.pageTitle,
        en: i18n.en.privacy.pageTitle
      }
    }
  }
]
