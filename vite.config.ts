import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.STRAVA_CLIENT_ID': JSON.stringify(env.STRAVA_CLIENT_ID),
      'process.env.STRAVA_CLIENT_SECRET': JSON.stringify(env.STRAVA_CLIENT_SECRET)
    },
    plugins: [react()],
  }
})