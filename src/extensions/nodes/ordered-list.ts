import type { OrderedListOptions } from '@tiptap/extension-list'
import { OrderedList } from '@tiptap/extension-list'
import ListItem from './list-item'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import type { MenuOptions } from '~/typings'

export default OrderedList.extend<OrderedListOptions & MenuOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      itemTypeName: 'listItem',
      HTMLAttributes: {}, // ✅ 必须有，至少给个空对象
      keepMarks: false,
      keepAttributes: false,
      menuBtnView({ editor }) {
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
