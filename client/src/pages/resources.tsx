import { ExternalLink, Building, HelpingHand, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import resourcesData from '@/data/resources.json';

export default function Resources() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Additional Resources</h1>
          <p className="text-xl text-gray-600">Official links and helpful contacts for your healthcare journey</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Provincial Health Applications */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="w-12 h-12 bg-canadian-red/10 rounded-lg flex items-center justify-center mb-4">
              <Building className="text-canadian-red w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Provincial Health Plans</h3>
            <div className="space-y-3">
              {resourcesData.provincialHealthPlans.map((plan, index) => (
                <Button
                  key={index}
                  asChild
                  variant="outline"
                  className="w-full justify-between p-3 h-auto"
                >
                  <a href={plan.url} target="_blank" rel="noopener noreferrer">
                    <span className="font-medium text-gray-900">{plan.name}</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Settlement Services */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <HelpingHand className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Settlement Support</h3>
            <div className="space-y-3">
              {resourcesData.settlementServices.map((service, index) => (
                <Button
                  key={index}
                  asChild
                  variant="outline"
                  className="w-full justify-between p-3 h-auto"
                >
                  <a href={service.url} target="_blank" rel="noopener noreferrer">
                    <span className="font-medium text-gray-900">{service.name}</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Emergency Resources */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4">
              <Phone className="text-warning w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Emergency Contacts</h3>
            <div className="space-y-3">
              {resourcesData.emergencyContacts.map((contact, index) => (
                <div key={index} className="p-3 bg-white rounded-lg">
                  <div className="font-medium text-gray-900">{contact.name}</div>
                  <div className="text-lg font-bold text-primary">{contact.phone}</div>
                  <div className="text-sm text-gray-600">{contact.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-2">Important Notice</h4>
          <p className="text-blue-800">
            All external links will open in a new tab. These resources are provided for informational 
            purposes only. Always verify information with official government sources and consult with 
            healthcare professionals for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
