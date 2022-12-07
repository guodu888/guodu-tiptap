/*
 * @Author: shaohang-shy
 * @Date: 2022-12-01 17:43:17
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-01 17:59:28
 * @Description: emphasis
 */
import { Mark } from '@tiptap/core'
import type { Editor } from '@tiptap/vue-3'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import type { MenuBtnView, MenuOptions } from '~/typings'

export interface EmphasisOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    emphasis: {
      /**
       * Set a emphasis mark
       */
      setEmphasis: () => ReturnType
      /**
       * Toggle a emphasis mark
       */
      toggleEmphasis: () => ReturnType
      /**
       * Unset a emphasis mark
       */
      unsetEmphasis: () => ReturnType
    }
  }
}

const Emphasis = Mark.create<EmphasisOptions & MenuOptions>({
  name: 'emphasis',
  addOptions() {
    return {
      HTMLAttributes: {},
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleEmphasis()
            },
            isActive: editor.isActive('emphasis'),
            icon: 'dot-circle',
            tooltip: '着重符',
          },
        }
      },
    }
  },
  parseHTML() {
    return [
      {
        style: 'font-emphasize',
        getAttrs: value => value === 'dot' && null,
      },
      {
        style: '-webkit-text-emphasis',
        getAttrs: value => value === 'dot' && null,
      },
      {
        style: 'text-emphasis',
        getAttrs: value => value === 'dot' && null,
      },
    ]
  },
  renderHTML() {
    return ['span', { style: 'text-emphasis:dot;-webkit-text-emphasis:dot;-webkit-text-emphasis-position: under;text-emphasis-position: under;' }, 0]
  },
  addCommands() {
    return {
      setEmphasis: () => ({ commands }) => {
        return commands.setMark(this.name)
      },
      toggleEmphasis: () => ({ commands }) => {
        return commands.toggleMark(this.name)
      },
      unsetEmphasis: () => ({ commands }) => {
        return commands.unsetMark(this.name)
      },
    }
  },
})
export default Emphasis
