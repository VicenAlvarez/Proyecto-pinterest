import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'UNSPLASH_')

  if (!env.UNSPLASH_ACCESS_KEY) {
    throw new Error('Falta UNSPLASH_ACCESS_KEY en .env.local')
  }

  return {
    server: {
      proxy: {
        '/api/unsplash': {
          target: 'https://api.unsplash.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/unsplash/, ''),
          headers: {
            Authorization: `Client-ID ${env.UNSPLASH_ACCESS_KEY}`,
            'Accept-Version': 'v1',
          },
        },
      },
    },
  }
})