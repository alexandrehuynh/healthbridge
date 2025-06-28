import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Briefcase, Shield } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface WorkPermitQuestionsProps {
  employerBenefits: string;
  arrivalDate: string;
  onEmployerBenefitsChange: (value: string) => void;
  onArrivalDateChange: (value: string) => void;
  province: string;
}

export default function WorkPermitQuestions({
  employerBenefits,
  arrivalDate,
  onEmployerBenefitsChange,
  onArrivalDateChange,
  province
}: WorkPermitQuestionsProps) {
  const selectedDate = arrivalDate ? new Date(arrivalDate) : undefined;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Work Permit Information
        </h2>
        <p className="text-gray-600">
          Help us determine your healthcare coverage options while working in Canada.
        </p>
      </div>

      {/* Employer Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-primary" />
            <span>Do you have health benefits through your employer?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Many employers in Canada provide health insurance coverage for international workers.
            </p>
            <RadioGroup value={employerBenefits} onValueChange={onEmployerBenefitsChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="benefits-yes" />
                <Label htmlFor="benefits-yes">Yes, I have employer health benefits</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="benefits-no" />
                <Label htmlFor="benefits-no">No, I need to find my own coverage</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unsure" id="benefits-unsure" />
                <Label htmlFor="benefits-unsure">I'm not sure / need to check</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Conditional Arrival Date - only if no employer benefits */}
      {(employerBenefits === 'no' || employerBenefits === 'unsure') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <span>When did you arrive in Canada?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                This helps us recommend the best insurance options for your situation in {province}.
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
                  <div className="p-3 border-b">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onArrivalDateChange(format(new Date(), 'yyyy-MM-dd'))}
                      className="w-full"
                    >
                      Today
                    </Button>
                  </div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => onArrivalDateChange(date ? format(date, 'yyyy-MM-dd') : '')}
                    fromYear={2020}
                    toYear={2030}
                    initialFocus
                    className="rounded-md"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Information about work permit healthcare */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Briefcase className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-900 mb-1">Work Permit Healthcare Options</p>
            <p className="text-blue-800">
              Work permit holders in {province} may be eligible for provincial health coverage depending on 
              their work permit type and duration. Private insurance is often recommended as a supplement 
              or primary coverage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}