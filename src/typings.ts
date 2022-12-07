import type { Component } from 'vue'

export interface MenuBtnView {
  component: Component
  componentProps: {
    [key: string]: any
  }
}
