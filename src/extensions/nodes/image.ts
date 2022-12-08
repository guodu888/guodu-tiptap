/*
 * @Author: shaohang-shy
 * @Date: 2022-12-02 20:08:58
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-02 20:38:20
 * @Description: image
 */
import Image from '@tiptap/extension-image'
import type { Editor } from '@tiptap/vue-3'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import InsertImageCommandButton from '~/components/MenuCommands/InsertImageCommandButton.vue'
import ImageView from '~/components/ExtensionViews/ImageView.vue'
import type { MenuBtnView } from '~/typings'

export const enum ImageDisplay {
  INLINE = 'inline',
  BREAK_TEXT = 'block',
  FLOAT_LEFT = 'left',
  FLOAT_RIGHT = 'right',
}

const DEFAULT_IMAGE_DISPLAY = ImageDisplay.INLINE
export const DEFAULT_IMAGE_WIDTH = 200

export default Image.extend({
  inline() {
    return true
  },

  group() {
    return 'inline'
  },
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => {
          const width = element.style.width || element.getAttribute('width') || null
          return width == null ? null : parseInt(width, 10)
        },
        renderHTML: (attributes) => {
          return { width: attributes.width }
        },
      },
      height: {
        default: null,
        parseHTML: (element) => {
          const height = element.style.height || element.getAttribute('height') || null
          return height == null ? null : parseInt(height, 10)
        },
        renderHTML: (attributes) => {
          return { height: attributes.height }
        },
      },
      display: {
        default: DEFAULT_IMAGE_DISPLAY,
        parseHTML: (element) => {
          const { cssFloat, display } = element.style
          let dp = element.getAttribute('data-display') || element.getAttribute('display')
          if (dp)
            dp = /(inline|block|left|right)/.test(dp) ? dp : ImageDisplay.INLINE
          else if (cssFloat === 'left' && !display)
            dp = ImageDisplay.FLOAT_LEFT
          else if (cssFloat === 'right' && !display)
            dp = ImageDisplay.FLOAT_RIGHT
          else if (!cssFloat && display === 'block')
            dp = ImageDisplay.BREAK_TEXT
          else
            dp = ImageDisplay.INLINE
          return dp
        },
        renderHTML: (attributes) => {
          return { 'data-display': attributes.display }
        },
      },
    }
  },

  addOptions() {
    return {
      ...this.parent?.(),
      inline: true,
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
        return {
          component: InsertImageCommandButton,
          componentProps: {
            editor,
          },
        }
      },
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(ImageView)
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
      },
    ]
  },
})
