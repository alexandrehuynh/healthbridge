import { ArrowRight, Shield, Users, Clock, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import CanadianFlag from '@/components/ui/canadian-flag';

export default function Landing() {
  const [, setLocation] = useLocation();

  const startAssessment = () => {
    setLocation('/assessment');
  };

  const stats = [
    { value: '400,000+', label: 'New PR annually', color: 'text-primary' },
    { value: '90', label: 'Day waiting period', color: 'text-canadian-red' },
    { value: '$8,500', label: 'Average medical bill', color: 'text-warning' },
    { value: '$150', label: 'Avg monthly coverage', color: 'text-success' },
  ];

  const trustIndicators = [
    {
      icon: Shield,
      title: 'Government Standards',
      description: 'Following official Canadian healthcare guidelines and provincial requirements',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Users,
      title: 'Immigration Experts',
      description: 'Developed with settlement agencies and immigration professionals',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: Clock,
      title: 'Real-Time Updates',
      description: 'Current provincial waiting periods and insurance provider information',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  Trusted by 400,000+ New Canadians
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Don't Face Unexpected Medical Bills
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Navigate your 3-month waiting period with confidence. Get personalized insurance 
                recommendations and avoid $1,000-$20,000+ medical expenses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={startAssessment}
                  size="lg"
                  className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg"
                >
                  Start Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Healthcare professional helping family" 
                className="rounded-xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-gray-700 font-medium">Protected Coverage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Trusted Healthcare Navigation</h2>
            <p className="text-gray-600">Built with Canadian immigration and healthcare expertise</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {trustIndicators.map((indicator, index) => {
              const IconComponent = indicator.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 ${indicator.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`${indicator.color} w-6 h-6`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{indicator.title}</h3>
                  <p className="text-gray-600">{indicator.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
