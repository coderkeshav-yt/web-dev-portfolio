import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import ScrollProgressIndicator from './ScrollProgressIndicator';
import { useTouchGestures } from '@/hooks/use-touch-gestures';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const PageLayout = ({ children, title, description }: PageLayoutProps) => {
  // Enable touch gestures for mobile navigation
  useTouchGestures();
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgressIndicator />
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="flex-grow px-4 py-16 sm:px-8 md:px-16 lg:px-24"
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </motion.main>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default PageLayout;