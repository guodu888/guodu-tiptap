<!--
 * @Author: shaohang-shy
 * @Date: 2022-08-10 18:57:59
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-08-11 09:23:50
 * @Description: index page
-->
<script setup lang="ts">
import { Blockquote, Bold, BubbetList, Code, Document, Dropcursor, Emphasis, Focus, FormatClear, Gapcursor, GuoduTiptap, Heading, Highlight, History, HorizontalRule, Image, Italic, Link, OrderedList, Paragraph, Strike, Subscript, Superscript, Table, TaskList, Text, TextAlign, Underline } from 'guodu-tiptap'

const extensions = [
  Document, TextAlign.configure({ types: ['paragraph'] }),
  Paragraph, Image, Table, Gapcursor, Dropcursor, Focus, FormatClear,
  Text, BubbetList, OrderedList, TaskList, Blockquote, HorizontalRule,
  History, Link.configure({ bubble: true }), Highlight.configure({ bubble: true }), Heading.configure({ levels: [1, 2, 3] }),
  Bold.configure({ bubble: true }), Code.configure({ bubble: true }), Emphasis, Italic.configure({ bubble: true }), Strike.configure({ bubble: true }), Subscript, Superscript, Underline,
]

const content = ref('<p><img src=\"https://shy-nav.shaohang.xin/nav-icons/yuque.svg\" width=\"200\" data-display=\"inline\"></p>')

const name = $ref('')

const router = useRouter()
function toSayHello() {
  if (name)
    router.push(`/hello/${encodeURIComponent(name)}`)
}
const theme = computed(() => {
  return isDark.value ? 'dark' : 'light'
})
</script>

<template>
  <div>
    <p>Hello World!</p>
    <GuoduTiptap v-model:content="content" :extensions="extensions" :theme="theme" />
    <Counter :initial="0" />
    <div>
      <input v-model="name" placeholder="What's your name?" class="px-4 py-2 w-100 text-center bg-transparent border border-rounded border-gray-200 dark:border-gray-700 outline-none active:outline-none" @keydown.enter="toSayHello">
      <button class="btn px-4 py-2 mx-2" :disabled="!name" @click="toSayHello">
        Go
      </button>
    </div>
  </div>
</template>
