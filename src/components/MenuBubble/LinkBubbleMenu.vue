<!--
 * @Author: shaohang-shy
 * @Date: 2022-12-01 19:01:09
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-01 20:55:24
 * @Description: LinkBubbleMenu
-->
<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import AddLinkCommandButton from '~/components/MenuCommands/AddLinkCommandButton.vue'

const props = defineProps<{ editor?: Editor }>()
function handleOpenLink() {
  if (!props.editor)
    return
  const linkAttrs = props.editor.getAttributes('link')
  if (linkAttrs.href) {
    // prevent attack
    const newTab = window.open()
    if (newTab) {
      newTab.opener = null
      newTab.location.href = linkAttrs.href
    }
  }
}
function handleCanvelLink() {
  props.editor?.commands.unsetLink()
}
</script>

<template>
  <div class="flex flex-row">
    <CommandButton icon="external-link" tooltip="打开链接" :command="handleOpenLink" />
    <!-- <CommandButton icon="edit" tooltip="编辑链接" /> -->
    <AddLinkCommandButton v-if="props.editor" icon="edit" :editor="props.editor" tooltip="编辑链接" :active="false" />
    <CommandButton icon="unlink" tooltip="取消链接" :command="handleCanvelLink" />
    <slot />
  </div>
</template>
