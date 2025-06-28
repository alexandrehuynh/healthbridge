import { useState, useCallback } from 'react';
import { AssessmentData } from '@/types/assessment';

const initialData: AssessmentData = {
  province: '',
  status: '',
  arrivalDate: '',
  familySize: 1,
  includeDental: false,
  includeVision: false,
  includePrescription: false,
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

  const isStepValid = useCallback((step: number): boolean => {
    switch (step) {
      case 1:
        return data.province !== '';
      case 2:
        return data.status !== '';
      case 3:
        return data.arrivalDate !== '';
      case 4:
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
  };
}
