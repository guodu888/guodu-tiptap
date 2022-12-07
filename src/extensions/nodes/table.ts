/*
 * @Author: shaohang-shy
 * @Date: 2022-11-30 20:06:20
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2022-12-03 15:44:19
 * @Description: table
 */
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import type { Editor } from '@tiptap/vue-3'
import type { MenuBtnView } from '~/typings'
import TablePopover from '~/components/MenuCommands/TablePopover.vue'
export default Table.extend({
  isolating: true,
  addOptions() {
    return {
      ...this.parent?.(),
      multicolor: true,
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
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
