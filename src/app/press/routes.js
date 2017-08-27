import Press from './components/index'
import i18n from './i18n'

export default [
  {
    path: '/presse',
    alias: '/press',
    name: 'press',
    component: Press,
    meta: {
      title: {
        de: i18n.de.press.pageTitle,
        en: i18n.en.press.pageTitle
      }
    }
  }
]
