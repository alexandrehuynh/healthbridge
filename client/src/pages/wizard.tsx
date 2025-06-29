import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useAssessment } from '@/hooks/use-assessment';
import ProgressIndicator from '@/components/wizard/progress-indicator';
import { WizardProgressIllustration } from '@/components/illustrations/step-icons';
import ImmigrationStatusSelection from '@/components/wizard/immigration-status';
import CountrySelection from '@/components/wizard/country-selection';
import RAMQQuestions from '@/components/wizard/ramq-questions';
import WorkPermitInfo from '@/components/wizard/work-permit-info';
import StudentInfo from '@/components/wizard/student-info';
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
          <ImmigrationStatusSelection
            value={data.immigrationStatus}
            onChange={(immigrationStatus) => updateData({ immigrationStatus })}
          />
        );
      case 2:
        return (
          <CountrySelection
            value={data.countryOfOrigin}
            onChange={(countryOfOrigin) => updateData({ countryOfOrigin })}
          />
        );
      case 3:
        // Route to different components based on immigration status
        if (data.immigrationStatus === 'work_permit') {
          return (
            <WorkPermitInfo
              arrivalDate={data.arrivalDate}
              onArrivalDateChange={(arrivalDate) => updateData({ arrivalDate })}
            />
          );
        } else if (data.immigrationStatus === 'study_permit') {
          return (
            <StudentInfo
              arrivalDate={data.arrivalDate}
              universityInsurance={data.universityInsurance}
              onArrivalDateChange={(arrivalDate) => updateData({ arrivalDate })}
              onUniversityInsuranceChange={(universityInsurance) => updateData({ universityInsurance })}
            />
          );
        } else {
          // Permanent residents and citizens get RAMQ questions
          return (
            <RAMQQuestions
              ramqApplicationSubmitted={data.ramqApplicationSubmitted}
              ramqSubmissionDate={data.ramqSubmissionDate}
              ramqCardReceived={data.ramqCardReceived}
              insuranceWithin5Days={data.insuranceWithin5Days}
              arrivalDate={data.arrivalDate}
              onRAMQApplicationChange={(ramqApplicationSubmitted) => updateData({ ramqApplicationSubmitted })}
              onRAMQSubmissionDateChange={(ramqSubmissionDate) => updateData({ ramqSubmissionDate })}
              onRAMQCardReceivedChange={(ramqCardReceived) => updateData({ ramqCardReceived })}
              onInsuranceWithin5DaysChange={(insuranceWithin5Days) => updateData({ insuranceWithin5Days })}
              onArrivalDateChange={(arrivalDate) => updateData({ arrivalDate })}
              countryOfOrigin={data.countryOfOrigin}
            />
          );
        }
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
        <WizardProgressIllustration currentStep={currentStep} totalSteps={totalSteps} />
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
