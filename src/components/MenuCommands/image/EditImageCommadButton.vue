<!--
 * @Author: shaohang-shy
 * @Date: 2022-12-03 11:19:43
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-03 11:21:21
 * @Description: EditImageCommadButton
-->
<script setup lang="ts">
import type { Node as ProseMirrorNode } from 'prosemirror-model'
import { inject, ref } from 'vue'
import { Tippy } from 'vue-tippy'
import CommandButton from '../CommandButton.vue'

const props = defineProps<{
  node?: ProseMirrorNode
}>()
const emits = defineEmits(['change'])
let theme = 'light'
theme = inject('theme', 'light')
const tippyRef = ref()
// width height url alt ...
const form = ref({
  src: '',
  alt: '',
  width: 0,
  height: 0,
})
function handleClose() {}
function handleShow() {
  form.value.src = props.node?.attrs.src
  form.value.alt = props.node?.attrs.alt
  form.value.width = props.node?.attrs.width
  form.value.height = props.node?.attrs.height
  tippyRef.value.show()
}
function handleSubmit() {
  emits('change', form.value)
}
</script>

<template>
  <Tippy ref="tippyRef" :z-index="99999" trigger="manual" interactive :on-hide="handleClose" :theme="theme">
    <CommandButton icon="ellipsis-h" tooltip="图片属性" :command="() => handleShow()" />
    <template #content>
      <div class="box-border w-60 flex flex-col items-start p-2">
        <p class="w-full text-center text-lg font-bold">
          图片属性
        </p>
        <div class="my-1 w-full flex flex-col items-start justify-center">
          <p>图片地址:</p>
          <input :value="form.src" disabled type="text" class="box-border w-full border-1 rounded p-1">
        </div>
        <div class="my-1 w-full flex flex-col items-start justify-center">
          <p>图片描述:</p>
          <input v-model="form.alt" type="text" class="box-border w-full border-1 rounded bg-transparent p-1" :class="{ 'text-white/80': theme === 'dark' }">
        </div>
        <div class="my-1 w-full flex flex-row items-start justify-center">
          <div class="my-1 flex flex-1 flex-col items-start justify-center">
            <p>图片宽度:</p>
            <input v-model="form.width" type="number" class="box-border w-full border-1 rounded bg-transparent p-1" :class="{ 'text-white/80': theme === 'dark' }">
          </div>
          <div class="w-2" />
          <div class="my-1 flex flex-1 flex-col items-start justify-center">
            <p>图片高度:</p>
            <input v-model="form.height" type="number" class="box-border w-full border-1 rounded bg-transparent p-1" :class="{ 'text-white/80': theme === 'dark' }">
          </div>
        </div>
        <div class="my-1 w-full flex items-center justify-center">
          <button class="mx-1 btn" @click.stop="() => tippyRef.hide()">
            取消
          </button>
          <button class="mx-1 btn" @click="handleSubmit()">
            确认
          </button>
        </div>
      </div>
    </template>
  </Tippy>
</template>
