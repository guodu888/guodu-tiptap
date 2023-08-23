import type { BulletListOptions } from '@tiptap/extension-bullet-list'
import BulletList from '@tiptap/extension-bullet-list'
import type { Editor } from '@tiptap/vue-3'
import ListItem from './list-item'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import type { MenuBtnView, MenuOptions } from '~/typings'
export default BulletList.extend<BulletListOptions & MenuOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
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
