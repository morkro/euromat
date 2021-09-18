import Vue from 'vue'
import VueI18n from 'vue-i18n'

import intro from '@/app/intro/i18n'
import euromat from '@/app/euromat/i18n'
import party from '@/app/party/i18n'
import about from '@/app/about/i18n'
import fourzerofour from '@/app/404/i18n'
import faq from '@/app/faq/i18n'
import contact from '@/app/contact/i18n'
import imprint from '@/app/imprint/i18n'
import privacy from '@/app/privacy/i18n'
import { i18n as meta } from '@/data'

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/config'

Vue.use(VueI18n)

const messages = [meta, intro, euromat, party, about, fourzerofour, faq, contact, imprint, privacy]

function getLanguage(locale) {
  return messages.reduce(
    (acc, cur) => ({
      ...acc,
      ...cur[locale],
    }),
    {}
  )
}

const i18n = new VueI18n({
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: SUPPORTED_LOCALES.reduce(
    (acc, [locale]) => ({
      ...acc,
      [locale]: getLanguage(locale),
    }),
    {}
  ),
})

export default i18n
