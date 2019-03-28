import { DEFAULT_LOCALE } from '@/config'

export function loadContent (prefix, requireContent) {
  if (!prefix || !requireContent) {
    throw new Error('loadContent: prefix and requireContent are both required!')
  }

  return requireContent
    .keys()
    .map(requireContent)
    .reduce((accumulator, current) => {
      accumulator[current.language] = { [prefix]: current }
      return accumulator
    }, {})
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
      .map(lang => '/' + data[lang][section].url)
      .filter(Boolean)
  )]
}
