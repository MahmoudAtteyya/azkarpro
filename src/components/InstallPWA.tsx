import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      console.log('🟢 beforeinstallprompt event was fired');
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      console.log('🎉 Application was installed successfully');
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    const handleDisplayModeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      console.log('📱 Display mode changed:', e.matches ? 'standalone' : 'browser');
      if (e.matches) {
        setIsInstalled(true);
        setIsInstallable(false);
      }
    };

    // Check if running in standalone mode
    const standaloneQuery = window.matchMedia('(display-mode: standalone)');
    handleDisplayModeChange(standaloneQuery);
    standaloneQuery.addListener(handleDisplayModeChange);

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Log initial state
    console.log('💫 Initial PWA state:', {
      isInstallable,
      isInstalled,
      hasPrompt: !!deferredPrompt
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', handleAppInstalled);
      standaloneQuery.removeListener(handleDisplayModeChange);
    };
  }, [deferredPrompt, isInstallable, isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log('❌ No deferred prompt available');
      return;
    }

    try {
      console.log('🔄 Prompting for installation...');
      await deferredPrompt.prompt();
      
      const { outcome } = await deferredPrompt.userChoice;
      console.log('📋 Installation prompt result:', outcome);
      
      if (outcome === 'accepted') {
        console.log('✅ Installation accepted');
        setIsInstallable(false);
      } else {
        console.log('❌ Installation rejected');
      }
    } catch (error) {
      console.error('💥 Installation error:', error);
    }

    setDeferredPrompt(null);
  };

  // Early return if not installable or already installed
  if (!isInstallable || isInstalled) {
    console.log('🚫 Button hidden:', { isInstallable, isInstalled });
    return null;
  }

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleInstallClick}
        className="fixed bottom-6 left-6 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 z-[9999]"
        style={{
          boxShadow: '0 4px 15px rgba(142, 36, 170, 0.3)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Download className="w-5 h-5" />
        <span className="font-medium">تحميل التطبيق</span>
      </motion.button>
    </AnimatePresence>
  );
} 