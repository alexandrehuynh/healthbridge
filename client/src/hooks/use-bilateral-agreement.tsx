import { useState, useEffect } from 'react';

export interface BilateralAgreement {
  hasAgreement: boolean;
  type: 'full' | 'partial' | 'none';
  waitingPeriodWaived: boolean;
  documentsRequired: string[];
  notes: string;
}

export interface BilateralAgreementStatus {
  country: string;
  agreement: BilateralAgreement | null;
  isLoading: boolean;
  error: string | null;
}

// Type-safe bilateral agreements database
export const bilateralAgreementsData: Record<string, BilateralAgreement> = {
  "France": {
    hasAgreement: true,
    type: "full",
    waitingPeriodWaived: true,
    documentsRequired: ["French social security certificate", "Proof of coverage from France"],
    notes: "Full social security agreement - no waiting period with proper documentation"
  },
  "Belgium": {
    hasAgreement: true,
    type: "full",
    waitingPeriodWaived: true,
    documentsRequired: ["Belgian social security certificate", "Proof of coverage from Belgium"],
    notes: "Full social security agreement - no waiting period with proper documentation"
  },
  "Denmark": {
    hasAgreement: true,
    type: "full",
    waitingPeriodWaived: true,
    documentsRequired: ["Danish social security certificate", "Proof of coverage from Denmark"],
    notes: "Full social security agreement - no waiting period with proper documentation"
  },
  "Finland": {
    hasAgreement: true,
    type: "full",
    waitingPeriodWaived: true,
    documentsRequired: ["Finnish social security certificate", "Proof of coverage from Finland"],
    notes: "Full social security agreement - no waiting period with proper documentation"
  },
  "Greece": {
    hasAgreement: true,
    type: "full",
    waitingPeriodWaived: true,
    documentsRequired: ["Greek social security certificate", "Proof of coverage from Greece"],
    notes: "Full social security agreement - no waiting period with proper documentation"
  },
  "Luxembourg": {
    hasAgreement: true,
    type: "full",
    waitingPeriodWaived: true,
    documentsRequired: ["Luxembourg social security certificate", "Proof of coverage from Luxembourg"],
    notes: "Full social security agreement - no waiting period with proper documentation"
  },
  "Norway": {
    hasAgreement: true,
    type: "full",
    waitingPeriodWaived: true,
    documentsRequired: ["Norwegian social security certificate", "Proof of coverage from Norway"],
    notes: "Full social security agreement - no waiting period with proper documentation"
  },
  "Portugal": {
    hasAgreement: true,
    type: "full",
    waitingPeriodWaived: true,
    documentsRequired: ["Portuguese social security certificate", "Proof of coverage from Portugal"],
    notes: "Full social security agreement - no waiting period with proper documentation"
  },
  "Sweden": {
    hasAgreement: true,
    type: "full",
    waitingPeriodWaived: true,
    documentsRequired: ["Swedish social security certificate", "Proof of coverage from Sweden"],
    notes: "Full social security agreement - no waiting period with proper documentation"
  },
  "Austria": {
    hasAgreement: true,
    type: "full",
    waitingPeriodWaived: true,
    documentsRequired: ["Austrian social security certificate", "Proof of coverage from Austria"],
    notes: "Full social security agreement - no waiting period with proper documentation"
  },
  "Germany": {
    hasAgreement: true,
    type: "partial",
    waitingPeriodWaived: false,
    documentsRequired: ["German social security forms", "Specific coverage documentation"],
    notes: "Partial agreement - case by case evaluation required"
  },
  "Netherlands": {
    hasAgreement: true,
    type: "partial",
    waitingPeriodWaived: false,
    documentsRequired: ["Dutch social security certificate", "Specific coverage documentation"],
    notes: "Partial agreement - case by case evaluation required"
  },
  "Italy": {
    hasAgreement: true,
    type: "partial",
    waitingPeriodWaived: false,
    documentsRequired: ["Italian social security certificate", "Specific coverage documentation"],
    notes: "Partial agreement - case by case evaluation required"
  }
};

export function useBilateralAgreement(country: string): BilateralAgreementStatus {
  const [status, setStatus] = useState<BilateralAgreementStatus>({
    country,
    agreement: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (!country || country.trim() === '') {
      setStatus({
        country,
        agreement: null,
        isLoading: false,
        error: null,
      });
      return;
    }

    setStatus(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Check if country exists in our bilateral agreements database
      const agreement = bilateralAgreementsData[country];
      
      if (agreement) {
        setStatus({
          country,
          agreement,
          isLoading: false,
          error: null,
        });
      } else {
        // Default to no agreement for countries not in our database
        setStatus({
          country,
          agreement: {
            hasAgreement: false,
            type: 'none',
            waitingPeriodWaived: false,
            documentsRequired: [],
            notes: 'No agreement - standard 3-month waiting period applies'
          },
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      setStatus({
        country,
        agreement: null,
        isLoading: false,
        error: 'Unable to check bilateral agreement status',
      });
    }
  }, [country]);

  return status;
}

export function getBilateralAgreementMessage(agreement: BilateralAgreement | null, country: string): {
  message: string;
  type: 'success' | 'warning' | 'error';
  icon: string;
} {
  if (!agreement) {
    return {
      message: 'Unable to determine bilateral agreement status',
      type: 'error',
      icon: '❓'
    };
  }

  if (agreement.type === 'full' && agreement.waitingPeriodWaived) {
    return {
      message: `Excellent! ${country} has a social security agreement with Quebec. You may be able to skip the 3-month waiting period. You'll need to provide your ${country.toLowerCase()} social security certificate when applying for RAMQ.`,
      type: 'success',
      icon: '🟢'
    };
  }

  if (agreement.type === 'partial') {
    return {
      message: `${country} has a partial agreement with Quebec. Your eligibility for reduced waiting period will depend on your specific ${country.toLowerCase()} social security coverage. Individual assessment required.`,
      type: 'warning',
      icon: '🟡'
    };
  }

  return {
    message: `${country} does not have a social security agreement with Quebec. The standard 3-month waiting period will apply to your RAMQ coverage.`,
    type: 'error',
    icon: '🔴'
  };
}

export function getWaitingPeriodDays(agreement: BilateralAgreement | null): number {
  if (!agreement) return 90; // Default 3 months
  
  if (agreement.type === 'full' && agreement.waitingPeriodWaived) {
    return 0; // No waiting period
  }
  
  return 90; // Standard 3-month waiting period
}