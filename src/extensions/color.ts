/*
 * @Author: Arthur_Zhang
 * @Date: 2022-12-01 20:57:26
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-02 11:28:48
 * @Description:
 */
import type { ColorOptions } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import type { Editor } from '@tiptap/vue-3'
import type { MenuBtnView, MenuOptions } from '~/typings'
import FontColorPopover from '~/components/MenuCommands/FontColorPopover.vue'

export default Color.extend<ColorOptions & MenuOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      multicolor: true,
      colors: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#000000'],
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
        return {
          component: FontColorPopover,
          componentProps: {
            editor,
          },
        }
      },
    }
  },
  addExtensions() {
    return [TextStyle]
  },
})
