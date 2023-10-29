<template>
  <v-app>
    <v-main>
      <v-card elevation="0" class="ma-0">
        <v-card-title class="d-flex">
          <div class="flex-grow-1 mt-1">
            Remove <code color="pink">utm_x</code> query parameters from a URL
          </div>
          <AppMenu/>
        </v-card-title>
        <v-card-text>
          <FixUrl/>
        </v-card-text>
      </v-card>
    </v-main>
    <v-footer height="20" class="flex-shrink-1 flex-grow-0">
      <div class="d-flex w-100">
        <div class="flex-grow-1"></div>
        <div class="flex-shrink-1 text-caption">
          <a class="text-decoration-none text-medium-emphasis font-70" href="https://github.com/mhio/ustrip">
            mhio/ustrip<span class="ml-1">#{{ git_commit }}</span>
          </a>
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSettings } from './settings'
import { fixLink } from './helpers'
import AppMenu from './AppMenu.vue'
import FixUrl from './FixUrl.vue'

// Define in build
const git_commit = __GIT_COMMIT__

onMounted(() => {
  const fixed = fixLink(window.location.href)
  if (fixed !== window.location.href) {
    console.log('fixing myself!', fixed)
    window.location.href = fixed
  }
  
})

</script>

<style lang="scss">
@use 'vuetify' with (
  $color-pack: false,
);
.font-70 {
  font-size: 0.7rem;
}
.font-80 {
  font-size: 0.8rem;
}
</style>

