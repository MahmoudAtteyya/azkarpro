/// <reference types="vite-plugin-pwa/client" />
import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    registerSW({
      immediate: true,
      onNeedRefresh() {
        console.log('تحديث جديد متاح');
      },
      onOfflineReady() {
        console.log('التطبيق جاهز للعمل بدون إنترنت');
      },
      onRegistered() {
        console.log('تم تسجيل Service Worker');
      },
      onRegisterError(error) {
        console.error('خطأ في تسجيل Service Worker:', error);
      }
    });
  }
}