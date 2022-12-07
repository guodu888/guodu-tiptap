<!--
 * @Author: shaohang-shy
 * @Date: 2022-12-03 10:41:28
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-03 10:56:46
 * @Description: ImageDIsplay
-->
<script setup lang="ts">
import { ref } from 'vue'
import { Tippy } from 'vue-tippy'
import CommandButton from '../CommandButton.vue'
import 'tippy.js/themes/light.css'
import { ImageDisplay } from '~/extensions/nodes/image'
const props = defineProps<{
  current: ImageDisplay
}>()
const emits = defineEmits(['change'])
const tippyRef = ref()
const displayCollection = [
  ImageDisplay.INLINE,
  ImageDisplay.BREAK_TEXT,
  ImageDisplay.FLOAT_LEFT,
  ImageDisplay.FLOAT_RIGHT,
]
</script>

<template>
  <Tippy ref="tippyRef" tag="div" theme="light" :z-index="99999" trigger="manual" interactive>
    <CommandButton icon="image-align" tooltip="布局" :command="() => tippyRef?.show()" />
    <template #content>
      <div class="w-20">
        <div v-for="item in displayCollection" :key="item" class="w-full box-border cursor-pointer py-2 px-3" :class="{ 'color-$primary-color': props.current === item }" hover="color-$primary-color" @click="emits('change', item)">
          {{ item }}
        </div>
      </div>
    </template>
  </Tippy>
</template>
