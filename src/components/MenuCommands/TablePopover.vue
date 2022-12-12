<!--
 * @Author: shaohang-shy
 * @Date: 2022-12-07 15:52:20
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-07 15:52:20
 * @Description: Table
-->
<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { Tippy } from 'vue-tippy'
import { computed, inject, ref } from 'vue'
import { enableMergeCells, enableSplitCell } from '~/utils/table'

const props = defineProps<{ editor: Editor }>()
const tippyRef = ref()
const theme = inject('theme', 'light')
const selectedTable = computed<string>((): any => {
  return props.editor.isActive('table')
})
const enableMerge = computed<string>((): any => {
  return props.editor?.state && enableMergeCells(props.editor?.state)
})
const enableSplit = computed<string>((): any => {
  return props.editor?.state && enableSplitCell(props.editor?.state)
})
function handleShow() {
  tippyRef.value.show()
}
function handleCreatedTable(e: { row: number; col: number }) {
  props.editor.commands.insertTable({ rows: e.row, cols: e.col, withHeaderRow: true })
  tippyRef.value.hide()
}
function handleAddCol(type = 'before') {
  if (type === 'before')
    props.editor.commands.addColumnBefore()
  else
    props.editor.commands.addColumnAfter()
  tippyRef.value.hide()
}
function handleDeleteCol() {
  props.editor.commands.deleteColumn()
  tippyRef.value.hide()
}

function handleAddRow(type = 'before') {
  if (type === 'before')
    props.editor.commands.addRowBefore()
  else
    props.editor.commands.addRowAfter()
  tippyRef.value.hide()
}
function handleDeleteRow() {
  props.editor.commands.deleteRow()
  tippyRef.value.hide()
}
function handleMergeCells() {
  props.editor.commands.mergeCells()
}
function handleSplitCells() {
  props.editor.commands.splitCell()
}
function handleDeleteTable() {
  props.editor.commands.deleteTable()
  tippyRef.value.hide()
}
</script>

<template>
  <Tippy ref="tippyRef" :z-index="99999" trigger="manual" interactive :arrow="false" :theme="theme">
    <CommandButton icon="table" tooltip="表格" :command="() => handleShow()" />
    <template #content>
      <div class="flex flex-col">
        <CreateTablePopover @create="handleCreatedTable" />
        <div class="dividing-line" />
        <div
          class="popover-menu-item" :class="{ 'popover-menu-item-disable': !selectedTable }"
          @click="handleAddCol('before')"
        >
          向左插入一列
        </div>
        <div
          class="popover-menu-item" :class="{ 'popover-menu-item-disable': !selectedTable }"
          @click="handleAddCol('after')"
        >
          向右插入一列
        </div>
        <div
          class="popover-menu-item" :class="{ 'popover-menu-item-disable': !selectedTable }"
          @click="handleDeleteCol"
        >
          删除列
        </div>
        <div class="dividing-line" />
        <div
          class="popover-menu-item" :class="{ 'popover-menu-item-disable': !selectedTable }"
          @click="handleAddRow('before')"
        >
          向下插入一行
        </div>
        <div
          class="popover-menu-item" :class="{ 'popover-menu-item-disable': !selectedTable }"
          @click="handleAddRow('after')"
        >
          向上插入一行
        </div>
        <div
          class="popover-menu-item" :class="{ 'popover-menu-item-disable': !selectedTable }"
          @click="handleDeleteRow"
        >
          删除行
        </div>
        <div class="dividing-line" />
        <div class="popover-menu-item" :class="{ 'popover-menu-item-disable': !enableMerge }" @click="handleMergeCells">
          合并单元格
        </div>
        <div class="popover-menu-item" :class="{ 'popover-menu-item-disable': !enableSplit }" @click="handleSplitCells">
          拆分单元格
        </div>
        <div class="dividing-line" />
        <div
          class="popover-menu-item" :class="{ 'popover-menu-item-disable': !selectedTable }"
          @click="handleDeleteTable"
        >
          删除表格
        </div>
      </div>
    </template>
  </Tippy>
</template>
