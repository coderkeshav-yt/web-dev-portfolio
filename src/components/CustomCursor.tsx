import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursor2Ref = useRef<HTMLDivElement>(null);
  
  // Add refs for cursor positions
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursor1Position = useRef({ x: 0, y: 0 });
  const cursor2Position = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursor2 = cursor2Ref.current;
    
    if (!cursor || !cursor2) return;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updateCursorPosition = () => {
      // Update positions with lerp for smooth following
      cursor1Position.current.x = lerp(cursor1Position.current.x, mousePosition.current.x, 0.5);
      cursor1Position.current.y = lerp(cursor1Position.current.y, mousePosition.current.y, 0.5);
      
      cursor2Position.current.x = lerp(cursor2Position.current.x, mousePosition.current.x, 0.2);
      cursor2Position.current.y = lerp(cursor2Position.current.y, mousePosition.current.y, 0.2);

      // Apply transforms instead of left/top for better performance
      cursor.style.transform = `translate3d(${cursor1Position.current.x}px, ${cursor1Position.current.y}px, 0)`;
      cursor2.style.transform = `translate3d(${cursor2Position.current.x}px, ${cursor2Position.current.y}px, 0)`;

      animationFrameId.current = requestAnimationFrame(updateCursorPosition);
    };

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mousePosition.current = { 
        x: clientX, 
        y: clientY 
      };
      
      // Check if mouseover a clickable element
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button')
      ) {
        cursor.classList.add('active');
        cursor2.classList.add('hover');
      } else {
        cursor.classList.remove('active');
        cursor2.classList.remove('hover');
      }
    };

    const onMouseDown = () => {
      cursor.classList.add('click');
      cursor2.classList.add('click');
    };

    const onMouseUp = () => {
      cursor.classList.remove('click');
      cursor2.classList.remove('click');
    };

    // Start the animation loop
    updateCursorPosition();
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="cursor fixed top-0 left-0 w-3 h-3 bg-violet-600 rounded-full pointer-events-none z-[9999] will-change-transform hidden md:block"
        style={{ transform: 'translate3d(0px, 0px, 0)' }}
      ></div>
      <div 
        ref={cursor2Ref} 
        className="cursor2 fixed top-0 left-0 w-12 h-12 border-2 border-violet-500 rounded-full pointer-events-none z-[9998] will-change-transform hidden md:block"
        style={{ transform: 'translate3d(0px, 0px, 0)' }}
      ></div>
    </>
  );
};

export default CustomCursor;
