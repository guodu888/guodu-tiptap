/*
 * @Author: Arthur_Zhang
 * @Date: 2022-12-02 20:58:39
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2022-12-03 21:10:42
 * @Description:
 */
import type { HeadingOptions } from '@tiptap/extension-heading'
import Heading from '@tiptap/extension-heading'
import type { MenuBtnView, MenuOptions } from '~/typings'
import HeadingCommandButton from '~/components/MenuCommands/HeadingCommandButton.vue'

export default Heading.extend<HeadingOptions & MenuOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {}, // ✅ 必须有，至少给个空对象
      levels: [1, 2, 3, 4, 5, 6],
      menuBtnView({ editor, extension }): MenuBtnView {
        return {
          component: HeadingCommandButton,
          componentProps: {
            editor,
            levels: (extension?.options as HeadingOptions).levels,
            tooltip: '标题',
            icon: 'heading',
          },
        }
      },
    }
  },
})
