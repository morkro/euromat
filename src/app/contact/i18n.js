import { loadContent } from '@/helper/content'

export default loadContent(
  'contact',
  require.context('./content', false, /\.json$/)
)
