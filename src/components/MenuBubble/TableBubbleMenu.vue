<!--
 * @Author: shaohang-shy
 * @Date: 2022-12-01 19:01:09
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2022-12-03 19:43:43
 * @Description: LinkBubbleMenu
-->
<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import { enableMergeCells, enableSplitCell } from '~/utils/table'
const props = defineProps<{ editor?: Editor }>()
function handleAddCol(type = 'before') {
  if (type === 'before')

    props.editor?.commands.addColumnBefore()

  else
    props.editor?.commands.addColumnAfter()
}
function handleDeleteCol() {
  props.editor?.commands.deleteColumn()
}
function handleAddRow(type = 'before') {
  if (type === 'before')

    props.editor?.commands.addRowBefore()

  else
    props.editor?.commands.addRowAfter()
}
function handleDeleteRow() {
  props.editor?.commands.deleteRow()
}
function handleDeleteTable() {
  props.editor?.commands.deleteTable()
}
function handleMergeCells() {
  props.editor?.commands.mergeCells()
}
function handleSplitCells() {
  props.editor?.commands.splitCell()
}
</script>

<template>
  <div class="flex flex-row">
    <CommandButton icon="insert-left" tooltip="向左插入一列" :command="() => handleAddCol('before')" />
    <CommandButton icon="insert-right" tooltip="向右插入一列" :command="() => handleAddCol('after')" />
    <CommandButton icon="delete-column" tooltip="删除列" :command="() => handleDeleteCol()" />
    <CommandButton icon="insert-top" tooltip="向上插入一行" :command="() => handleAddRow('before')" />
    <CommandButton icon="insert-bottom" tooltip="向下插入一行" :command="() => handleAddRow('after')" />
    <CommandButton icon="delete-row" tooltip="删除行" :command="() => handleDeleteRow()" />
    <CommandButton v-if="props.editor?.state && enableMergeCells(props.editor?.state)" icon="merge-cell" tooltip="合并单元格" :command="() => handleMergeCells()" />
    <CommandButton v-if="props.editor?.state && enableSplitCell(props.editor?.state)" icon="split-cell" tooltip="拆分单元格" :command="() => handleSplitCells()" />
    <CommandButton icon="delete-table" tooltip="删除表格" :command="() => handleDeleteTable()" />
    <slot />
  </div>
</template>
