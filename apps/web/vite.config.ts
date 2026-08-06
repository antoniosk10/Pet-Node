import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import checker from 'vite-plugin-checker'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, '../..'), '')

  return {
    plugins: [
      react(),
      checker({
        typescript: {
          tsconfigPath: './tsconfig.app.json',
        },
      }),
    ],
    envDir: path.resolve(__dirname, '../..'),
    server: {
      port: Number(env.WEB_PORT) || 5173,
    },
  }
})
