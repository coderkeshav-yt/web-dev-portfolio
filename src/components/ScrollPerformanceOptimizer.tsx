import React, { useEffect, useRef, useCallback } from 'react';

interface ScrollPerformanceOptimizerProps {
  children: React.ReactNode;
}

// Simple debounce utility
function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T & { cancel: () => void } {
  let timeoutId: NodeJS.Timeout | null = null;
  
  const debounced = ((...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T & { cancel: () => void };
  
  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
  
  return debounced;
}

// Lightweight scroll performance optimizer
const ScrollPerformanceOptimizer: React.FC<ScrollPerformanceOptimizerProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Disable only hover effects during scroll (less aggressive)
  const disableScrollEffects = useCallback(() => {
    if (isScrollingRef.current) return;
    
    isScrollingRef.current = true;
    document.body.classList.add('scrolling');
    
    // Only disable hover effects on specific elements, not everything
    const hoverElements = document.querySelectorAll('.hover-card, .premium-card');
    hoverElements.forEach((el) => {
      const element = el as HTMLElement;
      element.style.pointerEvents = 'none';
    });

    // Less aggressive CSS override - only disable hover transforms
    const style = document.createElement('style');
    style.id = 'scroll-performance-override';
    style.textContent = `
      .scrolling .hover-card:hover {
        transform: none !important;
        box-shadow: none !important;
      }
      
      .scrolling .premium-card:hover {
        transform: none !important;
        box-shadow: none !important;
      }
      
      .scrolling .hover-card img {
        transform: translateZ(0) !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Re-enable effects after scrolling stops
  const enableScrollEffects = useCallback(() => {
    if (!isScrollingRef.current) return;
    
    isScrollingRef.current = false;
    document.body.classList.remove('scrolling', 'no-animations');
    
    // Remove performance override styles
    const styleEl = document.getElementById('scroll-performance-override');
    if (styleEl) {
      styleEl.remove();
    }
    
    // Re-enable pointer events and will-change
    const elements = document.querySelectorAll('*');
    elements.forEach((el) => {
      const element = el as HTMLElement;
      element.style.pointerEvents = '';
      element.style.willChange = '';
    });
    
    // Force GPU acceleration on key elements
    requestAnimationFrame(() => {
      const keyElements = document.querySelectorAll(
        '.hover-card, .premium-card, .navbar, .scroll-progress, [class*="motion-"]'
      );
      keyElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.transform = 'translateZ(0)';
        element.style.willChange = 'transform, opacity';
        element.style.backfaceVisibility = 'hidden';
      });
    });
  }, []);

  // Optimized scroll handler with debouncing
  const handleScroll = useCallback(
    debounce(() => {
      enableScrollEffects();
    }, 100),
    [enableScrollEffects]
  );

  // Immediate scroll start handler
  const handleScrollStart = useCallback(() => {
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Cancel existing debounced calls
    handleScroll.cancel();
    
    // Immediately disable effects
    disableScrollEffects();
    
    // Set a timeout to re-enable effects
    scrollTimeoutRef.current = setTimeout(() => {
      enableScrollEffects();
    }, 150);
  }, [disableScrollEffects, enableScrollEffects, handleScroll]);

  useEffect(() => {
    let ticking = false;
    let rafId: number;
    
    const optimizedScrollHandler = () => {
      if (!ticking) {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        
        rafId = requestAnimationFrame(() => {
          handleScrollStart();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add ultra-passive scroll listener
    window.addEventListener('scroll', optimizedScrollHandler, { 
      passive: true, 
      capture: true 
    });
    
    // Force initial GPU acceleration
    requestAnimationFrame(() => {
      const criticalElements = document.querySelectorAll(
        '.hover-card, .premium-card, .navbar, .scroll-progress, [class*="motion-"], .fast-transitions, .gpu-accelerated'
      );
      
      criticalElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.transform = 'translateZ(0)';
        element.style.willChange = 'transform, opacity';
        element.style.backfaceVisibility = 'hidden';
        element.style.perspective = '1000px';
      });
    });

    return () => {
      window.removeEventListener('scroll', optimizedScrollHandler, { capture: true });
      handleScroll.cancel();
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      // Clean up on unmount
      enableScrollEffects();
    };
  }, [handleScrollStart, handleScroll, enableScrollEffects]);

  return (
    <div 
      ref={containerRef} 
      className="scroll-container gpu-accelerated"
      style={{
        contain: 'layout style paint',
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </div>
  );
};

export default ScrollPerformanceOptimizer;
