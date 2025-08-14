import { useEffect, useCallback, useRef } from 'react';

interface PerformanceConfig {
  enableGPUAcceleration: boolean;
  reduceAnimations: boolean;
  optimizeScrolling: boolean;
}

export const usePerformanceObserver = () => {
  const performanceConfig = useRef<PerformanceConfig>({
    enableGPUAcceleration: true,
    reduceAnimations: false,
    optimizeScrolling: true
  });

  const optimizeForDevice = useCallback(() => {
    // Detect device capabilities
    const isLowEndDevice = (
      navigator.hardwareConcurrency <= 4 ||
      (navigator as any).deviceMemory <= 4 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isLowEndDevice || prefersReducedMotion) {
      performanceConfig.current = {
        enableGPUAcceleration: false,
        reduceAnimations: true,
        optimizeScrolling: true
      };

      // Add performance class to body
      document.body.classList.add('performance-mode');
    }

    // Force GPU layers for key elements
    if (performanceConfig.current.enableGPUAcceleration) {
      const keyElements = document.querySelectorAll(
        '.hover-card, .premium-card, .code-window, .nav-blur, [class*="motion-"]'
      );
      keyElements.forEach(el => {
        (el as HTMLElement).style.transform = 'translateZ(0)';
        (el as HTMLElement).style.willChange = 'transform, opacity';
      });
    }
  }, []);

  const enableCriticalCSSOptimizations = useCallback(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Critical performance CSS */
      * {
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
      }
      
      .performance-mode * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
      }
      
      .gpu-layer {
        transform: translateZ(0);
        will-change: transform, opacity;
        backface-visibility: hidden;
        perspective: 1000px;
      }
      
      .scroll-smooth {
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
      }
      
      /* Optimize repaints */
      .no-repaint {
        contain: layout style paint;
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    optimizeForDevice();
    enableCriticalCSSOptimizations();

    // Performance observer for monitoring
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'measure' && entry.duration > 16.67) {
            console.warn('Performance issue detected:', entry.name, entry.duration);
          }
        });
      });
      observer.observe({ entryTypes: ['measure', 'navigation'] });

      return () => observer.disconnect();
    }
  }, [optimizeForDevice, enableCriticalCSSOptimizations]);

  return performanceConfig.current;
};
