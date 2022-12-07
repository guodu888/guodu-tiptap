import type { Plugin } from 'vue'
import GuoduTiptap from '~/components/Tiptap.vue'
const plugin: Plugin = {
  install(app) {
    app.component('GuoduTiptap', GuoduTiptap)
  },
}

export { GuoduTiptap }

export default plugin
