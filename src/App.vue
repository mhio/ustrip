<template>
  <v-app>
    <v-main>
      <v-card elevation="0" class="ma-0">
        <v-card-text>
          <v-text-field density="compact" label="URL" v-model="link"></v-text-field>
          <v-text-field density="compact" label="Fixed" v-model="fixed_link"></v-text-field>
          <v-btn raised :href="fixed_link" target="_blank" class="mr-2">Open</v-btn>
          <v-btn raised @click="copyText" class="ml-2">Copy</v-btn>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
const link = ref(null)
const fixed_link = ref(null)

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
  const searchPattern = new RegExp('utm_|stm_|clid|_hs|icid|igshid|linkid|mc_|mkt_tok|yclid|_openstat|wicked|otc|oly_|rb_clickid|soc_|si', 'i');
  const replacePattern = new RegExp(
      '([?&]' +
      '(icid|mkt_tok|(g|fb)clid|igshid|_hs(enc|mi)|linkid|mc_[ce]id|(utm|stm)_(source|medium|term|campaign|content|cid|reader|referrer|name|social|social-type)|rb_clickid|yclid|_openstat|wickedid|otc|oly_(anon|enc)_id|soc_(src|trk)|si)' +
      '=[^&#]*)',
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
</script>

<style lang="scss">
@import "@fontsource/roboto/400.css";
body {
  /*font-family: Roboto;*/
}
</style>

