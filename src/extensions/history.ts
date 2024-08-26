/*
 * @Author: shaohang-shy
 * @Date: 2022-11-30 16:39:52
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-11-30 19:34:23
 * @Description: history
 */
import History from '@tiptap/extension-history'
import type { Editor } from '@tiptap/vue-3'
import type { MenuBtnView, MenuOptions } from '~/typings'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'

export default History.extend<MenuOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView[] {
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
