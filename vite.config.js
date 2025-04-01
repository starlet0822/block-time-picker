import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import terser from '@rollup/plugin-terser'
import vueDevTools from 'vite-plugin-vue-devtools'
import pkg from './package.json'
import { resolve } from 'path'
import { camelCase, upperFirst } from 'lodash-es'
import removeConsole from 'vite-plugin-remove-console'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const lifecycle = process.env.npm_lifecycle_event

console.log('lifecycle', lifecycle)
// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 环境变量
  const env = loadEnv(mode, fileURLToPath(new URL('.', import.meta.url)))
  const { VITE_PUBLIC_PATH, VITE_PORT } = env
  console.log('command|mode:', command, mode, env)
  // 构建库
  const libBuild = {
    lib: {
      entry: resolve(__dirname, 'packages/index.js'),
      name: upperFirst(camelCase(pkg.name)), // UMD 全局变量名
      formats: ['es', 'umd', 'cjs'], // 模块格式
      fileName: (format) => `index.${format}.js`, // 打包后的文件名
      cssFileName: 'style',
    },
    rollupOptions: {
      plugins: [
        terser({ compress: { drop_console: true } }),
      ],
      treeshake: true,
      // Make sure to externalize deps that shouldn't be bundled into library.
      external: ['vue'], // 外部依赖
      output: {
        globals: { vue: 'Vue' },
        exports: 'named',
        // 同时生成默认导出和命名导出
        interop: 'auto',
      },
    },
  }

  return {
    server: {
      port: VITE_PORT,
      proxy: {},
    },
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      removeConsole(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    publicDir:  lifecycle === 'build:lib' ? false : 'public',
    build:
      lifecycle === 'build:lib'
        ? libBuild
        : { outDir: 'dist', sourcemap: false, chunkSizeWarningLimit: 4000 },
    base: VITE_PUBLIC_PATH, // 仓库名
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // https://cn.vitejs.dev/guide/build.html#library-mode 环境变量
    define: {
      'process.env.NODE_ENV': '"production"',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    },
  }
})
