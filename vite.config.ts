import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const { VITE_BASE_PATH = '/', VITE_SITE_URL = '' } = loadEnv(mode, '.', 'VITE_')
  const trimmedBase = VITE_BASE_PATH.trim()
  const base = trimmedBase === '/' ? '/' : `/${trimmedBase.replace(/^\/+|\/+$/g, '')}/`
  const siteUrl = VITE_SITE_URL.trim() ? new URL(VITE_SITE_URL.trim()) : null
  if (siteUrl && !['https:', 'http:'].includes(siteUrl.protocol)) {
    throw new Error('VITE_SITE_URL must be an http or https URL.')
  }
  if (siteUrl) {
    siteUrl.hash = ''
    siteUrl.search = ''
    if (!siteUrl.pathname.endsWith('/')) siteUrl.pathname += '/'
  }
  return {
    base,
    plugins: [react(), {
      name: 'portfolio-sharing-metadata',
      transformIndexHtml(html) {
        // Emit crawlable URLs into the HTML itself; sharing bots need no JavaScript.
        if (!siteUrl) return html
        const imageUrl = new URL('social-preview.jpg', siteUrl).href
        const escapeAttribute = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
        return {
          html: html.replaceAll('content="/social-preview.jpg"', `content="${escapeAttribute(imageUrl)}"`),
          tags: [
            { tag: 'link', attrs: { rel: 'canonical', href: siteUrl.href }, injectTo: 'head' },
            { tag: 'meta', attrs: { property: 'og:url', content: siteUrl.href }, injectTo: 'head' },
          ],
        }
      },
    }],
  }
})
