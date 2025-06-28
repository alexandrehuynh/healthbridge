import { useMemo } from 'react';
import { WaitingPeriodCalculation } from '@/types/assessment';
import { calculateWaitingPeriod } from '@/utils/date-calculations';
import provincesData from '@/data/provinces.json';

export function useWaitingPeriod(province: string, arrivalDate: string) {
  const calculation = useMemo((): WaitingPeriodCalculation | null => {
    if (!province || !arrivalDate) return null;

    const provinceData = provincesData.find(p => p.id === province);
    if (!provinceData) return null;

    return calculateWaitingPeriod(arrivalDate, provinceData.waitingPeriod);
  }, [province, arrivalDate]);

  return calculation;
}
