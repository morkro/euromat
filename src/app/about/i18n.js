import { loadContent } from '@/helper/content'

export default loadContent('about', require.context('./content', false, /\.json$/))
