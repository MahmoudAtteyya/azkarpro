import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Globe, Shield } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">تحميل التطبيق</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Smartphone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">تطبيق محلي</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  قم بتثبيت التطبيق على جهازك للوصول السريع والأداء الأفضل
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">عمل أوفلاين</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  استخدم التطبيق بدون إنترنت مع حفظ جميع البيانات محلياً
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">آمن وموثوق</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  تطبيق آمن وموثوق مع تحديثات دورية وأداء محسن
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              تحميل التطبيق
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
            >
              لاحقاً
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DownloadModal; 