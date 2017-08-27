import FAQ from './components/index'
import i18n from './i18n'

export default [
  {
    path: '/faq',
    alias: '/alias',
    name: 'faq',
    component: FAQ,
    meta: {
      title: {
        de: i18n.de.faq.pageTitle,
        en: i18n.en.faq.pageTitle
      }
    }
  }
]
