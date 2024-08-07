/*
 * @Author: shaohang-shy
 * @Date: 2022-12-03 13:52:15
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-06 18:10:50
 * @Description: commands
 */
import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import type { Editor, Range } from '@tiptap/vue-3'
import { VueRenderer } from '@tiptap/vue-3'
import { tippy } from 'vue-tippy'
import CommandsList from '~/components/ExtensionViews/CommandsList.vue'

interface CommandFuncProps { editor: Editor, range: Range }
interface CommandItem {
  key: string
  title: string
  command: (x: CommandFuncProps) => void
}

const suggestion: { items: (query: any) => CommandItem[], render: () => any } = {
  items: ({ query }: any) => {
    return [
      {
        key: 'h1',
        title: '标题一',
        command: ({ editor, range }: CommandFuncProps) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode('heading', { level: 1 })
            .run()
        },
      },
      {
        key: 'h2',
        title: '标题二',
        command: ({ editor, range }: CommandFuncProps) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode('heading', { level: 2 })
            .run()
        },
      },
      {
        key: 'list-ul',
        title: '无序列表',
        command: ({ editor, range }: CommandFuncProps) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleBulletList()
            .run()
        },
      },
      {
        key: 'bold',
        title: '加粗',
        command: ({ editor, range }: CommandFuncProps) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setMark('bold')
            .run()
        },
      },
      {
        key: 'italic',
        title: '倾斜',
        command: ({ editor, range }: CommandFuncProps) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setMark('italic')
            .run()
        },
      },
    ].filter(item => item.key.toLowerCase().startsWith(query.toLowerCase())).slice(0, 10)
  },

  render: () => {
    let component: VueRenderer
    let popup: any

    return {
      onStart: (props: any) => {
        component = new VueRenderer(CommandsList, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect)
          return

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element!,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props: any) {
        component.updateProps(props)

        if (!props.clientRect)
          return

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props: { event: KeyboardEvent }) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }
        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}
export default Extension.create({
  name: 'custom-commands',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }: any) => {
          props.command({ editor, range })
        },
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
}).configure({ suggestion })
