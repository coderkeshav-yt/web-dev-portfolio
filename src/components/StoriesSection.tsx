import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, PenTool, Lightbulb, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface Story {
  id: number;
  title: string;
  problem: string;
  solution: string;
  codeSnippet?: string;
  technologies: string[];
}

const stories: Story[] = [
  {
    id: 1,
    title: "🌐 Website Not Working on iPhone Safari",
    problem: "Users couldn't log in to their accounts when using Safari on iPhones - a frustrating experience affecting many mobile users.",
    solution: "Created a smart login system that automatically detects the browser and uses a more compatible login method for Safari users. Also added helpful error messages to guide users.",
    codeSnippet: `// Smart Login System
const loginUser = async () => {
  // Check if user is on Safari
  if (isSafariBrowser) {
    // Use popup login for Safari
    await loginWithPopup();
    showMessage("Login successful!");
  } else {
    // Use normal login for other browsers
    await loginNormally();
  }
};`,
    technologies: ['Mobile Web', 'Safari Browser', 'User Experience']
  },
  {
    id: 2,
    title: "⚡ Slow Loading Website",
    problem: "The website was taking too long to load, especially on mobile devices. Users were getting frustrated and leaving before the page finished loading.",
    solution: "Implemented smart caching and compressed images. Now the website loads in just 2 seconds instead of 8 seconds, making users much happier!",
    codeSnippet: `// Speed optimization example
// Before: Large images slowing down the site
const image = "original-huge-image.jpg";

// After: Smart image loading
const image = {
  mobile: "small-optimized.jpg",
  tablet: "medium-optimized.jpg",
  desktop: "large-optimized.jpg"
};

// Load the right size for user's device
const imageToShow = getOptimizedImage(userDevice);`,
    technologies: ['Performance', 'Image Optimization', 'Mobile First']
  },
  {
    id: 3,
    title: "📱 App Crashing on Older Phones",
    problem: "The mobile app was crashing for users with older phones, causing frustration and negative reviews in the app store.",
    solution: "Created a 'lite' version that automatically activates on older devices. Added smooth animations that work well on all phones, making everyone's experience better!",
    codeSnippet: `// Smooth animations for all devices
const smoothAnimation = {
  // Gentle fade in
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: 0.5
  },
  // Smooth slide up
  slideUp: {
    from: { y: 20 },
    to: { y: 0 },
    duration: 0.3
  }
};

// Use these animations based on device capability`,
    technologies: ['Mobile Apps', 'Animation', 'Device Compatibility']
  }
];

const StoriesSection = () => {
  const [expandedStory, setExpandedStory] = useState<number | null>(null);
  const [copiedStoryId, setCopiedStoryId] = useState<number | null>(null);

  const copyToClipboard = async (text: string, storyId: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStoryId(storyId);
      toast.success('Code copied!', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: 'rgba(30, 41, 59, 0.95)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          color: '#f1f5f9',
          backdropFilter: 'none',
        },
        className: 'rounded-lg shadow-lg shadow-violet-500/10',
        description: 'Code snippet has been copied to your clipboard',
        icon: <Check size={18} className="text-green-400" />,
      });
      setTimeout(() => setCopiedStoryId(null), 2000);
    } catch (err) {
      toast.error('Failed to copy', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: 'rgba(30, 41, 59, 0.95)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          color: '#f1f5f9',
          backdropFilter: 'none',
        },
        className: 'rounded-lg shadow-lg shadow-red-500/10',
        description: 'Something went wrong while copying the code',
      });
      console.error('Failed to copy text: ', err);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="stories" className="py-20 md:py-32 bg-slate-900/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 -right-48 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-20 -left-48 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10" />

      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="px-4 py-1 bg-blue-500/10 text-blue-400 text-sm font-medium inline-block mb-4 rounded-full">
            REAL SOLUTIONS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real Time <span className="title-gradient">Problems</span> with Real Time Solutions
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Real problems we've solved for our clients, explained in a way everyone can understand.
          </p>
        </motion.div>

        <div className="space-y-6">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="premium-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
                    {story.title}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-red-400 mb-2">
                        <PenTool size={18} />
                        <h4 className="font-medium">The Challenge</h4>
                      </div>
                      <p className="text-slate-400">{story.problem}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-green-400 mb-2">
                        <Lightbulb size={18} />
                        <h4 className="font-medium">Our Solution</h4>
                      </div>
                      <p className="text-slate-400">{story.solution}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4">
                      {story.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-violet-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {story.codeSnippet && (
                    <button
                      onClick={() => setExpandedStory(expandedStory === story.id ? null : story.id)}
                      className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors mt-4 text-sm group"
                    >
                      <Code size={16} className="transition-transform duration-300 group-hover:rotate-12" />
                      <span>{expandedStory === story.id ? 'Hide Technical Details' : 'View Technical Details'}</span>
                    </button>
                  )}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {story.codeSnippet && expandedStory === story.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: 1, 
                      height: 'auto',
                      transition: {
                        height: {
                          duration: 0.3,
                          ease: "easeOut"
                        }
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      height: 0,
                      transition: {
                        opacity: { duration: 0.2 },
                        height: { duration: 0.3 }
                      }
                    }}
                    className="mt-6 pt-6 border-t border-slate-700"
                  >
                    <div className="relative group">
                      <pre className="bg-slate-800/50 p-4 rounded-lg overflow-x-auto">
                        <code className="text-sm text-slate-300">{story.codeSnippet}</code>
                      </pre>
                      <motion.button
                        onClick={() => copyToClipboard(story.codeSnippet || '', story.id)}
                        className="absolute top-3 right-3 p-2.5 rounded-lg bg-slate-700/50 hover:bg-violet-500/20 transition-all duration-300
                          border border-slate-600/50 hover:border-violet-500/50 backdrop-blur-sm opacity-0 group-hover:opacity-100
                          flex items-center gap-2 text-slate-400 hover:text-violet-400"
                        initial={{ scale: 0.9 }}
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.95 }}
                        title="Copy code"
                      >
                        {copiedStoryId === story.id ? (
                          <>
                            <Check size={14} className="text-green-400" />
                            <span className="text-xs font-medium">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span className="text-xs font-medium">Copy</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;