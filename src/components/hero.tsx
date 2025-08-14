'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SplineScene } from "./ui/spline";
import { Spotlight } from "./ui/spotlight";

const codeSnippets = [
  {
    name: 'React',
    color: '#61DAFB',
    icon: '/icon-colored/react.svg',
  },
  {
    name: 'Next.js',
    color: '#000000',
    icon: '/icon-colored/nextdotjs.svg',
  },
  {
    name: 'Node.js',
    color: '#339933',
    icon: '/icon-colored/nodejs.svg',
  },
  {
    name: 'GraphQL',
    color: '#E535AB',
    icon: '/icon-colored/graphql.svg',
  }
];

export function Hero() {
  const [currentTech, setCurrentTech] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % codeSnippets.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero-section" className="min-h-screen pt-20 md:pt-0 flex items-center relative overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={120} />
      
      <motion.div
        className="container px-4 mx-auto"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1 rounded-full border border-violet-600/30 text-violet-400 text-xs sm:text-sm mb-4 backdrop-blur-sm"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-violet-600 mr-2 animate-pulse"></span>
              Available for freelance projects
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
            >
              Building <span className="text-gradient">Digital</span> Experiences That Matter
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 text-lg sm:text-xl max-w-lg mx-auto lg:mx-0"
            >
              Full Stack Developer specializing in building exceptional digital experiences. Let&apos;s turn your vision into reality.
            </motion.p>
            
            {/* Tech stack showcase */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              {codeSnippets.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className={cn(
                    "px-3 py-1.5 rounded-full flex items-center gap-2 transition-all duration-300",
                    currentTech === index 
                      ? 'bg-slate-800/80 scale-110 shadow-lg border border-violet-500/50' 
                      : 'bg-slate-800/40 border border-slate-700'
                  )}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: tech.color }}
                  ></span>
                  <span className="text-sm font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button className="gap-2 group" size="lg">
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Book a Call
              </Button>
              <Button variant="outline" className="gap-2 group" size="lg">
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Contact Me
              </Button>
            </motion.div>
          </div>
          
          {/* Right content - 3D Model */}
          <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] overflow-visible">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
