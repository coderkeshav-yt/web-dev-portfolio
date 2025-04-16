import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNavigationShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'h':
            e.preventDefault();
            navigate('/');
            break;
          case 'g':
            e.preventDefault();
            navigate('/guest-book');
            break;
          case 'b':
            e.preventDefault();
            navigate('/bucket-list');
            break;
          case 'l':
            e.preventDefault();
            navigate('/links');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);
};

export const getShortcutsList = () => [
  { key: 'Alt + H', description: 'Go to Home' },
  { key: 'Alt + G', description: 'Go to Guest Book' },
  { key: 'Alt + B', description: 'Go to Bucket List' },
  { key: 'Alt + L', description: 'Go to Links' },
  { key: 'Alt + K', description: 'Open keyboard shortcuts help' },
];