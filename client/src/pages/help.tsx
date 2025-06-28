import { ArrowLeft, Phone, Mail, MapPin, Clock, Users, FileText } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Help() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
          <p className="text-lg text-gray-600">
            Get assistance with your healthcare coverage questions and application process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                Emergency Healthcare
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold text-red-600">Emergency Services: 911</p>
                <p className="text-sm text-gray-600">For life-threatening emergencies</p>
              </div>
              <div>
                <p className="font-semibold">Health Link: 811</p>
                <p className="text-sm text-gray-600">24/7 health advice from registered nurses</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Application Help
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold">Provincial Health Offices</p>
                <p className="text-sm text-gray-600">Contact your provincial health office for application status</p>
              </div>
              <div>
                <p className="font-semibold">Settlement Services</p>
                <p className="text-sm text-gray-600">Free assistance with healthcare enrollment</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">When does my provincial health coverage start?</h3>
                <p className="text-gray-600">
                  This varies by province. Some provinces like Ontario, Alberta, and British Columbia offer immediate coverage, 
                  while others have waiting periods up to 3 months. Use our assessment tool to get your specific timeline.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What if I need medical care during the waiting period?</h3>
                <p className="text-gray-600">
                  You can purchase interim private health insurance to cover medical expenses during the waiting period. 
                  Our tool provides personalized insurance recommendations based on your needs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How do I apply for provincial health coverage?</h3>
                <p className="text-gray-600">
                  Each province has its own application process. After completing our assessment, you'll receive direct links 
                  to your provincial health office application portal.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What documents do I need?</h3>
                <p className="text-gray-600">
                  Typically you'll need your Confirmation of Permanent Residence (COPR), passport, and proof of residence 
                  in your province. Specific requirements vary by province.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                Additional Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold">Government of Canada</p>
                <a 
                  href="https://www.canada.ca/en/health-canada/services/health-care-system.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  Official Health Care System Information
                </a>
              </div>
              <div>
                <p className="font-semibold">Newcomer Services</p>
                <a 
                  href="https://www.cic.gc.ca/english/newcomers/services/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  Settlement Services for Newcomers
                </a>
              </div>
              <div>
                <p className="font-semibold">Health Canada</p>
                <a 
                  href="https://www.canada.ca/en/health-canada.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  Health Canada Official Website
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Need More Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                HealthBridge is designed to provide accurate, up-to-date information for new Canadian residents. 
                For official guidance, always consult your provincial health office or settlement services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/resources">
                  <Button className="w-full sm:w-auto">
                    View All Resources
                  </Button>
                </Link>
                <Link href="/wizard">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Take Assessment Again
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}