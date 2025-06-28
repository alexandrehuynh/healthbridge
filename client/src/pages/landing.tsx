import { ArrowRight, Shield, Users, Clock, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useLanguage } from '@/hooks/use-language';
import CanadianFlag from '@/components/ui/canadian-flag';

export default function Landing() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  const startAssessment = () => {
    setLocation('/wizard');
  };

  const stats = [
    { value: '50,000+', label: 'New Quebecers annually', color: 'text-primary' },
    { value: '3', label: 'Month RAMQ waiting period', color: 'text-warning' },
    { value: '$5,500', label: 'Average uninsured bill', color: 'text-warning' },
    { value: '$85', label: 'Average monthly Quebec coverage', color: 'text-success' },
  ];

  const trustIndicators = [
    {
      icon: Shield,
      title: 'RAMQ Standards',
      description: 'Following official Quebec healthcare guidelines and RAMQ requirements',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Users,
      title: 'Quebec Experts',
      description: 'Developed with Quebec settlement agencies and immigration professionals',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: Clock,
      title: 'Real-Time Quebec Updates',
      description: 'Current RAMQ waiting periods and Quebec insurance provider information',
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
                <span className="bg-success/20 text-green-100 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 border border-green-400/30">
                  <Flag className="w-4 h-4" />
                  {t('landing.trustedBy')}
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                {t('landing.title')}
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                {t('landing.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:justify-start">
                <Button 
                  onClick={startAssessment}
                  size="lg"
                  className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[3rem] w-full sm:w-auto"
                >
                  {t('landing.startAssessment')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  onClick={() => setLocation('/resources')}
                  size="lg"
                  className="bg-white/10 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 min-h-[3rem] w-full sm:w-auto"
                >
                  {t('landing.viewResources')}
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Healthcare professional helping family" 
                className="rounded-xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border border-success/20">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-gray-700 font-medium">Comprehensive Coverage Available</span>
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
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 ${indicator.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-200 group-hover:scale-110 shadow-sm`}>
                    <IconComponent className={`${indicator.color} w-6 h-6`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">{indicator.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{indicator.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Critical Facts for New Canadians</h2>
            <p className="text-gray-600">Understanding the healthcare landscape during your transition</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center group hover:shadow-md transition-all duration-200">
                <div className={`text-4xl font-extrabold ${stat.color} mb-3 group-hover:scale-105 transition-transform duration-200`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
