<template>
  <v-app>
    <v-main>
      <v-card elevation="0" class="ma-0">
        <v-card-text>
          <p class="mb-4">Remove <code>utm_</code> like tracking query paramaters from a URL</p>
          <!-- Enter URL -->
          <v-text-field density="compact" label="URL" v-model="link"></v-text-field>
          <!-- Fixed -->
          <v-text-field density="compact" label="Fixed" v-model="fixed_link">
            <template v-slot:append>
              <v-btn raised :href="fixed_link" target="_blank" class="mr-1" icon density="comfortable">
                <v-icon icon="mdi-open-in-new"/>
              </v-btn>
              <v-btn raised @click="copyText" class="ml-1" icon density="comfortable"><v-icon icon="mdi-content-copy"/></v-btn>
            </template> 
          </v-text-field>
          <!-- Alternate -->
          <v-text-field density="compact" label="Alternate Instance" v-model="alt_link">
            <template v-slot:append>
              <v-btn raised :href="alt_link" target="_blank" class="mr-1" icon density="comfortable">
                <v-icon icon="mdi-open-in-new"/>
              </v-btn>
              <v-btn raised @click="copyTextAlt" class="ml-1" icon density="comfortable"><v-icon icon="mdi-content-copy"/></v-btn>
            </template> 
          </v-text-field>
          <!-- help -->
          <p class="mb-4"><v-icon class="mr-1" icon="mdi-open-in-new"/>
            <b>Open</b> the fixed URL in a new window or <v-icon class="mr-1" icon="mdi-content-copy"/>
            <b>Copy</b> the URL to the clipboard
          </p>
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
import { fixLink, alternateLink } from './helpers'

const link = ref('')

const fixed_link = ref('')

const alt_link = computed(() => alternateLink(fixed_link.value))

// Defined in build
const git_commit = __GIT_COMMIT__

watch(link, () => {
  vueFixLink()
})

onMounted(() => {
  const fixed = fixLink(window.location.href)
  if (fixed !== window.location.href) {
    console.log('fixing myself!', fixed)
    window.location.href = fixed
  }
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

<style lang="scss">
</style>

