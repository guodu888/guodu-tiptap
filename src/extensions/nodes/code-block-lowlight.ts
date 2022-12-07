/*
 * @Author: Arthur_Zhang
 * @Date: 2022-12-02 19:48:43
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2022-12-02 20:50:48
 * @Description:
 */
import type { CodeBlockLowlightOptions } from '@tiptap/extension-code-block-lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import type { Editor } from '@tiptap/vue-3'
import { lowlight } from 'lowlight/lib/core'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import type { MenuBtnView, MenuOptions } from '~/typings'
lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

export default CodeBlockLowlight.extend<CodeBlockLowlightOptions & MenuOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleCodeBlock()
            },
            isActive: editor.isActive('codeBlock'),
            icon: 'file-code',
            tooltip: '代码块',
          },
        }
      },
    }
  },
}).configure({ lowlight })
