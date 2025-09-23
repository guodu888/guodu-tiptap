import type { BulletListOptions } from '@tiptap/extension-list'
import { BulletList } from '@tiptap/extension-list'
import type { Editor } from '@tiptap/core'
import ListItem from './list-item'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import type { MenuBtnView, MenuOptions } from '~/typings'

export default BulletList.extend<BulletListOptions & MenuOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {}, // ✅ 必须有，至少给个空对象
      itemTypeName: 'listItem',
      keepMarks: false,
      keepAttributes: false,
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleBulletList()
            },
            isActive: editor.isActive('bulletList'),
            icon: 'list-ul',
            tooltip: '无序列表',
          },
        }
      },
    }
  },
  addExtensions() {
    return [ListItem]
  },
})
