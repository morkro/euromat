import loadContent from '@/helper/content'

export default loadContent(
  'privacy',
  require.context('./content', false, /\.json$/)
)
