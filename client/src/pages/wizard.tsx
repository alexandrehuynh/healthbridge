import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useAssessment } from '@/hooks/use-assessment';
import ProgressIndicator from '@/components/wizard/progress-indicator';
import ImmigrationStatusSelection from '@/components/wizard/immigration-status';
import ProvinceSelection from '@/components/wizard/province-selection';
import PermanentResidentQuestions from '@/components/wizard/permanent-resident-questions';
import WorkPermitQuestions from '@/components/wizard/work-permit-questions';
import StudentQuestions from '@/components/wizard/student-questions';
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
          <ProvinceSelection
            value={data.province}
            onChange={(province) => updateData({ province })}
            immigrationStatus={data.immigrationStatus}
          />
        );
      case 3:
        // Conditional step based on immigration status
        if (data.immigrationStatus === 'permanent_resident') {
          return (
            <PermanentResidentQuestions
              arrivalDate={data.arrivalDate}
              familySize={data.familySize}
              onArrivalDateChange={(arrivalDate) => updateData({ arrivalDate })}
              onFamilySizeChange={(familySize) => updateData({ familySize })}
              province={data.province}
            />
          );
        } else if (data.immigrationStatus === 'work_permit') {
          return (
            <WorkPermitQuestions
              employerBenefits={data.employerBenefits}
              arrivalDate={data.arrivalDate}
              onEmployerBenefitsChange={(employerBenefits) => updateData({ employerBenefits })}
              onArrivalDateChange={(arrivalDate) => updateData({ arrivalDate })}
              province={data.province}
            />
          );
        } else if (data.immigrationStatus === 'study_permit') {
          return (
            <StudentQuestions
              universityInsurance={data.universityInsurance}
              coverageNeeds={data.coverageNeeds}
              onUniversityInsuranceChange={(universityInsurance) => updateData({ universityInsurance })}
              onCoverageNeedsChange={(coverageNeeds) => updateData({ coverageNeeds })}
              province={data.province}
            />
          );
        } else {
          // For visitors - simple family size question
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
        }
      case 4:
        // Final step for family size/coverage options if not already handled
        if (data.immigrationStatus === 'permanent_resident' || data.immigrationStatus === 'visitor') {
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
        }
        return null;
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
