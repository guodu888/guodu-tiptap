/*
 * @Author: shaohang-shy
 * @Date: 2022-11-30 20:06:20
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2022-12-03 15:44:19
 * @Description: table
 */
import { Table, TableCell, TableHeader, TableRow } from '@tiptap/extension-table'
import type { MenuOptions } from '~/typings'
import TablePopover from '~/components/MenuCommands/TablePopover.vue'

export default Table.extend<MenuOptions>({
  isolating: true,
  addOptions() {
    return {
      ...this.parent?.(),
      multicolor: true,
      menuBtnView({ editor }) {
        return {
          component: TablePopover,
          componentProps: {
            editor,
          },
        }
      },
    }
  },
  addExtensions() {
    return [TableRow, TableCell, TableHeader]
  },
})
