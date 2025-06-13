/// <reference types="vite-plugin-pwa/client" />
import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    // Register the service worker
    registerSW({
      immediate: true,
      onNeedRefresh() {
        // Show a confirmation dialog
        const shouldUpdate = window.confirm('يتوفر محتوى جديد. هل تريد تحديث التطبيق؟');
        if (shouldUpdate) {
          window.location.reload();
        }
      },
      onOfflineReady() {
        console.log('التطبيق جاهز للعمل بدون إنترنت');
      },
      onRegistered(registration) {
        console.log('تم تسجيل Service Worker:', registration);
        
        // Force update check
        if (registration) {
          setInterval(() => {
            registration.update().catch(console.error);
          }, 60 * 60 * 1000); // Check every hour
        }
      },
      onRegisterError(error) {
        console.error('فشل في تسجيل Service Worker:', error);
      }
    });

    // Log PWA display mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('تم تشغيل التطبيق في وضع مستقل');
    }

    // Listen for PWA installation events
    window.addEventListener('beforeinstallprompt', () => {
      console.log('التطبيق جاهز للتثبيت');
    });

    window.addEventListener('appinstalled', () => {
      console.log('تم تثبيت التطبيق بنجاح');
    });
  } else {
    console.warn('متصفحك لا يدعم Service Workers');
  }
} 