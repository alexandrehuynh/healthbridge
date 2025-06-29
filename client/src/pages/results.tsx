import { useEffect, useState } from 'react';
import { CheckCircle, Bookmark, Share, RotateCcw, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigateWithScroll } from '@/hooks/use-scroll-reset';
import { AssessmentData, InsuranceProvider } from '@/types/assessment';
import { getQuebecInsuranceProviders } from '@/utils/insurance-filtering';
import { formatDate, calculateWaitingPeriod } from '@/utils/date-calculations';
import VisualTimeline from '@/components/dashboard/visual-timeline';
import EnhancedInsuranceCard from '@/components/dashboard/enhanced-insurance-card';
import ActionChecklist from '@/components/dashboard/action-checklist';
import { useToast } from '@/hooks/use-toast';
import { useBilateralAgreement, getWaitingPeriodDays } from '@/hooks/use-bilateral-agreement';

export default function Results() {
  const navigate = useNavigateWithScroll();
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [bilateralAgreementData, setBilateralAgreementData] = useState<any>(null);
  const [selectedInsurance, setSelectedInsurance] = useState<string>('desjardins-visitor');
  const [selectedProvider, setSelectedProvider] = useState<InsuranceProvider | null>(null);
  const { toast } = useToast();

  // Get bilateral agreement status for the selected country
  const countryOfOrigin = assessmentData?.countryOfOrigin || '';
  const bilateralStatus = useBilateralAgreement(countryOfOrigin);

  useEffect(() => {
    const savedData = localStorage.getItem('assessmentData');
    console.log('Saved assessment data:', savedData);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      console.log('Parsed assessment data:', parsedData);
      setAssessmentData(parsedData);
    } else {
      console.log('No assessment data found, redirecting to wizard');
      // Redirect to wizard if no data found
      navigate('/wizard');
    }

    // Load bilateral agreement data
    const savedBilateralData = localStorage.getItem('bilateralAgreementStatus');
    if (savedBilateralData) {
      setBilateralAgreementData(JSON.parse(savedBilateralData));
    }
  }, [navigate]);

  // Quebec-specific data structure
  const quebecData = {
    id: "quebec",
    name: "Quebec",
    abbreviation: "QC",
    waitingPeriod: 90,
    healthPlanName: "RAMQ",
    applicationUrl: "https://www.ramq.gouv.qc.ca/en",
    hasWaitingPeriod: true
  };

  // Enhanced waiting period calculation using bilateral agreement data
  const getWaitingPeriod = () => {
    if (bilateralStatus.agreement) {
      return getWaitingPeriodDays(bilateralStatus.agreement);
    }
    return 90; // Default 3-month waiting period
  };

  const waitingPeriodDays = getWaitingPeriod();
  
  const waitingPeriodCalculation = assessmentData?.ramqSubmissionDate 
    ? calculateWaitingPeriod(assessmentData.ramqSubmissionDate, waitingPeriodDays)
    : assessmentData?.arrivalDate 
    ? calculateWaitingPeriod(assessmentData.arrivalDate, waitingPeriodDays) 
    : calculateWaitingPeriod(new Date().toISOString().split('T')[0], waitingPeriodDays); // Fallback to today's date

  console.log('Assessment data for calculation:', {
    ramqSubmissionDate: assessmentData?.ramqSubmissionDate,
    arrivalDate: assessmentData?.arrivalDate,
    waitingPeriodCalculation
  });

  const insuranceProviders = assessmentData ? getQuebecInsuranceProviders(
    assessmentData.familySize,
    assessmentData.immigrationStatus
  ) : [];

  // Set default selection to first provider when providers load
  useEffect(() => {
    if (assessmentData && !selectedInsurance) {
      const providers = getQuebecInsuranceProviders(
        assessmentData.familySize,
        assessmentData.immigrationStatus
      );
      if (providers.length > 0) {
        setSelectedInsurance(providers[0].id);
        setSelectedProvider(providers[0]);
      }
    }
  }, [assessmentData?.familySize, assessmentData?.immigrationStatus, selectedInsurance]);

  // Update selected provider when selection changes
  useEffect(() => {
    if (selectedInsurance && insuranceProviders.length > 0) {
      const provider = insuranceProviders.find(p => p.id === selectedInsurance);
      if (provider) {
        setSelectedProvider(provider);
      }
    }
  }, [selectedInsurance, insuranceProviders]);

  const savePlan = () => {
    if (!assessmentData || !waitingPeriodCalculation) return;
    
    const planData = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      immigrationStatus: assessmentData.immigrationStatus,
      countryOfOrigin: assessmentData.countryOfOrigin,
      arrivalDate: assessmentData.arrivalDate,
      ramqSubmissionDate: assessmentData.ramqSubmissionDate,
      familySize: assessmentData.familySize,
      healthPlanName: 'RAMQ (Régie de l\'assurance maladie du Québec)',
      daysRemaining: waitingPeriodCalculation.daysRemaining,
      coverageStartDate: formatDate(waitingPeriodCalculation.coverageStartDate),
      recommendedInsurance: insuranceProviders.slice(0, 3),
      estimatedCost: insuranceProviders[0]?.monthlyPrice || 0
    };
    
    localStorage.setItem(`healthbridge_plan_${planData.id}`, JSON.stringify(planData));
    toast({
      title: "Plan Saved Successfully!",
      description: "Your healthcare plan has been saved to your device.",
    });
  };

  const shareResults = async () => {
    if (!assessmentData || !waitingPeriodCalculation) return;
    
    const summary = `HealthBridge Quebec Assessment Results:

Immigration Status: ${assessmentData.immigrationStatus.replace('_', ' ')}
Country: ${assessmentData.countryOfOrigin}
Health Plan: RAMQ (Régie de l'assurance maladie du Québec)
${waitingPeriodCalculation.daysRemaining > 0 ? `Days until RAMQ coverage: ${waitingPeriodCalculation.daysRemaining}` : 'RAMQ coverage now active!'}
${insuranceProviders.length > 0 ? `Recommended: ${insuranceProviders[0].name} - $${insuranceProviders[0].monthlyPrice}/month` : ''}

Visit HealthBridge to get your personalized Quebec healthcare navigation plan.`;

    try {
      await navigator.clipboard.writeText(summary);
      toast({
        title: "Results Copied!",
        description: "Your assessment summary has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Share Feature",
        description: "Your results are ready to share. Copy the summary manually if needed.",
      });
    }
  };

  const startOver = () => {
    localStorage.removeItem('assessmentData');
    navigate('/');
  };

  if (!assessmentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Loading your results...</p>
          <Button onClick={() => navigate('/wizard')}>
            Back to Assessment
          </Button>
        </div>
      </div>
    );
  }

  const { daysRemaining } = waitingPeriodCalculation;
  
  // Dynamic cost calculation based on selected insurance
  const calculateEstimatedCost = () => {
    const selectedProvider = insuranceProviders.find(provider => provider.id === selectedInsurance);
    const monthlyPrice = selectedProvider?.monthlyPrice || 85;
    return Math.round((daysRemaining / 30) * monthlyPrice);
  };
  
  const estimatedCost = calculateEstimatedCost();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        
        {/* Results Header */}
        <div className="text-center mb-8 sm:mb-12 fade-in px-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <CheckCircle className="text-success w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">Your Personalized Healthcare Plan</h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Based on your arrival in Quebec as a {assessmentData.immigrationStatus === 'permanent_resident' ? 'Permanent Resident' : 'Newcomer'}
          </p>
        </div>

        {/* Bilateral Agreement Status */}
        {bilateralStatus.agreement && assessmentData?.countryOfOrigin && (
          <div className="max-w-4xl mx-auto mb-8">
            <Alert className={`border-l-4 ${
              bilateralStatus.agreement.type === 'full' && bilateralStatus.agreement.waitingPeriodWaived
                ? 'bg-green-50 border-green-500'
                : bilateralStatus.agreement.type === 'partial'
                ? 'bg-yellow-50 border-yellow-500'
                : 'bg-blue-50 border-blue-500'
            }`}>
              <AlertDescription>
                <div className="flex items-start space-x-3">
                  <span className="text-xl mt-1">
                    {bilateralStatus.agreement.type === 'full' && bilateralStatus.agreement.waitingPeriodWaived ? '🟢' :
                     bilateralStatus.agreement.type === 'partial' ? '🟡' : '🔴'}
                  </span>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 ${
                      bilateralStatus.agreement.type === 'full' && bilateralStatus.agreement.waitingPeriodWaived
                        ? 'text-green-900'
                        : bilateralStatus.agreement.type === 'partial'
                        ? 'text-yellow-900'
                        : 'text-blue-900'
                    }`}>
                      Quebec-{assessmentData.countryOfOrigin} Social Security Agreement
                    </h3>
                    <p className={`mb-3 ${
                      bilateralStatus.agreement.type === 'full' && bilateralStatus.agreement.waitingPeriodWaived
                        ? 'text-green-800'
                        : bilateralStatus.agreement.type === 'partial'
                        ? 'text-yellow-800'
                        : 'text-blue-800'
                    }`}>
                      {bilateralStatus.agreement.notes}
                    </p>
                    
                    {bilateralStatus.agreement.documentsRequired.length > 0 && (
                      <div className="mt-3">
                        <p className={`font-medium text-sm mb-2 ${
                          bilateralStatus.agreement.type === 'full' && bilateralStatus.agreement.waitingPeriodWaived
                            ? 'text-green-900'
                            : bilateralStatus.agreement.type === 'partial'
                            ? 'text-yellow-900'
                            : 'text-blue-900'
                        }`}>
                          Required documents for RAMQ application:
                        </p>
                        <ul className={`list-disc list-inside text-sm space-y-1 ${
                          bilateralStatus.agreement.type === 'full' && bilateralStatus.agreement.waitingPeriodWaived
                            ? 'text-green-800'
                            : bilateralStatus.agreement.type === 'partial'
                            ? 'text-yellow-800'
                            : 'text-blue-800'
                        }`}>
                          {bilateralStatus.agreement.documentsRequired.map((doc, index) => (
                            <li key={index}>{doc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <a
                        href="https://www.ramq.gouv.qc.ca/en/citizens/temporary-stays-outside-quebec/agreements-with-other-countries"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center text-sm hover:underline ${
                          bilateralStatus.agreement.type === 'full' && bilateralStatus.agreement.waitingPeriodWaived
                            ? 'text-green-700'
                            : bilateralStatus.agreement.type === 'partial'
                            ? 'text-yellow-700'
                            : 'text-blue-700'
                        }`}
                      >
                        Learn more about bilateral agreements
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Status-based Alert */}
        <div className="max-w-4xl mx-auto mb-12">
          {assessmentData.immigrationStatus === 'visitor' ? (
            <Alert className="bg-blue-50 border-l-4 border-blue-500">
              <AlertDescription>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Visitors are not eligible for RAMQ coverage
                  </h3>
                  <p className="text-gray-700">
                    As a visitor to Quebec, you need private health insurance for the duration of your stay. 
                    We recommend comprehensive coverage that includes emergency medical, hospital care, and prescription drugs.
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          ) : assessmentData.immigrationStatus === 'study_permit' ? (
            <Alert className="bg-blue-50 border-l-4 border-blue-500">
              <AlertDescription>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    International students are not eligible for RAMQ coverage
                  </h3>
                  <p className="text-gray-700">
                    As an international student, you need private health insurance for your studies in Quebec. 
                    Check if your educational institution offers a student health plan, or choose from our recommended options below.
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          ) : assessmentData.immigrationStatus === 'work_permit' ? (
            <Alert className="bg-yellow-50 border-l-4 border-yellow-500">
              <AlertDescription>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Work permit holders have conditional RAMQ eligibility
                  </h3>
                  <p className="text-gray-700">
                    Your RAMQ eligibility depends on your work permit type and employment situation. 
                    Contact RAMQ directly to verify your status. Meanwhile, private insurance ensures you're covered.
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="bg-warning/10 border-l-4 border-warning">
              <AlertDescription className="flex items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {daysRemaining > 0 
                      ? `${daysRemaining} days until your RAMQ coverage begins`
                      : `Your RAMQ coverage is now active!`
                    }
                  </h3>
                  <p className="text-gray-700">
                    {daysRemaining > 0 ? (
                      <>
                        Your provincial health coverage starts on <strong>{formatDate(waitingPeriodCalculation.coverageStartDate)}</strong>. 
                        Until then, you need private health insurance to avoid unexpected medical bills.
                      </>
                    ) : (
                      'Congratulations! You are now eligible for provincial health coverage.'
                    )}
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Timeline Visualization - Only for RAMQ-eligible statuses */}
          {assessmentData.immigrationStatus !== 'visitor' && assessmentData.immigrationStatus !== 'study_permit' && (
            <div className="lg:col-span-2">
              <VisualTimeline 
                calculation={waitingPeriodCalculation}
                healthPlanName="RAMQ"
              />
            </div>
          )}
          
          {/* Insurance Focus Section for Non-RAMQ Eligible */}
          {(assessmentData.immigrationStatus === 'visitor' || assessmentData.immigrationStatus === 'study_permit') && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {assessmentData.immigrationStatus === 'visitor' ? 'Visitor' : 'Student'} Health Insurance Options
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Choose Your Coverage</h3>
                      <p className="text-gray-600">Select from comprehensive insurance plans designed for {assessmentData.immigrationStatus === 'visitor' ? 'visitors' : 'international students'} to Quebec.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Get Instant Coverage</h3>
                      <p className="text-gray-600">Most plans offer immediate coverage or coverage starting within 24-48 hours of application.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-blue-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Access Healthcare</h3>
                      <p className="text-gray-600">Use your insurance card at hospitals, clinics, and pharmacies throughout Quebec.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Immediate Actions - Status-specific */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Immediate Actions</h3>
              <div className="space-y-4">
                {assessmentData.immigrationStatus === 'visitor' || assessmentData.immigrationStatus === 'study_permit' ? (
                  // Actions for non-RAMQ eligible statuses
                  <>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-blue-600 font-bold text-xs">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Choose Health Insurance</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Select coverage from options below
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-blue-600 font-bold text-xs">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Apply Online</p>
                        <p className="text-sm text-gray-600 mt-1">Get coverage within 24-48 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-blue-600 font-bold text-xs">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Find Healthcare Provider</p>
                        <p className="text-sm text-gray-600 mt-1">Locate clinics that accept your insurance</p>
                      </div>
                    </div>
                  </>
                ) : (
                  // Actions for RAMQ-eligible statuses
                  <>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-warning/20 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-warning font-bold text-xs">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Get Private Insurance</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {assessmentData.immigrationStatus === 'work_permit' 
                            ? 'Recommended while verifying RAMQ eligibility'
                            : `Essential for next ${daysRemaining} days`
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-primary font-bold text-xs">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {assessmentData.immigrationStatus === 'work_permit' ? 'Check RAMQ Eligibility' : 'Apply for RAMQ'}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {assessmentData.immigrationStatus === 'work_permit' 
                            ? 'Contact RAMQ to verify your status'
                            : 'Start application process now'
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-success font-bold text-xs">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Find Healthcare Provider</p>
                        <p className="text-sm text-gray-600 mt-1">Locate nearby clinics</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Cost Estimate */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cost Estimate</h3>
              <div className="space-y-3">
                {assessmentData.immigrationStatus === 'visitor' || assessmentData.immigrationStatus === 'study_permit' ? (
                  // Cost for non-RAMQ eligible statuses
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly insurance premium</span>
                      <span className="font-semibold text-gray-900">${insuranceProviders[0]?.monthlyPrice || 85}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Coverage period</span>
                      <span className="font-semibold text-gray-900">
                        {assessmentData.immigrationStatus === 'visitor' ? 'Duration of stay' : 'Academic year'}
                      </span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-semibold text-gray-900">Monthly Cost</span>
                      <span className="font-bold text-lg text-gray-900">${insuranceProviders[0]?.monthlyPrice || 85}</span>
                    </div>
                  </>
                ) : (
                  // Cost for RAMQ-eligible statuses
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Private insurance ({assessmentData.immigrationStatus === 'work_permit' ? 'while verifying status' : `${daysRemaining} days`})
                      </span>
                      <span className="font-semibold text-gray-900">${estimatedCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RAMQ application</span>
                      <span className="font-semibold text-success">Free</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-semibold text-gray-900">Total Coverage Cost</span>
                      <span className="font-bold text-lg text-gray-900">${estimatedCost}</span>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-4 p-3 bg-success/10 rounded-lg">
                <p className="text-sm text-success font-medium">
                  {assessmentData.immigrationStatus === 'visitor' || assessmentData.immigrationStatus === 'study_permit' 
                    ? `Coverage protects against $5,200+ average medical emergency costs`
                    : `Savings: $${5200 - estimatedCost} vs. average uninsured medical bill`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance Comparison */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent mb-6 text-center">
            Quebec Insurance Options for You
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {insuranceProviders.map((provider, index) => (
              <EnhancedInsuranceCard
                key={provider.id}
                provider={provider}
                isRecommended={provider.id === 'desjardins-visitor'}
                familySize={assessmentData.familySize}
                isSelected={selectedInsurance === provider.id}
                onSelect={() => setSelectedInsurance(provider.id)}
              />
            ))}
          </div>
        </div>

        {/* Action Checklist */}
        <ActionChecklist 
          province="QC"
          healthPlanName="RAMQ"
          daysRemaining={daysRemaining}
        />

        {/* Save & Share Results */}
        <div className="mt-8 text-center">
          <div className="space-x-4">
            <Button 
              onClick={savePlan}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Bookmark className="mr-2 w-4 h-4" />
              Save My Plan
            </Button>
            <Button 
              onClick={shareResults}
              variant="outline" 
              className="px-6 py-3 rounded-lg font-semibold"
            >
              <Share className="mr-2 w-4 h-4" />
              Share Results
            </Button>
            <Button 
              variant="outline" 
              onClick={startOver}
              className="px-6 py-3 rounded-lg font-semibold"
            >
              <RotateCcw className="mr-2 w-4 h-4" />
              Start Over
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
