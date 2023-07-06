import type { VirtualKeyboardInterface } from 'mathlive'
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare global {
  interface Window {
      mathVirtualKeyboard: VirtualKeyboardInterface & EventTarget;
  }
}
