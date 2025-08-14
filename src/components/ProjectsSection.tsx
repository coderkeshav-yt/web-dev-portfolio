import React, { useState, useMemo, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github, Code } from 'lucide-react';
import useThrottledScroll from '@/hooks/use-throttled-scroll';

// Project interface for type safety
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl: string;
  repoUrl: string;
  featured: boolean;
}

interface ProjectsSectionProps {
  maxProjects?: number;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ maxProjects }) => {
  const [filter, setFilter] = useState<string>('all');
  const shouldReduceMotion = useReducedMotion();
  const { isScrollingFast } = useThrottledScroll();
  
  // Memoize projects data to prevent unnecessary re-renders
  const projects: Project[] = useMemo(() => [
    {
      id: 1,
      title: 'Wev Development Agency',
      description: 'A comprehensive portfolio tracking system with real-time analytics and interactive dashboards for investment management.',
      tags: ['React', 'TypeScript', 'Node.js'],
      image: 'https://res.cloudinary.com/dlvxjnycr/image/upload/v1744777332/CBBpA18oRtWbd1WAWhr9qg_nggyrd.webp',  // Updated to use projects folder
      demoUrl: 'https://launchory.vercel.app/',
      repoUrl: 'https://github.com/coderkeshav-yt/LAUNCHORY', 
      featured: true
    },


    {
      id: 2,
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform with React and Node.js integration for seamless online shopping experiences.',
      tags: ['React', 'Node.js', 'MongoDB'],
      image: ' https://res.cloudinary.com/dlvxjnycr/image/upload/v1744777332/EP1Wj8m9Txu29ZvKFDj0XA_tbxikl.webp',  // You can replace with your image name
      demoUrl: 'https://www.igp.com/',
      repoUrl: 'your-github-repo-url',  // Replace with your GitHub repo URL
      featured: true
    },
    {
      id: 3,
      title: 'Gym Website',
      description: 'A stunning portfolio website built with React, featuring responsive design and modern animations.',
      tags: ['React', 'Tailwind CSS'],
      image: 'https://res.cloudinary.com/dlvxjnycr/image/upload/v1744777333/A2DmSND4THCGkmkZXCCJ7Q_efwwzj.webp',
      demoUrl: 'https://gymweb-zeta.vercel.app/',
      repoUrl: 'https://github.com/coderkeshav-yt/gymweb',
      featured: true
    },
    {
      id: 4,
      title: 'Premium Coaching Portals',
      description: 'A modern blogging platform with dynamic content management and responsive design.',
      tags: ['React', 'Node.js', 'MongoDB'],
      image: 'https://res.cloudinary.com/dlvxjnycr/image/upload/v1744777333/XKMrihzvRfy3U-SIsfYckA_kifs88.webp',
      demoUrl: 'https://enrollify-nine.vercel.app/',
      repoUrl: 'https://github.com/coderkeshav-yt/Enrollify',
      featured: false
    }
  ], []);

  // Memoize unique tags to prevent recalculation
  const allTags = useMemo(() => 
    Array.from(new Set(projects.flatMap(project => project.tags))), 
    [projects]
  );
  
  // Memoize filtered projects for performance
  const filteredProjects = useMemo(() => {
    const filtered = filter === 'all' 
      ? projects 
      : filter === 'featured'
        ? projects.filter(project => project.featured)
        : projects.filter(project => project.tags.includes(filter));
    return filtered.slice(0, maxProjects);
  }, [filter, projects, maxProjects]);

  // Memoize filter click handlers to prevent re-renders
  const handleFilterChange = useCallback((newFilter: string) => {
    setFilter(newFilter);
  }, []);

  // Memoize animation variants for performance
  const animationVariants = useMemo(() => ({
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }
  }), [shouldReduceMotion]);

  return (
    <section id="projects" className="py-20 md:py-32 bg-slate-900/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 -right-48 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-20 -left-48 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] -z-10"></div>

      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium inline-block mb-4">SHOWCASE</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Curated <span className="title-gradient">Work</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Explore my recent projects showcasing my expertise in web development, design, and problem-solving.
          </p>
        </motion.div>
        
        {/* Project filters - Optimized with memoized handlers */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium fast-transitions gpu-accelerated ${
              filter === 'all' 
                ? 'bg-violet-600 text-white' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange('featured')}
            className={`px-4 py-2 rounded-full text-sm font-medium fast-transitions gpu-accelerated ${
              filter === 'featured' 
                ? 'bg-violet-600 text-white' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            Featured
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleFilterChange(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium fast-transitions gpu-accelerated ${
                filter === tag 
                  ? 'bg-violet-600 text-white' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        
        {/* Projects grid - Responsive grid with 3 columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/80 rounded-xl overflow-hidden border border-slate-800/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10"
            >
              <div className="relative overflow-hidden rounded-t-xl aspect-video">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>
                
                <img 
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70"></div>
                
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-violet-400/20">
                    Featured
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-md border border-white/10 hover:bg-white/20 transition-colors"
                        aria-label={`View ${project.title} demo`}
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a 
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-sm text-white text-xs font-medium rounded-md border border-white/10 hover:bg-white/10 transition-colors"
                        aria-label="View source code"
                      >
                        <Github size={14} />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    {project.title}
                  </h3>
                </div>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/50">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2.5 py-1 bg-slate-800/60 text-slate-300 text-[11px] font-medium tracking-wide rounded-full border border-slate-700/50 hover:border-violet-500/50 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <a 
                    href={project.demoUrl}
                    className="flex items-center gap-2 text-white bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-700 hover:to-blue-600 px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                  
                  <a 
                    href={project.repoUrl}
                    className="flex items-center gap-2 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
