import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sunrise, Sunset, Sparkles, Heart, Shield, Download } from 'lucide-react';
import AthkarCard from '../components/AthkarCard';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const athkarCategories = [
    {
      title: 'أذكار الاستيقاظ من النوم',
      icon: <Sunrise className="w-10 h-10" />,
      path: '/wake',
      description: 'الأذكار المستحبة عند الاستيقاظ من النوم وبداية اليوم الجديد'
    },
    {
      title: 'أذكار الصباح',
      icon: <Sun className="w-10 h-10" />,
      path: '/morning',
      description: 'الأذكار والأدعية المستحبة في فترة الصباح للحماية والبركة'
    },
    {
      title: 'أذكار المساء',
      icon: <Sunset className="w-10 h-10" />,
      path: '/evening',
      description: 'الأذكار والأدعية المستحبة في فترة المساء للسكينة والطمأنينة'
    },
    {
      title: 'أذكار النوم',
      icon: <Moon className="w-10 h-10" />,
      path: '/sleep',
      description: 'الأذكار المستحبة قبل النوم للحماية والراحة النفسية'
    }
  ];

  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'متابعة التقدم',
      description: 'تتبع تقدمك في الأذكار مع العدادات التفاعلية والإحصائيات'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'سهل الاستخدام',
      description: 'واجهة بسيطة وأنيقة مصممة خصيصاً للاستخدام اليومي'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'حفظ التقدم',
      description: 'يحفظ التطبيق تقدمك تلقائياً ويعمل بدون اتصال بالإنترنت'
    }
  ];

  return (
    <>
      <SEO 
        title="الصفحة الرئيسية"
        description="تطبيق الأذكار الإسلامية - احرص على أذكارك اليومية واجعل ذكر الله جزءاً من روتينك اليومي"
        keywords={['أذكار', 'إسلام', 'أدعية', 'أذكار الصباح', 'أذكار المساء', 'القرآن']}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 dark:from-purple-900/30 dark:to-pink-900/30" />
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-6xl mx-auto px-4 py-20 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 to-purple-700 shadow-2xl mb-6">
                <span className="text-3xl font-bold text-white">أ</span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 bg-clip-text text-transparent"
            >
              تطبيق الأذكار الإسلامية
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              احرص على أذكارك اليومية واجعل ذكر الله جزءاً من روتينك اليومي
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto border border-purple-200/30 dark:border-purple-800/30 shadow-xl"
            >
              <p className="text-lg text-gray-800 dark:text-gray-200 font-medium mb-2">
                "وَاذْكُر رَّبَّكَ فِي نَفْسِكَ تَضَرُّعًا وَخِيفَةً وَدُونَ الْجَهْرِ مِنَ الْقَوْلِ بِالْغُدُوِّ وَالْآصَالِ وَلَا تَكُن مِّنَ الْغَافِلِينَ"
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">الأعراف: 205</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Cards Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              اختر نوع الأذكار
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              اختر من بين مجموعة متنوعة من الأذكار المستحبة في أوقات مختلفة من اليوم
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {athkarCategories.map((category, index) => (
              <AthkarCard
                key={index}
                title={category.title}
                icon={category.icon}
                path={category.path}
                description={category.description}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm py-20">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mb-16"
            >
              <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                مميزات التطبيق
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                تطبيق حديث ومتطور لمساعدتك في المحافظة على أذكارك اليومية
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  className="text-center p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200/30 dark:border-purple-800/30"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg"
                  >
                    {feature.icon}
                  </motion.div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">{feature.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="fixed bottom-6 left-6 z-50">
          <Link
            to="/download"
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full shadow-lg backdrop-blur-md hover:from-purple-700 hover:to-purple-800 transition-all duration-300 text-lg font-semibold"
            style={{ boxShadow: '0 4px 24px 0 rgba(80,0,120,0.12)' }}
          >
            <Download className="w-6 h-6" />
            <span>تحميل التطبيق</span>
          </Link>
        </div>
      </div>
    </>
  );
}