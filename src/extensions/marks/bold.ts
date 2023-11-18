import type { BoldOptions } from '@tiptap/extension-bold'
import Bold from '@tiptap/extension-bold'
import type { Editor } from '@tiptap/vue-3'
import type { MenuBtnView, MenuOptions } from '~/typings'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'

export default Bold.extend<BoldOptions & MenuOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
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
