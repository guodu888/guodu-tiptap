/*
 * @Author: shaohang-shy
 * @Date: 2022-11-30 15:44:29
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-11-30 15:51:05
 * @Description: Subscript
 */
import type { SubscriptExtensionOptions } from '@tiptap/extension-subscript'
import Subscript from '@tiptap/extension-subscript'
import type { Editor } from '@tiptap/vue-3'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import type { MenuBtnView, MenuOptions } from '~/typings'
export default Subscript.extend<SubscriptExtensionOptions & MenuOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleSubscript()
            },
            isActive: editor.isActive('subscript'),
            icon: 'subscript',
            tooltip: '下标',
          },
        }
      },
    }
  },
})
