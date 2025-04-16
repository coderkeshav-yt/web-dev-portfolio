import { motion } from 'framer-motion';

const PageLoadingIndicator = () => {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-blue-500 origin-left z-[9999]"
    />
  );
};

export default PageLoadingIndicator;