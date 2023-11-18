<!--
 * @Author: shaohang-shy
 * @Date: 2022-08-10 18:57:59
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-08-11 09:23:50
 * @Description: index page
-->
<script setup lang="ts">
import { Blockquote, Bold, BulletList, Code, CodeBlockLowlight, Color, CustomCommands, Document, Dropcursor, Emphasis, Focus, FontFamily, FormatClear, Fullscreen, Gapcursor, GuoduTiptap, Heading, Highlight, History, HorizontalRule, Image, ImportWord, Indent, Italic, LineHeight, Link, Mathematics, OrderedList, Paragraph, Strike, Subscript, Superscript, Table, TaskList, Text, TextAlign, Underline } from '~/index'

const extensions = [
  Document.configure({ title: false }),
  FontFamily,
  LineHeight,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Color,
  CodeBlockLowlight,
  Indent,
  Mathematics,
  Paragraph,
  Image,
  Table,
  Gapcursor,
  Dropcursor,
  Focus,
  FormatClear,
  Fullscreen,
  CustomCommands,
  Text,
  BulletList,
  OrderedList,
  TaskList,
  Blockquote,
  HorizontalRule,
  ImportWord,
  History,
  Link.configure({ bubble: true }),
  Highlight.configure({ bubble: true }),
  Heading.configure({ levels: [1, 2, 3] }),
  Bold.configure({ bubble: true }),
  Code.configure({ bubble: true }),
  Emphasis,
  Italic.configure({ bubble: true }),
  Strike.configure({ bubble: true }),
  Subscript,
  Superscript,
  Underline,
]

const content = ref('<h1 style="text-align: center">Welcome to `guodu-tiptap`</h1><p><code>guodu-tiptap</code> A WYSIWYG rich-text editor using <a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/ueberdosis/tiptap">tiptap</a>.</p><p>Math: <span data-katex="true">$$\\ce{Hg^2+ -&gt;[I-]  $\\underset{\\mathrm{red}}{\\ce{HgI2}}$  -&gt;[I-]  $\\underset{\\mathrm{red}}{\\ce{[Hg^{II}I4]^2-}}$}$$</span></p><p data-indent="2"><span><span style="text-emphasis:dot;-webkit-text-emphasis:dot;-webkit-text-emphasis-position: under;text-emphasis-position: under;">在一个漆黑</span></span>的夜晚，<span style="color: #ff5722"><mark data-color="#2196f3" style="background-color: #2196f3; color: inherit"><em>一只饿极了的小老鼠</em></mark></span><span style="font-family: 楷体">鬼鬼祟祟爬出洞口，偷偷摸摸、摄手摄脚地来到了一个主人的书房，跳到了电脑桌子上，准备偷吃电脑桌子上的几颗花生米，结果不小心触碰到了电脑鼠标，突然一张巨大的的猫脸出现在了电脑屏幕上，它有着尖尖、肥肥的耳朵，圆溜溜、亮晶晶的眼睛，一张龇牙咧嘴、张牙舞爪的凶脸，两旁还有几根又长又白且竖起来了的胡须，脚底下四只</span><span style="font-family: 楷体; color: rgb(255, 0, 0)">爪子非常锋</span><span style="font-family: 楷体">利，像要马上抓到你了。</span></p><p data-indent="2"><span style="font-family: 楷体">小老鼠吓得魂飞魄散、惊慌失措，双脚在电脑桌子上跳了起来，一手前一手后的，想跑回老鼠洞里。<strong>当它准备逃跑</strong>的时候，不小心</span><span style="font-family: 楷体"><span style="text-emphasis:dot;-webkit-text-emphasis:dot;-webkit-text-emphasis-position: under;text-emphasis-position: under;">又一次触碰到了电</span></span><span style="font-family: 楷体">脑鼠标，那张大猫脸突然消失了。小老鼠心里咯噔了一下：“哎呀！原来是虚惊一场”。它认为是自己打败了那只大猫，不由得沾沾自喜。</span></p><h2>🚀 Features<img src="https://shy-nav.shaohang.xin/nav-icons/github.svg" data-display="right"></h2><ul><li><p>Many Extensions</p></li><li><p>Markdown support</p></li><li><p>Using TypeScript</p></li></ul><h2>🔥 Extensions</h2><h3>Marks</h3><ul><li><p>bold</p></li><li><p>code</p></li><li><p>emphasis</p></li><li><p>highlight</p></li><li><p>italic</p></li><li><p>link</p></li><li><p>strike</p></li><li><p>subscript</p></li><li><p>superscript</p></li><li><p>underline</p></li></ul><h3>nodes</h3><ul><li><p>blockquote</p></li><li><p>bullet-list</p></li><li><p>ordered-list</p></li><li><p>task-list</p></li><li><p>code-block-lowlight</p></li><li><p>heading</p></li><li><p>horizontal-rule</p></li><li><p>image</p></li><li><p>table</p></li><li><p>title</p></li></ul><h3>Other</h3><ul><li><p>color</p></li><li><p>commands</p></li><li><p>document</p></li><li><p>dropcursor</p></li><li><p>focus</p></li><li><p>format-clear</p></li><li><p>fullscreen</p></li><li><p>gapcursor</p></li><li><p>history</p></li><li><p>import-word</p></li><li><p>placeholder</p></li><li><p>text-align</p></li></ul><p></p><blockquote><p>让教育像糖果，让学习有甜度。</p><p>Let education be like candy and make learning sweet.</p></blockquote>')

const theme = computed(() => {
  return isDark.value ? 'dark' : 'light'
})
const editorRef = ref()
function logEditorRef() {
  // eslint-disable-next-line no-console
  console.log(editorRef.value.editor)
}
const showLineNo = ref(false)
function importWord() {
  editorRef.value.editor.commands.importWord(editorRef.value.editor)
}
</script>

<template>
  <div class="mx-auto container">
    <div class="flex items-center justify-start gap-3">
      <h2>Welcome to <code>`guodu-tiptap`</code></h2>
      <div icon-btn @click="toggleDark()">
        <div dark:i-carbon-moon i-carbon-sun />
      </div>

      <a
        i-carbon-logo-github icon-btn rel="noreferrer" href="https://github.com/shy1118999/guodu-tiptap" target="_blank"
        title="GitHub"
      />
      <button @click="logEditorRef">
        Log Editor Instance
      </button>
      <button @click="showLineNo = !showLineNo">
        显示/隐藏行号
      </button>
      <button @click="importWord">
        import word
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
</style>
