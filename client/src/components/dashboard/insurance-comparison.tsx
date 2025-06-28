import { ExternalLink, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InsuranceProvider } from '@/types/assessment';

interface InsuranceComparisonProps {
  providers: InsuranceProvider[];
}

export default function InsuranceComparison({ providers }: InsuranceComparisonProps) {
  const getTagColor = (tag?: string) => {
    switch (tag) {
      case 'Most Popular':
        return 'bg-success/10 text-success';
      case 'Best Value':
        return 'bg-primary/10 text-primary';
      case 'Budget Option':
        return 'bg-warning/10 text-warning';
      case 'Comprehensive':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProviderColor = (abbreviation: string) => {
    switch (abbreviation) {
      case 'BC':
        return 'bg-blue-600';
      case 'ML':
        return 'bg-green-600';
      case 'SL':
        return 'bg-yellow-600';
      case 'CV':
        return 'bg-purple-600';
      default:
        return 'bg-gray-600';
    }
  };

  if (providers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No insurance providers available for your selected province.</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Recommended Insurance Plans
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.slice(0, 3).map((provider) => (
          <div 
            key={provider.id}
            className="bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-primary transition-colors p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${getProviderColor(provider.abbreviation)} rounded-lg flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">{provider.abbreviation}</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">${provider.monthlyPrice}</div>
                <div className="text-sm text-gray-600">/month</div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{provider.name}</h3>
            <p className="text-gray-600 mb-4">
              {provider.coverage.emergencyMedical} emergency medical coverage
            </p>
            
            <div className="space-y-2 mb-6">
              {provider.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm">
                  <Check className="text-success mr-2 w-4 h-4" />
                  <span>{feature}</span>
                </div>
              ))}
              {!provider.coverage.dental && (
                <div className="flex items-center text-sm">
                  <X className="text-gray-400 mr-2 w-4 h-4" />
                  <span className="text-gray-400">No dental coverage</span>
                </div>
              )}
            </div>
            
            <Button 
              asChild
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <a href={provider.quoteUrl} target="_blank" rel="noopener noreferrer">
                Get Quote
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
            
            {provider.tag && (
              <div className="mt-3 text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTagColor(provider.tag)}`}>
                  {provider.tag}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
