/*
 * @Author: shaohang-shy
 * @Date: 2022-11-29 14:44:22
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-11-30 15:39:40
 * @Description: italic
 */
import type { ItalicOptions } from '@tiptap/extension-italic'
import Italic from '@tiptap/extension-italic'
import type { Editor } from '@tiptap/vue-3'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import type { MenuBtnView, MenuOptions } from '~/typings'

export default Italic.extend<ItalicOptions & MenuOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleItalic()
            },
            isActive: editor.isActive('italic'),
            icon: 'italic',
            tooltip: '斜体',
          },
        }
      },
    }
  },
})
