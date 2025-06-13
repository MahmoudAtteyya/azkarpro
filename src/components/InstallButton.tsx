import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    // التحقق من حالة التثبيت
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log('التطبيق إما مثبت بالفعل أو غير متوفر للتثبيت');
      return;
    }

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      
      if (choice.outcome === 'accepted') {
        console.log('تم قبول التثبيت');
        setIsInstalled(true);
      } else {
        console.log('تم رفض التثبيت');
      }
    } catch (error) {
      console.error('خطأ في التثبيت:', error);
    }
  };

  if (isInstalled) {
    return null;
  }

  return deferredPrompt ? (
    <button
      onClick={handleInstallClick}
      className="inline-flex items-center gap-2 px-6 py-3 text-white font-medium bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
    >
      <Download className="w-5 h-5" />
      <span>تحميل التطبيق</span>
    </button>
  ) : null;
};

export default InstallButton;