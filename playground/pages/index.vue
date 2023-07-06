<!--
 * @Author: shaohang-shy
 * @Date: 2022-08-10 18:57:59
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-08-11 09:23:50
 * @Description: index page
-->
<script setup lang="ts">
import { Blockquote, Bold, BulletList, Code, CodeBlockLowlight, Color, CustomCommands, Document, Dropcursor, Emphasis, Focus, FormatClear, Fullscreen, Gapcursor, GuoduTiptap, Heading, Highlight, History, HorizontalRule, Image, ImportWord, Indent, Italic, Link, Math, OrderedList, Paragraph, Strike, Subscript, Superscript, Table, TaskList, Text, TextAlign, Underline } from '~/index'

const extensions = [
  Document.configure({ title: false }), TextAlign.configure({
    types: ['heading', 'paragraph'],
  }), Color, CodeBlockLowlight, Indent, Math,
  Paragraph, Image, Table, Gapcursor, Dropcursor, Focus, FormatClear, Fullscreen, CustomCommands,
  Text, BulletList, OrderedList, TaskList, Blockquote, HorizontalRule, ImportWord,
  History, Link.configure({ bubble: true }), Highlight.configure({ bubble: true }), Heading.configure({ levels: [1, 2, 3] }),
  Bold.configure({ bubble: true }), Code.configure({ bubble: true }), Emphasis, Italic.configure({ bubble: true }), Strike.configure({ bubble: true }), Subscript, Superscript, Underline,
]

const content = ref('<h1 style="text-align: center">Welcome to `guodu-tiptap`</h1><p><code>guodu-tiptap</code> A WYSIWYG rich-text editor using <a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/ueberdosis/tiptap">tiptap</a>.</p><p><span data-katex>\\ce{Hg^2+ ->[I-]  $\\underset{\\mathrm{red}}{\\ce{HgI2}}$  ->[I-]  $\\underset{\\mathrm{red}}{\\ce{[Hg^{II}I4]^2-}}$}</span></p><h2>🚀 Features<img src="https://shy-nav.shaohang.xin/nav-icons/github.svg" data-display="right"></h2><ul><li><p>Many Extensions</p></li><li><p>Markdown support</p></li><li><p>Using TypeScript</p></li></ul><h2>🔥 Extensions</h2><h3>Marks</h3><ul><li><p>bold</p></li><li><p>code</p></li><li><p>emphasis</p></li><li><p>highlight</p></li><li><p>italic</p></li><li><p>link</p></li><li><p>strike</p></li><li><p>subscript</p></li><li><p>superscript</p></li><li><p>underline</p></li></ul><h3>nodes</h3><ul><li><p>blockquote</p></li><li><p>bullet-list</p></li><li><p>ordered-list</p></li><li><p>task-list</p></li><li><p>code-block-lowlight</p></li><li><p>heading</p></li><li><p>horizontal-rule</p></li><li><p>image</p></li><li><p>table</p></li><li><p>title</p></li></ul><h3>Other</h3><ul><li><p>color</p></li><li><p>commands</p></li><li><p>document</p></li><li><p>dropcursor</p></li><li><p>focus</p></li><li><p>format-clear</p></li><li><p>fullscreen</p></li><li><p>gapcursor</p></li><li><p>history</p></li><li><p>import-word</p></li><li><p>placeholder</p></li><li><p>text-align</p></li></ul><p></p><blockquote><p>让教育像糖果，让学习有甜度。</p><p>Let education be like candy and make learning sweet.</p></blockquote>')

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
