import { AlertTriangle, Calendar as CalendarIcon, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface WorkPermitInfoProps {
  arrivalDate: string;
  onArrivalDateChange: (value: string) => void;
}

export default function WorkPermitInfo({ arrivalDate, onArrivalDateChange }: WorkPermitInfoProps) {
  const selectedArrivalDate = arrivalDate ? new Date(arrivalDate + 'T00:00:00') : undefined;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Work Permit Holder Information
        </h2>
        <p className="text-gray-600">
          Quebec has different rules for work permit holders than other provinces.
        </p>
      </div>

      {/* Important Notice */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-800">
            <AlertTriangle className="w-5 h-5" />
            <span>Important: Quebec Work Permit Rules</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-orange-800">
          <div className="space-y-3">
            <p className="font-medium">
              Work permit holders are NOT eligible for RAMQ coverage in Quebec.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Unlike other provinces, Quebec does not provide health coverage to work permit holders</li>
              <li>You must maintain private health insurance for your entire stay</li>
              <li>Your employer may provide group benefits - check with HR</li>
              <li>Consider comprehensive travel/health insurance plans</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Arrival Date */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            <span>When did you arrive in Quebec?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Your arrival date helps us recommend appropriate insurance options for your stay.
            </p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedArrivalDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedArrivalDate ? format(selectedArrivalDate, "PPP") : "Select arrival date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedArrivalDate}
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const today = new Date();
                      const year = today.getFullYear();
                      const month = String(today.getMonth() + 1).padStart(2, '0');
                      const day = String(today.getDate()).padStart(2, '0');
                      onArrivalDateChange(`${year}-${month}-${day}`);
                    }}
                    className="w-full"
                  >
                    Today
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Employer Benefits Check */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-primary" />
            <span>Employer Benefits</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Check if your employer provides health benefits:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Contact your HR department about group health insurance</li>
              <li>Ask about coverage for medical, dental, and prescription drugs</li>
              <li>Inquire about dependent coverage for family members</li>
              <li>Request details about coverage limits and exclusions</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}