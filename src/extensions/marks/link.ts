/*
 * @Author: shaohang-shy
 * @Date: 2022-12-01 16:10:19
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-02 11:34:51
 * @Description: link
 */
import type { LinkOptions } from '@tiptap/extension-link'
import { Link } from '@tiptap/extension-link'
import type { Editor } from '@tiptap/vue-3'
import { getMarkRange } from '@tiptap/core'
import { Plugin, PluginKey, TextSelection } from 'prosemirror-state'
import type { EditorView } from 'prosemirror-view'
import AddLinkCommandButton from '~/components/MenuCommands/AddLinkCommandButton.vue'
import type { MenuBtnView, MenuOptions } from '~/typings'

export default Link.extend<LinkOptions & MenuOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
        return {
          component: AddLinkCommandButton,
          componentProps: {
            editor,
          },
        }
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('link-click-select-all'),
        props: {
          handleClick(view: EditorView, pos: number) {
            const { schema, doc, tr } = view.state

            const range = getMarkRange(doc.resolve(pos), schema.marks.link)

            if (!range)
              return false

            const $start = doc.resolve(range.from)
            const $end = doc.resolve(range.to)

            const transaction = tr.setSelection(
              new TextSelection($start, $end),
            )

            view.dispatch(transaction)
            return true
          },
        },
      }),
    ]
  },
})
