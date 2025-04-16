import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Command, ArrowRight, Menu, X, Search, Calendar, Keyboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import CalModal from '@/components/CalModal';
import SearchModal from '@/components/SearchModal';
import KeyboardShortcutsModal from '@/components/KeyboardShortcutsModal';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCalModalOpen, setIsCalModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const openCalModal = () => setIsCalModalOpen(true);
  const closeCalModal = () => setIsCalModalOpen(false);
  
  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  const openShortcutsModal = () => setIsShortcutsModalOpen(true);
  const closeShortcutsModal = () => setIsShortcutsModalOpen(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        openSearchModal();
      }
      if (e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openShortcutsModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Stories', href: '#stories' },
    { name: 'Work', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <header 
        className={cn(
          'fixed top-0 left-0 right-0 z-[999] transition-all duration-300 backdrop-blur-md',
          isScrolled ? 'nav-blur py-3' : 'py-4 md:py-5'
        )}
      >
        <div className="container px-4 mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-xl md:text-2xl font-bold text-white hover:opacity-80 transition-opacity z-50">
            <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">KS</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-slate-300 hover:text-white animated-underline pb-1 transition-colors duration-300 text-sm tracking-wide font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Button 
              onClick={openCalModal}
              className="premium-button"
              variant="ghost"
            >
              <Calendar size={18} className="mr-1" />
              <span>Book a Call</span>
              <ArrowRight size={16} className="transition-transform duration-300 transform group-hover:translate-x-1" />
            </Button>
          </nav>

          {/* Command K Search Shortcut */}
          <div className="flex items-center gap-3">
            <button 
              onClick={openSearchModal}
              className="hidden md:flex items-center gap-2 text-slate-400 px-3 py-1.5 text-xs rounded-md hover:text-white transition-colors border border-slate-700 hover:border-violet-500/40 backdrop-blur-sm"
            >
              <Search size={14} />
              <span>Press</span>
              <kbd className="bg-slate-800 px-1.5 py-0.5 rounded-md text-violet-400">K</kbd>
            </button>

            {/* Keyboard Shortcuts Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={openShortcutsModal}
                    className="hidden md:flex items-center justify-center w-8 h-8 text-slate-400 hover:text-white transition-colors rounded-md border border-slate-700 hover:border-violet-500/40 backdrop-blur-sm"
                  >
                    <Keyboard size={14} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-xs">Keyboard shortcuts (Alt + K)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Mobile Book a Call Button */}
            <Button 
              onClick={openCalModal}
              className="md:hidden premium-button"
              variant="ghost"
              size="sm"
            >
              <Calendar size={16} className="mr-1" />
              <span>Book a Call</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Modals */}
      <CalModal isOpen={isCalModalOpen} onClose={closeCalModal} />
      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
      <KeyboardShortcutsModal isOpen={isShortcutsModalOpen} onClose={closeShortcutsModal} />
    </>
  );
};

export default Navbar;
