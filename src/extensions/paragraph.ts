import { Node } from '@tiptap/core'
import { mergeAttributes } from '@tiptap/vue-3'

export default Node.create({
  name: 'PageParagraph',
  content: 'block*',
  priority: 1000,
  group: 'block',
  atom: false,
  draggable: false,
  addAttributes() {
    return {
      class: '',
      id: '',
      contenteditable: false,
    }
  },
  parseHTML() {
    return [
      {
        tag: 'pp',
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { contenteditable: HTMLAttributes.contenteditable }), 0]
  },
})
