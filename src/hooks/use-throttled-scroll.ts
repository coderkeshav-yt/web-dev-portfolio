import { useEffect, useState, useCallback, useRef } from 'react';

// Ultra-aggressive scroll performance utilities
const disableHoversOnScroll = () => {
  document.body.classList.add('scrolling');
  document.body.style.pointerEvents = 'none';
};

const enableHoversAfterScroll = () => {
  document.body.classList.remove('scrolling');
  document.body.style.pointerEvents = '';
};

// Super optimized scroll hook with aggressive performance settings
const useThrottledScroll = (delay: number = 8) => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(0);
  const rafId = useRef<number>();
  const scrollTimeout = useRef<NodeJS.Timeout>();

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const currentTime = performance.now();
    
    // Calculate scroll direction and speed
    const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
    const speed = Math.abs(currentScrollY - lastScrollY.current) / (currentTime - lastTimestamp.current || 1);
    
    setScrollY(currentScrollY);
    setScrollDirection(direction);
    setScrollSpeed(speed);
    
    if (!isScrolling) {
      setIsScrolling(true);
      // Disable hover effects during scroll for performance
      disableHoversOnScroll();
    }
    
    // Clear existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    // Set scroll end detection
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
      setScrollSpeed(0);
      // Re-enable hover effects after scroll ends
      enableHoversAfterScroll();
    }, 150);
    
    lastScrollY.current = currentScrollY;
    lastTimestamp.current = currentTime;
  }, [isScrolling]);

  useEffect(() => {
    let ticking = false;

    const updateScrollY = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      if (!ticking) {
        rafId.current = requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listeners for better performance
    window.addEventListener('scroll', updateScrollY, { passive: true, capture: true });
    
    // Initial values
    lastScrollY.current = window.scrollY;
    lastTimestamp.current = performance.now();
    
    return () => {
      window.removeEventListener('scroll', updateScrollY, { capture: true });
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScroll]);

  return { 
    scrollY, 
    isScrolling, 
    scrollDirection, 
    scrollSpeed,
    isScrollingFast: scrollSpeed > 5
  };
};

export default useThrottledScroll;
