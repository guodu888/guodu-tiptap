/*
 * @Author: Arthur_Zhang
 * @Date: 2022-12-01 20:22:58
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2022-12-01 20:29:24
 * @Description:
 */
import type { UnderlineOptions } from '@tiptap/extension-underline'
import Underline from '@tiptap/extension-underline'
import type { Editor } from '@tiptap/vue-3'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import type { MenuBtnView, MenuOptions } from '~/typings'

export default Underline.extend<UnderlineOptions & MenuOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleUnderline()
            },
            isActive: editor.isActive('underline'),
            icon: 'underline',
            tooltip: '下划线',
          },
        }
      },
    }
  },
})
