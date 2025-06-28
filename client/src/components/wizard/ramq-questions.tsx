import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CalendarIcon, FileText, Shield, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface RAMQQuestionsProps {
  ramqApplicationSubmitted: string;
  ramqSubmissionDate: string;
  ramqCardReceived: string;
  insuranceWithin5Days: string;
  onRAMQApplicationChange: (value: string) => void;
  onRAMQSubmissionDateChange: (value: string) => void;
  onRAMQCardReceivedChange: (value: string) => void;
  onInsuranceWithin5DaysChange: (value: string) => void;
  countryOfOrigin: string;
}

export default function RAMQQuestions({
  ramqApplicationSubmitted,
  ramqSubmissionDate,
  ramqCardReceived,
  insuranceWithin5Days,
  onRAMQApplicationChange,
  onRAMQSubmissionDateChange,
  onRAMQCardReceivedChange,
  onInsuranceWithin5DaysChange,
  countryOfOrigin
}: RAMQQuestionsProps) {
  const selectedDate = ramqSubmissionDate ? new Date(ramqSubmissionDate + 'T00:00:00') : undefined;

  // Check if country has social security agreement
  const socialSecurityCountries = [
    'france', 'belgium', 'denmark', 'finland', 'luxembourg', 
    'norway', 'portugal', 'sweden', 'greece', 'united-states'
  ];
  const hasAgreement = socialSecurityCountries.includes(countryOfOrigin);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          RAMQ Application Status
        </h2>
        <p className="text-gray-600">
          Help us understand your Quebec health insurance (RAMQ) application timeline.
        </p>
      </div>

      {/* RAMQ Application Submitted */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary" />
            <span>Have you submitted your RAMQ application?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Your 3-month waiting period starts from when you submit your RAMQ application, not your arrival date.
            </p>
            <RadioGroup value={ramqApplicationSubmitted} onValueChange={onRAMQApplicationChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="ramq-yes" />
                <Label htmlFor="ramq-yes">Yes, I've submitted my RAMQ application</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="ramq-no" />
                <Label htmlFor="ramq-no">No, I haven't submitted it yet</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="planning" id="ramq-planning" />
                <Label htmlFor="ramq-planning">I'm planning to submit it soon</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* RAMQ Submission Date - only if submitted */}
      {ramqApplicationSubmitted === 'yes' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <span>When did you submit your RAMQ application?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                This date determines when your 3-month waiting period ends and RAMQ coverage begins.
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
                    {selectedDate ? format(selectedDate, "PPP") : "Select submission date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-3 border-b">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const today = new Date();
                        const year = today.getFullYear();
                        const month = String(today.getMonth() + 1).padStart(2, '0');
                        const day = String(today.getDate()).padStart(2, '0');
                        onRAMQSubmissionDateChange(`${year}-${month}-${day}`);
                      }}
                      className="w-full"
                    >
                      Today
                    </Button>
                  </div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        onRAMQSubmissionDateChange(`${year}-${month}-${day}`);
                      }
                    }}
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

      {/* RAMQ Card Received */}
      {ramqApplicationSubmitted === 'yes' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Have you received your RAMQ card?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Your RAMQ card confirms your Quebec health insurance coverage is active.
              </p>
              <RadioGroup value={ramqCardReceived} onValueChange={onRAMQCardReceivedChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="card-yes" />
                  <Label htmlFor="card-yes">Yes, I have my RAMQ card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="card-no" />
                  <Label htmlFor="card-no">No, still waiting for my card</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 5-Day Insurance Question */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span>Did you purchase private insurance within 5 days of arrival?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Quebec recommends purchasing private health insurance within 5 days of arrival for optimal coverage.
            </p>
            <RadioGroup value={insuranceWithin5Days} onValueChange={onInsuranceWithin5DaysChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="insurance-yes" />
                <Label htmlFor="insurance-yes">Yes, I purchased insurance within 5 days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="insurance-no" />
                <Label htmlFor="insurance-no">No, I didn't purchase insurance within 5 days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unsure" id="insurance-unsure" />
                <Label htmlFor="insurance-unsure">I'm not sure about the timeline</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Information based on country and status */}
      {hasAgreement ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-green-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-green-900 mb-1">Social Security Agreement Benefit</p>
              <p className="text-green-800">
                Since you're from a country with a bilateral agreement, you may be eligible for immediate 
                RAMQ coverage without the 3-month waiting period. Contact RAMQ directly to confirm your eligibility.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 mb-1">Standard RAMQ Process</p>
              <p className="text-blue-800">
                You're subject to the standard 3-month waiting period from your RAMQ application submission date. 
                Private insurance is strongly recommended during this time to avoid unexpected medical bills.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}