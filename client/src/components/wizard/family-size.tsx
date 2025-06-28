import { Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface FamilySizeProps {
  familySize: number;
  onFamilySizeChange: (size: number) => void;
  includeDental: boolean;
  includeVision: boolean;
  includePrescription: boolean;
  onDentalChange: (checked: boolean) => void;
  onVisionChange: (checked: boolean) => void;
  onPrescriptionChange: (checked: boolean) => void;
}

export default function FamilySize({
  familySize,
  onFamilySizeChange,
  includeDental,
  includeVision,
  includePrescription,
  onDentalChange,
  onVisionChange,
  onPrescriptionChange,
}: FamilySizeProps) {
  return (
    <div className="fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="text-primary text-2xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          How many family members need coverage?
        </h2>
        <p className="text-gray-600 text-lg">
          Include yourself and any dependents who need health insurance.
        </p>
      </div>
      
      <div className="max-w-md mx-auto">
        <Label htmlFor="family-size" className="block text-sm font-medium text-gray-700 mb-2">
          Number of people
        </Label>
        <Select value={familySize.toString()} onValueChange={(value) => onFamilySizeChange(parseInt(value))}>
          <SelectTrigger className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary text-lg">
            <SelectValue placeholder="Select family size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 person (Individual)</SelectItem>
            <SelectItem value="2">2 people (Couple)</SelectItem>
            <SelectItem value="3">3 people (Family)</SelectItem>
            <SelectItem value="4">4 people (Family)</SelectItem>
            <SelectItem value="5">5+ people (Large family)</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="mt-6 space-y-3">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="dental"
              checked={includeDental}
              onCheckedChange={onDentalChange}
              className="rounded border-gray-300"
            />
            <Label htmlFor="dental" className="text-gray-700">Include dental coverage</Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="vision"
              checked={includeVision}
              onCheckedChange={onVisionChange}
              className="rounded border-gray-300"
            />
            <Label htmlFor="vision" className="text-gray-700">Include vision coverage</Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="prescription"
              checked={includePrescription}
              onCheckedChange={onPrescriptionChange}
              className="rounded border-gray-300"
            />
            <Label htmlFor="prescription" className="text-gray-700">Include prescription drug coverage</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
