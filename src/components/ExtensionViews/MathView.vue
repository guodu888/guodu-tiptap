<!--
 * @Author: shaohang-shy
 * @Date: 2023-06-27 17:03:41
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-06-27 17:03:41
 * @Description: math
-->
<script setup lang="ts">
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import { MathfieldElement } from 'mathlive'
import 'mathlive/fonts.css'
const props = defineProps(nodeViewProps)
const katex = computed(() => props.node.attrs.katex)
const mathFieldRef = ref<MathfieldElement>()
function handleInput(e: InputEvent) {
  props.updateAttributes({
    katex: (e.target as MathfieldElement).value,
  })
}
const innerReadOnly = ref(true)
const r = computed(() => {
  return innerReadOnly.value
})
onMounted(() => {
  if (mathFieldRef.value) {
    mathFieldRef.value.value = katex.value
    mathFieldRef.value.inlineShortcuts = {
      lim: { value: '\\lim\\limits_{x \\to \\infty}' },
    }
  }

  mathFieldRef.value?.addEventListener('blur', () => {
    innerReadOnly.value = true
  })
  mathFieldRef.value?.addEventListener('focus', () => {
    // 显示虚拟键盘
    window.mathVirtualKeyboard.show()
  })
  window.mathVirtualKeyboard.layouts = ['default']
  // 去除键盘声音
  // mathFieldRef.value?.soundsDirectory = null
  MathfieldElement.soundsDirectory = null
})
watch(() => katex.value, (value) => {
  if (mathFieldRef.value)
    mathFieldRef.value.value = value
})

function handleFocus() {
  innerReadOnly.value = false
  mathFieldRef.value?.focus()
}
</script>

<template>
  <NodeViewWrapper as="span" class="inline-block my-2 max-w-full">
    <math-field ref="mathFieldRef" :readonly="r" keypress-sound="none" @input="handleInput" @click="handleFocus">
      {{ katex }}
    </math-field>
  </NodeViewWrapper>
</template>

<style lang="scss">
math-field {
  padding: 0;
  border: none;
  box-sizing: border-box;
  min-width: 1em;
}
</style>
