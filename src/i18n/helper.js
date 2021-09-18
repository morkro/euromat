import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/config'
import i18n from './index'

/**
 * @typedef {object} UserLanguage
 * @property {string} language
 * @property {string} country
 */

/**
 * @typedef {object} TranslatedTitle
 * @property {string} title
 */

/**
 * @param {string} lang
 * @returns {boolean}
 */
export const isLangSupported = lang => SUPPORTED_LOCALES.some(([locale]) => locale === lang)

/**
 * @returns {string}
 */
export const getCurrentLocale = () => i18n.locale

/**
 * @param {string} locale
 */
export const setCurrentLocale = locale => {
  i18n.locale = locale
  if (document && document.documentElement) {
    document.documentElement.setAttribute('lang', locale)
  }
}

/**
 * @returns {UserLanguage}
 */
export function getUserLanguage() {
  const lang = window.navigator.language || window.navigator.userLanguage || DEFAULT_LOCALE
  return {
    language: lang.split('-')[0],
    country: lang.split('-')[1],
  }
}

/**
 * @returns {string}
 */
export function getUserSupportedLanguage() {
  const { language } = getUserLanguage()
  return isLangSupported(language) ? language : DEFAULT_LOCALE
}

/**
 *
 * @param {object} data
 * @param {string} section
 * @returns {TranslatedTitle}
 */
export function getTranslatedTitles(data, section) {
  return {
    title: Object.keys(data).reduce((acc, cur) => {
      const title = data[cur][section].title
      if (!title) {
        // eslint-disable-next-line no-console
        console.warn(`Property "title" doesn't exist on i18n.de.${section}`)
      }

      acc[cur] = title
      return acc
    }, {}),
  }
}

/**
 * @param {object} data
 * @param {string} section
 * @returns {array}
 */
export function getTranslatedAliases(data, section) {
  return [
    ...new Set(
      Object.keys(data)
        .filter(lang => lang !== DEFAULT_LOCALE)
        .map(lang => data[lang][section].url)
        .filter(url => url !== data[DEFAULT_LOCALE][section].url)
        .filter(Boolean)
    ),
  ]
}

/**
 * @param {string} section
 * @param {string} prefixUrl
 * @param {boolean} omitLocale
 * @returns {string}
 */
export function getTranslatedUrl(section, prefixUrl, omitLocale = false) {
  const messages = i18n.messages[getCurrentLocale()][section]
  const url = messages.url
  const fullUrl = prefixUrl ? `${prefixUrl}/${url}` : url
  return omitLocale ? fullUrl : `/${i18n.locale}/${fullUrl}`
}
