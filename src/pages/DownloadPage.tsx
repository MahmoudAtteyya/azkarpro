import React from 'react';
import { motion } from 'framer-motion';
import { Download, Smartphone, Globe, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DownloadPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* زر العودة */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>العودة للرئيسية</span>
        </Link>

        {/* المحتوى الرئيسي */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              قم بتحميل تطبيق الأذكار
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              استمتع بتجربة أفضل مع تطبيقنا المحلي
            </p>
          </div>

          {/* مميزات التطبيق */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl w-fit mb-4">
                <Smartphone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                تطبيق محلي
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                قم بتثبيت التطبيق على جهازك للوصول السريع والأداء الأفضل
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl w-fit mb-4">
                <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                عمل أوفلاين
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                استخدم التطبيق بدون إنترنت مع حفظ جميع البيانات محلياً
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl w-fit mb-4">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                آمن وموثوق
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                تطبيق آمن وموثوق مع تحديثات دورية وأداء محسن
              </p>
            </motion.div>
          </div>

          {/* زر التحميل */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <button
              onClick={() => {
                // سيتم تنفيذ عملية التثبيت هنا
                console.log('بدء عملية التثبيت');
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Download className="w-6 h-6" />
              <span>تحميل التطبيق</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DownloadPage; 