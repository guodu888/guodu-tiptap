import type { HorizontalRuleOptions } from '@tiptap/extension-horizontal-rule'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import type { Editor } from '@tiptap/vue-3'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import type { MenuBtnView, MenuOptions } from '~/typings'

export default HorizontalRule.extend<HorizontalRuleOptions & MenuOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.setHorizontalRule()
            },
            isActive: editor.isActive('horizontalrule'),
            icon: 'horizontal-rule',
            tooltip: '分割线',
          },
        }
      },
    }
  },

})
