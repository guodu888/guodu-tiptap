<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { computed, inject, ref } from 'vue'
import { Tippy } from 'vue-tippy'
import CommandButton from './CommandButton.vue'
const props = withDefaults(defineProps<{ editor: Editor; icon?: string; tooltip?: string; active?: boolean }>(), {
  icon: 'link',
  tooltip: '插入链接',
  active: true,
})
let theme = 'light'
theme = inject('theme', 'light')
const isActive = computed(() => props.editor.isActive('link'))
const form = ref({
  href: '',
  openInNewTab: false,
})
const tippyRef = ref()
function handleInsertLink() {
  if (form.value.openInNewTab) {
    props.editor.commands.setLink({
      href: form.value.href,
      target: '_blank',
    })
  }
  else {
    props.editor.commands.setLink({ href: form.value.href })
  }
  // clear from
  form.value = {
    href: '',
    openInNewTab: false,
  }
  tippyRef.value.hide()
}
function handleShow() {
  const { href, target } = props.editor.getAttributes('link')
  if (href)
    form.value.href = href
  if (target)
    form.value.openInNewTab = true
  tippyRef.value.show()
}
function handleClose() {
  form.value = {
    href: '',
    openInNewTab: false,
  }
}
</script>

<template>
  <Tippy ref="tippyRef" :z-index="99999" trigger="manual" interactive :on-hide="handleClose" :theme="theme">
    <CommandButton :icon="props.icon" :is-active="isActive && props.active" :tooltip="props.tooltip" :command="() => handleShow()" />
    <template #content>
      <div class="w-50 p-2 flex flex-col items-start">
        <p class="text-center w-full font-bold text-lg leading-1">
          添加/修改链接
        </p>
        <div class="flex w-full justify-center items-center my-1">
          <span class="w-4em">地址:</span>
          <input v-model="form.href" placeholder="请输入链接地址" type="text" class="border-1 p-1 w-full rounded">
        </div>
        <div class="flex w-full justify-center items-center my-1">
          <input v-model="form.openInNewTab" type="checkbox" class="mx-2">在新标签页打开
        </div>
        <div class="w-full flex justify-center items-center my-1">
          <button class="btn mx-1" @click.stop="() => tippyRef.hide()">
            取消
          </button>
          <button class="btn mx-1" @click="handleInsertLink()">
            确认
          </button>
        </div>
      </div>
    </template>
  </Tippy>
</template>
