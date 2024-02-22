/*
 * @Author: shaohang-shy
 * @Date: 2022-11-30 16:36:43
 * @LastEditors: shy1118
 * @LastEditTime: 2023-11-18 21:52:57
 * @Description: import-word
 */
import type { Buffer } from 'node:buffer'
import { Extension } from '@tiptap/core'
import type { Editor } from '@tiptap/vue-3'

// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
import mammoth from '@shy1118/mammoth/mammoth.browser.js'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import type { MenuBtnView, MenuOptions } from '~/typings'

export interface ImportWordOptions {
  uploadImage: (image: MammothImage) => Promise<{ src: string }>
  uploadCallback: (file: File) => void
  htmlParser: (html: string) => string
}

export interface MammothImage {
  contentType: string
  readAsArrayBuffer: () => Promise<ArrayBuffer>
  readAsBase64String: () => Promise<string>
  readAsBuffer: ImageRead
  read: ImageRead
}

export interface ImageRead {
  (): Promise<Buffer>
  (encoding: string): Promise<string>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    importWord: {
      importWord: (editor: Editor) => ReturnType
    }
  }
}

function transformElement(element: any) {
  if (element.children) {
    const children = element.children.map(transformElement)
    element = { ...element, children }
  }
  if (element.type === 'text')
    return { ...element, value: element.value.replace(/\s/g, '&nbsp;') }

  return element
}

export default Extension.create<ImportWordOptions & MenuOptions, any>({
  name: 'importWord',
  addOptions() {
    return {
      uploadImage: (image: MammothImage) => {
        return new Promise((resolve) => {
          image.readAsArrayBuffer().then(async (imageBuffer: any) => {
            const blob = new Blob([imageBuffer], { type: image.contentType })
            const url = URL.createObjectURL(blob)
            resolve({ src: url })
          })
        })
      },
      uploadCallback: () => {},
      htmlParser: (html: string) => html.replace(/&amp;nbsp;/g, '&nbsp;'),
      menuBtnView({ editor }: { editor: Editor, extension: Extension<ImportWordOptions, any> }): MenuBtnView {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.chain().importWord(editor).run()
            },
            isActive: false,
            icon: 'file-word',
            tooltip: 'word导入',
          },
        }
      },
    }
  },
  addCommands() {
    return {
      ...this.parent?.(),
      importWord: (editor: Editor) => () => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.addEventListener('change', (e: any) => {
          const file = e.target.files[0]
          input.value = ''
          this.options.uploadCallback(file)
          const { name } = file
          if (name.split('.').pop() !== 'docx')
            console.error('仅支持docx文件')
          const reader = new FileReader()
          reader.onload = (loadEvent: any) => {
            const arrayBuffer = loadEvent.target.result // arrayBuffer
            const options = {
              transformDocument: transformElement,
              styleMap: [
                'u => u',
                'strike => del',
                'i => em',
                'sup => sup',
                'sub => sub',
              ],
              convertImage: mammoth.images.imgElement((image: MammothImage) => {
                return this.options.uploadImage(image)
              }),
            }
            mammoth
              .convertToHtml({ arrayBuffer }, options)
              .then((e: any) => {
                const v = this.options.htmlParser(e.value)
                editor.commands.setContent(v, true)
              })
              .done()
          }

          reader.readAsArrayBuffer(file)
        })
        input.click()
        return true
      },
    }
  },
})
