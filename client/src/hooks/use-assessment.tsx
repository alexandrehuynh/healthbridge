import { useState, useCallback } from 'react';
import { AssessmentData } from '@/types/assessment';

const initialData: AssessmentData = {
  immigrationStatus: '',
  province: '',
  arrivalDate: '',
  familySize: 1,
  universityInsurance: '',
  employerBenefits: '',
  coverageNeeds: [],
  includeDental: false,
  includeVision: false,
  includePrescription: false,
  includeEmergencyTravel: false,
};

export function useAssessment() {
  const [data, setData] = useState<AssessmentData>(initialData);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const updateData = useCallback((updates: Partial<AssessmentData>) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const previousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const reset = useCallback(() => {
    setData(initialData);
    setCurrentStep(1);
  }, []);

  const getRequiredStepsForStatus = useCallback((status: string) => {
    switch (status) {
      case 'permanent_resident':
        return ['immigrationStatus', 'province', 'arrivalDate', 'familySize'];
      case 'work_permit':
        return ['immigrationStatus', 'province', 'employerBenefits', 'arrivalDate'];
      case 'study_permit':
        return ['immigrationStatus', 'province', 'universityInsurance', 'coverageNeeds'];
      case 'visitor':
        return ['immigrationStatus', 'province', 'familySize'];
      default:
        return ['immigrationStatus', 'province'];
    }
  }, []);

  const isStepValid = useCallback((step: number): boolean => {
    switch (step) {
      case 1:
        return data.immigrationStatus !== '';
      case 2:
        return data.province !== '';
      case 3:
        // Conditional validation based on immigration status
        if (data.immigrationStatus === 'permanent_resident') {
          return data.arrivalDate !== '';
        } else if (data.immigrationStatus === 'work_permit') {
          return data.employerBenefits !== '';
        } else if (data.immigrationStatus === 'study_permit') {
          return data.universityInsurance !== '';
        }
        return true; // For visitors, step 3 might not be needed
      case 4:
        return data.familySize > 0 || data.coverageNeeds.length > 0;
      default:
        return false;
    }
  }, [data]);

  const isCurrentStepValid = useCallback(() => {
    return isStepValid(currentStep);
  }, [currentStep, isStepValid]);

  const canProceed = useCallback(() => {
    return currentStep === totalSteps ? true : isCurrentStepValid();
  }, [currentStep, totalSteps, isCurrentStepValid]);

  return {
    data,
    currentStep,
    totalSteps,
    updateData,
    nextStep,
    previousStep,
    reset,
    isStepValid,
    isCurrentStepValid,
    canProceed,
    getRequiredStepsForStatus,
  };
}
