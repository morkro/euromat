import About from './components/index'
import i18n from './i18n'

export default [
  {
    path: '/uber-uns',
    alias: '/about-us',
    name: 'about',
    component: About,
    meta: {
      title: {
        de: i18n.de.about.pageTitle,
        en: i18n.en.about.pageTitle
      }
    }
  }
]
