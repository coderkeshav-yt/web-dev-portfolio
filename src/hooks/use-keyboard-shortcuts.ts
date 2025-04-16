import { useEffect } from 'react';

export const useKeyboardShortcuts = () => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Space to scroll down one page
      if (e.code === 'Space' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        window.scrollBy({
          top: window.innerHeight * 0.9,
          behavior: 'smooth'
        });
      }

      // Shift + Space to scroll up one page
      if (e.code === 'Space' && e.shiftKey) {
        e.preventDefault();
        window.scrollBy({
          top: -window.innerHeight * 0.9,
          behavior: 'smooth'
        });
      }

      // Home key to scroll to top
      if (e.code === 'Home') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }

      // End key to scroll to bottom
      if (e.code === 'End') {
        e.preventDefault();
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }
      
      // Page Up/Down for smoother scrolling
      if (e.code === 'PageUp') {
        e.preventDefault();
        window.scrollBy({
          top: -window.innerHeight * 0.9,
          behavior: 'smooth'
        });
      }
      
      if (e.code === 'PageDown') {
        e.preventDefault();
        window.scrollBy({
          top: window.innerHeight * 0.9,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
};

export const getKeyboardShortcutsList = () => [
  { key: 'Space', description: 'Scroll down one page' },
  { key: 'Shift + Space', description: 'Scroll up one page' },
  { key: 'Home', description: 'Scroll to top' },
  { key: 'End', description: 'Scroll to bottom' },
  { key: 'Page Up', description: 'Scroll up smoothly' },
  { key: 'Page Down', description: 'Scroll down smoothly' },
];