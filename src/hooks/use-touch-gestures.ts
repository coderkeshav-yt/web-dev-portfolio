import { useEffect, useState } from 'react';

interface TouchPosition {
  x: number;
  y: number;
}

export const useTouchGestures = (threshold = 50) => {
  const [touchStart, setTouchStart] = useState<TouchPosition | null>(null);
  const [touchEnd, setTouchEnd] = useState<TouchPosition | null>(null);

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      setTouchEnd(null);
      setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      });
    };

    const onTouchMove = (e: TouchEvent) => {
      setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      });
    };

    const onTouchEnd = () => {
      if (!touchStart || !touchEnd) return;

      const distanceX = touchStart.x - touchEnd.x;
      const distanceY = touchStart.y - touchEnd.y;
      const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

      if (isHorizontalSwipe) {
        if (Math.abs(distanceX) < threshold) return;
        
        if (distanceX > 0) {
          // Swipe left
          window.history.forward();
        } else {
          // Swipe right
          window.history.back();
        }
      } else {
        if (Math.abs(distanceY) < threshold) return;

        if (distanceY > 0) {
          // Swipe up - scroll down one viewport
          window.scrollBy({
            top: window.innerHeight * 0.9,
            behavior: 'smooth'
          });
        } else {
          // Swipe down - scroll up one viewport
          window.scrollBy({
            top: -window.innerHeight * 0.9,
            behavior: 'smooth'
          });
        }
      }

      setTouchEnd(null);
      setTouchStart(null);
    };

    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [threshold, touchStart, touchEnd]);
};