import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** Dev-only: map /blog/:slug/ to public/blog/:slug/index.html (preview/Pages already do this). */
function blogIndexDevPlugin() {
  return {
    name: 'blog-index-dev',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') return next()
        const pathname = new URL(req.url ?? '/', 'http://vite.local').pathname
        const match = pathname.match(/^\/blog\/([^/]+)\/?$/)
        if (match) {
          const query = req.url?.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''
          req.url = `/blog/${match[1]}/index.html${query}`
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), blogIndexDevPlugin()],
})
