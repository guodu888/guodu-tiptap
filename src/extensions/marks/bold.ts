import type { BoldOptions } from '@tiptap/extension-bold'
import Bold from '@tiptap/extension-bold'
import type { MenuOptions } from '~/typings'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'

export default Bold.extend<BoldOptions & MenuOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {}, // ✅ 必须有，至少给个空对象
      menuBtnView({ editor }) {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleBold()
            },
            isActive: editor.isActive('bold'),
            icon: 'bold',
            tooltip: '粗体',
          },
        }
      },
    }
  },
})
