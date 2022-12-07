import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'playground')}/`,
      '~/': `${path.resolve(__dirname, 'src')}/`,
      'guodu-tiptap': `${path.resolve(__dirname, 'src')}/index.ts`,
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
    svgLoader(),
    Pages({
      dirs: ['playground/pages'],
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
      dirs: [
        './playground/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dirs: ['playground/components', 'src/components'],
      dts: true,
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
  ],
})
