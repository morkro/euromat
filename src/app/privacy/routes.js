import Privacy from './components/index'
import i18n from './i18n'

export default [
  {
    path: '/' + i18n.de.privacy.url,
    alias: '/' + i18n.en.privacy.url,
    name: 'privacy',
    component: Privacy,
    meta: {
      title: {
        de: i18n.de.privacy.title,
        en: i18n.en.privacy.title
      }
    }
  }
]
