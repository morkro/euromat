import { loadContent } from '@/helper/content'

export default loadContent(
  'fourzerofour',
  require.context('./content', false, /\.json$/)
)
