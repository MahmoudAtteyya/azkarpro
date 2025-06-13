import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
        type: 'module'
      },
      srcDir: 'src',
      filename: 'sw.ts',
      strategies: 'injectManifest',
      injectRegister: 'auto',
      registerType: 'autoUpdate',
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
            url: '/morning'
          },
          {
            name: 'أذكار المساء',
            short_name: 'المساء',
            description: 'أذكار المساء',
            url: '/evening'
          }
        ]
      },
      injectManifest: {
        injectionPoint: undefined
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true
      }
    })
  ]
});