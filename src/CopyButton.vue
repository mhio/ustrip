<script setup lang="ts">
import { ref } from 'vue'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  text: string,
  icon?: boolean
  disabled?: boolean
}>(),
{
  text: '',
  icon: false,
  disabled: false,
})

const copy_available = Boolean(navigator?.clipboard?.writeText)
const icon_class = computed(() => (props.icon) ? '' : 'mr-2')
const button_density = computed(() => props.icon ? 'comfortable' : undefined)

const copied_text_notify = ref(false)

async function copyText() {
  if (!props.text) return
  await navigator.clipboard.writeText(props.text)
  //popup ok
  copied_text_notify.value = true
  setTimeout(() => copied_text_notify.value = false, 600)
}
</script>

<template>
  <v-btn
    v-if="copy_available" 
    raised
    @click="copyText"
    :icon="props.icon"
    :disabled="!text"
    class="ml-1"
    :density="button_density"
  >
    <v-tooltip
      v-model="copied_text_notify"
      location="bottom"
      activator="parent"
      open-on-click
      :open-on-hover="false"
      close-delay="500"
    >
      <span>Copied</span>
    </v-tooltip>
    <v-icon aria-hidden="false" icon="$content-copy" :class="icon_class"/>
    <span v-if="props.icon === false">Copy</span>
  </v-btn>
</template>