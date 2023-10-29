<template>
  <!-- Enter URL -->
  <v-text-field density="compact" label="Add URL" v-model="link"
    @keyup.enter="openLinkNewWindow"
    autofocus
    hide-details
    class="mb-2"
  />

  <!-- Fixed -->
  <v-text-field density="compact" label="Fixed" v-model="fixed_link" hide-details class="mb-1">
    <template v-if="!xs" v-slot:append>
      <v-btn :href="fixed_link" target="_blank" class="mr-1"
        icon raised density="comfortable" 
        :disabled="fixed_link_empty"
      >
        <v-icon aria-hidden="false" icon="$open-in-new"/>
      </v-btn>
      <v-btn id="fixed-link-btn-copy" raised @click="copyText" class="ml-1" icon density="comfortable"
        :disabled="fixed_link_empty"
      >
        <v-tooltip
          v-model="copied_text_fixed"
          location="bottom"
          activator="parent"
          open-on-click
          :open-on-hover="false"
          close-delay="500"
        >
          <span>Copied Fixed URL</span>
        </v-tooltip>
        <v-icon aria-hidden="false" icon="$content-copy"/>
      </v-btn>

    </template> 
  </v-text-field>
  <div class="d-flex d-sm-none mb-2">
  <v-btn :href="fixed_link" target="_blank" class="mr-1"
    density="comfortable"
    :disabled="fixed_link_empty"
  >
    <v-icon aria-hidden="false" icon="$open-in-new" class="mr-2"/>Open
  </v-btn>
  <v-btn id="fixed-link-btn-copy" raised @click="copyText" class="ml-1" density="comfortable"
    :disabled="fixed_link_empty"
  >
    <v-tooltip
      v-model="copied_text_fixed"
      location="bottom"
      activator="parent"
      open-on-click
      :open-on-hover="false"
      close-delay="500"
    >
      <span>Copied Fixed URL</span>
    </v-tooltip>
    <v-icon aria-hidden="false" icon="$content-copy" class="mr-2"/>Copy
  </v-btn>
  </div>


  <!-- Alternate -->
  <v-text-field density="compact" label="Alternate Instance" v-model="alt_link" hide-details>
    <template v-if="!xs" v-slot:append>
      <v-btn raised :href="alt_link" target="_blank" class="mr-1" icon density="comfortable"
        :disabled="alt_link_empty"
      >
        <v-icon aria-hidden="false" icon="$open-in-new"/>
      </v-btn>
      <v-btn raised @click="copyTextAlt" class="ml-1" icon density="comfortable"
        :disabled="alt_link_empty"
      >
        <v-tooltip
          v-model="copied_text_alt"
          location="bottom"
          activator="parent"
          open-on-click
          :open-on-hover="false"
          close-delay="500"
        >
          <span>Copied Alternate URL</span>
        </v-tooltip>
        <v-icon aria-hidden="false" icon="$content-copy" :disable="true"/>
      </v-btn>
    </template> 
  </v-text-field>
  <div class="d-flex d-sm-none mt-1 mb-2">
    <v-btn raised :href="alt_link" target="_blank" class="mr-1" density="comfortable"
      :disabled="alt_link_empty"
    >
      <v-icon aria-hidden="false" icon="$open-in-new" class="mr-2"/> Open
    </v-btn>
    <v-btn raised @click="copyTextAlt" class="ml-1" density="comfortable"
      :disabled="alt_link_empty"
    >
      <v-tooltip
        v-model="copied_text_alt"
        location="bottom"
        activator="parent"
        open-on-click
        :open-on-hover="false"
        close-delay="500"
      >
        <span>Copied Alternate URL</span>
      </v-tooltip>
      <v-icon aria-hidden="false" icon="$content-copy" :disable="true" class="mr-2"/> Copy
    </v-btn>
  </div>
  <!-- help -->
  <p v-if="!xs" class="mt-4 mb-4 text-medium-emphasis float-right font-80">
    <v-icon aria-hidden="false" class="mr-1" icon="$open-in-new"/>
    <b>Open</b> the URL in a new window
    <v-icon class="ml-2 mr-1" icon="$content-copy"/>
    <b>Copy</b> the URL to the clipboard
  </p>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useDisplay } from 'vuetify'
import {
  fixLink,
  siteAlternates,
  alternateLinkTwitter, 
  alternateLinkReddit,
  alternateLinkYoutube,
} from './helpers'
import {
  alt_default,
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
const fixed_link_empty = computed(() => (!fixed_link.value || fixed_link.value.length < 1))
const alt_link_empty = computed(() => (!alt_link.value || alt_link.value.length < 1))
const copied_text_fixed = ref(false)
const copied_text_alt = ref(false)
const { xs } = useDisplay()
watch(link, () => {
  vueFixLink()
})

function vueFixLink(){
  return fixed_link.value = fixLink(link.value)
}
async function copyText() {
  if (!fixed_link.value) return
  await navigator.clipboard.writeText(fixed_link.value)
  //popup ok
  copied_text_fixed.value = true
  setTimeout(() => copied_text_fixed.value = false, 600)
}
async function copyTextAlt() {
  if (!alt_link.value) return
  await navigator.clipboard.writeText(alt_link.value)
  //popup ok
  copied_text_alt.value = true
  setTimeout(() => copied_text_alt.value = false, 600)
}
function openLinkNewWindow(){
  const url = (alt_default.value) ? alt_link.value : fixed_link.value
  window.open(url, '_blank')
}
</script>
