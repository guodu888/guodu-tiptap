/*
 * @Author: shaohang-shy
 * @Date: 2022-12-01 10:57:17
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-01 10:58:29
 * @Description: title
 */
import { Node, mergeAttributes } from '@tiptap/core'

export default Node.create({
  name: 'title',
  // schema
  content: 'inline*',
  addOptions() {
    return {
      ...this.parent?.(),
      placeholder: 'please input Title.',
    }
  },
  parseHTML() {
    return [{ tag: 'h1' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['h1', mergeAttributes(HTMLAttributes), 0]
  },
})
