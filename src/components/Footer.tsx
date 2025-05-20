import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="py-12 border-t border-keshav-purple/10 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-keshav-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-keshav-blue/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container px-4 mx-auto z-10 relative">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-4 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={footerVariants}
        >
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <a href="#home" className="block text-2xl font-bold text-white mb-4 relative">
              <span className="text-gradient">Keshav</span>Singh
              <span className="absolute -top-1 -right-3 w-2 h-2 rounded-full bg-keshav-purple animate-pulse"></span>
            </a>
            <p className="text-keshav-gray max-w-xs">
              Help you create experiences where aesthetics & functionality seamlessly come together.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://linkedin.com/in/keshav-singh" target="_blank" rel="noopener noreferrer" className="text-keshav-gray hover:text-keshav-purple transition-colors duration-300" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/coderkeshav-yt" target="_blank" rel="noopener noreferrer" className="text-keshav-gray hover:text-keshav-purple transition-colors duration-300" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://twitter.com/keshav_dev" target="_blank" rel="noopener noreferrer" className="text-keshav-gray hover:text-keshav-purple transition-colors duration-300" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="mailto:hello@keshavsingh.dev" className="text-keshav-gray hover:text-keshav-purple transition-colors duration-300" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-white font-semibold mb-4">General</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-keshav-gray hover:text-keshav-purple transition-colors duration-300">Home</a>
              </li>
              <li>
                <a href="#projects" className="text-keshav-gray hover:text-keshav-purple transition-colors duration-300">Projects</a>
              </li>
              <li>
                <a href="#blog" className="text-keshav-gray hover:text-keshav-purple transition-colors duration-300">Blog</a>
              </li>
              <li>
                <a href="#about" className="text-keshav-gray hover:text-keshav-purple transition-colors duration-300">About</a>
              </li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-white font-semibold mb-4">The Website</h3>
            <ul className="space-y-2">
              <li>
                <a href="/guest-book" className="text-keshav-gray hover:text-keshav-purple transition-colors duration-300">Guest Book</a>
              </li>
              <li>
                <a href="/bucket-list" className="text-keshav-gray hover:text-keshav-purple transition-colors duration-300">Bucket List</a>
              </li>
              <li>
                <a href="/links" className="text-keshav-gray hover:text-keshav-purple transition-colors duration-300">Links</a>
              </li>
              <li>
                <a href="#contact" className="text-keshav-gray hover:text-keshav-purple transition-colors duration-300">Book a call</a>
              </li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p className="text-keshav-gray mb-4">
              Feel free to reach out to me for any inquiries or collaboration opportunities.
            </p>
            <a 
              href="mailto:hello.keshav.webdev@gmail.com" 
              className="text-keshav-purple hover:underline transition-colors duration-300 flex items-center gap-2"
            >
              <Mail size={18} />
              <span>hello.keshav.webdev@gmail.com</span>
            </a>
          </motion.div>
        </motion.div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-keshav-purple/10">
          <motion.p 
            className="text-keshav-gray text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            © {new Date().getFullYear()} Keshav Singh. All rights reserved.
          </motion.p>
          
          <motion.button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 bg-keshav-dark hover:bg-keshav-purple/10 w-10 h-10 rounded-full flex items-center justify-center text-keshav-light hover:text-keshav-purple transition-all duration-300 border border-keshav-purple/30 hover:border-keshav-purple"
            aria-label="Back to top"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -3 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
