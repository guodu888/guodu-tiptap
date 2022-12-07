/*
 * @Author: Arthur_Zhang
 * @Date: 2022-12-03 19:38:32
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2022-12-03 19:40:28
 * @Description: table utils
 */
import { mergeCells, splitCell } from '@tiptap/prosemirror-tables'
import type { EditorState } from 'prosemirror-state'
export function isTableActive(state: EditorState) {
  const { selection, doc } = state
  const { from, to } = selection

  let keepLooking = true
  let active = false

  doc.nodesBetween(from, to, (node) => {
    const name = node.type.name
    if (
      keepLooking
      && (name === 'table'
        || name === 'table_row'
        || name === 'table_column'
        || name === 'table_cell')
    ) {
      keepLooking = false
      active = true
    }
    return keepLooking
  })

  return active
}

export function enableMergeCells(state: EditorState) {
  return isTableActive(state) && mergeCells(state)
}

export function enableSplitCell(state: EditorState) {
  return isTableActive(state) && splitCell(state)
}
