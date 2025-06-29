import { MapPin, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import CountrySelector from '@/components/ui/country-selector';
import { useBilateralAgreement } from '@/hooks/use-bilateral-agreement';
import { useLocation } from 'wouter';

interface CountrySelectionProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CountrySelection({ value, onChange }: CountrySelectionProps) {
  const [, setLocation] = useLocation();
  const bilateralStatus = useBilateralAgreement(value);
  
  // Bilateral agreement countries with immediate coverage
  const bilateralCountries = [
    'France', 'Belgium', 'Denmark', 'Finland', 'Greece', 
    'Italy', 'Luxembourg', 'Netherlands', 'Norway', 
    'Portugal', 'Sweden', 'Romania', 'Austria'
  ];
  
  // Handle country selection with immediate routing for bilateral countries
  const handleCountryChange = (selectedCountry: string) => {
    onChange(selectedCountry);
    
    // IMMEDIATE redirect for bilateral agreement countries - the magic moment!
    if (bilateralCountries.includes(selectedCountry)) {
      // Store basic assessment data for bilateral success page
      const assessmentData = {
        countryOfOrigin: selectedCountry,
        immigrationStatus: 'permanent_resident', // Default for bilateral flow
        familySize: 1, // Default, can be updated later if needed
        bilateralAgreement: true
      };
      localStorage.setItem('assessmentData', JSON.stringify(assessmentData));
      
      // Store bilateral agreement data
      if (bilateralStatus.agreement) {
        const agreementData = {
          country: selectedCountry,
          hasAgreement: bilateralStatus.agreement.hasAgreement,
          waitingPeriodWaived: bilateralStatus.agreement.waitingPeriodWaived,
          type: bilateralStatus.agreement.type,
          notes: bilateralStatus.agreement.notes,
          documentsRequired: bilateralStatus.agreement.documentsRequired
        };
        localStorage.setItem('bilateralAgreementStatus', JSON.stringify(agreementData));
      }
      
      // BOOM! Instant magic - skip all wizard steps
      setTimeout(() => {
        setLocation('/bilateral-success');
      }, 500); // Small delay for smooth UX
    }
  };
  
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
      <div className="text-center mb-6 sm:mb-8 px-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="text-primary text-xl sm:text-2xl" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
          What country are you from?
        </h2>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          Quebec has bilateral social security agreements with several countries that can eliminate your waiting period.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto px-4">
        <CountrySelector
          value={value}
          onChange={handleCountryChange}
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