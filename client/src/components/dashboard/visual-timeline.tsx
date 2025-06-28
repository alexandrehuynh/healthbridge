import { Calendar, Clock, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { WaitingPeriodCalculation } from '@/types/assessment';
import { formatDate } from '@/utils/date-calculations';

interface VisualTimelineProps {
  calculation: WaitingPeriodCalculation;
  healthPlanName: string;
}

export default function VisualTimeline({ calculation, healthPlanName }: VisualTimelineProps) {
  const today = new Date();
  const arrivalDate = calculation.arrivalDate;
  const coverageStartDate = calculation.coverageStartDate;
  const daysRemaining = calculation.daysRemaining;
  
  // Calculate progress percentage
  const totalDays = Math.ceil((coverageStartDate.getTime() - arrivalDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysPassed = Math.max(0, totalDays - daysRemaining);
  const progressPercentage = Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));

  const timelineEvents = [
    {
      date: arrivalDate,
      title: 'Arrival in Quebec',
      description: 'You arrived in Quebec',
      icon: Calendar,
      status: 'completed',
      color: 'bg-green-500'
    },
    {
      date: today,
      title: 'Today',
      description: `${daysRemaining} days remaining`,
      icon: Clock,
      status: daysRemaining <= 30 ? 'warning' : 'active',
      color: daysRemaining <= 30 ? 'bg-orange-500' : 'bg-blue-500'
    },
    {
      date: coverageStartDate,
      title: `${healthPlanName} Coverage Begins`,
      description: 'Provincial health coverage starts',
      icon: Shield,
      status: daysRemaining === 0 ? 'completed' : 'pending',
      color: 'bg-green-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Your Healthcare Timeline</h3>
          <p className="text-gray-600">Track your progress to {healthPlanName} coverage</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-700">Progress to Coverage</span>
          <span className="text-sm font-bold text-blue-600">{Math.round(progressPercentage)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Arrival</span>
          <span>Coverage Start</span>
        </div>
      </div>

      {/* Timeline Events */}
      <div className="space-y-6">
        {timelineEvents.map((event, index) => {
          const IconComponent = event.icon;
          const isPast = event.date <= today;
          const isCurrent = event.status === 'active' || event.status === 'warning';
          
          return (
            <div key={index} className="flex items-start space-x-4">
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${event.color} ${
                  isPast || isCurrent ? 'shadow-lg' : 'opacity-50'
                }`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                {index < timelineEvents.length - 1 && (
                  <div className={`absolute top-12 left-6 w-0.5 h-8 ${
                    isPast ? 'bg-green-300' : 'bg-gray-200'
                  }`} />
                )}
              </div>
              
              <div className="flex-1 pb-8">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className={`font-semibold ${
                    isPast || isCurrent ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {event.title}
                  </h4>
                  {isPast && event.status === 'completed' && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  {event.status === 'warning' && (
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                  )}
                </div>
                <p className={`text-sm ${
                  isPast || isCurrent ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {event.description}
                </p>
                <p className={`text-xs mt-1 ${
                  isPast || isCurrent ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {formatDate(event.date)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Items */}
      {daysRemaining > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">
                {daysRemaining <= 30 ? 'Action Required Soon' : 'Stay Prepared'}
              </h4>
              <p className="text-sm text-blue-700">
                {daysRemaining <= 30 
                  ? `Your waiting period ends in ${daysRemaining} days. Ensure you have all required documents ready for your ${healthPlanName} application.`
                  : `Your ${healthPlanName} coverage will begin on ${formatDate(coverageStartDate)}. Consider temporary insurance coverage during this waiting period.`
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Coverage Complete */}
      {daysRemaining === 0 && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900 mb-1">Coverage Active!</h4>
              <p className="text-sm text-green-700">
                Your {healthPlanName} coverage is now active. You can now access Quebec's provincial healthcare system.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}