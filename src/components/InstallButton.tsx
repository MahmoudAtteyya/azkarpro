import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import DownloadModal from './DownloadModal';

const InstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      // حفظ حدث التثبيت للاستخدام لاحقًا
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
      console.log('🟢 التطبيق جاهز للتثبيت');
    };

    // التحقق من حالة التثبيت الحالية
    const checkInstallation = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          (navigator as any).standalone === true) {
        console.log('📱 التطبيق مثبت بالفعل');
        setShowInstallButton(false);
        return true;
      }
      return false;
    };

    if (!checkInstallation()) {
      window.addEventListener('beforeinstallprompt', handler);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    console.log('🔄 بدء عملية التثبيت');
    setShowModal(true);
  };

  const handleModalInstall = async () => {
    if (!deferredPrompt) {
      console.log('❌ لا يوجد حدث تثبيت متاح');
      return;
    }

    try {
      console.log('🔄 عرض نافذة التثبيت');
      // إظهار نافذة التثبيت
      await deferredPrompt.prompt();
      
      // انتظار اختيار المستخدم
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('✅ تم قبول التثبيت بنجاح');
        setShowInstallButton(false);
        setShowModal(false);
      } else {
        console.log('❌ تم رفض التثبيت');
      }
    } catch (error) {
      console.error('💥 خطأ في عملية التثبيت:', error);
    } finally {
      // تنظيف حدث التثبيت
      setDeferredPrompt(null);
    }
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