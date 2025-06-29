import { useEffect, useState } from 'react';
import { useNavigateWithScroll } from '@/hooks/use-scroll-reset';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ExternalLink, Heart, DollarSign } from 'lucide-react';
import { useBilateralAgreement } from '@/hooks/use-bilateral-agreement';

export default function BilateralSuccess() {
  const navigate = useNavigateWithScroll();
  const [countryData, setCountryData] = useState<any>(null);
  const [savingsAmount, setSavingsAmount] = useState(225);

  useEffect(() => {
    // Get stored assessment data
    const assessmentData = localStorage.getItem('assessmentData');
    const bilateralData = localStorage.getItem('bilateralAgreementStatus');
    
    if (assessmentData) {
      const assessment = JSON.parse(assessmentData);
      const bilateral = bilateralData ? JSON.parse(bilateralData) : null;
      setCountryData({ assessment, bilateral });
      
      // Calculate savings based on family size
      const familySize = assessment.familySize || 1;
      const monthlySavings = familySize === 1 ? 75 : familySize === 2 ? 120 : 165;
      setSavingsAmount(monthlySavings * 3); // 3 months savings
    } else {
      // Redirect back to wizard if no data
      navigate('/wizard');
    }
  }, [navigate]);

  const bilateralStatus = useBilateralAgreement(countryData?.assessment?.countryOfOrigin || '');

  if (!countryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const countryName = countryData.assessment.countryOfOrigin;
  const agreementType = bilateralStatus.agreement?.type || 'full';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Celebration Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🎉 Excellent News!
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              {countryName}-Quebec Bilateral Agreement
            </p>
          </div>

          {/* Success Badge */}
          <Badge className="bg-green-100 text-green-800 text-lg px-6 py-2 rounded-full border-2 border-green-300">
            ✅ Immediate Healthcare Coverage
          </Badge>
        </div>

        {/* Benefits Grid */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Coverage Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Heart className="w-6 h-6 text-green-600 mr-2" />
                Your Coverage Benefits
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">No 3-month waiting period</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">No temporary insurance required</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Start using Quebec healthcare today</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Full RAMQ benefits from day one</span>
                </div>
              </div>
            </div>

            {/* Savings Calculation */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg p-6 border-2 border-yellow-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <DollarSign className="w-6 h-6 text-orange-600 mr-2" />
                Money Saved
              </h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  ${savingsAmount}+
                </div>
                <p className="text-gray-700 mb-4">
                  Saved on 3-month temporary insurance
                </p>
                <div className="bg-white rounded-lg p-3 text-sm text-gray-600">
                  <p>🛡️ No insurance premiums</p>
                  <p>💊 No prescription co-pays</p>
                  <p>🏥 No emergency deductibles</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <Button 
              size="lg" 
              className="h-14 text-lg font-semibold bg-green-600 hover:bg-green-700"
              asChild
            >
              <a 
                href="https://www.ramq.gouv.qc.ca/en/citizens/health-insurance/register" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                Find Healthcare Providers
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 text-lg font-semibold border-2 border-green-600 text-green-700 hover:bg-green-50"
              asChild
            >
              <a 
                href="https://www.ramq.gouv.qc.ca/en/citizens/temporary-stays-outside-quebec/agreements-with-other-countries" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                Learn About Your Coverage
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>

        {/* Educational Section */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            About the {countryName}-Quebec Bilateral Agreement
          </h3>
          <div className="prose text-gray-700">
            <p className="mb-4">
              Quebec has signed bilateral social security agreements with select countries to ensure 
              healthcare continuity for new residents. This agreement recognizes your previous 
              healthcare coverage and eliminates the standard waiting period.
            </p>
            
            {agreementType === 'full' && (
              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                <p className="font-semibold text-green-800 mb-2">Full Agreement Benefits:</p>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>Immediate healthcare coverage upon arrival</li>
                  <li>No waiting period required</li>
                  <li>Full RAMQ benefits from day one</li>
                  <li>Emergency and routine care covered</li>
                </ul>
              </div>
            )}

            <div className="mt-4 text-sm text-gray-600">
              <p>
                <strong>Required Documents:</strong> Proof of previous healthcare coverage, 
                passport, and Quebec residence confirmation.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Need insurance information for family members from other countries?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/results')}
              className="h-12 px-6 text-base font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
            >
              View Insurance Options
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
              className="h-12 px-6 text-base font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
            >
              Start Over
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}