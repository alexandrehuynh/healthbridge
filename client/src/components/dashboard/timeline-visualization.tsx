import { Plane, Calendar, Shield } from 'lucide-react';
import { formatDate } from '@/utils/date-calculations';
import { WaitingPeriodCalculation } from '@/types/assessment';

interface TimelineVisualizationProps {
  calculation: WaitingPeriodCalculation;
  healthPlanName: string;
}

export default function TimelineVisualization({ calculation, healthPlanName }: TimelineVisualizationProps) {
  const { arrivalDate, coverageStartDate, daysRemaining } = calculation;
  const totalDays = 90;
  const progressPercent = Math.max(0, ((totalDays - daysRemaining) / totalDays) * 100);

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Coverage Timeline</h2>
      
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        {/* Timeline Events */}
        <div className="space-y-8">
          {/* Arrival Date */}
          <div className="relative flex items-start">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center relative z-10">
              <Plane className="text-white w-5 h-5" />
            </div>
            <div className="ml-6">
              <div className="text-sm text-gray-500">{formatDate(arrivalDate)}</div>
              <h3 className="font-semibold text-lg text-gray-900">Arrival in Canada</h3>
              <p className="text-gray-600">Your 90-day waiting period begins</p>
            </div>
          </div>
          
          {/* Current Date */}
          <div className="relative flex items-start">
            <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center relative z-10">
              <Calendar className="text-white w-5 h-5" />
            </div>
            <div className="ml-6">
              <div className="text-sm text-gray-500">{formatDate(new Date())}</div>
              <h3 className="font-semibold text-lg text-gray-900">Today</h3>
              <p className="text-gray-600">
                {daysRemaining > 0 
                  ? `${daysRemaining} days remaining in waiting period`
                  : 'Your waiting period is complete!'
                }
              </p>
              {daysRemaining > 0 && (
                <div className="mt-2">
                  <div className="bg-gray-200 rounded-full h-2 w-48">
                    <div 
                      className="bg-warning h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Coverage Start */}
          <div className="relative flex items-start">
            <div className={`w-12 h-12 ${daysRemaining === 0 ? 'bg-success' : 'bg-gray-300'} rounded-full flex items-center justify-center relative z-10`}>
              <Shield className="text-white w-5 h-5" />
            </div>
            <div className="ml-6">
              <div className="text-sm text-gray-500">{formatDate(coverageStartDate)}</div>
              <h3 className="font-semibold text-lg text-gray-900">{healthPlanName} Coverage Begins</h3>
              <p className="text-gray-600">Full provincial health coverage starts</p>
              <div className="inline-block bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium mt-2">
                Free healthcare coverage
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
