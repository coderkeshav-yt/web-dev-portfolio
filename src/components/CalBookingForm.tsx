import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Cal.com API Configuration
const CAL_API_KEY = import.meta.env.VITE_CAL_API_KEY;
const EVENT_TYPE_ID = import.meta.env.VITE_CAL_EVENT_TYPE_ID;
const CAL_USERNAME = import.meta.env.VITE_CAL_USERNAME;

// Validate Cal.com configuration
const isCalConfigValid = () => {
  if (!CAL_API_KEY || !EVENT_TYPE_ID || !CAL_USERNAME) {
    console.error('Missing Cal.com configuration:', {
      hasApiKey: !!CAL_API_KEY,
      hasEventTypeId: !!EVENT_TYPE_ID,
      hasUsername: !!CAL_USERNAME
    });
    return false;
  }
  return true;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  purpose: z.string().min(5, {
    message: "Please provide a brief description of the meeting purpose.",
  }),
  notes: z.string().optional(),
});

interface CalBookingFormProps {
  selectedDate: Date;
  selectedTime: string;
  onBack: () => void;
  onClose: () => void;
}

export function CalBookingForm({ selectedDate, selectedTime, onBack, onClose }: CalBookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      purpose: "",
      notes: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      console.log("Form submitted with data:", data);

      // For testing/development - always use fallback
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSuccess(true);
      toast({
        title: "Booking Request Received!",
        description: "Your meeting request has been received. We'll contact you shortly to confirm.",
      });

      setTimeout(() => {
        form.reset();
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error scheduling your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <h2 className="text-2xl font-bold text-white mb-1">Complete Booking</h2>
      <p className="text-slate-400 text-sm mb-6">
        You're scheduling a 30-min meeting for {selectedDate.toLocaleDateString()} at {selectedTime}
      </p>

      {isSuccess ? (
        <motion.div 
          className="flex flex-col items-center justify-center py-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Meeting Scheduled</h3>
          <p className="text-slate-400 text-center max-w-sm">
            Your meeting request has been received! We'll contact you shortly to confirm the details.
          </p>
        </motion.div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Your name <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      {...field} 
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" 
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
                  <FormLabel className="text-slate-300">Email address <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="john.doe@example.com" 
                      type="email"
                      {...field} 
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">What is this meeting about? <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Brief description of the meeting purpose" 
                      {...field} 
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Additional notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Include any specific topics you'd like to discuss or questions you have." 
                      {...field} 
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 min-h-[100px]" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex items-center justify-between pt-4 sticky bottom-0 bg-[#0F172A] border-t border-slate-800 -mx-6 px-6 py-4 md:border-0 md:static md:bg-transparent md:p-0">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="border-slate-700 hover:bg-slate-800 text-slate-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-violet-600 hover:bg-violet-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
