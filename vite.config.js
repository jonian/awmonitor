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

const HeadlessUiResolver = name => {
  if (name.startsWith('Hui')) {
    return { importName: name.slice(3), path: '@headlessui/vue' }
  }
}

export default {
  assetsDir: 'assets',
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      '@headlessui/vue',
      'format-duration',
      'svg-gauge',
      'qr-creator'
    ],
    exclude: [
      'vue-demi'
    ]
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  plugins: [
    Vue(),
    Pages({ importMode }),
    Layouts(),
    Components({
      customComponentResolvers: [
        HeadlessUiResolver
      ]
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      includeAssets: [
        'robots.txt',
        'fonts/*.css',
        'fonts/*.woff2',
        '*.svg',
        '*.png'
      ],
      manifest: {
        name: 'AW Monitor',
        short_name: 'AW Monitor',
        background_color: '#6563FF',
        theme_color: '#6563FF',
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
            purpose: 'any',
          },
          {
            src: '/mask-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          }
        ]
      }
    })
  ]
}
