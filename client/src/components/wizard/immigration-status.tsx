import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Users, Briefcase, GraduationCap, Plane } from 'lucide-react';
import immigrationStatuses from '@/data/immigration-statuses.json';
import { ImmigrationStatus } from '@/types/assessment';

interface ImmigrationStatusSelectionProps {
  value: string;
  onChange: (value: string) => void;
}

const statusIcons = {
  permanent_resident: Users,
  work_permit: Briefcase,
  study_permit: GraduationCap,
  visitor: Plane,
};

const eligibilityLabels = {
  provincial_health_eligible: { label: 'Eligible', color: 'bg-green-100 text-green-800' },
  provincial_health_conditional: { label: 'Conditional', color: 'bg-yellow-100 text-yellow-800' },
  provincial_health_not_eligible: { label: 'Private Insurance', color: 'bg-blue-100 text-blue-800' },
};

export default function ImmigrationStatusSelection({ value, onChange }: ImmigrationStatusSelectionProps) {
  const statuses = immigrationStatuses as ImmigrationStatus[];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What's your immigration status in Canada?
        </h2>
        <p className="text-gray-600">
          Your immigration status determines your healthcare options and eligibility for provincial health plans.
        </p>
      </div>

      <RadioGroup value={value} onValueChange={onChange} className="space-y-4">
        {statuses.map((status) => {
          const Icon = statusIcons[status.id as keyof typeof statusIcons];
          const eligibilityInfo = eligibilityLabels[status.eligibility];
          
          return (
            <div key={status.id} className="relative">
              <RadioGroupItem
                value={status.id}
                id={status.id}
                className="peer sr-only"
              />
              <Label
                htmlFor={status.id}
                className="flex cursor-pointer"
              >
                <Card className="w-full transition-all duration-200 hover:shadow-md peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {status.label}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {status.description}
                          </p>
                        </div>
                      </div>
                      <Badge className={eligibilityInfo.color}>
                        {eligibilityInfo.label}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Label>
            </div>
          );
        })}
      </RadioGroup>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">i</span>
          </div>
          <div className="text-sm">
            <p className="font-medium text-blue-900 mb-1">Status Explanations:</p>
            <ul className="text-blue-800 space-y-1">
              <li><strong>Eligible:</strong> Qualify for provincial health coverage (may have waiting period)</li>
              <li><strong>Conditional:</strong> Eligibility varies by province and work permit type</li>
              <li><strong>Private Insurance:</strong> Need private coverage as primary insurance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}