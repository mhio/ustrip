<template>
  <v-app>
    <v-main>
      <v-card elevation="0" class="ma-0">
        <v-card-text>
          <p class="mb-4">Remove <code>utm_</code> like tracking query paramaters from a URL</p>
          <v-text-field density="compact" label="URL" v-model="link"></v-text-field>
          <v-text-field density="compact" label="Fixed" v-model="fixed_link">
            <template v-slot:append>
              <v-btn raised :href="fixed_link" target="_blank" class="mr-1" icon density="comfortable">
                <v-icon icon="mdi-open-in-new"/>
              </v-btn>
              <v-btn raised @click="copyText" class="ml-1" icon density="comfortable"><v-icon icon="mdi-content-copy"/></v-btn>
            </template> 
          </v-text-field>
          <div class="d-flex">
            <div class="flex-grow-1"><v-text-field density="compact" label="Alt" v-model="alt_link">
              <template v-slot:append>
                <v-btn raised :href="alt_link" target="_blank" class="mr-1" icon density="comfortable">
                  <v-icon icon="mdi-open-in-new"/>
                </v-btn>
                <v-btn raised @click="copyTextAlt" class="ml-1" icon density="comfortable"><v-icon icon="mdi-content-copy"/></v-btn>
              </template> 
             </v-text-field></div>
          </div>
          <p class="mb-4"><v-icon class="mr-1" icon="mdi-open-in-new"/><b>Open</b> the fixed URL in a new window or <v-icon class="mr-1" icon="mdi-content-copy"/><b>Copy</b> the URL to the clipboard</p>
        </v-card-text>
      </v-card>
    </v-main>
    <v-footer height="22" class="bg-grey-lighten-3 flex-shrink-1 flex-grow-0 text-caption">
      <a class="text-decoration-none text-medium-emphasis" href="https://github.com/mhio/ustrip">mhio/ustrip<span class="mr-1">#{{ git_commit }}</span></a>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
const link = ref(null)
const fixed_link = ref(null)
const alt_link = computed(() =>{
  if (!fixed_link.value) return ''
  const str_link = String(fixed_link.value)
  if (
    str_link.startsWith('https://x.com/') 
    || str_link.startsWith('x.com/')
    || str_link.startsWith('https://twitter.com/')
    || str_link.startsWith('twitter.com/')
  ){
    return str_link.replace(/[a-z0-9-]+?\.com\//i, 'nitter.net/')
  }
  return str_link
})
const git_commit = __GIT_COMMIT__

watch(link, () => {
  vueFixLink()
})

onMounted(() => {
  const fixed = fixLink(window.location.href)
  if (fixed !== window.location.href) {
    console.log('fixing myself', fixed)
    window.location.href = fixed
  }
})

function vueFixLink(){
  return fixed_link.value = fixLink(link.value)
}
function fixLink(url){
  // MIT - Copyright (c) 2010-Present Jon Parise <jon@indelible.org>
  // https://github.com/jparise/chrome-utm-stripper/
  const searchPattern = new RegExp('utm_|stm_|clid|_hs|icid|igshid|linkid|mc_|mkt_tok|yclid|_openstat|wicked|otc|oly_|rb_clickid|soc_|si|ref_', 'i');
  const replacePattern = new RegExp(
      '([?&]' +
      '('
        +'icid|mkt_tok|(g|fb)clid|igshid|_hs(enc|mi)|linkid|mc_[ce]id|(utm|stm)_(source|medium|term|campaign|content|cid|reader|referrer|name|social|social-type)|rb_clickid|yclid|_openstat|wickedid|otc|oly_(anon|enc)_id|soc_(src|trk)'
        +'|si' // youtube
        +'|ref_(src|url)' // twitter
      +')' 
      +'=[^&#]*)',
      'ig')

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
function copyText() {
  navigator.clipboard.writeText(fixed_link.value)
}
function copyTextAlt() {
  navigator.clipboard.writeText(alt_link.value)
}
</script>

<style lang="scss">
@import "@fontsource/roboto/400.css";
body {
  /*font-family: Roboto;*/
}
</style>

