<!--
 * @Author: shaohang-shy
 * @Date: 2022-08-10 18:57:59
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-08-11 09:23:50
 * @Description: index page
-->
<script setup lang="ts">
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { Blockquote, Bold, BulletList, Code, CodeBlockLowlight, Color, CustomCommands, Document, Dropcursor, Emphasis, Focus, FontFamily, FormatClear, Fullscreen, Gapcursor, GuoduTiptap, Heading, Highlight, History, HorizontalRule, Image, ImportWord, Indent, Italic, LineHeight, Link, Mathematics, OrderedList, Paragraph, Placeholder, Strike, Subscript, Superscript, Table, TaskList, Text, TextAlign, Underline } from '~/index'
// A new Y document
const ydoc = new Y.Doc()
// Registered with a WebRTC provider
const provider = new WebrtcProvider('example-document', ydoc)
const extensions = [
  Document.configure({ title: false }), FontFamily, LineHeight, TextAlign.configure({
    types: ['heading', 'paragraph'],
  }), Color, CodeBlockLowlight, Indent, Mathematics,
  Paragraph, Image, Table, Gapcursor, Dropcursor, Focus, FormatClear, Fullscreen, CustomCommands,
  Text, BulletList, OrderedList, TaskList, Blockquote, HorizontalRule, ImportWord,
  History, Link.configure({ bubble: true }), Highlight.configure({ bubble: true }), Heading.configure({ levels: [1, 2, 3] }),
  Bold.configure({ bubble: true }), Code.configure({ bubble: true }), Emphasis, Italic.configure({ bubble: true }), Strike.configure({ bubble: true }), Subscript, Superscript, Underline,
  // Register the document with Tiptap
  Collaboration.configure({
    document: ydoc,
  }),
  Placeholder.configure({
    placeholder: '开始协作编辑',
  }),
  CollaborationCursor.configure({
    provider,
    user: {
      name: randomId(),
      color: randomColor(),
    },
  }),
]

const content = ref('')

const theme = computed(() => {
  return isDark.value ? 'dark' : 'light'
})
const editorRef = ref()
function logEditorRef() {
  // eslint-disable-next-line no-console
  console.log(editorRef.value.editor)
}
const showLineNo = ref(false)

function randomColor() {
  const color = Math.floor(Math.random() * 0xFFFFFF).toString(16)
  return `#${color}`
}

function randomId() {
  return Math.random().toString(36).substr(2)
}
</script>

<template>
  <div class="container mx-auto">
    <div class="flex items-center gap-3 justify-start ">
      <h2>Welcome to <code>`guodu-tiptap`</code></h2>
      <div icon-btn @click="toggleDark()">
        <div dark:i-carbon-moon i-carbon-sun />
      </div>

      <a
        icon-btn i-carbon-logo-github rel="noreferrer" href="https://github.com/shy1118999/guodu-tiptap" target="_blank"
        title="GitHub"
      />
      <button @click="logEditorRef">
        Log Editor Instance
      </button>
      <button @click="showLineNo = !showLineNo">
        显示/隐藏行号
      </button>
    </div>
    <GuoduTiptap ref="editorRef" v-model:content="content" :show-line-no="showLineNo" :extensions="extensions" :theme="theme" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.guodu-tiptap-menu-bar) {
  /* 滑动固定在上方 */
  position: sticky;
  top: 0;
}

/* Give a remote user a caret */
:deep(.collaboration-cursor__caret) {
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  border-left: 1px solid #0D0D0D;
  border-right: 1px solid #0D0D0D;
  word-break: normal;
  pointer-events: none;
}

/* Render the username above the caret */
:deep(.collaboration-cursor__label) {
  position: absolute;
  top: -1.4em;
  left: -1px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  user-select: none;
  color: #0D0D0D;
  padding: 0.1rem 0.3rem;
  border-radius: 3px 3px 3px 0;
  white-space: nowrap;
}
</style>
