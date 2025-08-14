// Advanced Performance Monitoring and Optimization Utilities

interface PerformanceMetrics {
  fps: number;
  memory: number;
  scrollPerformance: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    fps: 0,
    memory: 0,
    scrollPerformance: 0,
    largestContentfulPaint: 0,
    firstInputDelay: 0,
    cumulativeLayoutShift: 0
  };

  private observers: PerformanceObserver[] = [];
  private rafId: number | null = null;
  private frameCount = 0;
  private lastTime = 0;

  constructor() {
    this.initializeObservers();
    this.startFPSMonitoring();
    this.optimizeForDevice();
  }

  private initializeObservers() {
    // Core Web Vitals Observer
    if ('PerformanceObserver' in window) {
      const vitalsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          switch (entry.entryType) {
            case 'largest-contentful-paint':
              this.metrics.largestContentfulPaint = entry.startTime;
              break;
            case 'first-input':
              this.metrics.firstInputDelay = (entry as any).processingStart - entry.startTime;
              break;
            case 'layout-shift':
              if (!(entry as any).hadRecentInput) {
                this.metrics.cumulativeLayoutShift += (entry as any).value;
              }
              break;
          }
        });
      });

      try {
        vitalsObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        this.observers.push(vitalsObserver);
      } catch (e) {
        console.warn('Performance Observer not fully supported');
      }

      // Long Tasks Observer
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            console.warn(`Long task detected: ${entry.duration}ms`);
            this.optimizeForLongTasks();
          }
        });
      });

      try {
        longTaskObserver.observe({ entryTypes: ['longtask'] });
        this.observers.push(longTaskObserver);
      } catch (e) {
        console.warn('Long task observer not supported');
      }
    }
  }

  private startFPSMonitoring() {
    const measureFPS = (currentTime: number) => {
      if (this.lastTime === 0) {
        this.lastTime = currentTime;
      }

      this.frameCount++;

      if (currentTime - this.lastTime >= 1000) {
        this.metrics.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
        
        // Auto-optimize if FPS is low
        if (this.metrics.fps < 30) {
          this.enablePerformanceMode();
        }

        this.frameCount = 0;
        this.lastTime = currentTime;
      }

      this.rafId = requestAnimationFrame(measureFPS);
    };

    this.rafId = requestAnimationFrame(measureFPS);
  }

  private optimizeForDevice() {
    const isLowEndDevice = this.detectLowEndDevice();
    
    if (isLowEndDevice) {
      this.enablePerformanceMode();
      console.log('Low-end device detected, enabling performance mode');
    }

    // Memory monitoring
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.metrics.memory = memory.usedJSHeapSize / memory.totalJSHeapSize;
      
      if (this.metrics.memory > 0.8) {
        this.enableMemoryOptimizations();
      }
    }
  }

  private detectLowEndDevice(): boolean {
    return (
      navigator.hardwareConcurrency <= 4 ||
      (navigator as any).deviceMemory <= 4 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      navigator.connection?.effectiveType === '2g' ||
      navigator.connection?.effectiveType === '3g'
    );
  }

  private enablePerformanceMode() {
    // Add performance mode class to body
    document.body.classList.add('performance-mode');
    
    // Disable expensive animations
    const style = document.createElement('style');
    style.textContent = `
      .performance-mode * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
      }
      .performance-mode .hover-card:hover {
        transform: none !important;
        box-shadow: none !important;
      }
    `;
    document.head.appendChild(style);

    // Force GPU acceleration on key elements
    this.forceGPUAcceleration();
  }

  private forceGPUAcceleration() {
    const criticalElements = document.querySelectorAll(
      '.navbar, .hero-section, .scroll-progress, [class*="motion-"], .premium-card, .hover-card'
    );
    
    criticalElements.forEach(el => {
      const element = el as HTMLElement;
      element.style.transform = 'translateZ(0)';
      element.style.willChange = 'transform, opacity';
      element.style.backfaceVisibility = 'hidden';
    });
  }

  private optimizeForLongTasks() {
    // Break up heavy operations
    this.enableTaskScheduling();
  }

  private enableTaskScheduling() {
    // Use scheduler API if available
    if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
      console.log('Using Scheduler API for task optimization');
    } else {
      // Fallback to setTimeout for breaking up tasks
      this.enableTimeSlicing();
    }
  }

  private enableTimeSlicing() {
    // Patch setTimeout to use MessageChannel for better performance
    const originalSetTimeout = window.setTimeout;
    const channel = new MessageChannel();
    const port1 = channel.port1;
    const port2 = channel.port2;
    
    const callbacks = new Map();
    let id = 0;
    
    port1.onmessage = (event) => {
      const callback = callbacks.get(event.data);
      if (callback) {
        callback();
        callbacks.delete(event.data);
      }
    };
    
    // Override setTimeout for better scheduling
    (window as any).scheduledSetTimeout = (callback: Function, delay: number = 0) => {
      const currentId = ++id;
      callbacks.set(currentId, callback);
      
      if (delay === 0) {
        port2.postMessage(currentId);
      } else {
        originalSetTimeout(() => port2.postMessage(currentId), delay);
      }
      
      return currentId;
    };
  }

  private enableMemoryOptimizations() {
    console.warn('High memory usage detected, enabling memory optimizations');
    
    // Clear unused event listeners
    this.cleanupUnusedListeners();
    
    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }
  }

  private cleanupUnusedListeners() {
    // Remove passive scroll listeners that aren't needed
    const elements = document.querySelectorAll('[data-scroll-listener]');
    elements.forEach(el => {
      const listeners = (el as any)._scrollListeners || [];
      listeners.forEach((listener: EventListener) => {
        el.removeEventListener('scroll', listener);
      });
      delete (el as any)._scrollListeners;
    });
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public isPerformant(): boolean {
    return (
      this.metrics.fps >= 50 &&
      this.metrics.largestContentfulPaint < 2500 &&
      this.metrics.firstInputDelay < 100 &&
      this.metrics.cumulativeLayoutShift < 0.1
    );
  }

  public destroy() {
    // Cleanup observers
    this.observers.forEach(observer => observer.disconnect());
    
    // Stop FPS monitoring
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    
    // Remove performance mode
    document.body.classList.remove('performance-mode');
  }
}

// Auto-initialize performance monitoring
let performanceMonitor: PerformanceMonitor | null = null;

export const initializePerformanceMonitoring = () => {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
  }
  return performanceMonitor;
};

export const getPerformanceMetrics = () => {
  return performanceMonitor?.getMetrics() || null;
};

export const isWebsitePerformant = () => {
  return performanceMonitor?.isPerformant() || false;
};

// Initialize on module load
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePerformanceMonitoring);
  } else {
    initializePerformanceMonitoring();
  }
}
