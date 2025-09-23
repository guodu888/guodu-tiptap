import FontFamily from '@tiptap/extension-font-family'
import type { FontFamilyOptions } from '@tiptap/extension-font-family'
import FontFamilyCommandButtonVue from '~/components/MenuCommands/FontFamilyCommandButton.vue'
import type { MenuOptions } from '~/typings'

export default FontFamily.extend<FontFamilyOptions & MenuOptions & { fontFamilys: string[] }, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      types: ['textStyle'],
      fontFamilys: ['楷体', '宋体'],
      menuBtnView({ editor }) {
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
