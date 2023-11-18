<script setup lang="tsx">
import type { Editor } from '@tiptap/vue-3'
import { inject, ref } from 'vue'
import { Tippy } from 'vue-tippy'
import type { Level } from '@tiptap/extension-heading'
import CommandButton from './CommandButton.vue'

const props = withDefaults(defineProps<{ editor: Editor, icon?: string, tooltip?: string, active?: boolean, levels: Level[] }>(), {
  icon: '',
  tooltip: '',
  active: false,

})
const theme = inject('theme', 'light')
const tippyRef = ref()

function handleShow() {
  tippyRef.value.show()
}

const chineseNum = ['', '一', '二', '三', '四', '五', '六']
function handleSetHeading(type: Level) {
  props.editor?.commands.toggleHeading({ level: type })
  tippyRef.value.hide()
}
</script>

<template>
  <Tippy ref="tippyRef" :z-index="99999" trigger="manual" :theme="theme" interactive>
    <CommandButton :icon="props.icon" :tooltip="props.tooltip" :is-active="props.editor.isActive('heading')" :command="() => handleShow()" />
    <template #content>
      <div>
        <div
          v-for="i in props.levels"
          :key="i"
          class="cursor-pointer px-1 py-2 hover:color-blue"
          :class="{ 'color-blue': props.editor.isActive('heading', { level: i }) }"
          @click="handleSetHeading(i)"
        >
          <span>{{ `标题${chineseNum[i]}   h${i}` }}</span>
        </div>
      </div>
    </template>
  </Tippy>
</template>
