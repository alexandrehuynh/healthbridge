import { MapPin, Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface CountrySelectionProps {
  value: string;
  onChange: (value: string) => void;
}

// Countries with Quebec bilateral social security agreements (no waiting period)
const socialSecurityCountries = [
  'France', 'Belgium', 'Denmark', 'Finland', 'Luxembourg', 
  'Norway', 'Portugal', 'Sweden', 'Greece', 'United States',
  'Germany', 'Austria', 'Netherlands', 'Italy', 'Spain',
  'Switzerland', 'United Kingdom', 'Ireland', 'Australia',
  'New Zealand', 'Japan', 'South Korea', 'Chile', 'Croatia',
  'Czech Republic', 'Hungary', 'Poland', 'Slovenia', 'Slovakia',
  'Turkey', 'Israel', 'Morocco', 'Tunisia'
];

// Popular origin countries for Quebec newcomers
const popularCountries = [
  { id: 'france', name: 'France', hasAgreement: true },
  { id: 'morocco', name: 'Morocco', hasAgreement: true },
  { id: 'tunisia', name: 'Tunisia', hasAgreement: true },
  { id: 'algeria', name: 'Algeria', hasAgreement: false },
  { id: 'haiti', name: 'Haiti', hasAgreement: false },
  { id: 'lebanon', name: 'Lebanon', hasAgreement: false },
  { id: 'syria', name: 'Syria', hasAgreement: false },
  { id: 'china', name: 'China', hasAgreement: false },
  { id: 'india', name: 'India', hasAgreement: false },
  { id: 'iran', name: 'Iran', hasAgreement: false },
  { id: 'colombia', name: 'Colombia', hasAgreement: false },
  { id: 'brazil', name: 'Brazil', hasAgreement: false },
  { id: 'cameroon', name: 'Cameroon', hasAgreement: false },
  { id: 'senegal', name: 'Senegal', hasAgreement: false },
  { id: 'ukraine', name: 'Ukraine', hasAgreement: false },
  { id: 'other', name: 'Other country', hasAgreement: false }
];

export default function CountrySelection({ value, onChange }: CountrySelectionProps) {
  const selectedCountry = popularCountries.find(country => country.id === value);
  const hasAgreement = selectedCountry?.hasAgreement || false;

  return (
    <div className="fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="text-primary text-2xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          What country are you from?
        </h2>
        <p className="text-gray-600 text-lg">
          Quebec has bilateral social security agreements with many countries that can eliminate your waiting period.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
          {popularCountries.map((country) => (
            <div key={country.id} className="relative">
              <RadioGroupItem value={country.id} id={country.id} className="sr-only" />
              <Label
                htmlFor={country.id}
                className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-primary group ${
                  value === country.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                    value === country.id ? 'bg-primary text-white' : 'bg-gray-100'
                  }`}>
                    {value === country.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="text-gray-600 font-semibold text-sm">
                        {country.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <span className="font-medium text-gray-900">{country.name}</span>
                </div>
                
                {country.hasAgreement && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                    No waiting period!
                  </Badge>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {hasAgreement && value && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="text-white w-3 h-3" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-green-900 mb-1">Great news!</p>
                <p className="text-green-800">
                  As a citizen of {selectedCountry?.name}, you may be eligible for immediate RAMQ coverage 
                  thanks to Quebec's bilateral social security agreement. No 3-month waiting period required!
                </p>
              </div>
            </div>
          </div>
        )}

        {!hasAgreement && value && value !== 'other' && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 mb-1">Standard waiting period applies</p>
                <p className="text-blue-800">
                  Citizens of {selectedCountry?.name} are subject to the standard 3-month RAMQ waiting period. 
                  Private insurance is strongly recommended during this time.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}