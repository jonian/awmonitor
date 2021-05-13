import path from 'path'

import Vue from '@vitejs/plugin-vue'
import Components from 'vite-plugin-components'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import { VitePWA } from 'vite-plugin-pwa'

const importMode = path => {
  if (path === '/src/pages/index.vue') return 'sync'
  return 'async'
}

export default {
  assetsDir: 'assets',
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core'
    ],
    exclude: [
      '@iconscout/unicons',
      'vue-demi'
    ]
  },
  alias: {
    '@/': `${path.resolve(__dirname, 'src')}/`
  },
  plugins: [
    Vue(),
    Pages({ importMode }),
    Layouts(),
    Components(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'AW Monitor',
        short_name: 'AW Monitor',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ]
      }
    })
  ]
}
