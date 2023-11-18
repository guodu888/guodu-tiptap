/*
 * @Author: Arthur_Zhang
 * @Date: 2022-12-02 19:16:43
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2022-12-02 19:23:30
 * @Description:
 */
import type { BlockquoteOptions } from '@tiptap/extension-blockquote'
import Blockquote from '@tiptap/extension-blockquote'
import type { Editor } from '@tiptap/vue-3'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import type { MenuBtnView, MenuOptions } from '~/typings'

export default Blockquote.extend<BlockquoteOptions & MenuOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleBlockquote()
            },
            isActive: editor.isActive('blockquote'),
            icon: 'quote-right',
            tooltip: '引用',
          },
        }
      },
    }
  },
})
