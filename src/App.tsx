import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { AthkarProvider } from './context/AthkarContext';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InstallPWA from './components/InstallPWA';
import InstallButton from './components/InstallButton';
import { useNotifications } from './hooks/useNotifications';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AthkarPage = React.lazy(() => import('./pages/AthkarPage'));
const DownloadPage = React.lazy(() => import('./pages/DownloadPage'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  // Initialize notifications
  useNotifications();

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <AthkarProvider>
            <Router>
              <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 transition-colors duration-300">
                <Navbar />
                <AnimatePresence mode="wait">
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <HomePage />
                          </motion.div>
                        }
                      />
                      <Route
                        path="/:category"
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <AthkarPage />
                          </motion.div>
                        }
                      />
                      <Route
                        path="/download"
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <DownloadPage />
                          </motion.div>
                        }
                      />
                    </Routes>
                  </Suspense>
                </AnimatePresence>
                <Footer />
                <InstallPWA />
              </div>
            </Router>
          </AthkarProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;