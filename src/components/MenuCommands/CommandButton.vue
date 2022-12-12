<!--
 * @Author: shaohang-shy
 * @Date: 2022-12-07 10:25:28
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-07 10:25:28
 * @Description: CommandButton
-->

<script setup lang="ts">
import { directive as vTippy } from 'vue-tippy'
import { inject } from 'vue'
import GuoduIcon from '../GuoduIcon.vue'
const props = withDefaults(
  defineProps<{
    command?: Function
    isActive?: boolean
    icon: string
    tooltip: string
  }>(),
  {
    command: () => {},
    isActive: false,
  },
)
const theme = inject('theme', 'light')
function onClick() {
  props.command()
}
</script>

<template>
  <div
    v-tippy="{ content: props.tooltip, theme }"
    class="flex items-center justify-center box-border border-1px border-transparent rounded-50% cursor-pointer h-40px w-40px m-2px outline-0 transition-all duration-200 ease-in-out"
    :class="{ 'bg-$extra-light-primary-color text-$primary-color': props.isActive }"
    @mousedown.prevent
    @click="onClick"
  >
    <GuoduIcon :name="props.icon" />
  </div>
</template>
