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
  
  const getTotalSteps = useCallback(() => {
    if (!data.immigrationStatus) return 4;
    switch (data.immigrationStatus) {
      case 'permanent_resident':
        return 4; // Status → Province → PR Questions → Family Size
      case 'work_permit':
        return 3; // Status → Province → Work Questions (includes conditional arrival date)
      case 'study_permit':
        return 3; // Status → Province → Student Questions
      case 'visitor':
        return 3; // Status → Province → Family Size
      default:
        return 4;
    }
  }, [data.immigrationStatus]);

  const totalSteps = getTotalSteps();

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
          return data.arrivalDate !== '' && data.familySize > 0;
        } else if (data.immigrationStatus === 'work_permit') {
          return data.employerBenefits !== '' && 
                 (data.employerBenefits === 'yes' || data.arrivalDate !== '');
        } else if (data.immigrationStatus === 'study_permit') {
          return data.universityInsurance !== '' && data.coverageNeeds.length > 0;
        } else if (data.immigrationStatus === 'visitor') {
          return data.familySize > 0;
        }
        return true;
      case 4:
        // Only for permanent residents - final family size step
        return data.familySize > 0;
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
