<!--
 * @Author: shaohang-shy
 * @Date: 2022-12-02 20:16:35
 * @LastEditors: shy1118
 * @LastEditTime: 2023-11-18 21:53:17
 * @Description: ImageView
-->
<script setup lang="ts">
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import { inject, ref, watchEffect } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { Tippy } from 'vue-tippy'
import { deleteSelection } from 'prosemirror-commands'
import { resolveImg } from '~/utils/images'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import ImageDisplayCommandButton from '~/components/MenuCommands/image/ImageDisplayCommandButton.vue'
import EditImageCommadButton from '~/components/MenuCommands/image/EditImageCommadButton.vue'

const props = defineProps(nodeViewProps)
const theme = inject('theme', 'light')
function clamp(val: number, min: number, max: number): number {
  if (val < min)
    return min
  if (val > max)
    return max
  return val
}
const resizing = ref(false)
enum ResizeDirection {
  TOP_LEFT = 'tl',
  TOP_RIGHT = 'tr',
  BOTTOM_LEFT = 'bl',
  BOTTOM_RIGHT = 'br',
}
const resizeDirections = [
  ResizeDirection.TOP_LEFT,
  ResizeDirection.TOP_RIGHT,
  ResizeDirection.BOTTOM_LEFT,
  ResizeDirection.BOTTOM_RIGHT,
]
function selectImage() {
  props.editor?.commands.setNodeSelection(props.getPos!())
}
const originalSize = { width: 0, height: 0 }
const resizerState = { x: 0, y: 0, w: 0, h: 0, dir: '' }
const MIN_SIZE = 20
const MAX_SIZE = 100000
const maxSize = { width: MAX_SIZE, height: MAX_SIZE }
function onMouseDown(e: MouseEvent, dir: ResizeDirection) {
  e.preventDefault()
  e.stopPropagation()
  resizerState.x = e.clientX
  resizerState.y = e.clientY

  const originalWidth = originalSize.width
  const originalHeight = originalSize.height
  const aspectRatio = originalWidth / originalHeight

  let { width, height } = props.node!.attrs
  const maxWidth = maxSize.width

  if (width && !height) {
    width = width > maxWidth ? maxWidth : width
    height = Math.round(width / aspectRatio)
  }
  else if (height && !width) {
    width = Math.round(height * aspectRatio)
    width = width > maxWidth ? maxWidth : width
  }
  else if (!width && !height) {
    width = originalWidth > maxWidth ? maxWidth : originalWidth
    height = Math.round(width / aspectRatio)
  }
  else {
    width = width > maxWidth ? maxWidth : width
  }

  resizerState.w = width
  resizerState.h = height
  resizerState.dir = dir

  resizing.value = true

  onEvents()
}
function onMouseMove(e: MouseEvent) {
  e.preventDefault()
  e.stopPropagation()
  if (!resizing.value)
    return

  const { x, y, w, h, dir } = resizerState

  const dx = (e.clientX - x) * (/l/.test(dir) ? -1 : 1)
  const dy = (e.clientY - y) * (/t/.test(dir) ? -1 : 1)

  props.updateAttributes?.({
    width: clamp(w + dx, MIN_SIZE, maxSize.width),
    height: Math.max(h + dy, MIN_SIZE),
  })
}
function onMouseUp(e: MouseEvent) {
  e.preventDefault()
  e.stopPropagation()
  if (!resizing.value)
    return

  resizing.value = false

  resizerState.x = 0
  resizerState.y = 0
  resizerState.w = 0
  resizerState.h = 0
  resizerState.dir = ''

  offEvents()
  selectImage()
}
function onEvents(): void {
  document.addEventListener('mousemove', onMouseMove, true)
  document.addEventListener('mouseup', onMouseUp, true)
}
function offEvents(): void {
  document.removeEventListener('mousemove', onMouseMove, true)
  document.removeEventListener('mouseup', onMouseUp, true)
}
const imageViewRef = ref()
useResizeObserver(imageViewRef, () => {
  getMaxSize()
})
function getMaxSize() {
  const { width } = getComputedStyle(props.editor!.view.dom)
  maxSize.width = Number.parseInt(width, 10)
}

resolveImg(props.node.attrs.src).then((result) => {
  if (!result.complete) {
    result.width = MIN_SIZE
    result.height = MIN_SIZE
  }
  originalSize.width = result.width
  originalSize.height = result.height
})
const tippyRef = ref()
watchEffect(() => {
  if (props.selected)
    tippyRef.value?.show()
  else
    tippyRef.value?.hide()
})
function updateDisplay(e: string) {
  props.updateAttributes?.({ display: e })
}
function deleteImage() {
  deleteSelection(props.editor.view.state, props.editor.view.dispatch)
}
function updateAttrs(e: { alt: string, height?: number | null, width?: number | null }) {
  props.updateAttributes({
    alt: e.alt,
    width: e.width && e.width >= 0 ? e.width : null,
    height: e.height && e.height >= 0 ? e.height : null,
  })
}
</script>

<template>
  <NodeViewWrapper as="span" class="my-2 inline-block max-w-full" :class="`image-view--${props.node.attrs.display}`">
    <Tippy ref="tippyRef" tag="div" :theme="theme" :z-index="99999" class="inline-block" trigger="manual" interactive>
      <div ref="imageViewRef" class="h-outline relative clear-both inline-block max-w-full cursor-pointer">
        <img
          :src="props.node.attrs.src" :title="props.node.attrs.title" :alt="props.node.attrs.alt"
          :width="props.node.attrs.width" :height="props.node.attrs.height" class="m-0" @click="selectImage"
        >

        <div v-if="editor?.isEditable" v-show="selected || resizing" class="image-resizer">
          <span
            v-for="direction in resizeDirections" :key="direction" :class="`image-resizer__handler--${direction}`"
            class="image-resizer__handler" @mousedown="onMouseDown($event, direction)"
          />
        </div>
      </div>
      <template #content>
        <div class="flex flex-row">
          <ImageDisplayCommandButton :current="props.node.attrs.display" @change="updateDisplay" />
          <EditImageCommadButton :node="props.node" @change="updateAttrs" />
          <CommandButton icon="trash-alt" tooltip="删除" :command="() => deleteImage()" />
        </div>
      </template>
    </Tippy>
  </NodeViewWrapper>
</template>

<style lang="scss">
.image-view {
  $root: &;

  display: inline-block;
  float: none;
  line-height: 0;
  margin: 12px 0;
  max-width: 100%;
  user-select: none;
  vertical-align: baseline;

  &--inline {
    margin-left: 12px;
    margin-right: 12px;
  }

  &--block {
    display: block;
  }

  &--left {
    float: left;
    margin-left: 0;
    margin-right: 12px;
  }

  &--right {
    float: right;
    margin-left: 12px;
    margin-right: 0;
  }
}

.image-resizer {
  border: 1px solid var(--primary-color);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;

  &__handler {
    background-color: var(--primary-color);
    border: 1px solid var(--white-color);
    border-radius: 2px;
    box-sizing: border-box;
    display: block;
    height: 12px;
    position: absolute;
    width: 12px;
    z-index: 2;

    &--tl {
      cursor: nw-resize;
      left: -6px;
      top: -6px;
    }

    &--tr {
      cursor: ne-resize;
      right: -6px;
      top: -6px;
    }

    &--bl {
      bottom: -6px;
      cursor: sw-resize;
      left: -6px;
    }

    &--br {
      bottom: -6px;
      cursor: se-resize;
      right: -6px;
    }
  }
}
</style>
