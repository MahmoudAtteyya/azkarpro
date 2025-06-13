import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import DownloadModal from './DownloadModal';

const InstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      console.log('🟢 قبل تثبيت التطبيق');
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    // التحقق من حالة التثبيت الحالية
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('📱 التطبيق مثبت بالفعل');
      setShowInstallButton(false);
    }

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    setShowModal(true);
  };

  const handleModalInstall = async () => {
    if (!deferredPrompt) {
      console.log('❌ لا يوجد تثبيت متاح');
      return;
    }

    try {
      console.log('🔄 جاري تثبيت التطبيق...');
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('✅ تم قبول التثبيت');
        setShowInstallButton(false);
      } else {
        console.log('❌ تم رفض التثبيت');
      }
    } catch (error) {
      console.error('💥 خطأ في التثبيت:', error);
    }

    setDeferredPrompt(null);
    setShowModal(false);
  };

  if (!showInstallButton) return null;

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="fixed bottom-6 left-6 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 z-[9999]"
        style={{
          boxShadow: '0 4px 15px rgba(142, 36, 170, 0.3)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Download className="w-5 h-5" />
        <span className="font-medium">تحميل التطبيق</span>
      </button>

      <DownloadModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
};

export default InstallButton; 