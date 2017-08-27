import Glossary from './components/index'
import i18n from './i18n'

export default [
  {
    path: '/glossar',
    alias: '/glossary',
    name: 'glossary',
    component: Glossary,
    meta: {
      title: {
        de: i18n.de.glossary.pageTitle,
        en: i18n.en.glossary.pageTitle
      }
    }
  }
]
