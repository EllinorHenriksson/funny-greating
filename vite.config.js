import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    },
    root: 'src',
    build: {
      outDir: '../dist',
      target: 'esnext'
    }
  }
})
