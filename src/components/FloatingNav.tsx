import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X } from 'lucide-react';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface NavItem {
  id: string;
  label: string;
}

interface FloatingNavProps {
  items: NavItem[];
}

const FloatingNav = ({ items }: FloatingNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    // Auto-minimize after 5 seconds of inactivity
    const autoMinimizeTimer = setInterval(() => {
      if (isOpen && Date.now() - lastActivity > 5000) {
        setIsOpen(false);
      }
    }, 1000);

    return () => {
      observer.disconnect();
      clearInterval(autoMinimizeTimer);
    };
  }, [items, isOpen, lastActivity]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setLastActivity(Date.now());
    }
  };

  const handleMouseMove = () => {
    setLastActivity(Date.now());
  };

  return (
    <div 
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40"
      onMouseMove={handleMouseMove}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setIsOpen(!isOpen);
                setLastActivity(Date.now());
              }}
              className="mb-2 bg-slate-800/50 border-slate-700/50 hover:border-violet-500/50 text-slate-300"
            >
              {isOpen ? <X className="h-4 w-4" /> : <List className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{isOpen ? 'Hide navigation' : 'Show navigation'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-slate-800/95 border border-slate-700/50 rounded-lg shadow-lg p-2 space-y-1 backdrop-blur-sm"
          >
            {items.map((item) => (
              <TooltipProvider key={item.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                        activeSection === item.id
                          ? 'bg-violet-600/20 text-violet-400'
                          : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                      }`}
                    >
                      {item.label}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>Scroll to {item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingNav;