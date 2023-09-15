
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

export function fixLink(url){
  // MIT - Copyright (c) 2010-Present Jon Parise <jon@indelible.org>
  // https://github.com/jparise/chrome-utm-stripper/


  const queryStringIndex = url.indexOf('?')
  if (url.search(searchPattern) > queryStringIndex) {
    let stripped = url.replace(replacePattern, '')
    if (stripped.charAt(queryStringIndex) === '&') {
      stripped = `${stripped.substr(0, queryStringIndex)}?${stripped.substr(queryStringIndex + 1)}`;
    }
    return stripped
  }
  else {
    return url
  }
}

/**
 * Creates a link to an alternate service, if applicable
 * @param url 
 * @returns 
 */
export function alternateLink(url:string){
  if (!url) return ''
  const str_link = String(url)
  if (
    str_link.startsWith('https://x.com/') 
    || str_link.startsWith('x.com/')
    || str_link.startsWith('https://twitter.com/')
    || str_link.startsWith('twitter.com/')
  ){
    return str_link.replace(/[a-z0-9-]+?\.com\//i, 'nitter.net/')
  }
  return str_link
}