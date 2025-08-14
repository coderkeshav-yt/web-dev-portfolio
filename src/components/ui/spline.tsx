'use client'

import { Suspense, lazy, useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import useThrottledScroll from '@/hooks/use-throttled-scroll';
import SplineErrorBoundary from '../SplineErrorBoundary';

// Lazy load the Spline component with error handling
const Spline = lazy(() => 
  import('@splinetool/react-spline').catch(() => {
    const SplineFallback = () => {
      throw new Error('Failed to load Spline component');
    };
    return { default: SplineFallback } as unknown as Promise<{
      default: React.ForwardRefExoticComponent<
        import('@splinetool/react-spline').SplineProps & 
        React.RefAttributes<HTMLDivElement>
      >;
    }>;
  })
);

interface SplineSceneProps {
  scene: string;
  className?: string;
}
function SplineScene({ scene, className }: SplineSceneProps) {
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY, isScrolling } = useThrottledScroll();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Optimized intersection observer for visibility detection
  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isClient]);

  // Handle WebGL support detection
  const checkWebGLSupport = useCallback(() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  }, []);

  // Don't render on server
  if (!isClient) {
    return (
      <div 
        id="spline-container"
        className={cn('w-full h-full bg-slate-900/20 animate-pulse rounded-xl', className)} 
      />
    );
  }

  // Check for WebGL support
  const hasWebGL = checkWebGLSupport();
  
  // Fallback content when WebGL is not supported
  const fallbackContent = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/50 rounded-xl p-6 text-center">
      <div className="mb-4 p-3 bg-slate-800/50 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-slate-200 mb-1">3D Content Unavailable</h3>
      <p className="text-slate-400 text-sm max-w-xs">
        {hasWebGL 
          ? 'There was an error loading the 3D content.' 
          : 'Your browser or device does not support WebGL which is required for this content.'}
      </p>
    </div>
  );

  return (
    <div ref={containerRef} id="spline-container" className={cn('w-full h-full', className)}>
      <SplineErrorBoundary fallback={fallbackContent}>
        {isVisible ? (
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center bg-slate-900/20 rounded-xl">
              <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            {hasWebGL ? (
              <Spline
                scene={scene}
                className="w-full h-full rounded-xl overflow-hidden"
                onError={(error) => {
                  console.error('Spline error:', error);
                  // Force re-render to show fallback
                  setHasLoaded(false);
                }}
                onLoad={() => setHasLoaded(true)}
              />
            ) : (
              fallbackContent
            )}
          </Suspense>
        ) : (
          <div className="w-full h-full bg-slate-900/20 animate-pulse rounded-xl" />
        )}
      </SplineErrorBoundary>
    </div>
  );
}

export { SplineScene };
