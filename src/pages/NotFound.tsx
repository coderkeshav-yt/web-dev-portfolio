import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const NotFound = () => {
  return (
    <PageLayout
      title="404 - Page Not Found"
      description="The page you're looking for doesn't exist."
      showBackButton={false}
    >
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-8xl font-bold mb-4">
            <span className="text-gradient">404</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-400 max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Head back home to continue exploring.
          </p>
          
          <Button 
            asChild
            size="lg"
            className="bg-violet-600 hover:bg-violet-700"
          >
            <a href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </a>
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
