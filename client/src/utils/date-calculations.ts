import { WaitingPeriodCalculation } from '@/types/assessment';

export function calculateWaitingPeriod(arrivalDateString: string, waitingPeriodDays: number): WaitingPeriodCalculation {
  const arrivalDate = new Date(arrivalDateString);
  const coverageStartDate = new Date(arrivalDate);
  coverageStartDate.setDate(coverageStartDate.getDate() + waitingPeriodDays);
  
  const today = new Date();
  const daysRemaining = Math.max(0, Math.ceil((coverageStartDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  
  return {
    arrivalDate,
    coverageStartDate,
    daysRemaining,
    isEligible: daysRemaining === 0,
  };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-CA');
}
