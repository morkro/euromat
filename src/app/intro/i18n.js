import loadContent from '@/helper/content'

export default loadContent(
  'intro',
  require.context('./content', false, /\.json$/)
)
