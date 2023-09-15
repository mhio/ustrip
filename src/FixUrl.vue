<template>
  <!-- Enter URL -->
  <v-text-field density="compact" label="Add URL" v-model="link" />

  <!-- Fixed -->
  <v-text-field density="compact" label="Fixed" v-model="fixed_link">
    <template v-slot:append>
      <v-btn raised :href="fixed_link" target="_blank" class="mr-1" icon density="comfortable">
        <v-icon aria-hidden="false" icon="$open-in-new"/>
      </v-btn>
      <v-btn raised @click="copyText" class="ml-1" icon density="comfortable">
        <v-icon aria-hidden="false" icon="$content-copy"/>
      </v-btn>
    </template> 
  </v-text-field>

  <!-- Alternate -->
  <v-text-field density="compact" label="Alternate Instance" v-model="alt_link">
    <template v-slot:append>
      <v-btn raised :href="alt_link" target="_blank" class="mr-1" icon density="comfortable">
        <v-icon aria-hidden="false" icon="$open-in-new"/>
      </v-btn>
      <v-btn raised @click="copyTextAlt" class="ml-1" icon density="comfortable">
        <v-icon aria-hidden="false" icon="$content-copy"/>
      </v-btn>
    </template> 
  </v-text-field>

  <!-- help -->
  <p class="mb-4 text-medium-emphasis">
    <v-icon aria-hidden="false" class="mr-1" icon="$open-in-new"/>
    <b>Open</b> the fixed URL in a new window
    <v-icon class="ml-2 mr-1" icon="$content-copy"/>
    <b>Copy</b> the URL to the clipboard
  </p>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import {
  fixLink,
  siteAlternates,
  alternateLinkTwitter, 
  alternateLinkReddit,
  alternateLinkYoutube,
} from './helpers'
import {
  alt_reddit,
  alt_twitter,
  alt_youtube,
} from './settings'
// The entered link
const link = ref('')
const fixed_link = ref('')
const alt_link = computed(() => {
  // detect type then inject the correct setting
  const site = siteAlternates(fixed_link.value)
  switch (site) {
    case 'twitter': return alternateLinkTwitter(fixed_link.value, alt_twitter.value)
    case 'youtube': return alternateLinkYoutube(fixed_link.value, alt_youtube.value)
    case 'reddit':  return alternateLinkReddit(fixed_link.value, alt_reddit.value)
    default:
      return fixed_link.value
  }
})

watch(link, () => {
  vueFixLink()
})

function vueFixLink(){
  return fixed_link.value = fixLink(link.value)
}
function copyText() {
  navigator.clipboard.writeText(fixed_link.value)
}
function copyTextAlt() {
  navigator.clipboard.writeText(alt_link.value)
}
</script>