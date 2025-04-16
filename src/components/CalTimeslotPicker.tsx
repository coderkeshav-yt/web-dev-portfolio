import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface CalTimeslotPickerProps {
  onSelectTimeslot: (date: Date, time: string) => void;
}

const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
];

export function CalTimeslotPicker({ onSelectTimeslot }: CalTimeslotPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);
  const [timeView, setTimeView] = useState<'12h' | '24h'>('12h');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Calculate days in the current month view
  useEffect(() => {
    const days = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of the month
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay();
    
    // Get days from previous month to fill the first week
    for (let i = firstDayOfWeek; i > 0; i--) {
      days.push(new Date(year, month, 1 - i));
    }
    
    // Get days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    // Get days from next month to fill the last week
    const lastDay = new Date(year, month, daysInMonth);
    const lastDayOfWeek = lastDay.getDay();
    for (let i = 1; i < 7 - lastDayOfWeek; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    setDaysInMonth(days);
  }, [currentMonth]);

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeClick = (time: string) => {
    if (selectedDate) {
      // Simulate loading state
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onSelectTimeslot(selectedDate, time);
      }, 600);
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Format the month and year display
  const monthYearDisplay = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Select Date & Time</h2>
      
      {/* Month Selector */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={previousMonth}
          className="border-slate-700 hover:bg-slate-800 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-medium text-white">{monthYearDisplay}</h3>
        <Button
          variant="outline"
          size="icon"
          onClick={nextMonth}
          className="border-slate-700 hover:bg-slate-800 hover:text-white"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar View */}
      <div className="mb-8">
        {/* Calendar Header - Days of Week */}
        <div className="grid grid-cols-7 gap-1 mb-2 text-center">
          {DAYS_OF_WEEK.map(day => (
            <div key={day} className="text-xs font-medium text-slate-500 py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid - Days */}
        <div className="grid grid-cols-7 gap-1">
          {daysInMonth.map((date, index) => (
            <motion.button
              key={date.toString() + index}
              className={`
                aspect-square flex items-center justify-center rounded-md text-sm
                ${isCurrentMonth(date) ? 'hover:bg-slate-700 transition-colors duration-200' : 'opacity-40'}
                ${isToday(date) && 'border border-violet-500/50'}
                ${selectedDate && date.getDate() === selectedDate.getDate() && 
                  date.getMonth() === selectedDate.getMonth() && 
                  date.getFullYear() === selectedDate.getFullYear() 
                  ? 'bg-violet-600 text-white' 
                  : 'text-slate-300'}
                ${isPastDate(date) || !isCurrentMonth(date) ? 'cursor-not-allowed opacity-30' : ''}
              `}
              onClick={() => !isPastDate(date) && isCurrentMonth(date) && handleDateClick(date)}
              disabled={isPastDate(date) || !isCurrentMonth(date)}
              whileHover={{ scale: !isPastDate(date) && isCurrentMonth(date) ? 1.05 : 1 }}
              whileTap={{ scale: !isPastDate(date) && isCurrentMonth(date) ? 0.95 : 1 }}
            >
              {date.getDate()}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time Selector */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-white">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </h3>
            <div className="flex gap-2">
              <button 
                className={`px-2 py-1 text-xs rounded ${timeView === '12h' ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                onClick={() => setTimeView('12h')}
              >
                12h
              </button>
              <button 
                className={`px-2 py-1 text-xs rounded ${timeView === '24h' ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                onClick={() => setTimeView('24h')}
              >
                24h
              </button>
            </div>
          </div>

          <div 
            role="grid"
            aria-label="Available time slots"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"
          >
            {TIME_SLOTS.map((slot, index) => (
              <button
                key={slot}
                onClick={() => handleTimeClick(slot)}
                className={`
                  p-3 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  ${selectedTime === slot 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}
                `}
                aria-selected={selectedTime === slot}
                role="gridcell"
                tabIndex={0}
              >
                {slot}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-6 rounded-lg flex items-center gap-3">
            <Loader2 className="h-6 w-6 text-violet-500 animate-spin" />
            <p className="text-white">Loading available times...</p>
          </div>
        </div>
      )}
    </div>
  );
}
