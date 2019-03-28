import { loadContent } from '@/helper/content'

export default loadContent(
  'press',
  require.context('./content', false, /\.json$/)
)
