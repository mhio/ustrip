
const searchPattern = new RegExp(
  'utm_|stm_|clid|_hs|icid|igshid|linkid|mc_|mkt_tok|yclid|_openstat|wicked|otc|oly_|rb_clickid|soc_|si|ref_', 'i'
)
const replacePattern = new RegExp(
  '([?&]'
  +'('
    +'icid|mkt_tok|(g|fb)clid|igshid|_hs(enc|mi)|linkid|mc_[ce]id|(utm|stm)_(source|medium|term|campaign|content|cid|reader|referrer|name|social|social-type)|rb_clickid|yclid|_openstat|wickedid|otc|oly_(anon|enc)_id|soc_(src|trk)'
    +'|si' // youtube
    +'|ref_(src|url)' // twitter
  +')' 
  +'=[^&#]*)',
  'ig'
)

export function fixLink(url:string){
  // This function and the `searchPattern` and `replacePattern` regular expressions were originally sourced from 
  // https://github.com/jparise/chrome-utm-stripper/
  // MIT - Copyright (c) 2022 Jon Parise <jon@indelible.org>
  const queryStringIndex = url.indexOf('?')
  if (queryStringIndex < 0 || url.search(searchPattern) < queryStringIndex) {
    return url
  }
  let stripped = url.replace(replacePattern, '')
  if (stripped.charAt(queryStringIndex) === '&') {
    stripped = `${stripped.substring(0, queryStringIndex)}?${stripped.substring(queryStringIndex + 1)}`;
  }
  return stripped
}

/**
 * Check if a string has a url delimiter, when it's not a url. 
 * Maybe this should prepend a scheme so it can use `URL`
 * @param url 
 * @returns -1 for no match
 */
function firstSlashQueryOrHash(url:string): number {
  const slash = url.indexOf('/')
  const query = url.indexOf('?')
  const hash = url.indexOf('#')
  if (slash > -1 && hash > -1 && query > -1) return Math.min(slash, query, hash)
  if (slash > -1 && query > -1) return Math.min(slash, query)
  if (slash > -1 && hash > -1) return Math.min(slash, hash)
  if (query > -1 && hash > -1) return Math.min(query, hash)
  if (slash > -1) return slash
  if (query > -1) return query
  if (hash > -1) return hash
  return -1
}

/**
 * generic test for a set of host names. 
 */ 
export function isUrlForSite(url:string, sites:Set<string>): string|null {
  if (!url) return null
  if (sites.has(url)) return url
  const host_part_index = firstSlashQueryOrHash(url)
  const host_part = url.substring(0, host_part_index)
  if (sites.has(host_part)) return host_part
  // Then any url
  try {
    const parsed_url = new URL(url)
    if (sites.has(parsed_url.hostname)) return parsed_url.hostname
    return null
  } catch (error:any) {
    if (error instanceof TypeError) return null
    throw error
  }
}

/**
 * Creates a link to an alternate twitter service, if applicable
 * @param url 
 * @returns 
 */
export function alternateLinkSite(url:string, alt_site:string, sites:Set<string>){
  let str_link = String(url)
  const site = isUrlForSite(url, sites)
  if (!site) return str_link
  let alt_host = parseHostOrReturnOriginal(alt_site)
  if (site === 'youtu.be' && alt_host === 'www.youtube.com'){
    return alternateBuildYoutudotbeUrl(url)
  }
  if (urlStringHasScheme(str_link)) {
    try {
      const str_url = new URL(str_link)
      str_url.hostname = alt_host
      return String(str_url)
    }
    catch (error){
      if (error instanceof TypeError) return str_link.replace(site, alt_host)
      throw error
    }
  }
  return str_link.replace(site, alt_host)
}

/**
 * Creates a mapped link from youtu.be/x to www.youtube.com/watch?v=x
 * @param url 
 * @returns 
 */
export function alternateBuildYoutudotbeUrl(url:string){
  let str_link = url
  if (!urlStringHasScheme(str_link)) {
    str_link = `https://${str_link}`
  }
  try {
    const str_url = new URL(str_link)
    str_url.hostname = 'www.youtube.com'
    if (str_url.pathname === '/') return String(str_url)
    // Generate the v search param for path
    const new_search = new URLSearchParams()
    new_search.set('v', str_url.pathname.replace(/^\//, ''))
    for (const [k,v] of str_url.searchParams.entries()) {
      new_search.append(k,v)
    }
    str_url.pathname = `/watch`
    str_url.search = new_search.toString()
    return String(str_url)
  }
  catch (error){
    if (error instanceof TypeError) return str_link.replace('youtu.be', 'www.youtube.com')
    throw error
  }
}

const twitters = new Set([
  'x.com',
  'www.x.com',
  'twitter.com',
  'www.twitter.com',
  't.co',
])
export function isUrlTwitter(url:string): string|null {
  return isUrlForSite(url, twitters)
}
export function twitterDomains(): string[] {
  return Array.from(twitters)
}

/**
 * Creates a link to an alternate twitter service, if applicable
 * @param url 
 * @returns 
 */
export function alternateLinkTwitter(url:string, new_host:string){
  return alternateLinkSite(url, new_host, twitters)
}

const youtubes = new Set([
  'youtube.com',
  'www.youtube.com',
  'youtu.be', // this one needs extra mapping. from / to /watch?v=id
])
export function isUrlYoutube(url:string): string|null {
  return isUrlForSite(url, youtubes)
}
export function youtubeDomains(): string[] {
  return Array.from(youtubes)
}

/**
 * Creates a link to an alternate youtube service, if applicable
 * @param url 
 * @returns 
 */
export function alternateLinkYoutube(url:string, new_host:string){
  return alternateLinkSite(url, new_host, youtubes)
}

const reddits = new Set([
  'reddit.com',
  'www.reddit.com',
  'redd.it',
])
export function isUrlReddit(url:string): string|null {
  return isUrlForSite(url, reddits)
}
export function redditDomains(): string[] {
  return Array.from(reddits)
}

/**
 * Creates a link to an alternate reddit service, if applicable
 * @param url 
 * @returns 
 */
export function alternateLinkReddit(url:string, new_host:string){
  return alternateLinkSite(url, new_host, reddits)
}

export type TAlternateSiteNames = 'twitter'|'youtube'|'reddit'

export function siteAlternates(
  url:string
) :TAlternateSiteNames|null 
{
  if (isUrlTwitter(url)) return 'twitter'
  if (isUrlYoutube(url)) return 'youtube'
  if (isUrlReddit(url)) return 'reddit'
  return null
}

export function siteAlternateLink(
  url:string, alt_twitter_host:string, alt_youtube_host:string, alt_reddit_host:string
) :string
{
  const site = siteAlternates(url)
  switch (site) {
    case 'twitter': return alternateLinkTwitter(url, alt_twitter_host)
    case 'youtube': return alternateLinkYoutube(url, alt_youtube_host)
    case 'reddit':  return alternateLinkReddit(url, alt_reddit_host)
    default:
      return url
  }
}

export function urlStringHasScheme(url:string): boolean {
  return Boolean(/^[a-z]+:\/\//.exec(url))
}

export function parseHostOrReturnOriginal(site:string){
  if (!urlStringHasScheme(site)) return site
  try { 
    const site_url = new URL(site)
    return site_url.hostname
  }
  catch (error){
    if (error instanceof TypeError) return site
    throw error
  }
}