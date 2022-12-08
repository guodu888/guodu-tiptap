import { Extension } from '@tiptap/vue-3'
import FullscreenCommandButton from '~/components/MenuCommands/FullscreenCommandButton.vue'
export default Extension.create({
  name: 'fullscreen',
  addOptions() {
    return {
      ...this.parent?.(),
      menuBtnView() {
        return {
          component: FullscreenCommandButton,
        }
      },
    }
  },
})
