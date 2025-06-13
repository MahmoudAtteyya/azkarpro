import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Check } from 'lucide-react';
import { useAthkar } from '../context/AthkarContext';

interface ThikrItemProps {
  thikr: {
    id: number;
    text: string;
    defaultCount: number;
  };
  category: string;
  index: number;
}

export default function ThikrItem({ thikr, category, index }: ThikrItemProps) {
  const { counters, incrementCounter, decrementCounter } = useAthkar();
  const currentCount = counters[category]?.[thikr.id] || 0;
  const isCompleted = currentCount >= thikr.defaultCount;
  const remaining = Math.max(0, thikr.defaultCount - currentCount);

  const handleIncrement = () => {
    incrementCounter(category, thikr.id);
    // Add haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleDecrement = () => {
    decrementCounter(category, thikr.id);
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-300 border-2 backdrop-blur-sm ${
        isCompleted 
          ? 'bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-300/50 dark:border-purple-600/50 shadow-purple-200/50 dark:shadow-purple-900/25' 
          : 'bg-white/70 dark:bg-gray-800/70 border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300/50 dark:hover:border-purple-600/50 hover:shadow-xl'
      }`}
    >
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="absolute top-4 left-4"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
              <Check className="w-5 h-5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mb-8 pr-12">
        <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-100 font-medium">
          {thikr.text}
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6 space-x-reverse">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDecrement}
            disabled={currentCount === 0}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl disabled:hover:scale-100"
          >
            <Minus className="w-6 h-6" />
          </motion.button>
          
          <div className="text-center">
            <motion.div 
              key={currentCount}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className={`text-3xl font-bold ${isCompleted ? 'text-purple-600 dark:text-purple-400' : 'text-gray-800 dark:text-gray-100'}`}
            >
              {currentCount}
            </motion.div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              من {thikr.defaultCount}
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleIncrement}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        </div>
        
        <div className="text-left">
          <AnimatePresence mode="wait">
            {isCompleted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center text-purple-600 dark:text-purple-400 font-bold"
              >
                <Check className="w-5 h-5 ml-2" />
                <span>مكتمل</span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-gray-600 dark:text-gray-400"
              >
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{remaining}</div>
                <div className="text-sm">متبقي</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}