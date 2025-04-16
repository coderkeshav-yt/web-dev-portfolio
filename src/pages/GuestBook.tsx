import { motion } from 'framer-motion';
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Send, Heart, ThumbsUp, Star, Search } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

interface GuestBookEntry {
  id: number;
  name: string;
  message: string;
  date: string;
  reactions: {
    hearts: number;
    likes: number;
    stars: number;
  };
}

const GuestBook = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<GuestBookEntry[]>([
    {
      id: 1,
      name: "John Doe",
      message: "Amazing portfolio! Love the design and animations. The projects showcase great attention to detail.",
      date: "2025-04-15",
      reactions: { hearts: 3, likes: 5, stars: 2 }
    },
    {
      id: 2,
      name: "Jane Smith",
      message: "Great work on the projects. The UI is very clean and modern. Would love to collaborate sometime!",
      date: "2025-04-14",
      reactions: { hearts: 2, likes: 4, stars: 3 }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleReaction = (id: number, type: 'hearts' | 'likes' | 'stars') => {
    setEntries(prev => prev.map(entry => 
      entry.id === id 
        ? { 
            ...entry, 
            reactions: { 
              ...entry.reactions, 
              [type]: entry.reactions[type] + 1 
            }
          }
        : entry
    ));
  };

  const filteredEntries = entries.filter(entry => 
    entry.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const newEntry: GuestBookEntry = {
        id: entries.length + 1,
        name: data.name,
        message: data.message,
        date: new Date().toISOString().split('T')[0],
        reactions: { hearts: 0, likes: 0, stars: 0 }
      };
      
      setEntries(prev => [newEntry, ...prev]);
      form.reset();
      
      toast({
        title: "Success!",
        description: "Your message has been added to the guest book.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your message. Please try again.",
        variant: "destructive",
      });
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <PageLayout
      title="Guest Book"
      description="Sign my guest book and share your thoughts about my portfolio and work."
    >
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Guest <span className="text-gradient">Book</span></h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Leave your mark! Sign my guest book and share your thoughts.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Leave a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          className="bg-slate-900/50 border-slate-700 text-white"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="your.email@example.com" 
                          className="bg-slate-900/50 border-slate-700 text-white"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Share your thoughts..." 
                          className="bg-slate-900/50 border-slate-700 text-white min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-violet-600 hover:bg-violet-700"
                  disabled={form.formState.isSubmitting}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {form.formState.isSubmitting ? "Sending..." : "Sign Guestbook"}
                </Button>
              </form>
            </Form>
          </motion.div>

          {/* Entries Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">Recent Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-slate-800/30 border-slate-700/30 text-white w-48"
                />
              </div>
            </div>

            {filteredEntries.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="text-center py-8 text-slate-400"
              >
                No messages found matching your search.
              </motion.div>
            ) : (
              filteredEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  variants={itemVariants}
                  className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/30"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-violet-400">{entry.name}</h3>
                    <span className="text-xs text-slate-500">{entry.date}</span>
                  </div>
                  <p className="text-slate-300 text-sm mb-3">{entry.message}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleReaction(entry.id, 'hearts')}
                      className="flex items-center gap-1 text-pink-400 hover:text-pink-300 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-xs">{entry.reactions.hearts}</span>
                    </button>
                    <button
                      onClick={() => handleReaction(entry.id, 'likes')}
                      className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-xs">{entry.reactions.likes}</span>
                    </button>
                    <button
                      onClick={() => handleReaction(entry.id, 'stars')}
                      className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      <Star className="w-4 h-4" />
                      <span className="text-xs">{entry.reactions.stars}</span>
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GuestBook;