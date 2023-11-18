<!--
 * @Author: shaohang-shy
 * @Date: 2021-02-25 22:20:13
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-06 19:55:23
 * @Description:
-->
<script setup lang="ts">
import { inject, ref } from 'vue'
import { Tippy } from 'vue-tippy'

const emit = defineEmits(['create'])
const theme = inject('theme', 'light')
const createdTippyRef = ref()

const INIT_GRID_SIZE = 5
const MAX_GRID_SIZE = 10
const DEFAULT_SELECTED_GRID_SIZE = 2
const tableGridSize = ref(
  {
    row: INIT_GRID_SIZE,
    col: INIT_GRID_SIZE,
  },
)
const selectedTableGridSize = ref({
  row: DEFAULT_SELECTED_GRID_SIZE,
  col: DEFAULT_SELECTED_GRID_SIZE,
})
function selectTableGridSize(row: number, col: number) {
  if (row === tableGridSize.value.row)
    tableGridSize.value.row = Math.min(row + 1, MAX_GRID_SIZE)

  if (col === tableGridSize.value.col)
    tableGridSize.value.col = Math.min(col + 1, MAX_GRID_SIZE)

  selectedTableGridSize.value.row = row
  selectedTableGridSize.value.col = col
}
function onMouseDown(row: number, col: number) {
  emit('create', { row, col })
  createdTippyRef.value.hide()
}
function resetTableGridSize() {
  tableGridSize.value = {
    row: INIT_GRID_SIZE,
    col: INIT_GRID_SIZE,
  }

  selectedTableGridSize.value = {
    row: DEFAULT_SELECTED_GRID_SIZE,
    col: DEFAULT_SELECTED_GRID_SIZE,
  }
}
function showPopover() {
  resetTableGridSize()
  createdTippyRef.value.show()
}
</script>

<template>
  <Tippy
    ref="createdTippyRef"
    :z-index="99999"
    trigger="manual"
    interactive
    :arrow="false"
    :theme="theme"
    placement="right"
    class="popover-menu-item"
  >
    <span @click="showPopover()">
      插入表格
    </span>
    <template #content>
      <div>
        <div class="flex flex-col flex-wrap justify-between">
          <div
            v-for="row in tableGridSize.row"
            :key="`r${row}`"
            class="flex"
          >
            <div
              v-for="col in tableGridSize.col"
              :key="`c${col}`"
              class="p-1"
              @mouseover="selectTableGridSize(row, col)"
              @mousedown="onMouseDown(row, col)"
            >
              <div class="h-2 w-2 border-1 b-solid p-1" :class="{ 'border-blue': col <= selectedTableGridSize.col && row <= selectedTableGridSize.row }" />
            </div>
          </div>
        </div>

        <div class="mt-3 text-center">
          {{ selectedTableGridSize.row }} X {{ selectedTableGridSize.col }}
        </div>
      </div>
    </template>
  </Tippy>
</template>
