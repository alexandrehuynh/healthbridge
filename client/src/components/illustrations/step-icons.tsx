interface StepIconProps {
  step: 'status' | 'country' | 'ramq' | 'family';
  className?: string;
}

export function StepIcon({ step, className = "w-8 h-8" }: StepIconProps) {
  const icons = {
    status: (
      <svg viewBox="0 0 64 64" className={className} fill="none">
        {/* Person with documents */}
        <circle cx="32" cy="20" r="8" fill="#3B82F6" />
        <path d="M20 45 C20 38 25 35 32 35 C39 35 44 38 44 45 L44 50 L20 50 Z" fill="#10B981" />
        <rect x="15" y="25" width="12" height="8" rx="1" fill="#F59E0B" />
        <rect x="16" y="27" width="10" height="1" fill="#FFFFFF" />
        <rect x="16" y="29" width="8" height="1" fill="#FFFFFF" />
      </svg>
    ),
    country: (
      <svg viewBox="0 0 64 64" className={className} fill="none">
        {/* Globe with highlighted regions */}
        <circle cx="32" cy="32" r="20" fill="#E5E7EB" stroke="#3B82F6" strokeWidth="2" />
        <path d="M15 32 Q25 25 35 32 Q45 39 53 32" stroke="#10B981" strokeWidth="2" fill="none" />
        <path d="M32 12 Q38 20 32 28 Q26 36 32 44" stroke="#F59E0B" strokeWidth="2" fill="none" />
        <circle cx="25" cy="25" r="2" fill="#EF4444" />
        <circle cx="40" cy="28" r="2" fill="#EF4444" />
        <circle cx="35" cy="40" r="2" fill="#EF4444" />
      </svg>
    ),
    ramq: (
      <svg viewBox="0 0 64 64" className={className} fill="none">
        {/* RAMQ card with medical cross */}
        <rect x="12" y="20" width="40" height="24" rx="3" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2" />
        <rect x="16" y="24" width="32" height="2" fill="#1E40AF" />
        <rect x="16" y="28" width="20" height="1" fill="#6B7280" />
        <rect x="16" y="31" width="24" height="1" fill="#6B7280" />
        <rect x="30" y="35" width="4" height="4" fill="#EF4444" />
        <rect x="32" y="33" width="1" height="8" fill="#FFFFFF" />
        <rect x="29" y="36" width="6" height="1" fill="#FFFFFF" />
      </svg>
    ),
    family: (
      <svg viewBox="0 0 64 64" className={className} fill="none">
        {/* Family group with shield */}
        <circle cx="20" cy="18" r="6" fill="#3B82F6" />
        <circle cx="32" cy="18" r="6" fill="#F59E0B" />
        <circle cx="44" cy="18" r="6" fill="#10B981" />
        <path d="M12 35 C12 30 15 28 20 28 C25 28 28 30 28 35 L28 40 L12 40 Z" fill="#3B82F6" />
        <path d="M24 35 C24 30 27 28 32 28 C37 28 40 30 40 35 L40 40 L24 40 Z" fill="#F59E0B" />
        <path d="M36 35 C36 30 39 28 44 28 C49 28 52 30 52 35 L52 40 L36 40 Z" fill="#10B981" />
        <path d="M20 45 L25 50 L32 43 L39 50 L44 45" stroke="#EF4444" strokeWidth="2" fill="none" />
      </svg>
    )
  };

  return icons[step];
}

export function WizardProgressIllustration({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const steps = ['status', 'country', 'ramq', 'family'] as const;
  
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        
        return (
          <div key={step} className="flex items-center">
            <div className={`relative p-3 rounded-full transition-all duration-300 ${
              isActive 
                ? 'bg-primary/20 ring-2 ring-primary' 
                : isCompleted 
                ? 'bg-green-100' 
                : 'bg-gray-100'
            }`}>
              <StepIcon 
                step={step} 
                className={`w-6 h-6 ${
                  isActive 
                    ? 'text-primary' 
                    : isCompleted 
                    ? 'text-green-600' 
                    : 'text-gray-400'
                }`} 
              />
              {isCompleted && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" viewBox="0 0 8 8" fill="currentColor">
                    <path d="M6.5 1.5L3 5L1.5 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-2 transition-colors duration-300 ${
                isCompleted ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}