<!--
 * @Author: shaohang-shy
 * @Date: 2023-07-31 15:10:20
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-07-31 15:10:20
 * @Description: font-family
-->
<script setup lang="tsx">
import { getMarkAttributes } from '@tiptap/vue-3'
import type { Editor } from '@tiptap/vue-3'
import { inject, ref } from 'vue'
import { Tippy } from 'vue-tippy'
import CommandButton from './CommandButton.vue'
const props = withDefaults(defineProps<{
  editor: Editor
  icon?: string
  tooltip?: string
  active?: boolean
}>(), {
  icon: '',
  tooltip: '',
  active: false,
})
const heights = computed<string[]>(() => {
  return props.editor.extensionManager.extensions.find(
    e => e.name === 'lineHeight',
  )!.options.heights ?? []
})
const theme = inject('theme', 'light')
const tippyRef = ref()

function handleShow() {
  tippyRef.value.show()
}

const selectedHeight = computed<string>(() => {
  return getMarkAttributes(props.editor.state, 'textStyle').lineHeight || ''
})

function handleSetLineHeight(name: string) {
  props.editor?.commands.setLineHeight(name)
  tippyRef.value.hide()
}
</script>

<template>
  <Tippy ref="tippyRef" :z-index="99999" trigger="manual" :theme="theme" interactive>
    <CommandButton
      :icon="props.icon" :tooltip="props.tooltip" :is-active="props.editor.isActive('font-family')"
      :command="() => handleShow()"
    />
    <template #content>
      <div>
        <div
          v-for="(i, idx) in heights" :key="idx" class="py-2 px-1 cursor-pointer hover:color-blue"
          :class="{ 'color-blue': selectedHeight === i }" @click="handleSetLineHeight(i)"
        >
          <span>{{ i }}</span>
        </div>
      </div>
    </template>
  </Tippy>
</template>
