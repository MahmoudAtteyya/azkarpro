import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      registerType: 'autoUpdate',
      filename: 'sw.ts',
      manifest: {
        name: 'أذكار المسلم',
        short_name: 'أذكار',
        description: 'تطبيق الأذكار الإسلامية اليومية',
        theme_color: '#6A1B9A',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        prefer_related_applications: false,
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        shortcuts: [
          {
            name: 'أذكار الصباح',
            short_name: 'الصباح',
            description: 'أذكار الصباح',
            url: '/morning',
            icons: [{ src: 'morning.png', sizes: '192x192' }]
          },
          {
            name: 'أذكار المساء',
            short_name: 'المساء',
            description: 'أذكار المساء',
            url: '/evening',
            icons: [{ src: 'evening.png', sizes: '192x192' }]
          }
        ]
      },
      injectManifest: {
        swSrc: 'src/sw.ts',
        swDest: 'dist/sw.js',
        globDirectory: 'dist',
        globPatterns: [
          '**/*.{html,js,css,json,ico,png,svg}'
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ]
});