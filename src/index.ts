import type { Plugin } from 'vue'
import GuoduTiptap from '~/components/Tiptap.vue'
import 'tippy.js/dist/tippy.css' // optional for styling
import 'tippy.js/themes/light.css'

const plugin: Plugin = {
  install(app) {
    app.component('GuoduTiptap', GuoduTiptap)
  },
}

export * from './extensions'

export { GuoduTiptap }

export default plugin
