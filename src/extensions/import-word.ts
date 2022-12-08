/*
 * @Author: shaohang-shy
 * @Date: 2022-11-30 16:36:43
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-11-30 19:29:48
 * @Description: import-word
 */
import { Extension } from '@tiptap/core'
import type { Editor } from '@tiptap/vue-3'
import ImportWordCommandButton from '~/components/MenuCommands/ImportWordCommandButton.vue'
import type { MenuBtnView } from '~/typings'
export default Extension.create({
  name: 'import-word',
  addOptions() {
    return {
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
        return {
          component: ImportWordCommandButton,
          componentProps: {
            editor,
          },
        }
      },
    }
  },
})
