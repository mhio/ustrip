<script setup lang="ts">
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

const icon_class = computed(() => (props.icon) ? '' : 'mr-2')
const button_density = computed(() => props.icon ? 'compact' : undefined)

</script>

<template>
  <v-btn raised
    :href="text"
    target="_blank"
    :disabled="!text"
    class="mr-1"
    :icon="icon"
    :density="button_density"
    variant="text"
    rounded="sm"
  >
    <v-icon aria-hidden="false" icon="$open-in-new" :class="icon_class"/>
    <span v-if="props.icon === false">Open</span>
  </v-btn>
</template>