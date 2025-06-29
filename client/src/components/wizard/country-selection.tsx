import { MapPin, Check, ExternalLink } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useBilateralAgreement, getBilateralAgreementMessage } from '@/hooks/use-bilateral-agreement';
import { useEffect } from 'react';

interface CountrySelectionProps {
  value: string;
  onChange: (value: string) => void;
}

// Popular origin countries for Quebec newcomers based on actual immigration data
const popularCountries = [
  { id: 'France', name: 'France' },
  { id: 'Morocco', name: 'Morocco' },
  { id: 'Algeria', name: 'Algeria' },
  { id: 'Haiti', name: 'Haiti' },
  { id: 'Tunisia', name: 'Tunisia' },
  { id: 'Lebanon', name: 'Lebanon' },
  { id: 'Syria', name: 'Syria' },
  { id: 'China', name: 'China' },
  { id: 'India', name: 'India' },
  { id: 'Iran', name: 'Iran' },
  { id: 'Colombia', name: 'Colombia' },
  { id: 'Brazil', name: 'Brazil' },
  { id: 'Cameroon', name: 'Cameroon' },
  { id: 'Ukraine', name: 'Ukraine' },
  { id: 'Belgium', name: 'Belgium' },
  { id: 'Germany', name: 'Germany' },
  { id: 'Italy', name: 'Italy' },
  { id: 'Philippines', name: 'Philippines' },
  { id: 'United States', name: 'United States' },
  { id: 'other', name: 'Other country' }
];

export default function CountrySelection({ value, onChange }: CountrySelectionProps) {
  const bilateralStatus = useBilateralAgreement(value);
  
  // Update assessment data with bilateral agreement status when country changes
  useEffect(() => {
    if (value && bilateralStatus.agreement) {
      // Store bilateral agreement data for use in other components
      const agreementData = {
        country: value,
        hasAgreement: bilateralStatus.agreement.hasAgreement,
        waitingPeriodWaived: bilateralStatus.agreement.waitingPeriodWaived,
        type: bilateralStatus.agreement.type,
        notes: bilateralStatus.agreement.notes,
        documentsRequired: bilateralStatus.agreement.documentsRequired
      };
      
      // Store in localStorage for persistence across navigation
      localStorage.setItem('bilateralAgreementStatus', JSON.stringify(agreementData));
    }
  }, [value, bilateralStatus.agreement]);

  const agreementMessage = value ? getBilateralAgreementMessage(bilateralStatus.agreement, value) : null;

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
          Quebec has bilateral social security agreements with several countries that can eliminate your waiting period.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
          {popularCountries.map((country) => {
            const countryAgreement = useBilateralAgreement(country.id);
            const hasFullAgreement = countryAgreement.agreement?.type === 'full' && countryAgreement.agreement?.waitingPeriodWaived;
            const hasPartialAgreement = countryAgreement.agreement?.type === 'partial';
            
            return (
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
                  
                  {hasFullAgreement && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                      No waiting period!
                    </Badge>
                  )}
                  {hasPartialAgreement && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      Partial agreement
                    </Badge>
                  )}
                </Label>
              </div>
            );
          })}
        </RadioGroup>

        {/* Bilateral Agreement Status Display */}
        {agreementMessage && value && value !== 'other' && !bilateralStatus.isLoading && (
          <div className={`mt-6 p-4 rounded-lg border ${
            agreementMessage.type === 'success' 
              ? 'bg-green-50 border-green-200' 
              : agreementMessage.type === 'warning'
              ? 'bg-yellow-50 border-yellow-200'
              : 'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-start space-x-3">
              <span className="text-lg mt-0.5">{agreementMessage.icon}</span>
              <div className="text-sm flex-1">
                <p className={`font-medium mb-2 ${
                  agreementMessage.type === 'success' 
                    ? 'text-green-900' 
                    : agreementMessage.type === 'warning'
                    ? 'text-yellow-900'
                    : 'text-blue-900'
                }`}>
                  {agreementMessage.type === 'success' ? 'Excellent news!' : 
                   agreementMessage.type === 'warning' ? 'Partial Agreement' : 
                   'Standard Waiting Period'}
                </p>
                <p className={`${
                  agreementMessage.type === 'success' 
                    ? 'text-green-800' 
                    : agreementMessage.type === 'warning'
                    ? 'text-yellow-800'
                    : 'text-blue-800'
                }`}>
                  {agreementMessage.message}
                </p>
                
                {bilateralStatus.agreement?.documentsRequired && bilateralStatus.agreement.documentsRequired.length > 0 && (
                  <div className="mt-3">
                    <p className={`font-medium text-xs ${
                      agreementMessage.type === 'success' 
                        ? 'text-green-900' 
                        : agreementMessage.type === 'warning'
                        ? 'text-yellow-900'
                        : 'text-blue-900'
                    }`}>
                      Required documents:
                    </p>
                    <ul className={`list-disc list-inside text-xs mt-1 ${
                      agreementMessage.type === 'success' 
                        ? 'text-green-800' 
                        : agreementMessage.type === 'warning'
                        ? 'text-yellow-800'
                        : 'text-blue-800'
                    }`}>
                      {bilateralStatus.agreement.documentsRequired.map((doc, index) => (
                        <li key={index}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Learn More Link */}
        {value && value !== 'other' && (
          <div className="mt-4 text-center">
            <a
              href="https://www.ramq.gouv.qc.ca/en/citizens/temporary-stays-outside-quebec/agreements-with-other-countries"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Learn more about bilateral agreements
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}