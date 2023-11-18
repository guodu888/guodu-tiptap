<!--
 * @Author: shaohang-shy
 * @Date: 2022-11-30 13:47:33
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-06 20:12:22
 * @Description: HighlightPopover
-->
<script setup lang="tsx">
import { getMarkAttributes } from '@tiptap/vue-3'
import type { Editor } from '@tiptap/vue-3'
import { computed, inject, ref } from 'vue'
import { Tippy } from 'vue-tippy'

import CommandButton from './CommandButton.vue'

const props = defineProps<{ editor: Editor }>()
let theme = 'light'
theme = inject('theme', 'light')
const COLOR_SET = computed<string[]>(() => {
  return props.editor.extensionManager.extensions.find(
    e => e.name === 'highlight',
  )!.options.colors ?? []
})
const tippyRef = ref()

function confirmColor(color?: string) {
  tippyRef.value.hide()
  if (color)
    props.editor.commands.setHighlight({ color })
  else
    props.editor.commands.unsetHighlight()
}
const selectedColor = computed<string>(() => {
  return getMarkAttributes(props.editor.state, 'highlight').color || ''
})
function handleShow() {
  tippyRef.value.show()
}
</script>

<template>
  <Tippy ref="tippyRef" :z-index="99999" trigger="manual" interactive :theme="theme">
    <CommandButton icon="highlight" tooltip="背景色" :command="() => handleShow()" />
    <template #content>
      <div class="w-240px flex flex-row flex-wrap">
        <div v-for="(x, i) in COLOR_SET" :key="i" class="flex-0-0-12.5% box-border flex cursor-pointer items-center justify-center p-5px">
          <div :class="{ 'border-2 transform-scale-130 border-white': selectedColor === x }" class="color-shadow hover:boeder-2px box-border box-border h-30px w-30px rounded-50% text-#fff transition-all duration-200 ease-in-out hover:scale-125 hover:border-#fff" :style="{ background: x }" @click="confirmColor(x)" />
        </div>
        <div class="color-remove flex-0-0-12.5% box-border flex cursor-pointer items-center justify-center p-5px">
          <div class="color-shadow hover:boeder-2px relative box-border box-border h-30px w-30px rounded-50% text-#fff transition-all duration-200 ease-in-out hover:scale-125 hover:border-#fff" @click="confirmColor()" />
        </div>
      </div>
    </template>
  </Tippy>
</template>

<style lang="scss">
.color-shadow{
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px,
  rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
}
.color-remove {
    position: relative;
    &:hover {
      &::before {
        transform: rotate(-45deg);
      }

      &::after {
        transform: rotate(45deg);
      }
    }

    &::before,
    &::after {
      background-color: #f56c6c;
      bottom: 0;
      content: '';
      left: 50%;
      position: absolute;
      margin: 2px 0;
      top: 0;
      transform: translateX(-50%);
      transition: all 0.2s ease-in-out;
      width: 2px;
    }
}
</style>
