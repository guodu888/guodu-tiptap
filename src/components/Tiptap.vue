<script setup lang="ts">
import type { Extensions } from '@tiptap/core'
import { EditorContent, useEditor } from '@tiptap/vue-3'
const props = withDefaults(defineProps<{
  extensions: Extensions
  content?: string
  theme?: 'light' | 'dark'
}>(), {
  content: '',
  theme: 'light',
})
const emits = defineEmits(['update:content'])

const theme = ref(props.theme)
provide('theme', theme)
watchEffect(() => {
  theme.value = props.theme
})
const editor = useEditor({
  content: props.content,
  onUpdate: () => {
    emits('update:content', editor.value?.getHTML())
  },
  extensions: [...props.extensions],
})

watchEffect(() => {
  unref(editor)?.setOptions({
    editorProps: {
      attributes: {
        spellcheck: String(false),
      },
    },
  })
})
watchEffect(() => {
  if (editor.value?.getHTML() !== props.content)
    editor.value?.commands.setContent(props.content, false)
})
onMounted(() => {
  emits('update:content', editor.value?.getHTML())
})
</script>

<template>
  <div class="guodu-tiptap-editor border-1 border-solid border-#ebeef5 box-border flex rounded-8px flex-col max-h-100% relative w-100%">
    <EditorContent :editor="editor" class="edit-content box-border flex-grow p-15px leading-7 text-left overflow-unset" />
  </div>
</template>

<style>
.guodu-tiptap-editor {

}
</style>
