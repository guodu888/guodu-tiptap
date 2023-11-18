import type { OrderedListOptions } from '@tiptap/extension-ordered-list'
import OrderedList from '@tiptap/extension-ordered-list'
import type { Editor } from '@tiptap/vue-3'
import ListItem from './list-item'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import type { MenuBtnView, MenuOptions } from '~/typings'

export default OrderedList.extend<OrderedListOptions & MenuOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleOrderedList()
            },
            isActive: editor.isActive('orderedList'),
            icon: 'list-ol',
            tooltip: '有序列表',
          },
        }
      },
    }
  },
  addExtensions() {
    return [ListItem]
  },
})
