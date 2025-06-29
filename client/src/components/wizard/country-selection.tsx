import { MapPin, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import CountrySelector from '@/components/ui/country-selector';
import { useBilateralAgreement } from '@/hooks/use-bilateral-agreement';

interface CountrySelectionProps {
  value: string;
  onChange: (value: string) => void;
}

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
        <CountrySelector
          value={value}
          onChange={onChange}
          placeholder="Search for your country..."
          className="w-full"
        />

        {/* Learn More Link */}
        {value && value !== 'other' && (
          <div className="mt-6 text-center">
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