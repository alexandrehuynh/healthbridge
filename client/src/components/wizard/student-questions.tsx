import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { GraduationCap, Shield, Heart } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

interface StudentQuestionsProps {
  universityInsurance: string;
  coverageNeeds: string[];
  onUniversityInsuranceChange: (value: string) => void;
  onCoverageNeedsChange: (value: string[]) => void;
  province: string;
}

export default function StudentQuestions({
  universityInsurance,
  coverageNeeds,
  onUniversityInsuranceChange,
  onCoverageNeedsChange,
  province
}: StudentQuestionsProps) {
  const handleCoverageNeedChange = (need: string, checked: boolean) => {
    if (checked) {
      onCoverageNeedsChange([...coverageNeeds, need]);
    } else {
      onCoverageNeedsChange(coverageNeeds.filter(n => n !== need));
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          International Student Information
        </h2>
        <p className="text-gray-600">
          Help us find the best healthcare coverage options for your studies in Canada.
        </p>
      </div>

      {/* University Insurance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span>Does your university offer health insurance?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Many Canadian universities provide mandatory or optional health insurance plans for international students.
            </p>
            <RadioGroup value={universityInsurance} onValueChange={onUniversityInsuranceChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mandatory" id="insurance-mandatory" />
                <Label htmlFor="insurance-mandatory">Yes, it's mandatory at my university</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="optional" id="insurance-optional" />
                <Label htmlFor="insurance-optional">Yes, but it's optional</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="insurance-none" />
                <Label htmlFor="insurance-none">No, my university doesn't offer coverage</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unsure" id="insurance-unsure" />
                <Label htmlFor="insurance-unsure">I'm not sure / need to check</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Coverage Needs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-primary" />
            <span>What type of coverage do you need?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Select all types of healthcare coverage that are important to you during your studies.
            </p>
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'emergency', label: 'Emergency medical care', description: 'Hospital visits, urgent care, ambulance' },
                { id: 'prescription', label: 'Prescription medications', description: 'Coverage for prescribed drugs' },
                { id: 'dental', label: 'Dental care', description: 'Routine cleanings, fillings, dental emergencies' },
                { id: 'vision', label: 'Vision care', description: 'Eye exams, glasses, contact lenses' },
                { id: 'mental', label: 'Mental health services', description: 'Counseling, therapy, mental health support' },
                { id: 'physio', label: 'Physiotherapy', description: 'Physical therapy and rehabilitation' }
              ].map((need) => (
                <div key={need.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={need.id}
                    checked={coverageNeeds.includes(need.id)}
                    onCheckedChange={(checked) => handleCoverageNeedChange(need.id, checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={need.id} className="font-medium text-gray-900">
                      {need.label}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">{need.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information about student healthcare */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-purple-900 mb-1">Student Healthcare in {province}</p>
            <p className="text-purple-800">
              International students in {province} may have access to provincial health coverage depending on 
              their program length and university. Private insurance is often required to supplement coverage 
              or provide primary protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}