import { loadContent } from '@/helper/content'

export default loadContent(
  'imprint',
  require.context('./content', false, /\.json$/)
)
