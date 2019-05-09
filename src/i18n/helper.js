import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/config'
import i18n from './index'

export const isLangSupported = lang =>
  SUPPORTED_LOCALES.some(([locale]) => locale === lang)

export const getCurrentLocale = () => i18n.locale
export const setCurrentLocale = (locale) => {
  i18n.locale = locale
  if (document && document.documentElement) {
    document.documentElement.setAttribute('lang', locale)
  }
}

export function getUserLanguage () {
  const lang = (
    window.navigator.language ||
    window.navigator.userLanguage ||
    DEFAULT_LOCALE
  )
  return {
    language: lang.split('-')[0],
    country: lang.split('-')[1]
  }
}

export function getUserSupportedLanguage () {
  const { language } = getUserLanguage()
  return isLangSupported(language)
    ? language
    : DEFAULT_LOCALE
}

export function getTranslatedTitles (data, section) {
  return {
    title: Object.keys(data).reduce((acc, cur) => {
      const title = data[cur][section].title
      if (!title) {
        console.warning(`Property "title" doesn't exist on i18n.de.${section}`)
      }

      acc[cur] = title
      return acc
    }, {})
  }
}

export function getTranslatedAliases (data, section) {
  return [...new Set(
    Object.keys(data)
      .filter(lang => lang !== DEFAULT_LOCALE)
      .map(lang => data[lang][section].url)
      .filter(url => url !== data[DEFAULT_LOCALE][section].url)
      .filter(Boolean)
  )]
}

console.log('getTranslatedAliases inside', getTranslatedAliases)

export function getTranslatedUrl (section, prefixUrl, omitLocale = false) {
  const messages = i18n.messages[getCurrentLocale()][section]
  const url = messages.url
  const fullUrl = prefixUrl ? `${prefixUrl}/${url}` : url
  return omitLocale
    ? fullUrl
    : `/${i18n.locale}/${fullUrl}`
}
