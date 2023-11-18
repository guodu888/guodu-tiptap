import { Extension, isList } from '@tiptap/core'
import type { Command, Editor } from '@tiptap/core'
import type { Transaction } from 'prosemirror-state'
import { AllSelection, TextSelection } from 'prosemirror-state'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import { clamp } from '~/utils'

export interface IndentOptions {
  types: string[]
  minIndent: number
  maxIndent: number
}

enum IndentProps {
  max = 7,
  min = 0,

  more = 1,
  less = -1,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    indent: {
      /**
       * Set the indent attribute
       */
      indent: () => ReturnType
      /**
       * Set the outdent attribute
       */
      outdent: () => ReturnType
    }
  }
}

function updateIndentLevel(
  tr: Transaction,
  delta: number,
  types: string[],
  editor: Editor,
): Transaction {
  const { doc, selection } = tr
  if (!doc || !selection)
    return tr
  if (!(selection instanceof TextSelection || selection instanceof AllSelection))
    return tr
  const { from, to } = selection
  doc.nodesBetween(from, to, (node, pos) => {
    const nodeType = node.type
    if (types.includes(nodeType.name)) {
      tr = setNodeIndentMarkup(tr, pos, delta)
      return false
    }
    else if (isList(node.type.name, editor.extensionManager.extensions)) {
      return false
    }
    return true
  })

  return tr
}

function setNodeIndentMarkup(
  tr: Transaction,
  pos: number,
  delta: number,
): Transaction {
  if (!tr.doc)
    return tr
  const node = tr.doc.nodeAt(pos)
  if (!node)
    return tr
  const minIndent = IndentProps.min
  const maxIndent = IndentProps.max

  const indent = clamp((node.attrs.indent || 0) + delta, minIndent, maxIndent)
  if (indent === node.attrs.indent)
    return tr
  const nodeAttrs = {
    ...node.attrs,
    indent,
  }

  return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks)
}

function createIndentCommand({
  delta,
  types,
}: {
  delta: number
  types: string[]
}): Command {
  return ({ state, dispatch, editor }) => {
    const { selection } = state
    let { tr } = state
    tr = tr.setSelection(selection)
    tr = updateIndentLevel(tr, delta, types, editor)

    if (tr.docChanged) {
      dispatch && dispatch(tr)
      return true
    }

    return false
  }
}

const Indent = Extension.create<IndentOptions>({
  name: 'indent',

  addOptions() {
    return {
      types: ['paragraph', 'heading', 'blockquote'],
      minIndent: IndentProps.min,
      maxIndent: IndentProps.max,
      menuBtnView({ editor }: { editor: Editor }) {
        return [
          {
            component: CommandButton,
            componentProps: {
              command: () => {
                editor.commands.indent()
              },
              icon: 'indent',
              tooltip: '增加缩进',
            },
          },
          {
            component: CommandButton,
            componentProps: {
              command: () => {
                editor.commands.outdent()
              },
              icon: 'outdent',
              tooltip: '减少缩进',
            },
          },
        ]
      },
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) => {
              const identAttr = element.getAttribute('data-indent')
              return (identAttr ? Number.parseInt(identAttr, 10) : 0) || 0
            },
            renderHTML: (attributes) => {
              if (!attributes.indent)
                return {}
              return { 'data-indent': attributes.indent }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      indent: () =>
        createIndentCommand({
          delta: IndentProps.more,
          types: this.options.types,
        }),
      outdent: () =>
        createIndentCommand({
          delta: IndentProps.less,
          types: this.options.types,
        }),
    }
  },

  addKeyboardShortcuts() {
    return {
      'Tab': () => this.editor.commands.indent(),
      'Shift-Tab': () => this.editor.commands.outdent(),
    }
  },
})

export default Indent
