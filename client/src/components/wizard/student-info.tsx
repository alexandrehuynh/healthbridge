import { GraduationCap, Calendar as CalendarIcon, AlertTriangle, University } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface StudentInfoProps {
  arrivalDate: string;
  universityInsurance: string;
  onArrivalDateChange: (value: string) => void;
  onUniversityInsuranceChange: (value: string) => void;
}

export default function StudentInfo({ 
  arrivalDate, 
  universityInsurance, 
  onArrivalDateChange, 
  onUniversityInsuranceChange 
}: StudentInfoProps) {
  const selectedArrivalDate = arrivalDate ? new Date(arrivalDate + 'T00:00:00') : undefined;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          International Student Information
        </h2>
        <p className="text-gray-600">
          Students have specific health insurance requirements in Quebec.
        </p>
      </div>

      {/* Student-Specific Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <GraduationCap className="w-5 h-5" />
            <span>Student Health Insurance Rules</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800">
          <div className="space-y-3">
            <p className="font-medium">
              International students are NOT eligible for RAMQ coverage.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Must have health insurance before arriving in Quebec</li>
              <li>Many institutions require mandatory student health plans</li>
              <li>Coverage must meet minimum government requirements</li>
              <li>Some schools offer supplementary dental and vision coverage</li>
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
              Your arrival date helps us understand your current insurance needs and timeline.
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

      {/* University Insurance Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <University className="w-5 h-5 text-primary" />
            <span>Do you have university health insurance?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Most Quebec institutions require mandatory health insurance for international students.
            </p>
            <RadioGroup value={universityInsurance} onValueChange={onUniversityInsuranceChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="uni-yes" />
                <Label htmlFor="uni-yes">Yes, I have mandatory university insurance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partial" id="uni-partial" />
                <Label htmlFor="uni-partial">Yes, but looking for additional coverage</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="uni-no" />
                <Label htmlFor="uni-no">No, I need to find insurance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unsure" id="uni-unsure" />
                <Label htmlFor="uni-unsure">I'm not sure about my coverage</Label>
              </div>
            </RadioGroup>

            {universityInsurance === 'no' && (
              <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-orange-900 mb-1">Urgent Action Required</p>
                    <p className="text-orange-800">
                      You must have health insurance coverage. Contact your institution's international 
                      student office immediately to arrange mandatory coverage.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {universityInsurance === 'unsure' && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-1">Check Your Coverage</p>
                  <p className="text-blue-800">
                    Contact your institution's international student office or check your student portal 
                    to confirm your health insurance status and coverage details.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}