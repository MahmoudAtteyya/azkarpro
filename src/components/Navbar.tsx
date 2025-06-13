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
  const isDownloadPage = location.pathname === '/download';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-purple-200/30 dark:border-purple-800/30 sticky top-0 z-50 shadow-lg"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4 space-x-reverse">
            {!isHomePage && (
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
              >
                <ArrowRight className="w-5 h-5" />
                <span className="mr-1">رجوع</span>
              </button>
            )}
          </div>

          {!isHomePage && !isDownloadPage && (
            <Link 
              to="/"
              className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              <Home className="w-5 h-5" />
              <span className="mr-1">الرئيسية</span>
            </Link>
          )}

          <div className="flex items-center space-x-4 space-x-reverse">
            {!isDownloadPage && !isHomePage && onResetAll && (
              <button
                onClick={onResetAll}
                className="inline-flex items-center text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              >
                <RotateCcw className="w-5 h-5" />
                <span className="mr-1">إعادة ضبط</span>
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}