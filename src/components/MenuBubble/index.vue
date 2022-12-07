<!--
 * @Author: shaohang-shy
 * @Date: 2022-12-01 09:46:42
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-06 19:24:32
 * @Description: MenuBubble
-->
<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { BubbleMenu } from '@tiptap/vue-3'
import { computed, inject, ref } from 'vue'
import { AllSelection, TextSelection } from 'prosemirror-state'
import LinkBubbleMenu from './LinkBubbleMenu.vue'
import TableBubbleMenu from './TableBubbleMenu.vue'
import type { MenuBtnView } from '~/typings'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import 'tippy.js/themes/light.css'

const props = defineProps<{
  editor?: Editor
}>()
const theme = inject('theme', 'light')
const isLink = computed(() => (!props.editor) ? false : props.editor.isActive('link'))
const isTable = computed(() => (!props.editor) ? false : props.editor.isActive('table'))
const isText = computed(() => (!props.editor)
  ? false
  : (props.editor.state.selection instanceof TextSelection
        || props.editor.state.selection instanceof AllSelection))

function generateCommandButtonComponentSpecs(): MenuBtnView[] {
  if (!props.editor)
    return []
  const extensionManager = props.editor.extensionManager
  return extensionManager.extensions.reduce((acc, extension) => {
    if (!extension.options.bubble)
      return acc
    const { menuBtnView } = extension.options
    if (!menuBtnView || typeof menuBtnView !== 'function')
      return acc
    const menuBtnComponentSpec = menuBtnView({
      editor: props.editor,
    })

    if (Array.isArray(menuBtnComponentSpec))
      return [...acc, ...menuBtnComponentSpec]

    return [...acc, menuBtnComponentSpec]
  }, [] as MenuBtnView[])
}
const linkBack = ref(false)
const textMenuEnable = computed(() => {
  if (!props.editor)
    return false
  const extensionManager = props.editor.extensionManager
  return extensionManager.extensions.some((extension) => {
    return extension.options.bubble
  })
})
const tableBack = ref(false)
function handleBack() {
  linkBack.value = false
  tableBack.value = false
}
</script>

<template>
  <BubbleMenu v-if="props.editor" :editor="props.editor" :tippy-options="{ duration: 100, theme }" :should-show="() => (isTable || isText || isLink)">
    <LinkBubbleMenu v-if="(isLink && !linkBack)" :editor="props.editor">
      <CommandButton v-if="textMenuEnable" icon="arrow-left" tooltip="更多" :command="() => linkBack = true" />
    </LinkBubbleMenu>
    <TableBubbleMenu v-else-if="(isTable && !tableBack)" :editor="props.editor">
      <CommandButton v-if="textMenuEnable" icon="arrow-left" tooltip="更多" :command="() => tableBack = true" />
    </TableBubbleMenu>
    <div v-else-if="(isText || isTable)" class="flex flex-row">
      <component
        :is="spec.component" v-for="(spec, i) in generateCommandButtonComponentSpecs()"
        :key="`command-button${i}`" v-bind="spec.componentProps"
      />
      <CommandButton
        v-if="(isLink && linkBack)" icon="arrow-right" tooltip="返回链接" :command="() => handleBack()"
      />
      <CommandButton
        v-if="(isTable && tableBack)" icon="arrow-right" tooltip="返回" :command="() => handleBack()"
      />
    </div>
  </BubbleMenu>
</template>
