import { useState, useCallback } from 'react';
import { AssessmentData } from '@/types/assessment';

const initialData: AssessmentData = {
  immigrationStatus: '',
  countryOfOrigin: '',
  arrivalDate: '',
  familySize: 1,
  universityInsurance: '',
  employerBenefits: '',
  coverageNeeds: [],
  // Quebec-specific RAMQ fields
  ramqApplicationSubmitted: '',
  ramqSubmissionDate: '',
  ramqCardReceived: '',
  insuranceWithin5Days: '',
  // Coverage preferences
  includeDental: false,
  includeVision: false,
  includePrescription: false,
  includeEmergencyTravel: false,
};

export function useAssessment() {
  const [data, setData] = useState<AssessmentData>(initialData);
  const [currentStep, setCurrentStep] = useState(1);
  
  const getTotalSteps = useCallback(() => {
    // Quebec-focused flow: Status → Country → RAMQ Questions → Family Size
    return 4;
  }, []);

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
        return data.countryOfOrigin !== '';
      case 3:
        // Different validation based on immigration status
        if (data.immigrationStatus === 'work_permit') {
          // Work permit holders only need arrival date
          return data.arrivalDate !== '';
        } else if (data.immigrationStatus === 'study_permit') {
          // Students need arrival date and university insurance status
          return data.arrivalDate !== '' && data.universityInsurance !== '';
        } else {
          // Permanent residents need RAMQ questions completed
          return data.arrivalDate !== '' &&
                 data.ramqApplicationSubmitted !== '' && 
                 data.insuranceWithin5Days !== '' &&
                 (data.ramqApplicationSubmitted !== 'yes' || data.ramqSubmissionDate !== '');
        }
      case 4:
        // Family size and coverage preferences
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
