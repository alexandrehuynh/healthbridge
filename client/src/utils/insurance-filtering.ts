import { InsuranceProvider } from '@/types/assessment';
import insuranceData from '@/data/insurance-providers.json';

export function getInsuranceProviders(province: string, familySize: number): InsuranceProvider[] {
  return insuranceData
    .filter(provider => provider.provinces.includes(province))
    .map(provider => ({
      ...provider,
      monthlyPrice: calculatePrice(provider.monthlyPrice, familySize)
    }))
    .sort((a, b) => a.monthlyPrice - b.monthlyPrice);
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
