import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Heart } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import FloatingNav from '@/components/FloatingNav';

interface BucketListItem {
  id: number;
  title: string;
  description: string;
  category: 'career' | 'personal' | 'travel';
  completed: boolean;
  likes: number;
}

const BucketList = () => {
  const [items, setItems] = useState<BucketListItem[]>([
    {
      id: 1,
      title: "Build a SaaS Product",
      description: "Create and launch a successful software as a service product",
      category: "career",
      completed: false,
      likes: 12
    },
    {
      id: 2,
      title: "Visit Japan",
      description: "Experience the culture and technology of Japan",
      category: "travel",
      completed: true,
      likes: 24
    },
    {
      id: 3,
      title: "Learn AI/ML",
      description: "Master artificial intelligence and machine learning",
      category: "career",
      completed: false,
      likes: 18
    },
    {
      id: 4,
      title: "Run a Marathon",
      description: "Train for and complete a full marathon",
      category: "personal",
      completed: false,
      likes: 15
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleComplete = (id: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const incrementLikes = (id: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    ));
  };

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const navItems = [
    { id: 'career', label: 'Career Goals' },
    { id: 'personal', label: 'Personal Growth' },
    { id: 'travel', label: 'Travel Adventures' },
    { id: 'skills', label: 'Skills to Learn' },
    { id: 'projects', label: 'Dream Projects' }
  ];

  return (
    <PageLayout
      title="Bucket List"
      description="A collection of my aspirations, goals, and dreams - both personal and professional."
    >
      <FloatingNav items={navItems} />

      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bucket <span className="text-gradient">List</span></h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A collection of goals, dreams, and aspirations I'm working towards. Some might seem ambitious,
            but that's what makes the journey exciting!
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {['all', 'career', 'personal', 'travel'].map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`capitalize ${
                selectedCategory === category 
                  ? 'bg-violet-600 hover:bg-violet-700' 
                  : 'hover:bg-slate-800'
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <div className="space-y-16">
          {/* Career Goals Section */}
          <section id="career" className="scroll-mt-32">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">💼</span>
              Career Goals
            </h2>
            <div className="space-y-4">
              {filteredItems.filter(item => item.category === 'career').map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className={`p-6 rounded-lg border transition-all duration-300 ${
                    item.completed 
                      ? 'bg-slate-800/30 border-violet-500/30' 
                      : 'bg-slate-800/50 border-slate-700/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <button
                          onClick={() => toggleComplete(item.id)}
                          className={`transition-colors ${
                            item.completed ? 'text-violet-400' : 'text-slate-500'
                          }`}
                        >
                          {item.completed ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : (
                            <Circle className="w-6 h-6" />
                          )}
                        </button>
                        <h3 className={`text-xl font-semibold ${
                          item.completed ? 'text-violet-400 line-through' : 'text-white'
                        }`}>
                          {item.title}
                        </h3>
                        <span className="px-2 py-1 text-xs rounded-full bg-slate-700/50 text-slate-300 capitalize">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-slate-400 ml-9">{item.description}</p>
                    </div>
                    <button
                      onClick={() => incrementLikes(item.id)}
                      className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-700/30 hover:bg-slate-700/50 transition-colors group"
                    >
                      <Heart className="w-4 h-4 text-pink-400 group-hover:text-pink-300" />
                      <span className="text-sm text-slate-300 group-hover:text-white">
                        {item.likes}
                      </span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Personal Growth Section */}
          <section id="personal" className="scroll-mt-32">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">🌱</span>
              Personal Growth
            </h2>
            <div className="space-y-4">
              {filteredItems.filter(item => item.category === 'personal').map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className={`p-6 rounded-lg border transition-all duration-300 ${
                    item.completed 
                      ? 'bg-slate-800/30 border-violet-500/30' 
                      : 'bg-slate-800/50 border-slate-700/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <button
                          onClick={() => toggleComplete(item.id)}
                          className={`transition-colors ${
                            item.completed ? 'text-violet-400' : 'text-slate-500'
                          }`}
                        >
                          {item.completed ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : (
                            <Circle className="w-6 h-6" />
                          )}
                        </button>
                        <h3 className={`text-xl font-semibold ${
                          item.completed ? 'text-violet-400 line-through' : 'text-white'
                        }`}>
                          {item.title}
                        </h3>
                        <span className="px-2 py-1 text-xs rounded-full bg-slate-700/50 text-slate-300 capitalize">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-slate-400 ml-9">{item.description}</p>
                    </div>
                    <button
                      onClick={() => incrementLikes(item.id)}
                      className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-700/30 hover:bg-slate-700/50 transition-colors group"
                    >
                      <Heart className="w-4 h-4 text-pink-400 group-hover:text-pink-300" />
                      <span className="text-sm text-slate-300 group-hover:text-white">
                        {item.likes}
                      </span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Travel Adventures Section */}
          <section id="travel" className="scroll-mt-32">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">✈️</span>
              Travel Adventures
            </h2>
            <div className="space-y-4">
              {filteredItems.filter(item => item.category === 'travel').map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className={`p-6 rounded-lg border transition-all duration-300 ${
                    item.completed 
                      ? 'bg-slate-800/30 border-violet-500/30' 
                      : 'bg-slate-800/50 border-slate-700/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <button
                          onClick={() => toggleComplete(item.id)}
                          className={`transition-colors ${
                            item.completed ? 'text-violet-400' : 'text-slate-500'
                          }`}
                        >
                          {item.completed ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : (
                            <Circle className="w-6 h-6" />
                          )}
                        </button>
                        <h3 className={`text-xl font-semibold ${
                          item.completed ? 'text-violet-400 line-through' : 'text-white'
                        }`}>
                          {item.title}
                        </h3>
                        <span className="px-2 py-1 text-xs rounded-full bg-slate-700/50 text-slate-300 capitalize">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-slate-400 ml-9">{item.description}</p>
                    </div>
                    <button
                      onClick={() => incrementLikes(item.id)}
                      className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-700/30 hover:bg-slate-700/50 transition-colors group"
                    >
                      <Heart className="w-4 h-4 text-pink-400 group-hover:text-pink-300" />
                      <span className="text-sm text-slate-300 group-hover:text-white">
                        {item.likes}
                      </span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Skills to Learn Section */}
          <section id="skills" className="scroll-mt-32">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              Skills to Learn
            </h2>
            <div className="space-y-4">
              {/* Add your skills goals content here */}
              <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/30">
                {/* Content */}
              </div>
            </div>
          </section>

          {/* Dream Projects Section */}
          <section id="projects" className="scroll-mt-32">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">🚀</span>
              Dream Projects
            </h2>
            <div className="space-y-4">
              {/* Add your dream projects content here */}
              <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/30">
                {/* Content */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default BucketList;