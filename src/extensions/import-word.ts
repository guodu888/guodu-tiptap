/*
 * @Author: shaohang-shy
 * @Date: 2022-11-30 16:36:43
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-11-30 19:29:48
 * @Description: import-word
 */
import { Extension } from '@tiptap/core'
import type { Editor } from '@tiptap/vue-3'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import mammoth from 'mammoth/mammoth.browser.js'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import type { MenuBtnView } from '~/typings'

function transformElement(element: any) {
  if (element.children) {
    const children = element.children.map(transformElement)
    element = { ...element, children }
  }
  if (element.type === 'text')
    return { ...element, value: element.value.replace(/\s/g, '&nbsp;') }

  return element
}

export default Extension.create({
  name: 'import-word',
  addOptions() {
    return {
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              const input = document.createElement('input')
              input.setAttribute('type', 'file')
              input.addEventListener('change', (e: any) => {
                const file = e.target.files[0]
                input.value = ''

                const { name } = file
                if (name.split('.').pop() !== 'docx')
                  console.error('仅支持docx文件')

                const reader = new FileReader()
                reader.onload = function (loadEvent: any) {
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
                    convertImage: mammoth.images.imgElement((image: any) => {
                      return image.read('base64').then(async (imageBuffer: any) => {
                        const base64
                                = `data:${image.contentType};base64,${imageBuffer}`
                        // const file = that.dataURLtoFile(base64)
                        // const src = await that.handleUploadFile(file)
                        return {
                          src: base64,
                        }
                      })
                    }),
                  }
                  mammoth
                    .convertToHtml({ arrayBuffer }, options)
                    .then((e: any) => {
                      const newV = e.value.replace(/&amp;nbsp;/g, '&nbsp;')
                      // 修复组合题和【】不换行
                      const lineFeed = newV.replace(/<br \/>【】/g, '</p><p>【】')
                      editor.commands.setContent(lineFeed, true)
                    })
                    .done()
                }

                reader.readAsArrayBuffer(file)
              })
              input.click()
            },
            isActive: false,
            icon: 'file-word',
            tooltip: 'word导入',
          },
        }
      },
    }
  },
})
