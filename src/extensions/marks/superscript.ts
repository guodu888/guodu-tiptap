/*
 * @Author: Arthur_Zhang
 * @Date: 2022-12-01 17:06:10
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2022-12-01 18:55:25
 * @Description:
 */
import type { SuperscriptExtensionOptions } from '@tiptap/extension-superscript'
import Superscript from '@tiptap/extension-superscript'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import type { MenuOptions } from '~/typings'

export default Superscript.extend<SuperscriptExtensionOptions & MenuOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {}, // ✅ 必须有，至少给个空对象
      menuBtnView({ editor }) {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleSuperscript()
            },
            isActive: editor.isActive('superscript'),
            icon: 'superscript',
            tooltip: '上标',
          },
        }
      },
    }
  },
})
