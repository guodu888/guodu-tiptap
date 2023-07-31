import FontFamily from '@tiptap/extension-font-family'
import type { FontFamilyOptions } from '@tiptap/extension-font-family'
import type { Editor } from '@tiptap/vue-3'
import FontFamilyCommandButtonVue from '~/components/MenuCommands/FontFamilyCommandButton.vue'
import type { MenuBtnView, MenuOptions } from '~/typings'

export default FontFamily.extend<FontFamilyOptions & MenuOptions & { fontFamilys: string[] }, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      fontFamilys: ['楷体', '宋体'],
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
        return {
          component: FontFamilyCommandButtonVue,
          componentProps: {
            editor,
            tooltip: '字体',
            icon: 'font-family',
          },
        }
      },
    }
  },
})
