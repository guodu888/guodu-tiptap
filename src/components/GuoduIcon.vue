<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps<{
  name: string
}>()

const icon = computed(() => {
  return defineAsyncComponent(() => import(`~/icons/${props.name}.svg`))
})
</script>

<template>
  <component :is="icon" width="16" height="16" v-bind="$attrs" />
</template>
