import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, User, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  image: string;
}

const BlogSection: React.FC = () => {
  const [hoveredArticle, setHoveredArticle] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of Modern Web Development",
      excerpt: "Exploring how modern technologies are shaping the landscape of web applications.",
      content: `
        <h2>Modern Web Development</h2>
        <p>The landscape of web development is constantly evolving. From modern frameworks to innovative design patterns, staying current with the latest technologies and best practices is crucial for creating effective web applications.</p>
        
        <h2>User Experience Matters</h2>
        <p>In today's digital landscape, user engagement is crucial. Interactive and responsive design elements provide an engaging experience that can significantly enhance user engagement and retention. From smooth animations to intuitive interfaces, every detail matters in creating memorable web experiences.</p>
        
        <h2>Performance Considerations</h2>
        <p>While modern web applications can offer rich interactive experiences, it's important to optimize performance. Techniques like code splitting, lazy loading, and proper asset optimization help ensure fast load times and smooth user experiences.</p>
        
        <h2>Real-world Applications</h2>
        <p>From e-commerce platforms to interactive dashboards, modern web technologies enable developers to create powerful and effective web experiences. Companies are increasingly leveraging these capabilities to build better digital products.</p>
        
        <h2>Conclusion</h2>
        <p>The future of web development continues to evolve with new technologies and approaches. By focusing on performance, user experience, and modern best practices, we can create web applications that truly serve their users' needs.</p>
      `,
      date: "April 10, 2023",
      readTime: "5 min read",
      author: "Keshav Singh",
      category: "Development",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 2,
      title: "Creating Immersive User Experiences with Animation",
      excerpt: "How subtle animations can dramatically improve user engagement and conversion rates.",
      content: `
        <h2>The Psychology Behind Animation</h2>
        <p>Animation is more than just eye candy; it plays a crucial role in guiding users through their journey. Thoughtfully implemented animations can reduce cognitive load, provide feedback, and create emotional connections.</p>
        
        <h2>Types of UI Animations</h2>
        <p>From micro-interactions to page transitions, animations come in various forms. Each type serves specific purposes in the user experience, such as providing feedback, guiding attention, or establishing spatial relationships.</p>
        
        <h2>Implementation Strategies</h2>
        <p>Modern web technologies like CSS animations, GSAP, and Framer Motion provide powerful tools for implementing animations. The key is to use them judiciously to enhance rather than distract from the core user experience.</p>
        
        <h2>Performance Optimization</h2>
        <p>Animation performance is critical for a smooth user experience. Techniques like GPU acceleration, requestAnimationFrame, and animation throttling can help ensure animations run smoothly across all devices.</p>
        
        <h2>Accessibility Considerations</h2>
        <p>Not all users appreciate animations, and some may even experience discomfort. It's important to respect user preferences by providing options to reduce or disable animations when necessary.</p>
        
        <h2>Measuring Impact</h2>
        <p>The effectiveness of animations can be measured through metrics like engagement time, conversion rates, and user feedback. A/B testing can provide valuable insights into which animations actually improve the user experience.</p>
        
        <h2>Conclusion</h2>
        <p>When used thoughtfully, animations can transform a static interface into an engaging and intuitive experience. By understanding the principles of effective animation design and implementing them with care, developers can create web experiences that not only look great but also work better.</p>
      `,
      date: "March 22, 2023",
      readTime: "7 min read",
      author: "Keshav Singh",
      category: "Design",
      image: "https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 3,
      title: "The Complete Guide to Full Stack Development in 2023",
      excerpt: "Essential skills, tools, and frameworks every modern developer should know.",
      content: `
        <h2>The Evolving Landscape of Full Stack Development</h2>
        <p>The role of a full stack developer continues to evolve as technology advances. Today's full stack developers need to be familiar with a wide range of technologies, from frontend frameworks to backend services and DevOps practices.</p>
        
        <h2>Frontend Technologies</h2>
        <p>React, Vue, and Angular remain the dominant frontend frameworks, with React maintaining its lead in terms of adoption. TypeScript has become an essential tool for building large-scale applications, providing type safety that helps prevent common errors.</p>
        
        <h2>Backend Technologies</h2>
        <p>Node.js continues to be popular for backend development, allowing developers to use JavaScript across the entire stack. However, languages like Go and Rust are gaining traction for performance-critical applications.</p>
        
        <h2>Database Solutions</h2>
        <p>While SQL databases like PostgreSQL remain essential, NoSQL options like MongoDB and serverless database services are becoming increasingly important, especially for applications with flexible schema requirements.</p>
        
        <h2>DevOps and Deployment</h2>
        <p>Understanding containerization with Docker and orchestration with Kubernetes is becoming a standard requirement. CI/CD pipelines are essential for modern development workflows, enabling faster and more reliable deployments.</p>
        
        <h2>API Design and Integration</h2>
        <p>REST APIs remain common, but GraphQL continues to gain popularity for its flexibility and performance benefits. Understanding how to design and consume APIs is a critical skill for any full stack developer.</p>
        
        <h2>Soft Skills for Developers</h2>
        <p>Technical skills alone aren't enough. Communication, problem-solving, and collaboration are increasingly important as development becomes more team-oriented and agile methodologies become standard.</p>
        
        <h2>Conclusion</h2>
        <p>Being a successful full stack developer in 2023 requires a combination of technical breadth, depth in specific areas, and the ability to learn continuously. By focusing on both fundamental concepts and emerging technologies, developers can build the skills needed to thrive in this dynamic field.</p>
      `,
      date: "February 15, 2023",
      readTime: "10 min read",
      author: "Keshav Singh",
      category: "Career",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  const openBlogPost = (post: BlogPost) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };

  const closeBlogPost = () => {
    setSelectedPost(null);
    document.body.style.overflow = '';
  };

  return (
    <>
      <section id="blog" className="py-20 md:py-32 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-blue-600/5 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-violet-600/5 rounded-full blur-[100px] -z-10"></div>
        
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
            <div>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="px-4 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium inline-block mb-4"
              >
                LATEST ARTICLES
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                My <span className="title-gradient">Blog</span> Posts
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-slate-400 max-w-lg"
              >
                Insights, tips, and thoughts on web development, design, and the tech industry. Stay updated with the latest trends.
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-6 md:mt-0"
            >
              <button 
                onClick={() => alert("View all articles functionality will be implemented soon")}
                className="group inline-flex items-center gap-2 text-violet-400 hover:text-violet-500 font-medium"
              >
                View all articles 
                <ArrowRight size={18} className="transform transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="premium-card group hover-card h-full flex flex-col"
                onMouseEnter={() => setHoveredArticle(post.id)}
                onMouseLeave={() => setHoveredArticle(null)}
              >
                <div className="h-48 sm:h-56 relative overflow-hidden rounded-t-xl">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-violet-400 border border-violet-500/20">
                    {post.category}
                  </div>
                </div>
                
                <div className="px-5 sm:px-6 py-6 flex-grow flex flex-col">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold mb-2 transition-colors line-clamp-2 group-hover:text-violet-400">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm flex-grow mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-700/50">
                    <span className="flex items-center gap-2 text-xs text-slate-300">
                      <User size={14} />
                      {post.author}
                    </span>
                    
                    <button 
                      onClick={() => openBlogPost(post)}
                      className="flex items-center text-violet-400 text-sm font-medium group-hover:text-violet-300 transition-colors"
                    >
                      Read more
                      <ChevronRight size={16} className={`ml-1 transition-transform duration-300 ${hoveredArticle === post.id ? 'translate-x-1' : ''}`} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[60] overflow-y-auto py-10 px-4">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900 border border-slate-800 rounded-xl max-w-4xl mx-auto my-4 overflow-hidden"
            >
              <div className="relative h-64 sm:h-80">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={closeBlogPost}
                  className="absolute top-4 right-4 bg-slate-900/70 backdrop-blur-sm text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-6">
                  <div className="bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs inline-block font-medium text-violet-400 border border-violet-500/20 mb-2">
                    {selectedPost.category}
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{selectedPost.title}</h2>
                </div>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-6 border-b border-slate-800 pb-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-violet-400" />
                    <span className="text-sm text-slate-300">{selectedPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-violet-400" />
                    <span className="text-sm text-slate-300">{selectedPost.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-violet-400" />
                    <span className="text-sm text-slate-300">{selectedPost.author}</span>
                  </div>
                </div>
                
                <div 
                  className="prose prose-invert prose-violet prose-headings:font-bold prose-h2:text-xl prose-h2:mb-2 prose-p:text-slate-300 prose-p:mb-6 prose-a:text-violet-400 prose-a:no-underline hover:prose-a:text-violet-300 max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
                
                <div className="mt-8 pt-6 border-t border-slate-800">
                  <button 
                    onClick={closeBlogPost}
                    className="bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-700 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    Close Article
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BlogSection;
