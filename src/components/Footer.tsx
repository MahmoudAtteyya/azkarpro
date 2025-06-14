import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Facebook, Globe, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-purple-200/30 dark:border-purple-800/30 py-10 mt-auto"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left Section - Made with love */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Made with{' '}
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="inline-block text-red-500"
              >
                <Heart className="w-4 h-4 inline" />
              </motion.span>{' '}
              by{' '}
              <motion.a
                href="https://wp.elliaa.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Elliaa
              </motion.a>
            </p>
          </motion.div>

          {/* Center Section - Social Links */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center space-x-8 rtl:space-x-reverse"
          >
            <motion.a
              href="https://facebook.com/elliaa10"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.1, 
                y: -2,
                rotate: [0, -5, 5, 0]
              }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
              title="تابعنا على فيسبوك"
            >
              <Facebook className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://wp.elliaa.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.1, 
                y: -2,
                rotate: [0, -5, 5, 0]
              }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200"
              title="موقعنا الإلكتروني"
            >
              <Globe className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://wa.me/+201062206570"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.1, 
                y: -2,
                rotate: [0, -5, 5, 0]
              }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200"
              title="تواصل معنا على واتساب"
            >
              <MessageCircle className="w-6 h-6" />
            </motion.a>
          </motion.div>

          {/* Right Section - Copyright */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center md:text-left"
          >
            <p className="text-gray-500 dark:text-gray-500 text-xs">
              جميع الحقوق محفوظة لدى إيلياء © {new Date().getFullYear()}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer; 