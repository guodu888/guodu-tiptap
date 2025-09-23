/*
 * @Author: shaohang-shy
 * @Date: 2022-11-30 16:39:52
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-11-30 19:34:23
 * @Description: history
 */
import { UndoRedo } from '@tiptap/extensions'
import type { AnyExtension, Editor } from '@tiptap/core'
import type { MenuBtnView, MenuOptions } from '~/typings'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'

export default UndoRedo.extend<MenuOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      menuBtnView({ editor }: { editor: Editor, extension?: AnyExtension }): MenuBtnView | MenuBtnView[] {
        return [
          {
            component: CommandButton,
            componentProps: {
              command: () => {
                editor.commands.undo()
              },
              icon: 'undo',
              tooltip: '撤销',
            },
          },
          {
            component: CommandButton,
            componentProps: {
              command: () => {
                editor.commands.redo()
              },
              icon: 'redo',
              tooltip: '恢复',
            },
          },
        ]
      },
    }
  },
})
