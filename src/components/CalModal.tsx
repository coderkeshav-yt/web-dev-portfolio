import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CalendarDays, Clock, MapPin, Video, Copy, CheckCheck, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { CalBookingForm } from '@/components/CalBookingForm';
import { CalTimeslotPicker } from '@/components/CalTimeslotPicker';

type BookingStep = 'timeslot' | 'details';

interface CalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalModal = ({ isOpen, onClose }: CalModalProps) => {
  const [step, setStep] = useState<BookingStep>('timeslot');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const { toast } = useToast();
  
  const email = "hello@keshavsingh.dev";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setEmailCopied(true);
    
    toast({
      title: "Email copied to clipboard!",
      description: `${email} is now in your clipboard.`,
      duration: 3000,
    });
    
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSelectTimeslot = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setStep('details');
  };

  const handleBackToTimeslots = () => {
    setStep('timeslot');
  };

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setTimeout(() => {
        setStep('timeslot');
        setSelectedDate(null);
        setSelectedTime(null);
      }, 300);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[900px] p-0 gap-0 bg-[#0F172A] border-slate-800 h-[90vh] sm:h-auto overflow-auto">
        <DialogTitle className="sr-only">Schedule a Meeting</DialogTitle>
        <DialogDescription className="sr-only">Choose a date and time for our meeting</DialogDescription>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full p-2 text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-800 md:hidden"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="grid md:grid-cols-[1fr_2fr] gap-0 min-h-0 max-h-[90vh] sm:max-h-none overflow-auto">
          {/* Left sidebar - meeting info */}
          <div className="bg-[#111827] p-6 space-y-6 border-b md:border-r border-slate-800">
            <div>
              <div className="h-12 w-12 rounded-full bg-violet-500/20 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-violet-400">KS</span>
              </div>
              <h3 className="text-xl font-bold text-white">Keshav Singh</h3>
              <p className="text-lg font-medium text-white mt-1">30 Min Meeting</p>
            </div>
            
            <div className="space-y-4 text-slate-300 text-sm">
              {selectedDate && selectedTime ? (
                <div className="flex items-start gap-3">
                  <CalendarDays size={18} className="shrink-0 mt-0.5 text-violet-400" />
                  <div>
                    <p className="font-medium">{selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}</p>
                    <p className="text-slate-400">{selectedTime}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <CalendarDays size={18} className="shrink-0 mt-0.5 text-violet-400" />
                  <p>Select a date & time</p>
                </div>
              )}
              
              <div className="flex items-start gap-3">
                <Clock size={18} className="shrink-0 mt-0.5 text-violet-400" />
                <p>30 mins</p>
              </div>
              
              <div className="flex items-start gap-3">
                <Video size={18} className="shrink-0 mt-0.5 text-violet-400" />
                <p>Google Meet</p>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 mt-0.5 text-violet-400" />
                <p>Your local timezone</p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-700">
              <p className="text-slate-300 text-sm mb-3">
                If these times don't work for you, please email me:
              </p>
              <div 
                className="flex items-center gap-2 p-2 bg-slate-800/50 rounded-md cursor-pointer hover:bg-slate-800 transition-colors"
                onClick={handleCopyEmail}
              >
                <Mail size={16} className="text-violet-400" />
                <span className="text-sm text-slate-300 flex-1">{email}</span>
                <AnimatePresence mode="wait">
                  {emailCopied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CheckCheck size={16} className="text-green-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Copy size={16} className="text-slate-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          {/* Right content - calendar or form */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {step === 'timeslot' ? (
                <motion.div
                  key="timeslot"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <CalTimeslotPicker onSelectTimeslot={handleSelectTimeslot} />
                </motion.div>
              ) : (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <CalBookingForm 
                    selectedDate={selectedDate!}
                    selectedTime={selectedTime!}
                    onBack={handleBackToTimeslots}
                    onClose={onClose}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalModal;
