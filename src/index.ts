import type { Plugin } from 'vue'
import GuoduTiptap from '~/components/Tiptap.vue'

import 'tippy.js/dist/tippy.css'

// optional for styling
import 'tippy.js/themes/light.css'
import 'uno.css'

export * from '@tiptap/vue-3'

const plugin: Plugin = {
  install(app) {
    app.component('GuoduTiptap', GuoduTiptap)
  },
}

export * from './extensions'
export * from './utils'

export { GuoduTiptap }

export default plugin
