<!--
 * @Author: shaohang-shy
 * @Date: 2022-12-03 11:19:43
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-03 11:21:21
 * @Description: EditImageCommadButton
-->
<script setup lang="ts">
import type { Node as ProseMirrorNode } from 'prosemirror-model'
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
      <div class="w-60 box-border p-2 flex flex-col items-start">
        <p class="text-center w-full font-bold text-lg">
          图片属性
        </p>
        <div class="w-full flex flex-col items-start justify-center my-1">
          <p>图片地址:</p>
          <input :value="form.src" disabled type="text" class="box-border border-1 p-1 w-full rounded">
        </div>
        <div class="w-full flex flex-col items-start justify-center my-1">
          <p>图片描述:</p>
          <input v-model="form.alt" type="text" class="box-border border-1 p-1 w-full rounded bg-transparent" :class="{ 'text-white/80': theme === 'dark' }">
        </div>
        <div class="w-full flex flex-row items-start justify-center my-1">
          <div class="flex-1 flex flex-col items-start justify-center my-1">
            <p>图片宽度:</p>
            <input v-model="form.width" type="number" class="box-border border-1 p-1 w-full rounded bg-transparent" :class="{ 'text-white/80': theme === 'dark' }">
          </div>
          <div class="w-2" />
          <div class="flex-1 flex flex-col items-start justify-center my-1">
            <p>图片高度:</p>
            <input v-model="form.height" type="number" class="box-border border-1 p-1 w-full rounded bg-transparent" :class="{ 'text-white/80': theme === 'dark' }">
          </div>
        </div>
        <div class="w-full flex justify-center items-center my-1">
          <button class="btn mx-1" @click.stop="() => tippyRef.hide()">
            取消
          </button>
          <button class="btn mx-1" @click="handleSubmit()">
            确认
          </button>
        </div>
      </div>
    </template>
  </Tippy>
</template>
