import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, ChevronRight, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface PageMetadata {
  title: string;
  description: string;
  icon?: JSX.Element;
}

const pageMetadata: Record<string, PageMetadata> = {
  'guest-book': {
    title: 'Guest Book',
    description: 'Leave your mark and share your thoughts',
    icon: <span className="text-pink-400">📝</span>
  },
  'bucket-list': {
    title: 'Bucket List',
    description: 'Goals and aspirations to achieve',
    icon: <span className="text-yellow-400">✨</span>
  },
  'links': {
    title: 'Links',
    description: 'Collection of useful resources',
    icon: <span className="text-blue-400">🔗</span>
  }
};

const NavigationBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Generate title from pathname
  const generateTitle = (path: string) => {
    return pageMetadata[path]?.title || path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-1 text-slate-400 hover:text-violet-400">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const metadata = pageMetadata[name];

          return (
            <BreadcrumbItem key={routeTo} className="flex items-center">
              <BreadcrumbSeparator>
                <ChevronRight className="w-4 h-4" />
              </BreadcrumbSeparator>
              
              <div className="flex items-center gap-1.5">
                {metadata?.icon && (
                  <span className="text-lg">{metadata.icon}</span>
                )}
                
                {isLast ? (
                  <div className="flex items-center gap-2">
                    <BreadcrumbPage className="text-violet-400">
                      {generateTitle(name)}
                    </BreadcrumbPage>
                    
                    {metadata?.description && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-slate-500 hover:text-slate-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p className="text-xs">{metadata.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                ) : (
                  <BreadcrumbLink 
                    href={routeTo} 
                    className="text-slate-400 hover:text-violet-400"
                  >
                    {generateTitle(name)}
                  </BreadcrumbLink>
                )}
              </div>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </motion.div>
  );
};

export default NavigationBreadcrumb;