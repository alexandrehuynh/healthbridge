import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useAssessment } from '@/hooks/use-assessment';
import ProgressIndicator from '@/components/wizard/progress-indicator';
import ProvinceSelection from '@/components/wizard/province-selection';
import StatusSelection from '@/components/wizard/status-selection';
import ArrivalDate from '@/components/wizard/arrival-date';
import FamilySize from '@/components/wizard/family-size';

export default function Wizard() {
  const [, setLocation] = useLocation();
  const {
    data,
    currentStep,
    totalSteps,
    updateData,
    nextStep,
    previousStep,
    isCurrentStepValid,
    canProceed,
  } = useAssessment();

  const handleNext = () => {
    if (currentStep === totalSteps) {
      // Store assessment data and navigate to results
      localStorage.setItem('assessmentData', JSON.stringify(data));
      setLocation('/results');
    } else {
      nextStep();
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProvinceSelection
            value={data.province}
            onChange={(province) => updateData({ province })}
          />
        );
      case 2:
        return (
          <StatusSelection
            value={data.status}
            onChange={(status) => updateData({ status })}
          />
        );
      case 3:
        return (
          <ArrivalDate
            value={data.arrivalDate}
            onChange={(arrivalDate) => updateData({ arrivalDate })}
          />
        );
      case 4:
        return (
          <FamilySize
            familySize={data.familySize}
            onFamilySizeChange={(familySize) => updateData({ familySize })}
            includeDental={data.includeDental}
            includeVision={data.includeVision}
            includePrescription={data.includePrescription}
            onDentalChange={(includeDental) => updateData({ includeDental })}
            onVisionChange={(includeVision) => updateData({ includeVision })}
            onPrescriptionChange={(includePrescription) => updateData({ includePrescription })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
        
        {renderCurrentStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12">
          <Button
            variant="outline"
            onClick={previousStep}
            className={`px-6 py-3 ${currentStep === 1 ? 'invisible' : ''}`}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Previous
          </Button>
          <div className="flex-1"></div>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="px-8 py-3 font-semibold"
          >
            {currentStep === totalSteps ? 'Get My Results' : 'Next'}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
