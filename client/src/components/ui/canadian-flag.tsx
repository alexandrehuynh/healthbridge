import { Clover } from 'lucide-react';

interface CanadianFlagProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function CanadianFlag({ size = 'md', className = '' }: CanadianFlagProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4', 
    lg: 'w-6 h-6'
  };

  return (
    <div className={`${sizeClasses[size]} bg-canadian-red rounded flex items-center justify-center ${className}`}>
      <Clover className={`${iconSizes[size]} text-white`} />
    </div>
  );
}
