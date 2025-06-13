import React from 'react';
import { Download } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

const InstallButton: React.FC = () => {
  const { isInstallable, isInstalled, installApp } = usePWA();

  if (!isInstallable || isInstalled) {
    return null;
  }

  return (
    <button
      onClick={installApp}
      className="inline-flex items-center gap-2 px-6 py-3 text-white font-medium bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
    >
      <Download className="w-5 h-5" />
      <span>تحميل التطبيق</span>
    </button>
  );
};

export default InstallButton;