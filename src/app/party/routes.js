import Party from './components/index'
import i18n from './i18n'

export default [
  {
    path: '/partei/:token',
    alias: '/party/:token',
    name: 'party',
    component: Party,
    meta: {
      title: {
        de: i18n.de.party.pageTitle,
        en: i18n.en.party.pageTitle
      }
    }
  }
]
