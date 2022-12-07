import type { Component } from 'vue'

export interface MenuBtnView {
  component: Component
  componentProps: {
    [key: string]: any
  }
}

export interface MenuOptions {
  menubar?: boolean
  bubble?: boolean
}
