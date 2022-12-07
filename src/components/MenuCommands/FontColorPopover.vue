<!--
 * @Author: Arthur_Zhang
 * @Date: 2022-12-01 20:59:58
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-06 20:14:03
 * @Description:
-->
<script setup lang="tsx">
import { getMarkAttributes } from '@tiptap/vue-3'
import type { Editor } from '@tiptap/vue-3'
import { computed, inject, ref } from 'vue'
import { Tippy } from 'vue-tippy'

import CommandButton from './CommandButton.vue'
const props = defineProps<{ editor: Editor }>()
const theme = inject('theme', 'light')
const COLOR_SET = computed<string[]>(() => {
  return props.editor.extensionManager.extensions.find(
    e => e.name === 'color',
  )!.options.colors ?? []
})
const tippyRef = ref()

function confirmColor(color?: string) {
  tippyRef.value.hide()
  if (color)
    props.editor.commands.setColor(color)
  else
    props.editor.commands.unsetColor()
}
const selectedColor = computed<string>(() => {
  return getMarkAttributes(props.editor.state, 'textStyle').color || ''
})
function handleShow() {
  tippyRef.value.show()
}
</script>

<template>
  <Tippy ref="tippyRef" :z-index="99999" trigger="manual" interactive :theme="theme">
    <CommandButton icon="font-color" tooltip="字体颜色" :command="() => handleShow()" />
    <template #content>
      <div class="flex flex-row flex-wrap w-240px">
        <div v-for="(x, i) in COLOR_SET" :key="i" class="items-center cursor-pointer box-border flex flex-0-0-12.5% justify-center p-5px">
          <div :class="{ 'border-2 transform-scale-130 border-white': selectedColor === x }" class="color-shadow box-border rounded-50% box-border text-#fff h-30px w-30px duration-200 transition-all ease-in-out hover:boeder-2px hover:border-#fff hover:scale-125" :style="{ background: x }" @click="confirmColor(x)" />
        </div>
        <div class="color-remove items-center cursor-pointer box-border flex flex-0-0-12.5% justify-center p-5px">
          <div class="color-shadow relative box-border rounded-50% box-border text-#fff h-30px w-30px duration-200 transition-all ease-in-out hover:boeder-2px hover:border-#fff hover:scale-125" @click="confirmColor()" />
        </div>
      </div>
    </template>
  </Tippy>
</template>
