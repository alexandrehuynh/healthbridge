import { ArrowRight, Shield, Users, Clock, Flag, Heart, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useLanguage } from '@/hooks/use-language';
import CanadianFlag from '@/components/ui/canadian-flag';
import HeroNewcomers from '@/components/illustrations/hero-newcomers';

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
      <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-blue-100">
                  <CanadianFlag size="md" />
                </div>
                <span className="text-blue-700 font-medium bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full text-sm border border-blue-200">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {t('landing.trustedBy')}
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent leading-tight mb-6">
                {t('landing.title')}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                <Heart className="w-5 h-5 inline text-red-400 mr-2" />
                {t('landing.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={startAssessment} 
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg px-8 py-4 text-lg"
                >
                  <FileText className="w-5 h-5" />
                  <span>{t('landing.startAssessment')}</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => setLocation('/resources')} 
                  className="border-2 border-blue-200 hover:bg-blue-50 px-8 py-4 text-lg"
                >
                  {t('landing.viewResources')}
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-6 rounded-2xl shadow-2xl border border-blue-100">
                <HeroNewcomers />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg shadow-lg border border-green-200">
                <div className="flex items-center space-x-2">
                  <Shield className="w-6 h-6" />
                  <span className="font-semibold">{t('landing.heroCardTitle')}</span>
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
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent mb-4">Critical Facts for New Quebecers</h2>
            <p className="text-gray-600">Understanding Quebec's healthcare landscape during your transition</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              // Map stats to appropriate icons
              const getStatIcon = (index: number) => {
                switch(index) {
                  case 0: return Users;
                  case 1: return Shield;
                  case 2: return Clock;
                  case 3: return Heart;
                  default: return Users;
                }
              };
              const IconComponent = getStatIcon(index);
              
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-all duration-200 border border-blue-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className={`text-4xl font-extrabold ${stat.color} mb-3 group-hover:scale-105 transition-transform duration-200`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-700 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
