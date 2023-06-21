import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import svgLoader from 'vite-svg-loader'
import dts from 'vite-plugin-dts'
import libCss from 'vite-plugin-libcss'

const libDir = path.resolve(__dirname, 'lib')
const srcDir = path.resolve(__dirname, 'src')

export default defineConfig(async ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  const IS_DEMO = process.env.VITE_BUILD_TARGET === 'demo'
  return {
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
      libCss({}),
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
      IS_DEMO
        ? null
        : dts({
          include: ['src'],
          insertTypesEntry: true,
        }),
    ],
    build: IS_DEMO
      ? undefined
      : {
          outDir: libDir,
          minify: 'esbuild',

          lib: {
            entry: path.resolve(srcDir, 'index.ts'),
            name: 'GuoduTiptap',
            fileName: 'guodu-tiptap',
          },
          cssCodeSplit: true,
          // https://rollupjs.org/guide/en/#big-list-of-options
          rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['vue'],
            output: {
              exports: 'named',
              // https://github.com/henriquehbr/svelte-typewriter/issues/21#issuecomment-968835822
              // inlineDynamicImports: true,
              // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
              globals: {
                vue: 'vue',
              },
            },
          },
        },
    publicDir: IS_DEMO ? 'public' : false,
  }
})
