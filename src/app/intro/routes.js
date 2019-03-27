import Intro from './components/index'
import i18n from './i18n'

export default [
  {
    path: '/',
    name: 'intro',
    component: Intro,
    meta: {
      title: {
        de: i18n.de.intro.title,
        en: i18n.en.intro.title
      }
    }
  }
]
