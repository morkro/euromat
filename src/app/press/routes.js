import Press from './components/index'
import i18n from './i18n'

export default [
  {
    path: '/' + i18n.de.press.url,
    alias: '/' + i18n.en.press.url,
    name: 'press',
    component: Press,
    meta: {
      title: {
        de: i18n.de.press.title,
        en: i18n.en.press.title
      }
    }
  }
]
