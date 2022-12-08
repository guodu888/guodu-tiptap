<!--
 * @Author: shaohang-shy
 * @Date: 2022-11-30 16:30:43
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-05 10:55:39
 * @Description: ImportWordCommandButton
-->
<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { ref } from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import mammoth from 'mammoth/mammoth.browser.js'
import CommandButton from './CommandButton.vue'

const props = defineProps<{ editor: Editor }>()
const wordInput = ref()
function handleShowImport() {
  wordInput.value.click()
}
function transformElement(element: any) {
  if (element.children) {
    const children = element.children.map(transformElement)
    element = { ...element, children }
  }
  if (element.type === 'text')
    return { ...element, value: element.value.replace(/\s/g, '&nbsp;') }

  return element
}
function handleImport(e: any) {
  const file = e.target.files[0]
  wordInput.value.value = ''

  const { name } = file
  if (name.split('.').pop() !== 'docx') {
    console.error('仅支持docx文件')
    return
  }

  const reader = new FileReader()
  reader.onload = function (loadEvent: any) {
    const arrayBuffer = loadEvent.target.result // arrayBuffer
    const options = {
      transformDocument: transformElement,
      styleMap: [
        'u => u',
        'strike => del',
        'i => em',
        'sup => sup',
        'sub => sub',
      ],
      convertImage: mammoth.images.imgElement((image: any) => {
        return image.read('base64').then(async (imageBuffer: any) => {
          const base64
                = `data:${image.contentType};base64,${imageBuffer}`
          // const file = that.dataURLtoFile(base64)
          // const src = await that.handleUploadFile(file)
          return {
            src: base64,
          }
        })
      }),
    }
    mammoth
      .convertToHtml({ arrayBuffer }, options)
      .then((e: any) => {
        const newV = e.value.replace(/&amp;nbsp;/g, '&nbsp;')
        // 修复组合题和【】不换行
        const lineFeed = newV.replace(/<br \/>【】/g, '</p><p>【】')
        props.editor.commands.setContent(lineFeed, true)
      })
      .done()
  }

  reader.readAsArrayBuffer(file)
}
</script>

<template>
  <div>
    <CommandButton
      :command="handleShowImport"
      tooltip="word导入"
      icon="file-word"
    />
    <input
      ref="wordInput"
      type="file"
      style="display:none"
      accept=".docx"
      @change="handleImport"
    >
  </div>
</template>
