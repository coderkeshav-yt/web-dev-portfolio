import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import useThrottledScroll from '@/hooks/use-throttled-scroll';

const ScrollProgressIndicator = () => {
  const { scrollYProgress } = useScroll();
  const { scrollY, isScrolling } = useThrottledScroll();
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 40,
    restDelta: 0.001
  });

  useEffect(() => {
    setIsVisible(scrollY > 100);
  }, [scrollY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-violet-600/30 origin-[0%] z-[999]"
      style={{ scaleX }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  );
};

export default ScrollProgressIndicator;