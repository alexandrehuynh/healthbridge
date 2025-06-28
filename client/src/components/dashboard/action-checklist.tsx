import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface ActionChecklistProps {
  province: string;
  healthPlanName: string;
  daysRemaining: number;
}

export default function ActionChecklist({ province, healthPlanName, daysRemaining }: ActionChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheck = (itemId: string, checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: checked }));
  };

  const immediateActions = [
    {
      id: 'insurance',
      title: 'Purchase private health insurance',
      description: 'Get coverage before any medical needs arise'
    },
    {
      id: 'apply-provincial',
      title: `Apply for ${healthPlanName} online`,
      description: `Start the application process at the official government website`
    },
    {
      id: 'find-clinics',
      title: 'Locate nearby walk-in clinics',
      description: 'Know where to go for non-emergency care'
    }
  ];

  const beforeCoverageActions = [
    {
      id: 'family-doctor',
      title: 'Find a family doctor',
      description: 'Register with Health Care Connect'
    },
    {
      id: 'vaccinations',
      title: 'Get important vaccinations',
      description: 'Catch up on any missed immunizations'
    },
    {
      id: 'complete-application',
      title: `Complete ${healthPlanName} application`,
      description: 'Submit all required documents'
    }
  ];

  return (
    <div className="mt-12 bg-white p-8 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Action Checklist</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Immediate (This Week)</h3>
          <div className="space-y-3">
            {immediateActions.map((action) => (
              <div key={action.id} className="flex items-start space-x-3">
                <Checkbox
                  id={action.id}
                  checked={checkedItems[action.id] || false}
                  onCheckedChange={(checked) => handleCheck(action.id, checked as boolean)}
                  className="mt-1"
                />
                <div>
                  <label 
                    htmlFor={action.id}
                    className="font-medium text-gray-900 cursor-pointer"
                  >
                    {action.title}
                  </label>
                  <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Before Coverage Starts ({daysRemaining > 0 ? `${daysRemaining} days` : 'Now'})
          </h3>
          <div className="space-y-3">
            {beforeCoverageActions.map((action) => (
              <div key={action.id} className="flex items-start space-x-3">
                <Checkbox
                  id={action.id}
                  checked={checkedItems[action.id] || false}
                  onCheckedChange={(checked) => handleCheck(action.id, checked as boolean)}
                  className="mt-1"
                />
                <div>
                  <label 
                    htmlFor={action.id}
                    className="font-medium text-gray-900 cursor-pointer"
                  >
                    {action.title}
                  </label>
                  <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
