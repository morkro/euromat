import { loadContent } from '@/helper/content'

export default loadContent(
  'faq',
  require.context('./content', false, /\.json$/)
)
