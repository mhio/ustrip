<template>
  <!-- Enter URL -->
  <div @drop.prevent="dropLink" @dragenter.prevent @dragover.prevent>
    <v-text-field
      v-model="link"
      @keyup.enter="openLinkNewWindow"
      autofocus
      label="URL"
      variant="underlined"
      density="compact"
      class="mb-1 mt-2"
    />

    <!-- Fixed -->
    <!-- <div class="mt-4">Fixed URL</div> -->
    <v-text-field
      @click="ref_tf_fixed?.select()"
      ref="ref_tf_fixed"
      v-model="fixed_link"
      readonly
      hide-details
      label="Fixed URL"
      :disabled="fixed_link_empty"
      variant="underlined"
      density="compact"
      class="mb-1 mt-2"
    >
      <template v-if="!xs" v-slot:append>
        <button-link-blank icon :text="fixed_link"/>
        <button-copy icon :text="fixed_link"/>
      </template> 
    </v-text-field>
    <div class="d-flex d-sm-none mt-1 mb-2">
      <!-- <div class="flex-grow-1"></div> -->
      <button-link-blank :text="fixed_link"/>
      <button-copy :text="fixed_link"/>
    </div>

    <!-- Alternate -->
    <!-- <div class="mt-4">Alternate Instance</div> -->
    <v-text-field
      @click="ref_tf_alt?.select()"
      ref="ref_tf_alt"
      v-model="alt_link"
      readonly
      hide-details
      label="Alternate Instance"
      :disabled="alt_link_empty"
      variant="underlined"
      density="compact" 
      class="mb-1"
      :class="(xs) ? 'mt-4' : 'mt-8'"
    >
      <template v-if="!xs" v-slot:append>
        <button-link-blank icon :text="alt_link"/>
        <button-copy icon :text="alt_link"/>
      </template> 
    </v-text-field>
    <div class="d-flex d-sm-none mt-1">
      <!-- <div class="flex-grow-1"></div> -->
      <button-link-blank :text="alt_link"/>
      <button-copy :text="alt_link"/>
    </div>

    <!-- help -->
    <p v-if="!xs" class="mt-4 mb-4 text-medium-emphasis float-right font-80">
      <v-icon aria-hidden="false" class="mr-1" icon="$open-in-new"/>
      <b>Open</b> the URL in a new window
      <v-icon class="ml-2 mr-1" icon="$content-copy"/>
      <b>Copy</b> the URL to the clipboard
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useDisplay } from 'vuetify'

import {
  fixLink,
  siteAlternateLink,
} from './helpers'
import { useSettings } from './settings'
import ButtonCopy from './ButtonCopy.vue'
import ButtonLinkBlank from './ButtonLinkBlank.vue'
import { VTextField } from 'vuetify/lib/components/index.mjs'

const {
  alt_is_default,
  alt_reddit,
  alt_twitter,
  alt_youtube,
  drop_open,
} = useSettings()

// The entered link
const link = ref('')
const fixed_link = ref('')
const ref_tf_fixed = ref<VTextField|null>(null)
const ref_tf_alt = ref<VTextField|null>(null)
  // detect type then inject the correct setting
const alt_link = computed(() => {
  const url = siteAlternateLink(fixed_link.value, alt_twitter.value, alt_youtube.value, alt_reddit.value)
  return url
})
const fixed_link_empty = computed(() => (!fixed_link.value || fixed_link.value.length < 1))
const alt_link_empty = computed(() => (!alt_link.value || alt_link.value.length < 1))
const { xs } = useDisplay()

watch(link, () => {
  vueFixLink()
})

function dropLink(ev:DragEvent){
  if (!ev.dataTransfer) return
  console.debug('dropped data', ev.dataTransfer.items)
  for (const item of ev.dataTransfer.items) {
    if (
      item.kind === "string" && item.type.match("^text/plain")
    ) {
      item.getAsString((link_string)=>{
        link.value = link_string
        if (drop_open) {
          // so disconnected now, popup warning
          // nextTick(()=> openLinkNewWindow())
          openLinkNewWindow()
        }
      })
      return
    }
  }
  // maybe snack a message if
}
function vueFixLink(){
  return fixed_link.value = fixLink(link.value)
}
function openLinkNewWindow(){
  const url = (alt_is_default.value) ? alt_link.value : fixed_link.value
  window.open(url, '_blank', 'noreferrer')
}
</script>
