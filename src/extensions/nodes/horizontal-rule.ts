import type { HorizontalRuleOptions } from '@tiptap/extension-horizontal-rule'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import type { MenuOptions } from '~/typings'

export default HorizontalRule.extend<HorizontalRuleOptions & MenuOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {}, // ✅ 必须有，至少给个空对象
      menuBtnView({ editor }) {
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
