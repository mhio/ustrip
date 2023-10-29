<template>
  <!-- Enter URL -->
  URL
  <v-text-field density="compact" v-model="link"
    @keyup.enter="openLinkNewWindow"
    autofocus
    hide-details
    class="mb-2"
    variant="outlined"
  />

  <!-- Fixed -->
  Fixed URL<br>
  <v-text-field
    ref="ref_tf_fixed"
    v-model="fixed_link"
    readonly
    hide-details
    class="mb-2"
    :disabled="fixed_link_empty"
    density="compact"
    @click="ref_tf_fixed?.select()"
  >
    <template v-if="!xs" v-slot:append>
      <button-link-blank icon :text="fixed_link"/>
      <copy-button icon :text="fixed_link"/>
    </template> 
  </v-text-field>
  <div class="d-flex d-sm-none mb-2 justify-right">
    <button-link-blank :text="fixed_link"/>
    <copy-button :text="fixed_link"/>
  </div>

  <!-- Alternate -->
  Alternate Instance<br>
  <v-text-field
    ref="ref_tf_alt"
    v-model="alt_link"
    readonly
    hide-details
    density="compact" 
    class="mb-2"
    :disabled="alt_link_empty"
    @click="ref_tf_alt?.select()"
  >
    <template v-if="!xs" v-slot:append>
      <button-link-blank icon :text="alt_link"/>
      <copy-button icon :text="alt_link"/>
    </template> 
  </v-text-field>
  <div class="d-flex d-sm-none mt-1 mb-2">
    <button-link-blank :text="alt_link"/>
    <copy-button :text="alt_link"/>
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
import { useSettings } from './settings'
import CopyButton from './CopyButton.vue'
import ButtonLinkBlank from './ButtonLinkBlank.vue'
import { VTextField } from 'vuetify/lib/components/index.mjs'

const {
  alt_is_default,
  alt_reddit,
  alt_twitter,
  alt_youtube,
} = useSettings()

// The entered link
const link = ref('')
const fixed_link = ref('')
const ref_tf_fixed = ref<VTextField|null>(null)
const ref_tf_alt = ref<VTextField|null>(null)
  // detect type then inject the correct setting
const alt_link = computed(() => {
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
const { xs } = useDisplay()

watch(link, () => {
  vueFixLink()
})

function vueFixLink(){
  return fixed_link.value = fixLink(link.value)
}
function openLinkNewWindow(){
  const url = (alt_is_default.value) ? alt_link.value : fixed_link.value
  window.open(url, '_blank')
}
</script>
