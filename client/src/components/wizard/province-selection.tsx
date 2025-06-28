import { MapPin, Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import provincesData from '@/data/provinces.json';

interface ProvinceSelectionProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProvinceSelection({ value, onChange }: ProvinceSelectionProps) {
  return (
    <div className="fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="text-primary text-2xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Which province are you settling in?
        </h2>
        <p className="text-gray-600 text-lg">
          Different provinces have different waiting periods and health coverage rules.
        </p>
      </div>
      
      <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
        {provincesData.map((province) => (
          <div key={province.id} className="relative">
            <RadioGroupItem value={province.id} id={province.id} className="sr-only" />
            <Label
              htmlFor={province.id}
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-primary group ${
                value === province.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200'
              }`}
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <span className="text-primary font-semibold text-sm">
                  {province.abbreviation}
                </span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{province.name}</div>
                <div className="text-sm text-gray-600">
                  {province.hasWaitingPeriod 
                    ? `${province.waitingPeriod / 30}-month waiting period • ${province.healthPlanName} coverage`
                    : `No waiting period • ${province.healthPlanName} coverage`
                  }
                </div>
                {!province.hasWaitingPeriod && (
                  <div className="inline-block bg-success/10 text-success px-2 py-1 rounded text-xs font-medium mt-1">
                    Immediate coverage
                  </div>
                )}
              </div>
              <Check 
                className={`text-primary text-xl transition-opacity ${
                  value === province.id ? 'opacity-100' : 'opacity-0'
                }`} 
              />
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
