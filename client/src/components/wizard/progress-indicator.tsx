interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const steps = ['Province', 'Status', 'Arrival', 'Family'];
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-600">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          {Math.max(0, totalSteps - currentStep + 1)} minutes remaining
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300" 
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {steps.map((step, index) => (
          <span 
            key={step}
            className={`text-xs ${index < currentStep ? 'text-primary font-medium' : 'text-gray-500'}`}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}
