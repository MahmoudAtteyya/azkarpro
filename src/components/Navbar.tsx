import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  onResetAll?: () => void;
}

export default function Navbar({ onResetAll }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isDownloadPage = location.pathname === '/download';

  // منطق إخفاء الشريط عند التمرير للأسفل
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShow(true);
        setLastScrollY(window.scrollY);
        return;
      }
      if (window.scrollY > lastScrollY) {
        setShow(false); // Scroll Down => Hide
      } else {
        setShow(true); // Scroll Up => Show
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: show ? 0 : -120, opacity: show ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 40, damping: 24 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-purple-200/30 dark:border-purple-800/30 sticky top-0 z-50 shadow-xl shadow-purple-100/40 dark:shadow-purple-900/40"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Right Side: Logo */}
          <motion.div
            whileHover={{ scale: 1.07, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src="/images/logo-black.png"
                className="w-24 h-16 object-contain block dark:hidden drop-shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300"
                alt="شعار تطبيق الأذكار"
              />
              <img
                src="/images/logo-white.png"
                className="w-24 h-16 object-contain hidden dark:block drop-shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300"
                alt="شعار تطبيق الأذكار"
              />
              <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:to-purple-600 transition-colors duration-300">
                الأذكار من إيلياء
              </span>
            </Link>
            {!isDownloadPage && !isHomePage && onResetAll && (
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: '#fee2e2' }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                onClick={onResetAll}
                className="inline-flex items-center text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/10 px-3 py-1 rounded-lg shadow-sm ml-2 transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5" />
                <span className="mr-1">إعادة ضبط</span>
              </motion.button>
            )}
          </motion.div>

          {/* Center */}
          <div className="flex-1 flex items-center justify-center"></div>

          {/* Left Side: Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
            className="flex items-center gap-4"
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}