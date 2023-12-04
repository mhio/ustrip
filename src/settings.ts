import { useStorage } from '@vueuse/core'

export function useSettings(){
  const alt_reddit = useStorage('alt_reddit', 'https://libreddit.spike.codes')
  const alt_twitter = useStorage('alt_twitter', 'https://nitter.net')
  const alt_youtube = useStorage('alt_youtube', 'https://www.youtube.com')
  const alt_is_default = useStorage('alt_is_default', false)
  const drop_open = useStorage('drop_open', true)
  const dark_theme = useStorage('dark_theme', true)

  return {
    alt_reddit,
    alt_twitter,
    alt_youtube,
    alt_is_default,
    drop_open,
    dark_theme,
  }
}
