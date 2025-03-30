import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import removeConsole from "vite-plugin-remove-console";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
	// 环境变量
	const env = loadEnv(mode, fileURLToPath(new URL('.', import.meta.url)))
	const { VITE_PUBLIC_PATH, VITE_PORT } = env
	console.log('command|mode:', command, mode)

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
      })
    ],
    base: VITE_PUBLIC_PATH, // 仓库名
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  }
})
