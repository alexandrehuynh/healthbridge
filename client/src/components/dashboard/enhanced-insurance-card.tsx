import { Shield, Check, X, ExternalLink, Star, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InsuranceProvider } from '@/types/assessment';

interface EnhancedInsuranceCardProps {
  provider: InsuranceProvider;
  isRecommended?: boolean;
  familySize: number;
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function EnhancedInsuranceCard({ provider, isRecommended, familySize, isSelected, onSelect }: EnhancedInsuranceCardProps) {
  const getProviderLogo = (providerName: string) => {
    // Quebec-focused provider visual representations
    const logoMap: Record<string, JSX.Element> = {
      'Desjardins': (
        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">D</span>
        </div>
      ),
      'Blue Cross Quebec': (
        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" />
        </div>
      ),
      'Sun Life Quebec': (
        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">☀</span>
        </div>
      ),
      'Manulife Quebec': (
        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">M</span>
        </div>
      ),
      'iA Financial Quebec': (
        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">iA</span>
        </div>
      )
    };

    return logoMap[providerName] || (
      <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
        <Shield className="w-6 h-6 text-white" />
      </div>
    );
  };

  const getCoverageVisual = (coverage: any) => {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center space-x-2">
          {coverage.emergencyMedical ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-400" />}
          <span className="text-sm text-gray-600">Emergency Medical</span>
        </div>
        <div className="flex items-center space-x-2">
          {coverage.prescriptionDrugs ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-400" />}
          <span className="text-sm text-gray-600">Prescription Drugs</span>
        </div>
        <div className="flex items-center space-x-2">
          {coverage.dental ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-400" />}
          <span className="text-sm text-gray-600">Dental Care</span>
        </div>
        <div className="flex items-center space-x-2">
          {coverage.vision ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-400" />}
          <span className="text-sm text-gray-600">Vision Care</span>
        </div>
      </div>
    );
  };

  const getPriceColor = () => {
    if (provider.monthlyPrice <= 60) return 'text-green-600';
    if (provider.monthlyPrice <= 100) return 'text-blue-600';
    return 'text-orange-600';
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-lg border transition-all duration-200 cursor-pointer hover:shadow-xl hover:transform hover:-translate-y-1 ${
        isSelected 
          ? 'border-blue-500 ring-2 ring-blue-100 bg-blue-50/30' 
          : isRecommended 
          ? 'border-green-300 ring-2 ring-green-100' 
          : 'border-gray-200 hover:border-blue-300'
      }`}
      onClick={onSelect}
    >
      {isRecommended && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-t-xl">
          <div className="flex items-center justify-center space-x-2">
            <Star className="w-4 h-4" />
            <span className="font-semibold text-sm">Recommended for You</span>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Provider Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getProviderLogo(provider.name)}
            <div>
              <h3 className="font-bold text-lg text-gray-900">{provider.name}</h3>
              <p className="text-sm text-gray-600">{provider.abbreviation}</p>
            </div>
          </div>
          {provider.tag && (
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
              {provider.tag}
            </Badge>
          )}
        </div>

        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-baseline space-x-2">
            <span className={`text-3xl font-bold ${getPriceColor()}`}>
              ${provider.monthlyPrice}
            </span>
            <span className="text-gray-500">/month</span>
            {familySize > 1 && (
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>Family of {familySize}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Emergency coverage: {provider.coverage.emergencyMedical}
          </p>
        </div>

        {/* Coverage Visual */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Shield className="w-4 h-4 mr-2 text-blue-600" />
            Coverage Details
          </h4>
          {getCoverageVisual(provider.coverage)}
        </div>

        {/* Key Features */}
        {provider.features.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Heart className="w-4 h-4 mr-2 text-red-500" />
              Key Benefits
            </h4>
            <ul className="space-y-2">
              {provider.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Insurance Type Badge */}
        <div className="mb-4">
          <Badge 
            variant="outline" 
            className={`${
              provider.insuranceType === 'primary' 
                ? 'border-green-300 text-green-700 bg-green-50' 
                : provider.insuranceType === 'supplementary'
                ? 'border-blue-300 text-blue-700 bg-blue-50'
                : 'border-orange-300 text-orange-700 bg-orange-50'
            }`}
          >
            {provider.insuranceType === 'primary' && '🛡️ Primary Coverage'}
            {provider.insuranceType === 'supplementary' && '➕ Supplementary'}
            {provider.insuranceType === 'gap' && '🔗 Gap Coverage'}
            {provider.insuranceType === 'travel' && '✈️ Travel Insurance'}
          </Badge>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
          onClick={(e) => {
            e.stopPropagation();
            window.open(provider.quoteUrl, '_blank');
          }}
        >
          <span>Get Quote</span>
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>

        {/* Quebec Specific Note */}
        {provider.provinces.includes('QC') && (
          <p className="text-xs text-gray-500 mt-3 text-center">
            Available in Quebec • Licensed by AMF Quebec
          </p>
        )}
      </div>
    </div>
  );
}