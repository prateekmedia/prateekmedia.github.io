import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { listPosts, renderBlogIndex, renderCurlResponse, renderFeed, renderLlmsTxt, renderProfileJson, renderSitemap } from './scripts/blog.mjs'

/** Dev-only: serve blog pages and generated files with the same renderer the build uses. */
function blogDevPlugin() {
  const generated = {
    '/feed.xml': ['application/rss+xml', renderFeed],
    '/sitemap.xml': ['application/xml', renderSitemap],
    '/llms.txt': ['text/plain', renderLlmsTxt],
    '/blog/': ['text/html', renderBlogIndex],
    '/api': ['text/plain', renderCurlResponse],
    '/api.json': ['application/json', renderProfileJson],
  }

  return {
    name: 'blog-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') return next()
        const pathname = new URL(req.url ?? '/', 'http://vite.local').pathname.replace(/(\/blog)$|\/index\.html$/, '$1/')
        const send = (type, body) => {
          res.setHeader('Content-Type', `${type}; charset=utf-8`)
          res.end(body)
        }

        if (generated[pathname]) {
          const [type, render] = generated[pathname]
          return Promise.resolve(render(listPosts())).then((body) => send(type, body), next)
        }

        const match = pathname.match(/^\/blog\/([^/]+)\/$/)
        const post = match && listPosts().find(({ slug }) => slug === match[1])
        if (post) return send('text/html', post.page)
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), blogDevPlugin()],
})
