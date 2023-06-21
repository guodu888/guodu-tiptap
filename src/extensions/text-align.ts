/*
 * @Author: Arthur_Zhang
 * @Date: 2022-12-02 16:21:53
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2022-12-02 18:43:55
 * @Description:
 */
import type { TextAlignOptions } from '@tiptap/extension-text-align'
import TextAlign from '@tiptap/extension-text-align'
import type { Editor, Extension } from '@tiptap/vue-3'
import type { MenuBtnView, MenuOptions } from '~/typings'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
// export default TextAlign
export default TextAlign.extend<TextAlignOptions & MenuOptions, any>({
  addOptions() {
    const alignMap: any = {
      left: { title: '左对齐', icon: 'align-left', flag: 'left' },
      center: { title: '居中对齐', icon: 'align-center', flag: 'center' },
      right: { title: '右对齐', icon: 'align-right', flag: 'right' },
      justify: { title: '两端对齐', icon: 'align-justify', flag: 'justify' },
    }
    return {
      ...this.parent?.(),
      menuBtnView({ editor, extension }: { editor: Editor; extension: Extension }): MenuBtnView[] {
        const { alignments } = extension.options
        return alignments.map((x: string): any => {
          const info: any = alignMap[x]
          if (info) {
            return {
              component: CommandButton,
              componentProps: {
                command: () => {
                  editor.commands.setTextAlign(info.flag)
                },
                isActive: editor.isActive({ textAlign: info.flag }),
                icon: info.icon,
                tooltip: info.title,
              },
            }
          }
          else {
            return null
          }
        }).filter((x: any) => x)
      },
    }
  },
})
