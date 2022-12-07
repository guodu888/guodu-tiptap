/*
 * @Author: shaohang-shy
 * @Date: 2022-11-29 10:27:26
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-01 11:09:12
 * @Description: document
 */
import Document from '@tiptap/extension-document'
import Title from './nodes/title'
export default Document.extend<{ title: boolean }>({
  addOptions() {
    return {
      title: false,
    }
  },

  content() {
    return this.options.title ? 'title block+' : 'block+'
  },

  addExtensions() {
    if (this.options.title)
      return [Title]

    return []
  },
})
