import { useState, useEffect } from 'react';
import { Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Mock search results - replace with actual data
  const searchResults = [
    { title: 'Home', href: '#home' },
    { title: 'About', href: '#about' },
    { title: 'Projects', href: '#projects' },
    { title: 'Blog', href: '#blog' },
    { title: 'Contact', href: '#contact' }
  ].filter(result => 
    result.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < searchResults.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : searchResults.length - 1
          );
          break;
        case 'Enter':
          if (searchResults[selectedIndex]) {
            window.location.href = searchResults[selectedIndex].href;
            onClose();
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchResults, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md">
        <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-slate-900/90 border border-slate-700 rounded-lg shadow-xl relative"
          >
            <motion.button
              onClick={onClose}
              className="absolute -top-12 left-1/2 -translate-x-1/2 p-3 text-slate-200 hover:text-white transition-colors rounded-full hover:bg-slate-800/50 backdrop-blur-sm border border-slate-600/50"
              aria-label="Close search"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform transition-transform hover:rotate-90"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>
            <div className="p-4">
              <div className="flex items-center gap-2 px-3 py-2 border border-slate-700 rounded-md focus-within:border-violet-500/40">
                <Command className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="flex-1 bg-transparent border-0 outline-none text-white placeholder:text-slate-400"
                  autoFocus
                />
              </div>

              <div className="mt-4 space-y-1">
                {searchResults.map((result, index) => (
                  <a
                    key={result.href}
                    href={result.href}
                    onClick={onClose}
                    className={`block px-3 py-2 rounded-md text-sm ${index === selectedIndex ? 'bg-violet-500/20 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                  >
                    {result.title}
                  </a>
                ))}
                {searchResults.length === 0 && (
                  <div className="px-3 py-2 text-sm text-slate-400">
                    No results found
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;