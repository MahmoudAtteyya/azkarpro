import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AthkarCardProps {
  title: string;
  icon: React.ReactNode;
  path: string;
  description: string;
  index: number;
}

export default function AthkarCard({ title, icon, path, description, index }: AthkarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link
        to={path}
        className="block relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-200/30 dark:border-purple-800/30 hover:border-purple-300/50 dark:hover:border-purple-700/50"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 text-center">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg group-hover:shadow-purple-500/25"
          >
            {icon}
          </motion.div>
          
          <h3 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300 leading-relaxed">
            {title}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            {description}
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="inline-flex items-center text-purple-600 dark:text-purple-400 font-medium"
          >
            <span className="ml-2">ابدأ الآن</span>
            <motion.svg 
              whileHover={{ x: -4 }}
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </motion.svg>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}