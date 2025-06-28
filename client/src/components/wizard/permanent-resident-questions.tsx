import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Users, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface PermanentResidentQuestionsProps {
  arrivalDate: string;
  familySize: number;
  onArrivalDateChange: (value: string) => void;
  onFamilySizeChange: (value: number) => void;
  province: string;
}

export default function PermanentResidentQuestions({
  arrivalDate,
  familySize,
  onArrivalDateChange,
  onFamilySizeChange,
  province
}: PermanentResidentQuestionsProps) {
  // Fix timezone offset by creating date in local timezone
  const selectedDate = arrivalDate ? new Date(arrivalDate + 'T00:00:00') : undefined;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Permanent Resident Information
        </h2>
        <p className="text-gray-600">
          Help us calculate your healthcare coverage timeline and insurance needs.
        </p>
      </div>

      {/* Arrival Date */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            <span>When did you arrive in Canada as a PR?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              This determines your waiting period for provincial health coverage in {province}.
            </p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Select your arrival date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      const day = String(date.getDate()).padStart(2, '0');
                      onArrivalDateChange(`${year}-${month}-${day}`);
                    }
                  }}
                  fromYear={2020}
                  toYear={2030}
                  initialFocus
                  className="rounded-md"
                />
                <div className="p-3 border-t">
                  <button
                    onClick={() => {
                      const today = new Date();
                      const year = today.getFullYear();
                      const month = String(today.getMonth() + 1).padStart(2, '0');
                      const day = String(today.getDate()).padStart(2, '0');
                      onArrivalDateChange(`${year}-${month}-${day}`);
                    }}
                    className="text-primary hover:text-primary/80 underline text-sm font-medium"
                  >
                    Today
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Family Size */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <span>How many people in your family need coverage?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Include yourself, spouse/partner, and dependent children requiring health insurance.
            </p>
            <div className="space-y-2">
              <Label htmlFor="familySize">Number of people</Label>
              <Input
                id="familySize"
                type="number"
                min="1"
                max="10"
                value={familySize}
                onChange={(e) => onFamilySizeChange(parseInt(e.target.value) || 1)}
                className="w-32"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((size) => (
                <Button
                  key={size}
                  variant={familySize === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => onFamilySizeChange(size)}
                  className="justify-start"
                >
                  <Users className="w-4 h-4 mr-2" />
                  {size} {size === 1 ? 'person' : 'people'}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information about PR benefits */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
          <div className="text-sm">
            <p className="font-medium text-green-900 mb-1">Permanent Resident Benefits</p>
            <p className="text-green-800">
              As a permanent resident, you're eligible for provincial health coverage in all provinces. 
              Some provinces like Ontario and Alberta offer immediate coverage, while others have waiting periods up to 3 months.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}