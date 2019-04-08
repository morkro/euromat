import { loadContent } from '@/helper/content'
import options from './options'
import theses from './theses'
import terminology from './terminology'
import parties from './parties'

const i18n = loadContent(
  'meta',
  require.context('./meta', false, /\.json$/)
)

export {
  options,
  theses,
  terminology,
  parties,
  i18n
}
