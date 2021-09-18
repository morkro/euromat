import {
  getUserSupportedLanguage,
  isLangSupported,
  setCurrentLocale,
  getUserLanguage,
} from '@/i18n/helper'

export function getPageTitle(data = {}) {
  const locale = getUserSupportedLanguage()
  const title = window.document.title.split('—')[0].trim()
  return locale && data.title && data.title[locale] ? `${title} — ${data.title[locale]}` : title
}

export function beforeEnter(to, from, next) {
  const lang = to.params.locale
  if (!isLangSupported(lang)) {
    return next(getUserLanguage().language)
  }

  setCurrentLocale(lang)

  return next()
}
