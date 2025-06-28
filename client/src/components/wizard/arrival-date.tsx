import { Calendar, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ArrivalDateProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ArrivalDate({ value, onChange }: ArrivalDateProps) {
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
        <Label htmlFor="arrival-date" className="block text-sm font-medium text-gray-700 mb-2">
          Arrival Date
        </Label>
        <Input
          id="arrival-date"
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-lg"
          max={new Date().toISOString().split('T')[0]}
        />
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Info className="text-primary mt-1 w-5 h-5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Your waiting period calculation:</p>
              <p>
                Most provinces require a 3-month (90-day) waiting period from your arrival date 
                before provincial health coverage begins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
