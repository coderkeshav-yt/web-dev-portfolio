import { useState, FormEvent, useRef } from 'react';
import { Send, MapPin, Mail, Phone, CheckCircle, Loader, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission with animation timing
    setTimeout(() => {
      toast.success('Message sent successfully!', {
        description: "I'll get back to you as soon as possible.",
        duration: 5000,
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset success state after animation
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  const handleCopyEmail = async () => {
    const email = "keshavsingh@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success('Email copied!', {
        duration: 2000,
        style: {
          background: 'rgba(30, 41, 59, 0.95)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          color: '#f1f5f9',
          backdropFilter: 'blur(8px)',
        },
        className: 'rounded-lg shadow-lg shadow-violet-500/10',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy email');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const contactInfoVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const formVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative">
      {/* Background elements */}
      <div className="absolute -z-10 top-1/3 left-0 w-96 h-96 bg-keshav-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute -z-10 bottom-0 right-0 w-72 h-72 bg-keshav-blue/10 rounded-full blur-3xl"></div>
      
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="px-4 py-1 bg-keshav-pink/10 text-keshav-pink rounded-full text-sm font-medium inline-block mb-4">
            CONTACT ME
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In <span className="text-gradient">Touch</span></h2>
          <p className="text-keshav-gray max-w-2xl mx-auto">
            Interested in working together? Feel free to contact me for any project or collaboration.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
          {/* Contact Info */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            variants={contactInfoVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div 
              className="bg-gradient-to-br from-keshav-dark/90 via-keshav-dark/80 to-keshav-purple/10 p-6 rounded-2xl border border-keshav-purple/20 shadow-lg shadow-keshav-purple/5 backdrop-blur-sm"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="inline-block w-6 h-1 bg-gradient-to-r from-keshav-purple to-purple-400 mr-3"></span>
                Contact Information
              </h3>

              <div className="space-y-6">
                <motion.div 
                  className="flex items-start gap-4 group" 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-12 h-12 bg-keshav-purple/20 flex items-center justify-center rounded-lg text-keshav-purple shrink-0 group-hover:bg-keshav-purple/30 transition-colors">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Location</h4>
                    <p className="text-keshav-gray">New Delhi, India</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4 group" 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-12 h-12 bg-keshav-purple/20 flex items-center justify-center rounded-lg text-keshav-purple shrink-0 group-hover:bg-keshav-purple/30 transition-colors">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Email</h4>
                    <div className="flex items-center justify-between p-3 bg-keshav-dark/50 rounded-lg border border-keshav-purple/20 group hover:border-keshav-purple/40 transition-all duration-300">
                      <span className="text-keshav-gray">keshavsingh@gmail.com</span>
                      <motion.button
                        onClick={handleCopyEmail}
                        className="p-2 hover:bg-keshav-purple/20 rounded-md transition-colors relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.div
                              key="check"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              className="text-green-400"
                              transition={{ duration: 0.2 }}
                            >
                              <Check size={18} />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="copy"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              className="text-keshav-purple"
                              transition={{ duration: 0.2 }}
                            >
                              <Copy size={18} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4 group" 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-12 h-12 bg-keshav-purple/20 flex items-center justify-center rounded-lg text-keshav-purple shrink-0 group-hover:bg-keshav-purple/30 transition-colors">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Phone</h4>
                    <a 
                      href="tel:+911234567890" 
                      className="text-keshav-gray hover:text-keshav-purple transition-colors"
                    >
                      +91 1234 567 890
                    </a>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 pt-6 border-t border-keshav-purple/20">
                <h4 className="font-medium mb-4">Connect with me</h4>
                <div className="flex gap-4">
                  {['github', 'twitter', 'linkedin', 'instagram'].map((social, index) => (
                    <motion.a 
                      key={social} 
                      href={`https://${social}.com`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-keshav-dark hover:bg-keshav-purple flex items-center justify-center rounded-lg text-keshav-gray hover:text-white transition-colors"
                      aria-label={`Follow on ${social}`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                      whileHover={{ 
                        y: -5, 
                        boxShadow: '0 10px 25px -5px rgba(155, 135, 245, 0.4)'
                      }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        {social === 'github' && <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />}
                        {social === 'twitter' && <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.028 10.028 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.667 2.476c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.828 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />}
                        {social === 'linkedin' && <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />}
                        {social === 'instagram' && <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />}
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-3"
            variants={formVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className="bg-gradient-to-br from-keshav-dark/90 via-keshav-dark/80 to-keshav-purple/10 p-8 rounded-2xl border border-keshav-purple/20 shadow-lg shadow-keshav-purple/5 backdrop-blur-sm relative overflow-hidden"
              variants={containerVariants}
            >
              {/* Success animation overlay */}
              {isSuccess && (
                <motion.div 
                  className="absolute inset-0 bg-keshav-purple bg-opacity-95 flex flex-col items-center justify-center z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                  >
                    <CheckCircle size={80} className="text-white mb-4" />
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Thank You!
                  </motion.h3>
                  <motion.p 
                    className="text-white/90 text-center max-w-md"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Your message has been sent successfully. I'll get back to you as soon as possible.
                  </motion.p>
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-keshav-dark/50 border border-keshav-purple/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-keshav-purple/50 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-keshav-dark/50 border border-keshav-purple/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-keshav-purple/50 transition-all duration-300"
                    placeholder="email@example.com"
                  />
                </motion.div>
              </div>
              
              <motion.div className="mb-6" variants={itemVariants}>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-keshav-dark/50 border border-keshav-purple/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-keshav-purple/50 transition-all duration-300"
                  placeholder="Project Inquiry"
                />
              </motion.div>
              
              <motion.div className="mb-6" variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-keshav-dark/50 border border-keshav-purple/20 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-keshav-purple/50 transition-all duration-300"
                  placeholder="Your message here..."
                ></textarea>
              </motion.div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="bg-keshav-purple hover:bg-opacity-90 text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-all hover:translate-y-[-2px] disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto relative overflow-hidden group"
                variants={itemVariants}
                whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(155, 135, 245, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                    <span className="absolute w-full h-full top-0 left-0 bg-white/20 transform -skew-x-45 -translate-x-full transition-transform ease-out duration-500 group-hover:translate-x-full"></span>
                  </>
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
