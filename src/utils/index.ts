import type { Editor, JSONContent } from '@tiptap/vue-3'
import { DOMSerializer } from 'prosemirror-model'

export function jsonToHtml(json: JSONContent, editor: Editor): string {
  const content = {
    type: 'doc',
    content: [json],
  }
  const documentFragment = DOMSerializer.fromSchema(editor.schema).serializeFragment(editor.schema.nodeFromJSON(content).content)
  const temporaryDocument = document.implementation.createHTMLDocument()
  const container = temporaryDocument.createElement('div')

  container.appendChild(documentFragment)

  return container.innerHTML.replace(/&nbsp;/g, ' ')
}
