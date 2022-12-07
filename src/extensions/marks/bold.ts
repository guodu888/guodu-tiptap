import type { BoldOptions } from '@tiptap/extension-bold'
import Bold from '@tiptap/extension-bold'
export default Bold.extend<BoldOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
    }
  },
})
