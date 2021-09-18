const LOCALE_GERMAN = 'de'
const LOCALE_ENGLISH = 'en'
// const LOCALE_FRENCH = 'fr'
// const LOCALE_POLISH = 'pl'
// const LOCALE_DANISH = 'dk'
// const LOCALE_SLOVENIAN = 'si'
// const LOCALE_CZECH = 'cz'
const DEFAULT_LOCALE = LOCALE_GERMAN

const SUPPORTED_LOCALES = [
  [LOCALE_ENGLISH, 'English'],
  [LOCALE_GERMAN, 'Deutsch'],
  // [LOCALE_FRENCH, 'Français'],
  // [LOCALE_DANISH, 'Dansk'],
  // [LOCALE_SLOVENIAN, 'Slovenščina'],
  // [LOCALE_CZECH, 'Čeština'],
  // [LOCALE_POLISH, 'Polski'],
]

module.exports = {
  // Meta
  EMAIL: 'hello@euromat.info',
  // Analytics
  GA_KEY: 'UA-83519650-2',
  GA_COOKIE_NAME: '_euromat-ga',
  // API
  IPDATA_URL: 'https://api.ipdata.co/?api-key=test',
  // Languages
  LOCALE_GERMAN,
  LOCALE_ENGLISH,
  // LOCALE_FRENCH,
  // LOCALE_POLISH,
  // LOCALE_DANISH,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
}
