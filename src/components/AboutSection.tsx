import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Mail, Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AboutSection: React.FC = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        toast({
          title: "Copied to clipboard",
          description: "Email address has been copied to your clipboard",
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({
          title: "Failed to copy",
          description: "Please try again",
          variant: "destructive",
        });
      });
  };

  const experienceItems = [
    {
      title: "Full Stack Developer",
      company: "Tech Innovations Inc.",
      date: "2020 - Present",
      description: "Leading the development of cutting-edge web applications using React, Node.js, and other modern technologies."
    },
    {
      title: "Software Engineer",
      company: "Global Solutions Ltd.",
      date: "2020 - 2023",
      description: "Developed and maintained scalable software solutions, focusing on backend development with Java and Spring Boot."
    },
  ];

  const educationItems = [
    {
      title: "Master of Science in Computer Science",
      institution: "NIT Kurukshetra",
      date: "2018 - 2020",
      description: "Specialized in Artificial Intelligence and Development."
    },
    {
      title: "Bachelor of Science in Software Engineering",
      institution: "University of NIT , Kurukshetra",
      date: "2014 - 2018",
      description: "Graduated with honors, focusing on software architecture and design."
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden bg-slate-900/50">
      {/* Background elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-violet-600/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-blue-600/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="px-4 py-1 bg-violet-500/10 text-violet-400 rounded-full text-sm font-medium inline-block mb-4"
          >
            ABOUT ME
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            My <span className="title-gradient">Story</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            A passionate full-stack developer with a love for creating innovative and user-friendly web applications.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-4">My Journey</h3>
            
            <div className="glass-card p-6 hover-card transition-all duration-300">
              <div className="flex items-center gap-3 mb-1">
                <Briefcase size={20} className="text-violet-400" />
                <h4 className="text-xl font-medium">Professional Experience</h4>
              </div>
              <p className="text-slate-400 mb-4">7+ years of experience in software development</p>
              
              <div className="space-y-4">
                {experienceItems.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <h5 className="font-medium">{item.title}</h5>
                    <p className="text-sm text-slate-300">{item.company} - {item.date}</p>
                    <p className="text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card p-6 hover-card transition-all duration-300">
              <div className="flex items-center gap-3 mb-1">
                <Calendar size={20} className="text-violet-400" />
                <h4 className="text-xl font-medium">Education & Certifications</h4>
              </div>
              <p className="text-slate-400 mb-4">My academic background and certifications</p>
              
              <div className="space-y-4">
                {educationItems.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <h5 className="font-medium">{item.title}</h5>
                    <p className="text-sm text-slate-300">{item.institution} - {item.date}</p>
                    <p className="text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card p-6 hover-card transition-all duration-300">
              <div className="flex items-center gap-3 mb-1">
                <Mail size={20} className="text-violet-400" />
                <h4 className="text-xl font-medium">Contact Information</h4>
              </div>
              <p className="text-slate-400 mb-4">Feel free to reach out to me directly</p>
              
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <span className="text-slate-300">hello.keshav.webdev@gmail.com
</span>
                <button 
                  onClick={() => copyToClipboard('hello.keshav.webdev@gmail.com')}
                  className="p-2 hover:bg-violet-500/20 rounded-md transition-colors"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="text-violet-400" />}
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-4">My Skills</h3>
            
            <div className="glass-card p-6 hover-card transition-all duration-300 bg-slate-950/80">
              <h4 className="text-xl font-medium mb-6">Technical Skills</h4>
              
              {/* Frontend Skills */}
              <div className="mb-8">
                <h5 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <span role="img" aria-label="frontend">🌐</span> Front-End Languages & Tools
                </h5>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {[
                    { name: 'HTML5', icon: '/icon-colored/html5.svg', iconClass: 'icon-html5' },
                    { name: 'CSS3', icon: '/icon-colored/css3.svg', iconClass: 'icon-css3' },
                    { name: 'JavaScript', icon: '/icon-colored/javascript.svg', iconClass: 'icon-javascript' },
                    { name: 'React', icon: '/icon-colored/react.svg', iconClass: 'icon-react' },
                    { name: 'TypeScript', icon: '/icon-colored/typescript.svg', iconClass: 'icon-typescript' },
                    { name: 'Tailwind CSS', icon: '/icon-colored/tailwindcss.svg', iconClass: 'icon-tailwind' },
                  ].map((skill, index) => (
                    <motion.div 
                      key={skill.name}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg bg-transparent hover:bg-black/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg">
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          className={`w-8 h-8 ${skill.iconClass}`}
                        />
                      </div>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Backend Skills */}
              <div className="mb-8">
                <h5 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <span role="img" aria-label="backend">🖥️</span> Back-End Languages & Frameworks
                </h5>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {[
                    { name: 'Node.js', icon: '/icon-colored/nodejs.svg', iconClass: 'icon-nodejs' },
                    { name: 'Express', icon: '/icon-colored/express.svg', iconClass: 'icon-express' },
                    { name: 'Python', icon: '/icon-colored/python.svg', iconClass: 'icon-python' },
                    { name: 'REST APIs', icon: '/icon-colored/postman.svg', iconClass: 'icon-postman' },
                    { name: 'GraphQL', icon: '/icon-colored/graphql.svg', iconClass: 'icon-graphql' },
                  ].map((skill, index) => (
                    <motion.div 
                      key={skill.name}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg bg-transparent hover:bg-black/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg">
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          className={`w-8 h-8 ${skill.iconClass}`}
                        />
                      </div>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Databases */}
              <div className="mb-8">
                <h5 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <span role="img" aria-label="database">🗄️</span> Databases
                </h5>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {[
                    { name: 'MongoDB', icon: '/icon-colored/mongodb.svg', iconClass: 'icon-mongodb' },
                    { name: 'MySQL', icon: '/icon-colored/mysql.svg', iconClass: 'icon-mysql' },
                  ].map((skill, index) => (
                    <motion.div 
                      key={skill.name}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg bg-transparent hover:bg-black/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg">
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          className={`w-8 h-8 ${skill.iconClass}`}
                        />
                      </div>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Dev Tools */}
              <div className="mb-8">
                <h5 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <span role="img" aria-label="tools">🛠️</span> Dev Tools & Technologies
                </h5>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {[
                    { name: 'Git', icon: '/icon-colored/git.svg', iconClass: 'icon-git' },
                    { name: 'GitHub', icon: '/icon-colored/github.svg', iconClass: 'icon-github' },
                    { name: 'Docker', icon: '/icon-colored/docker.svg', iconClass: 'icon-docker' },
                    { name: 'Postman', icon: '/icon-colored/postman.svg', iconClass: 'icon-postman' },
                  ].map((skill, index) => (
                    <motion.div 
                      key={skill.name}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg bg-transparent hover:bg-black/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg">
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          className={`w-8 h-8 ${skill.iconClass}`}
                        />
                      </div>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Authentication Tools */}
              <div>
                <h5 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <span role="img" aria-label="auth">🔐</span> Authentication Tools
                </h5>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {[
                    { name: 'NextAuth.js', icon: '/icon-colored/nextdotjs.svg', iconClass: 'icon-nextauth' },
                  ].map((skill, index) => (
                    <motion.div 
                      key={skill.name}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg bg-transparent hover:bg-black/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg">
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          className={`w-8 h-8 ${skill.iconClass}`}
                        />
                      </div>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
