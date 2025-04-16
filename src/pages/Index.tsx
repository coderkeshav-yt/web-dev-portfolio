import { useEffect, useState } from 'react';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import StoriesSection from '@/components/StoriesSection';
import ProjectsSection from '@/components/ProjectsSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Add scroll explorer
  useEffect(() => {
    // Only add scroll explorer for non-mobile devices
    if (!isMobile) {
      const scrollExplorer = document.createElement('div');
      scrollExplorer.className = 'scroll-explorer';
      scrollExplorer.innerHTML = `
        <span>Scroll to explore</span>
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 12L8 4" stroke="#9b87f5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 8L8 12L4 8" stroke="#9b87f5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      
      // Add fade out on scroll
      const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 100) {
          scrollExplorer.style.opacity = Math.max(0, 1 - scrollY / 300).toString();
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      document.getElementById('hero-section')?.appendChild(scrollExplorer);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        document.getElementById('hero-section')?.removeChild(scrollExplorer);
      };
    }
  }, [isMobile]);

  // Smooth scroll behavior for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.hash.startsWith('#') && link.origin === window.location.origin) {
        e.preventDefault();
        const targetId = link.hash.slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const navbarHeight = isMobile ? 70 : 100; // Account for different navbar heights on mobile vs desktop
          window.scrollTo({
            top: targetElement.offsetTop - navbarHeight,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [isMobile]);
  
  // Handle page visibility for improved performance
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // When page is not visible, reduce any expensive animations or processes
        // This helps battery life on mobile devices
        document.body.classList.add('reduce-motion');
      } else {
        document.body.classList.remove('reduce-motion');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="min-h-screen w-full dark-gradient-bg">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F172A]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut"
              }}
              className="text-center"
            >
              <motion.div 
                className="text-3xl md:text-5xl font-bold"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">Keshav</span>
                <span className="text-white">Singh</span>
              </motion.div>
              <motion.div 
                className="mt-4 flex items-center justify-center gap-2"
                initial={{ width: 0 }}
                animate={{ width: 240 }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
              >
                <span className="h-0.5 bg-gradient-to-r from-violet-600 to-blue-500 rounded-full w-full"></span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Only render CustomCursor on desktop */}
      {!isMobile && <CustomCursor />}
      
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <StoriesSection />
        <ProjectsSection maxProjects={5} />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
