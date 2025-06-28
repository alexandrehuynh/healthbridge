import { CreditCard, Briefcase, GraduationCap, Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface StatusSelectionProps {
  value: string;
  onChange: (value: string) => void;
}

const statusOptions = [
  {
    id: 'pr',
    name: 'Permanent Resident',
    description: 'New PR card holder or landed immigrant',
    icon: CreditCard,
    bgColor: 'bg-success/10',
    iconColor: 'text-success'
  },
  {
    id: 'work',
    name: 'Work Permit Holder', 
    description: 'Temporary foreign worker or LMIA holder',
    icon: Briefcase,
    bgColor: 'bg-warning/10',
    iconColor: 'text-warning'
  },
  {
    id: 'student',
    name: 'International Student',
    description: 'Study permit holder',
    icon: GraduationCap,
    bgColor: 'bg-primary/10',
    iconColor: 'text-primary'
  }
];

export default function StatusSelection({ value, onChange }: StatusSelectionProps) {
  return (
    <div className="fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="text-primary text-2xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          What's your immigration status?
        </h2>
        <p className="text-gray-600 text-lg">
          This helps us determine your exact waiting period and coverage options.
        </p>
      </div>
      
      <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
        {statusOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <div key={option.id} className="relative">
              <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
              <Label
                htmlFor={option.id}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-primary group ${
                  value === option.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-200'
                }`}
              >
                <div className={`w-8 h-8 ${option.bgColor} rounded-full flex items-center justify-center mr-4`}>
                  <IconComponent className={`${option.iconColor} w-4 h-4`} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{option.name}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </div>
                <Check 
                  className={`text-primary text-xl transition-opacity ${
                    value === option.id ? 'opacity-100' : 'opacity-0'
                  }`} 
                />
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
