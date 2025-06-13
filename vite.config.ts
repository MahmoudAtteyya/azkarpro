import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'تطبيق الأذكار الإسلامية',
        short_name: 'الأذكار',
        description: 'تطبيق الأذكار الإسلامية اليومية',
        theme_color: '#6A1B9A',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        prefer_related_applications: false,
        categories: ['lifestyle', 'utilities'],
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        screenshots: [
          {
            src: 'screenshot-1.png',
            sizes: '1080x1920',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'الصفحة الرئيسية'
          },
          {
            src: 'screenshot-2.png',
            sizes: '1080x1920',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'صفحة الأذكار'
          }
        ],
        shortcuts: [
          {
            name: 'أذكار الصباح',
            url: '/morning',
            icons: [{ src: 'morning-icon.png', sizes: '96x96', type: 'image/png' }]
          },
          {
            name: 'أذكار المساء',
            url: '/evening',
            icons: [{ src: 'evening-icon.png', sizes: '96x96', type: 'image/png' }]
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});