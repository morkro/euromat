import { loadContent } from '@/helper/content'

const theses = loadContent(
  'theses',
  require.context('./content/theses', false, /\.json$/)
)
const emphasis = loadContent(
  'emphasis',
  require.context('./content/emphasis', false, /\.json$/)
)
const results = loadContent(
  'results',
  require.context('./content/results', false, /\.json$/)
)

const availablesLanguages =
  [...new Set(
    [theses, emphasis, results]
      .map(Object.keys)
      .reduce((acc, cur) => acc.concat(cur), []))]

const i18n = availablesLanguages.reduce((acc, cur) => {
  acc[cur] = {}

  if (cur in theses) {
    acc[cur] = { ...acc[cur], ...theses[cur] }
  }
  if (cur in emphasis) {
    acc[cur] = { ...acc[cur], ...emphasis[cur] }
  }
  if (cur in results) {
    acc[cur] = { ...acc[cur], ...results[cur] }
  }

  return acc
}, {})

export default i18n
