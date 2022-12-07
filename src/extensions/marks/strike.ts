/*
 * @Author: shaohang-shy
 * @Date: 2022-11-30 15:35:51
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-11-30 15:41:59
 * @Description: @tiptap/extension-strike
 */
import type { StrikeOptions } from '@tiptap/extension-strike'
import Strike from '@tiptap/extension-strike'
import type { Editor } from '@tiptap/vue-3'
import type { MenuBtnView, MenuOptions } from '~/typings'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'

export default Strike.extend<StrikeOptions & MenuOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleStrike()
            },
            isActive: editor.isActive('strike'),
            icon: 'strikethrough',
            tooltip: '删除线',
          },
        }
      },
    }
  },
})
