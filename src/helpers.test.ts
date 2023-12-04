// sum.test.js
import { expect, test } from 'vitest'
import { alternateLinkTwitter, alternateLinkYoutube, isUrlTwitter, isUrlYoutube, siteAlternateLink, siteAlternates } from './helpers'

const twitter_true = new Map<string, string>([
  ['x.com', 'x.com'],
  ['https://x.com', 'x.com'],
  ['https://x.com/wa', 'x.com'],
  ['www.x.com', 'www.x.com'],
  ['www.x.com/wa', 'www.x.com'],
  ['www.x.com#wa', 'www.x.com'],
  ['www.x.com?wa', 'www.x.com'],
  ['https://www.x.com', 'www.x.com'],
  ['https://www.x.com/wa', 'www.x.com'],
  ['http://www.x.com/wa', 'www.x.com'],
  ['t.co', 't.co'],
  ['https://t.co', 't.co'],
  ['https://t.co/wa', 't.co'],
  ['wut://t.co', 't.co'],
  ['https://twitter.com/usrname/staus/120307466181251', 'twitter.com']
])

for (const [ test_string, site ] of twitter_true.entries()) {
  test(`${test_string} is twitter`, () => {
    expect(isUrlTwitter(test_string)).toBe(site)
  })
}

const twitter_false = [
  'blah',
  'twitter',
  'in va li d',
  '/twitter.co'
]

for (const entry of twitter_false) {
  test(`${entry} is not twitter`, () => {
    expect(isUrlTwitter(entry)).toBe(null)
  })
}

test(`replace twitter.com with alt`, () => {
  expect(alternateLinkTwitter('twitter.com', 'twit.example.org')).toEqual('twit.example.org')
})
test(`replace twitter.com with alt`, () => {
  expect(alternateLinkTwitter('https://twitter.com', 'twit.example.org')).toEqual('https://twit.example.org/')
})
test(`replace twitter.com with alt`, () => {
  expect(alternateLinkTwitter('https://twitter.com/a', 'twit.example.org')).toEqual('https://twit.example.org/a')
})
test(`replace twitter.com with alt`, () => {
  expect(alternateLinkTwitter('https://twitter.com#a', 'twit.example.org')).toEqual('https://twit.example.org/#a')
})
test(`replace twitter.com with alt`, () => {
  expect(alternateLinkTwitter('https://twitter.com?a', 'twit.example.org')).toEqual('https://twit.example.org/?a')
})
test(`replace twitter.com with alt`, () => {
  expect(alternateLinkTwitter('https://twitter.com/usrname/staus/120307466181251', 'twit.example.org'))
    .toEqual('https://twit.example.org/usrname/staus/120307466181251')
})
test(`replace twitter.com with alt`, () => {
  expect(alternateLinkTwitter('https://twitter.com/usrname/staus/120307466181251', 'https://twit.example.org'))
    .toEqual('https://twit.example.org/usrname/staus/120307466181251')
})


const youtube_true = new Map<string, string>([
  ['youtube.com', 'youtube.com'],
  ['https://youtube.com', 'youtube.com'],
  ['https://youtube.com/wa', 'youtube.com'],
  ['www.youtube.com', 'www.youtube.com'],
  ['www.youtube.com/wa', 'www.youtube.com'],
  ['www.youtube.com#wa', 'www.youtube.com'],
  ['www.youtube.com?wa', 'www.youtube.com'],
  ['https://www.youtube.com', 'www.youtube.com'],
  ['https://www.youtube.com/wa', 'www.youtube.com'],
  ['http://www.youtube.com/wa', 'www.youtube.com'],
  ['youtu.be', 'youtu.be'],
  ['youtube.com#youtube.com', 'youtube.com'],
  ['https://youtu.be', 'youtu.be'],
  ['https://youtu.be/wa', 'youtu.be'],
  ['wut://youtu.be', 'youtu.be'],
])

for (const [ test_string, site ] of youtube_true.entries()) {
  test(`${test_string} is youtube`, () => {
    expect(isUrlYoutube(test_string)).toBe(site)
  })
}

const youtube_false = [
  'youtu.bea',
  '?youtube.com',
  '/twitter.co'
]

for (const entry of youtube_false) {
  test(`${entry} is not youtube`, () => {
    expect(isUrlYoutube(entry)).toBe(null)
  })
}

test(`replace youtu.be with alt`, () => {
  expect(alternateLinkYoutube('youtu.be', 'www.youtube.com'))
    .toEqual('https://www.youtube.com/')
})
test(`replace youtu.be with alt`, () => {
  expect(alternateLinkYoutube('youtu.be?t=1', 'www.youtube.com'))
    .toEqual('https://www.youtube.com/?t=1')
})
test(`replace youtu.be/id with alt`, () => {
  expect(alternateLinkYoutube('youtu.be/aid', 'www.youtube.com'))
    .toEqual('https://www.youtube.com/watch?v=aid')
})
test(`replace youtu.be/id?t=180 with alt`, () => {
  expect(alternateLinkYoutube('youtu.be/aid?t=180', 'www.youtube.com'))
    .toEqual('https://www.youtube.com/watch?v=aid&t=180')
})
test(`replace www.youtube.com with alt`, () => {
  expect(alternateLinkYoutube('https://www.youtube.com', 'yt.example.org'))
    .toEqual('https://yt.example.org/')
})
test(`replace www.youtube.com with alt`, () => {
  expect(alternateLinkYoutube('https://www.youtube.com/watch?v=ii', 'yt.example.org'))
    .toEqual('https://yt.example.org/watch?v=ii')
})

test(`site for a url with a site alternate`, () => {
  expect(siteAlternates('https://twitter.com/usrname/staus/120307466181251'))
    .toEqual('twitter')
})

test(`url for a site alternate link - twitter`, () => {
  expect(siteAlternateLink('https://twitter.com/usrname/staus/120307466181251', 'alt_tweet','',''))
    .toEqual('https://alt_tweet/usrname/staus/120307466181251')
})

test(`url for a site alternate link - youtube`, () => {
  expect(siteAlternateLink('https://youtube.com/watch/120307466181251', '','alt_yt',''))
    .toEqual('https://alt_yt/watch/120307466181251')
})

test(`url for a site alternate link - reddit`, () => {
  expect(siteAlternateLink('https://reddit.com/u/820307466181251', '','','alt_lr'))
    .toEqual('https://alt_lr/u/820307466181251')
})
