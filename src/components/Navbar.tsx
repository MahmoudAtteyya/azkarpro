import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Home, RotateCcw } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  onResetAll?: () => void;
}

export default function Navbar({ onResetAll }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-purple-200/30 dark:border-purple-800/30 sticky top-0 z-50 shadow-lg"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link 
              to="/" 
              className="flex items-center space-x-3 space-x-reverse text-purple-700 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200 transition-colors duration-200"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-lg">أ</span>
              </motion.div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                تطبيق الأذكار
              </h1>
            </Link>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <ThemeToggle />
            
            {!isHomePage && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-purple-600 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-all duration-200"
              >
                <ArrowRight className="w-4 h-4" />
                <span>رجوع</span>
              </motion.button>
            )}
            
            <Link
              to="/"
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>

            {onResetAll && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onResetAll}
                className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة ضبط الكل</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}