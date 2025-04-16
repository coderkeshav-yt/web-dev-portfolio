import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CodeSnippet {
  name: string;
  color: string;
  icon: string;
  code: string[];
  language: string;
}

const codeSnippets: CodeSnippet[] = [
  {
    name: 'React',
    color: '#61DAFB',
    icon: '/icon-colored/react.svg',
    language: 'typescript',
    code: [
      "import { motion } from 'framer';",
      "import { useState } from 'react';",
      "",
      "const App = () => {",
      "  const [state, setState] = useState();",
      "  return <div>Hello World</div>;",
      "};"
    ]
  },
  {
    name: 'Next.js',
    color: '#000000',
    icon: '/icon-colored/nextdotjs.svg',
    language: 'typescript',
    code: [
      "// Next.js API Route",
      "import { NextApiRequest,",
      "  NextApiResponse } from 'next';",
      "",
      "export default async function",
      "handler(req, res) {",
      "  res.status(200).json({});",
      "}"
    ]
  },
  {
    name: 'Node.js',
    color: '#339933',
    icon: '/icon-colored/nodejs.svg',
    language: 'javascript',
    code: [
      "// Express server setup",
      "import express from 'express';",
      "const app = express();",
      "",
      "app.get('/', (req, res) => {",
      "  res.send('Hello');",
      "});"
    ]
  },
  {
    name: 'GraphQL',
    color: '#E535AB',
    icon: '/icon-colored/graphql.svg',
    language: 'graphql',
    code: [
      "type User {",
      "  id: ID!",
      "  name: String!",
      "  email: String!",
      "  posts: [Post!]",
      "  profile: Profile",
      "}"
    ]
  }
];

const processCodeForSyntax = (code: string) => {
  return code
    // Keywords
    .replace(/(import|from|const|let|function|return|export|default|type|interface|extends|implements|new|class|public|private|protected|static|async|await|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|null|undefined|true|false|this|super)/g, '<span class="code-keywords">$1</span>')
    // Types
    .replace(/(\w+)(?=:)/g, '<span class="code-types">$1</span>')
    // Strings
    .replace(/(['"`].*?['"`])/g, '<span class="code-strings">$1</span>')
    // Numbers
    .replace(/\b(\d+)\b/g, '<span class="code-numbers">$1</span>')
    // Comments
    .replace(/(\/\/.*)$/gm, '<span class="code-comments">$1</span>')
    // Function calls
    .replace(/(\w+)(?=\()/g, '<span class="code-functions">$1</span>')
    // JSX/TSX tags
    .replace(/(&lt;\/?[a-zA-Z][a-zA-Z0-9]*)/g, '<span class="code-tags">$1</span>')
    // Decorators
    .replace(/(@\w+)/g, '<span class="code-decorators">$1</span>');
};

const HeroSection = () => {
  const [currentTech, setCurrentTech] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedLines, setTypedLines] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let lineTimer: NodeJS.Timeout;
    
    if (isTyping) {
      const currentSnippet = codeSnippets[currentTech];
      const totalLines = currentSnippet.code.length;
      let currentLine = 0;

      const typeNextLine = () => {
        if (currentLine < totalLines) {
          setTypedLines(prev => [...prev, currentLine]);
          currentLine++;
          lineTimer = setTimeout(typeNextLine, Math.random() * 200 + 100); // Random delay between 100-300ms
        } else {
          setIsTyping(false);
        }
      };

      typeNextLine();
    }

    return () => clearTimeout(lineTimer);
  }, [isTyping, currentTech]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTech((prev) => {
        setIsTyping(true);
        setTypedLines([]);
        return (prev + 1) % codeSnippets.length;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero-section" className="min-h-screen pt-20 md:pt-0 flex items-center relative overflow-hidden">
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
              Full Stack Developer specializing in building exceptional digital experiences. Let's turn your vision into reality.
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
                  whileHover={{ scale: 1.05 }}
                >
                  <img src={tech.icon} alt={tech.name} className="w-4 h-4" />
                  <span className="text-sm text-slate-300">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Button 
                size="lg"
                className="premium-button min-w-[200px] sm:min-w-[180px]"
              >
                <Calendar size={18} className="mr-2" />
                Book a Call
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="min-w-[200px] sm:min-w-[180px] border-violet-500/20 hover:border-violet-500/40 text-slate-300"
              >
                <Mail size={18} className="mr-2" />
                Contact Me
              </Button>
            </motion.div>
          </div>

          {/* Right content - Code Window */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:block relative w-full max-w-[600px] mx-auto lg:mx-0"
          >
            <div className="code-window">
              <div className="window-reflection" />
              {/* Window Header */}
              <div className="px-4 py-3 border-b border-slate-700/50 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/70"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/70"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/70"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs sm:text-sm text-slate-400">developer.{codeSnippets[currentTech].language}</span>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-3 sm:p-4 md:p-6 font-mono text-xs sm:text-sm relative backdrop-blur-sm overflow-x-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTech}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <pre className="language-typescript whitespace-pre-wrap break-words">
                      <code className="block min-w-[200px]">
                        {codeSnippets[currentTech].code.map((line, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ 
                              opacity: typedLines.includes(index) ? 1 : 0,
                              x: typedLines.includes(index) ? 0 : -10
                            }}
                            transition={{ duration: 0.2 }}
                            className={`typing-line ${typedLines.includes(index) ? 'visible' : ''} ${
                              line.trim() === '' ? 'h-4' : ''
                            }`}
                            dangerouslySetInnerHTML={{ 
                              __html: line ? processCodeForSyntax(line) : '&nbsp;'
                            }}
                          />
                        ))}
                        {!isTyping && typedLines.length > 0 && (
                          <span className="typing-cursor" />
                        )}
                      </code>
                    </pre>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Background Effects */}
            <div className="absolute -top-20 -right-20 w-48 h-48 sm:w-72 sm:h-72 bg-violet-500/10 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-20 -left-20 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/10 rounded-full blur-[100px]"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
