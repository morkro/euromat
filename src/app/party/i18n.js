import loadContent from '@/helper/content'

export default loadContent(
  'party',
  require.context('./content', false, /\.json$/)
)
