import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useEffect } from 'react';
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
    // Check for bilateral agreement magic moment after country selection (step 2)
    if (currentStep === 2 && data.countryOfOrigin) {
      const bilateralCountries = [
        'France', 'Belgium', 'Denmark', 'Finland', 'Greece', 
        'Italy', 'Luxembourg', 'Netherlands', 'Norway', 
        'Portugal', 'Sweden', 'Romania', 'Austria'
      ];
      
      const hasBilateralAgreement = bilateralCountries.includes(data.countryOfOrigin);
      
      // Only bilateral magic for RAMQ-eligible statuses (permanent residents)
      if (hasBilateralAgreement && data.immigrationStatus === 'permanent_resident') {
        // Store basic assessment data for bilateral success page
        const assessmentData = {
          countryOfOrigin: data.countryOfOrigin,
          immigrationStatus: data.immigrationStatus,
          familySize: 1, // Default for bilateral flow
          bilateralAgreement: true
        };
        localStorage.setItem('assessmentData', JSON.stringify(assessmentData));
        
        // BOOM! Instant magic - route to bilateral success page
        setLocation('/bilateral-success');
        return;
      }
    }
    
    if (currentStep === totalSteps) {
      // Store assessment data
      localStorage.setItem('assessmentData', JSON.stringify(data));
      
      // Smart routing based on immigration status
      if (data.immigrationStatus === 'visitor' || data.immigrationStatus === 'study_permit') {
        // Visitors and students go directly to insurance options (not RAMQ eligible)
        setLocation('/results');
      } else if (data.immigrationStatus === 'work_permit') {
        // Work permit holders may be conditionally eligible - show both RAMQ info and insurance
        setLocation('/results');
      } else {
        // Permanent residents go to full results with RAMQ timeline
        setLocation('/results');
      }
    } else {
      nextStep();
      // Scroll to top for next step
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    previousStep();
    // Scroll to top for previous step
    window.scrollTo(0, 0);
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
            onClick={handlePrevious}
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
