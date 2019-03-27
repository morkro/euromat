import Party from './components/index'
import i18n from './i18n'

export default [
  {
    path: `/${i18n.de.party.url}/:token`,
    alias: `/${i18n.en.party.url}/:token`,
    name: 'party',
    component: Party,
    meta: {
      title: {
        de: i18n.de.party.title,
        en: i18n.en.party.title
      }
    }
  }
]
