/*
 * @Author: shaohang-shy
 * @Date: 2022-11-29 17:35:12
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-01 17:40:12
 * @Description: code
 */
import type { CodeOptions } from '@tiptap/extension-code'
import Code from '@tiptap/extension-code'
import type { Editor } from '@tiptap/vue-3'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import type { MenuBtnView, MenuOptions } from '~/typings'

export default Code.extend<CodeOptions & MenuOptions, any>({
  exitable: true,
  addOptions() {
    return {
      ...this.parent?.(),
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleCode()
            },
            isActive: editor.isActive('code'),
            icon: 'code',
            tooltip: '代码',
          },
        }
      },
    }
  },
})
