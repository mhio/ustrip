<template>
  <v-menu class="menu-text-field" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        icon
        size="small" elevation="0"
      >
      <v-icon aria-hidden="false" icon="$menu"/>
      </v-btn>
    </template>
    <v-list class="menu-text-field">
      <v-list-item>
        <v-text-field label="twitter alternate"
          v-model="alt_twitter"
          density="compact"
          hide-details
        />
      </v-list-item>
      <v-list-item>
        <v-text-field label="reddit alternate"
          v-model="alt_reddit"
          density="compact"
          hide-details
        />
      </v-list-item>
      <v-list-item>
        <v-text-field label="youtube alternate"
          v-model="alt_youtube"
          density="compact"
          hide-details
        />
      </v-list-item>
      <v-list-item>
        <v-btn @click="toggleTheme" elevation="0" block>
          <v-icon class="mr-2" aria-hidden="false" icon="$lightbulb"/>
          {{ toggle_theme_name }}
        </v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import {
  alt_reddit,
  alt_twitter,
  alt_youtube,
} from './settings'

const theme = useTheme()

const toggle_theme_name = computed(() => theme.global.current.value.dark ? 'Light' : 'Dark')

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<style scoped>
.menu-text-field { 
  min-width: 22em;
}
</style>