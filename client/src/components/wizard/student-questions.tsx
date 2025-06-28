import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { GraduationCap, Shield, Heart, Eye, Pill, Plane } from 'lucide-react';

interface StudentQuestionsProps {
  universityInsurance: string;
  coverageNeeds: string[];
  onUniversityInsuranceChange: (value: string) => void;
  onCoverageNeedsChange: (needs: string[]) => void;
  province: string;
}

const insuranceOptions = [
  {
    id: 'uhip',
    label: 'Yes, I have UHIP (Ontario)',
    description: 'University Health Insurance Plan for international students in Ontario',
    coverage: 'Basic medical and emergency coverage'
  },
  {
    id: 'ship',
    label: 'Yes, I have SHIP or other university plan',
    description: 'Student Health Insurance Plan or equivalent university coverage',
    coverage: 'Varies by institution and province'
  },
  {
    id: 'none',
    label: 'No, I don\'t have university insurance',
    description: 'I need to arrange my own health insurance coverage',
    coverage: 'Requires comprehensive private insurance'
  }
];

const coverageOptions = [
  {
    id: 'dental',
    label: 'Dental care',
    description: 'Cleanings, fillings, and dental treatments',
    icon: Heart,
    color: 'text-blue-600'
  },
  {
    id: 'vision',
    label: 'Vision/Eyecare',
    description: 'Eye exams, glasses, and contact lenses',
    icon: Eye,
    color: 'text-green-600'
  },
  {
    id: 'prescription',
    label: 'Prescription drugs',
    description: 'Enhanced prescription medication coverage',
    icon: Pill,
    color: 'text-purple-600'
  },
  {
    id: 'emergency_travel',
    label: 'Emergency travel home',
    description: 'Medical evacuation and repatriation coverage',
    icon: Plane,
    color: 'text-red-600'
  }
];

export default function StudentQuestions({
  universityInsurance,
  coverageNeeds,
  onUniversityInsuranceChange,
  onCoverageNeedsChange,
  province
}: StudentQuestionsProps) {
  const handleCoverageChange = (coverageId: string, checked: boolean) => {
    if (checked) {
      onCoverageNeedsChange([...coverageNeeds, coverageId]);
    } else {
      onCoverageNeedsChange(coverageNeeds.filter(id => id !== coverageId));
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          International Student Coverage
        </h2>
        <p className="text-gray-600">
          Help us understand your current university insurance and additional coverage needs.
        </p>
      </div>

      {/* University Insurance Question */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span>Do you have university health insurance?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={universityInsurance} onValueChange={onUniversityInsuranceChange} className="space-y-4">
            {insuranceOptions.map((option) => (
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
                      <Shield className="w-5 h-5 mt-0.5 text-primary" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-1">
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {option.description}
                        </div>
                        <div className="text-xs text-blue-600 font-medium">
                          {option.coverage}
                        </div>
                      </div>
                    </div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Additional Coverage Needs - Show if they have university insurance */}
      {universityInsurance && universityInsurance !== 'none' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-primary" />
              <span>What additional coverage do you need?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Your university insurance covers basic medical needs. Select additional coverage you'd like:
              </p>
              <div className="space-y-4">
                {coverageOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div key={option.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={option.id}
                        checked={coverageNeeds.includes(option.id)}
                        onCheckedChange={(checked) => handleCoverageChange(option.id, checked as boolean)}
                        className="mt-1"
                      />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer">
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
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Information based on selection */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">i</span>
          </div>
          <div className="text-sm">
            {universityInsurance === 'uhip' && (
              <div className="text-blue-800">
                <p className="font-medium mb-1">UHIP Coverage Information</p>
                <p>UHIP covers basic medical services but not dental, vision, or prescription drugs. International students often add supplementary coverage for these services.</p>
              </div>
            )}
            {universityInsurance === 'ship' && (
              <div className="text-blue-800">
                <p className="font-medium mb-1">University Plan Coverage</p>
                <p>Most university health plans cover basic medical emergencies. Check your specific plan details and consider supplementary coverage for dental, vision, and enhanced prescription benefits.</p>
              </div>
            )}
            {universityInsurance === 'none' && (
              <div className="text-blue-800">
                <p className="font-medium mb-1">Comprehensive Coverage Required</p>
                <p>As an international student without university insurance, you'll need comprehensive private health insurance that meets your study permit requirements and provides adequate medical coverage.</p>
              </div>
            )}
            {!universityInsurance && (
              <div className="text-blue-800">
                <p className="font-medium mb-1">International Student Healthcare</p>
                <p>Most provinces require international students to have health insurance. Some provide access to provincial health plans, while others require private insurance or university plans.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}