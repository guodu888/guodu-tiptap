/*
 * @Author: shaohang-shy
 * @Date: 2022-11-29 17:36:43
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-11-30 15:25:30
 * @Description: Highlight
 */
import Highlight from '@tiptap/extension-highlight'
import type { Editor } from '@tiptap/vue-3'
import type { MenuBtnView } from '~/typings'
import HighlightPopover from '~/components/MenuCommands/HighlightPopover.vue'

export default Highlight.extend({
  exitable: true,
  addOptions() {
    return {
      ...this.parent?.(),
      multicolor: true,
      colors: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#000000'],
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
        return {
          component: HighlightPopover,
          componentProps: {
            editor,
          },
        }
      },
    }
  },
})
