import { InsuranceProvider } from '@/types/assessment';
import quebecInsuranceData from '@/data/quebec-insurance-providers.json';

export function getQuebecInsuranceProviders(familySize: number, immigrationStatus: string): InsuranceProvider[] {
  // Optimal 3-plan selection for hackathon demo
  const optimizedPlans = [
    'sun-life-quebec',      // Budget at $65
    'desjardins-visitor',   // Recommended at $75  
    'blue-cross-quebec'     // Comprehensive at $85
  ];

  return quebecInsuranceData
    .filter(provider => 
      provider.targetStatuses.includes(immigrationStatus) &&
      optimizedPlans.includes(provider.id)
    )
    .map(provider => ({
      ...provider,
      monthlyPrice: calculatePrice(provider.monthlyPrice, familySize),
      provinces: ['quebec'], // Ensure provinces array exists
      insuranceType: provider.insuranceType as 'primary' | 'supplementary' | 'gap' | 'travel'
    }))
    .sort((a, b) => {
      // Custom sort order: Sun Life -> Desjardins -> Blue Cross
      const order = ['sun-life-quebec', 'desjardins-visitor', 'blue-cross-quebec'];
      return order.indexOf(a.id) - order.indexOf(b.id);
    });
}

function calculatePrice(basePrice: number, familySize: number): number {
  // Family pricing logic
  if (familySize === 1) return basePrice;
  if (familySize === 2) return Math.round(basePrice * 1.6);
  if (familySize === 3) return Math.round(basePrice * 2.2);
  if (familySize === 4) return Math.round(basePrice * 2.8);
  return Math.round(basePrice * (2.8 + (familySize - 4) * 0.4));
}

export function getRecommendedProvider(providers: InsuranceProvider[]): InsuranceProvider | null {
  // Find the provider with "Most Popular" tag or best value
  const popular = providers.find(p => p.tag === "Most Popular");
  if (popular) return popular;
  
  const bestValue = providers.find(p => p.tag === "Best Value");
  if (bestValue) return bestValue;
  
  return providers[0] || null;
}
