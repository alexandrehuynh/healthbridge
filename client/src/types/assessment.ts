export interface AssessmentData {
  immigrationStatus: string;
  province: string;
  arrivalDate: string;
  familySize: number;
  universityInsurance: string;
  employerBenefits: string;
  coverageNeeds: string[];
  includeDental: boolean;
  includeVision: boolean;
  includePrescription: boolean;
  includeEmergencyTravel: boolean;
}

export interface ImmigrationStatus {
  id: string;
  label: string;
  description: string;
  eligibility: 'provincial_health_eligible' | 'provincial_health_conditional' | 'provincial_health_not_eligible';
}

export interface Province {
  id: string;
  name: string;
  abbreviation: string;
  waitingPeriod: number;
  healthPlanName: string;
  applicationUrl: string;
  hasWaitingPeriod: boolean;
  eligibilityByStatus: {
    [statusId: string]: {
      eligible: boolean;
      waitingPeriod: number;
      notes: string;
    };
  };
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
  targetStatuses: string[];
  insuranceType: 'primary' | 'supplementary' | 'gap' | 'travel';
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
