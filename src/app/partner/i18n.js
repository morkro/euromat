import { loadContent } from '@/helper/content'

export default loadContent(
  'partner',
  require.context('./content', false, /\.json$/)
)
