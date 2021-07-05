import { loadContent } from '@/helper/content'

const theses = loadContent('theses', require.context('./content/theses', false, /\.json$/))
const emphasis = loadContent('emphasis', require.context('./content/emphasis', false, /\.json$/))
const results = loadContent('results', require.context('./content/results', false, /\.json$/))

const availablesLanguages = [
  ...new Set([theses, emphasis, results].map(Object.keys).reduce((acc, cur) => acc.concat(cur), []))
]

const i18n = availablesLanguages.reduce((acc, cur) => {
  acc[cur] = {}

  if (theses.hasOwnProperty(cur)) {
    acc[cur] = { ...acc[cur], ...theses[cur] }
  }
  if (emphasis.hasOwnProperty(cur)) {
    acc[cur] = { ...acc[cur], ...emphasis[cur] }
  }
  if (results.hasOwnProperty(cur)) {
    acc[cur] = { ...acc[cur], ...results[cur] }
  }

  return acc
}, {})

export default i18n
