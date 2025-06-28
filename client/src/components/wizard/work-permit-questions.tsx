import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Briefcase, Shield, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface WorkPermitQuestionsProps {
  employerBenefits: string;
  arrivalDate: string;
  onEmployerBenefitsChange: (value: string) => void;
  onArrivalDateChange: (value: string) => void;
  province: string;
}

const benefitsOptions = [
  {
    id: 'full',
    label: 'Yes, comprehensive coverage',
    description: 'My employer provides medical, dental, and prescription coverage',
    icon: Shield,
    color: 'text-green-600'
  },
  {
    id: 'basic',
    label: 'Yes, but basic coverage only',
    description: 'Limited coverage - may need supplementary insurance',
    icon: AlertCircle,
    color: 'text-yellow-600'
  },
  {
    id: 'none',
    label: 'No employer health benefits',
    description: 'I need to arrange my own health insurance coverage',
    icon: Briefcase,
    color: 'text-blue-600'
  }
];

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
          Work Permit Healthcare Information
        </h2>
        <p className="text-gray-600">
          Help us understand your current coverage and needs as a work permit holder.
        </p>
      </div>

      {/* Employer Benefits Question */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-primary" />
            <span>Does your employer provide health benefits?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={employerBenefits} onValueChange={onEmployerBenefitsChange} className="space-y-4">
            {benefitsOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div key={option.id} className="relative">
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={option.id}
                    className="flex cursor-pointer"
                  >
                    <div className="w-full p-4 border rounded-lg transition-all duration-200 hover:shadow-md peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-primary">
                      <div className="flex items-start space-x-3">
                        <Icon className={`w-5 h-5 mt-0.5 ${option.color}`} />
                        <div>
                          <div className="font-medium text-gray-900 mb-1">
                            {option.label}
                          </div>
                          <div className="text-sm text-gray-600">
                            {option.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Arrival Date - Show if relevant for province */}
      {(employerBenefits === 'none' || employerBenefits === 'basic') && (
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
                This helps us calculate any waiting periods for provincial health coverage in {province}.
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
                    onSelect={(date) => onArrivalDateChange(date ? date.toISOString().split('T')[0] : '')}
                    disabled={(date) => date > new Date() || date < new Date("2020-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Information based on selection */}
      {employerBenefits && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <div className="text-sm">
              {employerBenefits === 'full' && (
                <div className="text-blue-800">
                  <p className="font-medium mb-1">Great! You have comprehensive coverage.</p>
                  <p>We'll help you understand any gaps and emergency coverage options while traveling.</p>
                </div>
              )}
              {employerBenefits === 'basic' && (
                <div className="text-blue-800">
                  <p className="font-medium mb-1">You may benefit from supplementary coverage.</p>
                  <p>We'll show options to enhance your existing employer coverage with dental, vision, or extended health benefits.</p>
                </div>
              )}
              {employerBenefits === 'none' && (
                <div className="text-blue-800">
                  <p className="font-medium mb-1">You'll need primary health insurance.</p>
                  <p>We'll show comprehensive insurance options and help determine if you're eligible for provincial health coverage.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}