export interface AssessmentData {
  province: string;
  status: string;
  arrivalDate: string;
  familySize: number;
  includeDental: boolean;
  includeVision: boolean;
  includePrescription: boolean;
}

export interface Province {
  id: string;
  name: string;
  abbreviation: string;
  waitingPeriod: number;
  healthPlanName: string;
  applicationUrl: string;
  hasWaitingPeriod: boolean;
}

export interface InsuranceProvider {
  id: string;
  name: string;
  abbreviation: string;
  monthlyPrice: number;
  coverage: {
    emergencyMedical: string;
    prescriptionDrugs: boolean;
    dental: boolean;
    vision: boolean;
    physio: boolean;
  };
  features: string[];
  quoteUrl: string;
  provinces: string[];
  tag?: string;
}

export interface EligibilityRule {
  status: string;
  provinces: string[];
  waitingPeriodModifier: number;
  specialConsiderations: string[];
}

export interface WaitingPeriodCalculation {
  arrivalDate: Date;
  coverageStartDate: Date;
  daysRemaining: number;
  isEligible: boolean;
}
