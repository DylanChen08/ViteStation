import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import createVitePlugins from './build/vite/plugins'
import { OUTPUT_DIR } from './build/constant'
import { wrapperEnv } from './build/utils'
// now you can access config with process.env.{configName}
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env);

  const { VITE_APP_ENV, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = viteEnv;
  return {
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src')
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    // vite 相关配置
    server: {
      port: 3000,
      host: true,
      open: false,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        '/open': {
          target: 'http://192.168.30.100:19980',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/open/, '')
        }
      },
    },
    build: {
      baseUrl: VITE_PUBLIC_PATH, //基本路径，不要随意更改
      minify: false,
      // target: 'es2015',
      // cssTarget: 'chrome86',
      outDir: OUTPUT_DIR,
      productionSourceMap: false, // 生产环境的 source map
      lintOnSave: false,
      runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      terserOptions: {
        compress: {
          // 生产环境时移除console
          drop_console: VITE_DROP_CONSOLE,
          drop_debugger: VITE_DROP_CONSOLE,
        },
      },
    },
    css: {
      //css预处理
      preprocessorOptions: {
        scss: {
          // additionalData: `@import "@/styles/variables.scss";`,
          // javascriptEnabled: true,
          charset: false,
        },
      },
    },
  }
})
