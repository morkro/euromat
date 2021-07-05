import * as i18n from '@/i18n/helper'

export function getPageTitle(data = {}) {
  const locale = i18n.getUserSupportedLanguage()
  const title = window.document.title.split('—')[0].trim()
  return locale && data.title && data.title[locale] ? `${title} — ${data.title[locale]}` : title
}

export function beforeEnter(to, from, next) {
  const lang = to.params.locale
  if (!i18n.isLangSupported(lang)) {
    return next(i18n.getUserLanguage().language)
  }

  i18n.setCurrentLocale(lang)

  return next()
}
