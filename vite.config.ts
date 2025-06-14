import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true
      },
      includeAssets: [
        'favicon.svg',
        'apple-touch-icon.png',
        'masked-icon.svg',
        'images/logo-black.png',
        'images/logo-white.png',
        'icons/app-icon.png'
      ],
      manifest: {
        name: 'أذكار المسلم',
        short_name: 'أذكار',
        description: 'تطبيق الأذكار الإسلامية - احرص على أذكارك اليومية',
        theme_color: '#6A1B9A',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: 'icons/app-icon.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icons/app-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icons/app-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
        cleanupOutdatedCaches: true,
        sourcemap: true,
        clientsClaim: true,
        skipWaiting: true
      },
      registerType: 'autoUpdate',
      strategies: 'generateSW'
    })
  ]
});