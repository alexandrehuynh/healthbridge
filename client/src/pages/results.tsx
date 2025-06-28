import { useEffect, useState } from 'react';
import { CheckCircle, Bookmark, Share, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLocation } from 'wouter';
import { AssessmentData } from '@/types/assessment';
import { useWaitingPeriod } from '@/hooks/use-waiting-period';
import { getInsuranceProviders } from '@/utils/insurance-filtering';
import { formatDate } from '@/utils/date-calculations';
import TimelineVisualization from '@/components/dashboard/timeline-visualization';
import InsuranceComparison from '@/components/dashboard/insurance-comparison';
import ActionChecklist from '@/components/dashboard/action-checklist';
import provincesData from '@/data/provinces.json';

export default function Results() {
  const [, setLocation] = useLocation();
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('assessmentData');
    if (savedData) {
      setAssessmentData(JSON.parse(savedData));
    } else {
      // Redirect to assessment if no data found
      setLocation('/assessment');
    }
  }, [setLocation]);

  const waitingPeriodCalculation = useWaitingPeriod(
    assessmentData?.province || '',
    assessmentData?.arrivalDate || ''
  );

  const provinceData = provincesData.find(p => p.id === assessmentData?.province);
  const insuranceProviders = assessmentData ? getInsuranceProviders(
    assessmentData.province,
    assessmentData.familySize
  ) : [];

  const startOver = () => {
    localStorage.removeItem('assessmentData');
    setLocation('/');
  };

  if (!assessmentData || !waitingPeriodCalculation || !provinceData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Loading your results...</p>
          <Button onClick={() => setLocation('/assessment')}>
            Back to Assessment
          </Button>
        </div>
      </div>
    );
  }

  const { daysRemaining } = waitingPeriodCalculation;
  const estimatedCost = Math.round(67 * (insuranceProviders[0]?.monthlyPrice || 60) / 30);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Results Header */}
        <div className="text-center mb-12 fade-in">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-success w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Personalized Healthcare Plan</h1>
          <p className="text-xl text-gray-600">
            Based on your arrival in {provinceData.name} as a {assessmentData.status === 'pr' ? 'Permanent Resident' : 'Work Permit Holder'}
          </p>
        </div>

        {/* Waiting Period Alert */}
        <div className="max-w-4xl mx-auto mb-12">
          <Alert className="bg-warning/10 border-l-4 border-warning">
            <AlertDescription className="flex items-center">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {daysRemaining > 0 
                    ? `${daysRemaining} days until your ${provinceData.healthPlanName} coverage begins`
                    : `Your ${provinceData.healthPlanName} coverage is now active!`
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
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Timeline Visualization */}
          <div className="lg:col-span-2">
            <TimelineVisualization 
              calculation={waitingPeriodCalculation}
              healthPlanName={provinceData.healthPlanName}
            />
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Urgent Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Immediate Actions</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-warning/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-warning font-bold text-xs">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Get Private Insurance</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Essential for next {daysRemaining} days
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-primary font-bold text-xs">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Apply for {provinceData.healthPlanName}</p>
                    <p className="text-sm text-gray-600 mt-1">Start application process now</p>
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
              </div>
            </div>

            {/* Cost Estimate */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cost Estimate</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Private insurance ({daysRemaining} days)</span>
                  <span className="font-semibold text-gray-900">${estimatedCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{provinceData.healthPlanName} application</span>
                  <span className="font-semibold text-success">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">Total Coverage Cost</span>
                  <span className="font-bold text-lg text-gray-900">${estimatedCost}</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-success/10 rounded-lg">
                <p className="text-sm text-success font-medium">
                  🎉 Savings: ${8500 - estimatedCost} vs. average uninsured medical bill
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance Comparison */}
        <InsuranceComparison providers={insuranceProviders} />

        {/* Action Checklist */}
        <ActionChecklist 
          province={assessmentData.province}
          healthPlanName={provinceData.healthPlanName}
          daysRemaining={daysRemaining}
        />

        {/* Save & Share Results */}
        <div className="mt-8 text-center">
          <div className="space-x-4">
            <Button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              <Bookmark className="mr-2 w-4 h-4" />
              Save My Plan
            </Button>
            <Button variant="outline" className="px-6 py-3 rounded-lg font-semibold">
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
