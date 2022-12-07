<!--
 * @Author: shaohang-shy
 * @Date: 2022-12-02 20:15:16
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-03 09:31:56
 * @Description: InsertImageCommandButton
-->
<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { ref } from 'vue'
import { Tippy } from 'vue-tippy'
import CommandButton from './CommandButton.vue'
const props = defineProps<{
  editor?: Editor
}>()
const form = ref({
  src: '',
})
let theme = 'light'
theme = inject('theme', 'light')
const tippyRef = ref()
function handleInsertImage() {
  if (!form.value.src)
    return
  props.editor?.commands.setImage({ src: form.value.src })
}
function handleClose() {
  form.value.src = ''
}
</script>

<template>
  <Tippy ref="tippyRef" :z-index="99999" trigger="manual" interactive :on-hide="handleClose" :theme="theme">
    <CommandButton
      tooltip="插入图片"
      icon="image"
      :command="() => tippyRef.show()"
    />
    <template #content>
      <div class="w-50 p-2 flex flex-col items-start">
        <p class="text-center w-full font-bold text-lg leading-1">
          插入图片
        </p>
        <input v-model="form.src" class="border-1 p-1 my-1 w-full rounded" placeholder="请输入图片地址">
        <div class="w-full flex justify-center items-center my-1">
          <button class="btn mx-1" @click.stop="() => tippyRef.hide()">
            Cancel
          </button>
          <button class="btn mx-1" @click="handleInsertImage">
            Submit
          </button>
        </div>
      </div>
    </template>
  </Tippy>
</template>
