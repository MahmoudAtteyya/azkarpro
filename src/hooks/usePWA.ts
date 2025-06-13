import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
      console.log('🟢 التطبيق جاهز للتثبيت');
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      console.log('✅ تم تثبيت التطبيق بنجاح');
    };

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches ||
        (navigator as any).standalone === true) {
      setIsInstalled(true);
      console.log('📱 التطبيق مثبت بالفعل');
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) {
      console.log('❌ لا يوجد حدث تثبيت متاح');
      return;
    }

    try {
      console.log('🔄 عرض نافذة التثبيت');
      // Show the install prompt
      await deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('✅ تم قبول التثبيت');
        setIsInstalled(true);
        setIsInstallable(false);
      } else {
        console.log('❌ تم رفض التثبيت');
      }
    } catch (error) {
      console.error('💥 خطأ في التثبيت:', error);
    } finally {
      // Clear the deferredPrompt for the next time
      setDeferredPrompt(null);
    }
  };

  return { isInstallable, isInstalled, installApp };
}