import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

interface LinkItem {
  title: string;
  description: string;
  url: string;
  icon: JSX.Element;
}

const Links = () => {
  const socialLinks: LinkItem[] = [
    {
      title: "GitHub",
      description: "Check out my open source projects and contributions",
      url: "https://github.com/keshav-singh",
      icon: <Github className="w-5 h-5" />
    },
    {
      title: "LinkedIn",
      description: "Connect with me professionally",
      url: "https://linkedin.com/in/keshav-singh",
      icon: <Linkedin className="w-5 h-5" />
    },
    {
      title: "Twitter",
      description: "Follow me for tech updates and insights",
      url: "https://twitter.com/keshav_dev",
      icon: <Twitter className="w-5 h-5" />
    },
    {
      title: "Email",
      description: "Reach out to me directly",
      url: "mailto:hello@keshavsingh.dev",
      icon: <Mail className="w-5 h-5" />
    }
  ];

  const resourceLinks: LinkItem[] = [
    {
      title: "Portfolio",
      description: "My personal portfolio showcasing my work",
      url: "/",
      icon: <ExternalLink className="w-5 h-5" />
    },
    {
      title: "Blog",
      description: "Read my articles about web development and tech",
      url: "/#blog",
      icon: <ExternalLink className="w-5 h-5" />
    }
  ];

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

  return (
    <PageLayout
      title="Links"
      description="A collection of links to my social profiles and resources."
    >
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Useful <span className="text-gradient">Links</span></h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A collection of links to my social profiles and resources.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto space-y-8"
        >
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Social Links</h2>
            <div className="grid gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-violet-500/50 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center text-violet-400 group-hover:text-violet-300 transition-colors">
                    {link.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-white group-hover:text-violet-400 transition-colors">{link.title}</h3>
                    <p className="text-sm text-slate-400">{link.description}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Resources</h2>
            <div className="grid gap-4">
              {resourceLinks.map((link, index) => (
                <motion.a
                  key={link.title}
                  href={link.url}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-violet-500/50 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center text-violet-400 group-hover:text-violet-300 transition-colors">
                    {link.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-white group-hover:text-violet-400 transition-colors">{link.title}</h3>
                    <p className="text-sm text-slate-400">{link.description}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Links;