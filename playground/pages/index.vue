<!--
 * @Author: shaohang-shy
 * @Date: 2022-08-10 18:57:59
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-08-11 09:23:50
 * @Description: index page
-->
<script setup lang="ts">
import { Blockquote, Bold, BubbetList, Code, CodeBlockLowlight, Color, Commands, Document, Dropcursor, Emphasis, Focus, FormatClear, Fullscreen, Gapcursor, GuoduTiptap, Heading, Highlight, History, HorizontalRule, Image, ImportWord, Italic, Link, OrderedList, Paragraph, Strike, Subscript, Superscript, Table, TaskList, Text, TextAlign, Underline } from 'guodu-tiptap'

const extensions = [
  Document.configure({ title: true }), TextAlign.configure({ types: ['paragraph'] }), Color, CodeBlockLowlight,
  Paragraph, Image, Table, Gapcursor, Dropcursor, Focus, FormatClear, Fullscreen, Commands,
  Text, BubbetList, OrderedList, TaskList, Blockquote, HorizontalRule, ImportWord,
  History, Link.configure({ bubble: true }), Highlight.configure({ bubble: true }), Heading.configure({ levels: [1, 2, 3] }),
  Bold.configure({ bubble: true }), Code.configure({ bubble: true }), Emphasis, Italic.configure({ bubble: true }), Strike.configure({ bubble: true }), Subscript, Superscript, Underline,
]

const content = ref('<h1>欢迎使用</h1><p><img src=\"https://shy-nav.shaohang.xin/nav-icons/yuque.svg\" width=\"200\" data-display=\"inline\"></p>')

const theme = computed(() => {
  return isDark.value ? 'dark' : 'light'
})
</script>

<template>
  <div>
    <h2>Welcome to `guodu-tiptap`</h2>
    <GuoduTiptap v-model:content="content" :extensions="extensions" :theme="theme" />
  </div>
</template>
