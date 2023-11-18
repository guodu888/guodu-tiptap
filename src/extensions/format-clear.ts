/*
 * @Author: shaohang-shy
 * @Date: 2022-12-01 10:18:24
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2022-12-02 18:24:37
 * @Description: FormatClear
 */
import { Extension } from '@tiptap/core'
import type { ChainedCommands, Editor } from '@tiptap/core'
import type { UnionCommands } from '@tiptap/vue-3'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    formatClear: {
      formatClear: () => ReturnType
    }
  }
}

export default Extension.create({
  name: 'formatClear',

  addCommands() {
    const commandsMap: Record<string, keyof UnionCommands> = {
      bold: 'unsetBold',
      italic: 'unsetItalic',
      emphasis: 'unsetEmphasis',
      underline: 'unsetUnderline',
      strike: 'unsetStrike',
      link: 'unsetLink',
      fontFamily: 'unsetFontFamily',
      // fontSize: 'unsetFontSize',
      color: 'unsetColor',
      highlight: 'unsetHighlight',
      textAlign: 'unsetTextAlign',
      lineHeight: 'unsetLineHeight',
    }

    return {
      formatClear: () => ({ editor }) => {
        const chainedCommand: ChainedCommands = Object.entries<keyof UnionCommands>(commandsMap).reduce<ChainedCommands>((chain, [name, command]) => {
          const extension = editor.extensionManager.extensions.find(e => e.name === name)
          if (extension) {
            // eslint-disable-next-line ts/ban-ts-comment
            // @ts-expect-error
            return chain[command]()
          }

          return chain
        }, editor.chain())

        return chainedCommand.focus().run()
      },
    }
  },

  addOptions() {
    return {
      ...this.parent?.(),
      menuBtnView({ editor }: { editor: Editor }) {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.formatClear()
            },
            icon: 'clear-format',
            tooltip: '清除样式',
          },
        }
      },
    }
  },
})
