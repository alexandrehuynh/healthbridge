import React from 'react';
import { Calendar, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ArrivalDateProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ArrivalDate({ value, onChange }: ArrivalDateProps) {
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  // Fix timezone offset by creating date in local timezone
  const selectedDate = value ? new Date(value + 'T00:00:00') : undefined;

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      // Ensure we format in local timezone to avoid offset issues
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      onChange(`${year}-${month}-${day}`);
      setCalendarOpen(false);
    }
  };

  const handleTodayClick = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    onChange(`${year}-${month}-${day}`);
    setCalendarOpen(false);
  };

  return (
    <div className="fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="text-primary text-2xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          When did you arrive in Canada?
        </h2>
        <p className="text-gray-600 text-lg">
          We'll calculate your exact waiting period and coverage start date.
        </p>
      </div>
      
      <div className="max-w-md mx-auto">
        <Label className="block text-sm font-medium text-gray-700 mb-2">
          Arrival Date
        </Label>
        
        <div className="space-y-3">
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal px-4 py-3 h-auto border-2 border-gray-200 rounded-lg focus:border-primary",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                initialFocus
                fromYear={2020}
                toYear={2030}
                className="rounded-md"
              />
              <div className="p-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTodayClick}
                  className="w-full"
                >
                  Today
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Info className="text-primary mt-1 w-5 h-5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Your waiting period calculation:</p>
              <p>
                Most provinces require a 3-month (90-day) waiting period from your arrival date 
                before provincial health coverage begins. You can also plan for future arrival dates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
