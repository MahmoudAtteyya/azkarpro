import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, CheckCircle, Trophy, Sparkles } from 'lucide-react';
import ThikrItem from '../components/ThikrItem';
import { useAthkar } from '../context/AthkarContext';
import SEO from '../components/SEO';

interface Thikr {
  id: number;
  text: string;
  defaultCount: number;
}

const categoryTitles: { [key: string]: string } = {
  wake: 'أذكار الاستيقاظ من النوم',
  morning: 'أذكار الصباح',
  evening: 'أذكار المساء',
  sleep: 'أذكار النوم'
};

const categoryDescriptions: { [key: string]: string } = {
  wake: 'الأذكار المستحبة عند الاستيقاظ من النوم وبداية اليوم الجديد',
  morning: 'الأذكار والأدعية المستحبة في فترة الصباح لحفظ الله ورعايته',
  evening: 'الأذكار والأدعية المستحبة في فترة المساء للحماية والتوكل على الله',
  sleep: 'الأذكار المستحبة قبل النوم للنوم الهادئ والحماية'
};

export default function AthkarPage() {
  const { category } = useParams<{ category: string }>();
  const [athkar, setAthkar] = useState<Thikr[]>([]);
  const [loading, setLoading] = useState(true);
  const { counters, resetCounters } = useAthkar();

  useEffect(() => {
    const loadAthkar = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/src/data/${category}.json`);
        const data = await response.json();
        setAthkar(data);
      } catch (error) {
        console.error('Error loading athkar:', error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      loadAthkar();
    }
  }, [category]);

  const handleReset = () => {
    if (category && athkar.length > 0) {
      resetCounters(category, athkar);
    }
  };

  const totalCompleted = athkar.filter(thikr => {
    const count = counters[category || '']?.[thikr.id] || 0;
    return count >= thikr.defaultCount;
  }).length;

  const completionPercentage = athkar.length > 0 ? Math.round((totalCompleted / athkar.length) * 100) : 0;

  if (loading) {
    return (
      <>
        <SEO 
          title={categoryTitles[category || '']}
          description={categoryDescriptions[category || '']}
          keywords={['أذكار', 'إسلام', category || '', 'أدعية', 'القرآن']}
        />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-600 dark:text-gray-400 text-lg">جاري تحميل الأذكار...</p>
          </motion.div>
        </div>
      </>
    );
  }

  if (!category || !athkar.length) {
    return (
      <>
        <SEO 
          title="غير موجود"
          description="الصفحة غير موجودة"
          keywords={['أذكار', 'إسلام', 'خطأ']}
        />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">لم يتم العثور على الأذكار المطلوبة</p>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title={categoryTitles[category]}
        description={categoryDescriptions[category]}
        keywords={['أذكار', 'إسلام', category, 'أدعية', 'القرآن']}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
        {/* Header Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-800 dark:to-purple-900">
          <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-4xl mx-auto px-4 py-16"
          >
            <div className="text-center text-white">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                {categoryTitles[category]}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-purple-100 text-lg mb-8 leading-relaxed"
              >
                {categoryDescriptions[category]}
              </motion.p>
              
              {/* Progress Section */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-white/20"
              >
                <div className="flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-yellow-300 ml-2" />
                  <span className="text-lg font-semibold">التقدم</span>
                </div>
                
                <div className="bg-purple-800/50 rounded-full h-4 mb-4 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full h-4"
                  />
                </div>
                
                <p className="text-purple-100 text-sm">
                  اكتملت {totalCompleted} من {athkar.length} أذكار ({completionPercentage}%)
                </p>

                <AnimatePresence>
                  {completionPercentage === 100 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      className="mt-4 p-3 bg-gradient-to-r from-yellow-400/20 to-yellow-300/20 rounded-lg border border-yellow-300/30"
                    >
                      <div className="flex items-center justify-center text-yellow-200">
                        <Sparkles className="w-5 h-5 ml-2" />
                        <span className="font-semibold">مبارك! أكملت جميع الأذكار</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-between items-center mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              الأذكار ({athkar.length})
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="flex items-center space-x-2 space-x-reverse px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
            >
              <RotateCcw className="w-5 h-5" />
              <span>إعادة ضبط الكل</span>
            </motion.button>
          </motion.div>

          <div className="space-y-6">
            {athkar.map((thikr, index) => (
              <ThikrItem
                key={thikr.id}
                thikr={thikr}
                category={category}
                index={index}
              />
            ))}
          </div>

          {/* Completion Celebration */}
          <AnimatePresence>
            {completionPercentage === 100 && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-16 text-center p-10 bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-purple-200/50 dark:border-purple-600/50"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-4"
                >
                  بارك الله فيك!
                </motion.h3>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed"
                >
                  لقد أكملت جميع الأذكار في هذه الفئة. جعل الله ذكرك في ميزان حسناتك
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/30 dark:border-purple-800/30"
                >
                  <p className="text-gray-800 dark:text-gray-200 font-medium text-lg italic leading-relaxed">
                    "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ"
                  </p>
                  <p className="text-purple-600 dark:text-purple-400 text-sm mt-2 font-medium">البقرة: 152</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}