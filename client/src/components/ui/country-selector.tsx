import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, ChevronDown, X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useBilateralAgreement, getBilateralAgreementMessage } from '@/hooks/use-bilateral-agreement';
import { cn } from '@/lib/utils';

interface Country {
  id: string;
  name: string;
  isPopular?: boolean;
}

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

// Popular Quebec immigration countries (shown first)
const quebecPopularCountries: Country[] = [
  { id: 'France', name: 'France', isPopular: true },
  { id: 'Morocco', name: 'Morocco', isPopular: true },
  { id: 'Algeria', name: 'Algeria', isPopular: true },
  { id: 'Haiti', name: 'Haiti', isPopular: true },
  { id: 'China', name: 'China', isPopular: true },
  { id: 'India', name: 'India', isPopular: true },
  { id: 'Lebanon', name: 'Lebanon', isPopular: true },
  { id: 'Iran', name: 'Iran', isPopular: true },
  { id: 'Syria', name: 'Syria', isPopular: true },
  { id: 'United States', name: 'United States', isPopular: true },
  { id: 'Tunisia', name: 'Tunisia', isPopular: true },
  { id: 'Colombia', name: 'Colombia', isPopular: true },
  { id: 'Brazil', name: 'Brazil', isPopular: true },
  { id: 'Ukraine', name: 'Ukraine', isPopular: true },
  { id: 'Cameroon', name: 'Cameroon', isPopular: true },
];

// Complete country list
const allCountries: Country[] = [
  ...quebecPopularCountries,
  { id: 'Afghanistan', name: 'Afghanistan' },
  { id: 'Albania', name: 'Albania' },
  { id: 'Angola', name: 'Angola' },
  { id: 'Argentina', name: 'Argentina' },
  { id: 'Armenia', name: 'Armenia' },
  { id: 'Australia', name: 'Australia' },
  { id: 'Austria', name: 'Austria' },
  { id: 'Azerbaijan', name: 'Azerbaijan' },
  { id: 'Bahrain', name: 'Bahrain' },
  { id: 'Bangladesh', name: 'Bangladesh' },
  { id: 'Belarus', name: 'Belarus' },
  { id: 'Belgium', name: 'Belgium' },
  { id: 'Bolivia', name: 'Bolivia' },
  { id: 'Bosnia and Herzegovina', name: 'Bosnia and Herzegovina' },
  { id: 'Bulgaria', name: 'Bulgaria' },
  { id: 'Chile', name: 'Chile' },
  { id: 'Croatia', name: 'Croatia' },
  { id: 'Cuba', name: 'Cuba' },
  { id: 'Czech Republic', name: 'Czech Republic' },
  { id: 'Denmark', name: 'Denmark' },
  { id: 'Ecuador', name: 'Ecuador' },
  { id: 'Egypt', name: 'Egypt' },
  { id: 'Estonia', name: 'Estonia' },
  { id: 'Ethiopia', name: 'Ethiopia' },
  { id: 'Finland', name: 'Finland' },
  { id: 'Georgia', name: 'Georgia' },
  { id: 'Germany', name: 'Germany' },
  { id: 'Ghana', name: 'Ghana' },
  { id: 'Greece', name: 'Greece' },
  { id: 'Guatemala', name: 'Guatemala' },
  { id: 'Guinea', name: 'Guinea' },
  { id: 'Hungary', name: 'Hungary' },
  { id: 'Iceland', name: 'Iceland' },
  { id: 'Indonesia', name: 'Indonesia' },
  { id: 'Iraq', name: 'Iraq' },
  { id: 'Ireland', name: 'Ireland' },
  { id: 'Israel', name: 'Israel' },
  { id: 'Italy', name: 'Italy' },
  { id: 'Jamaica', name: 'Jamaica' },
  { id: 'Japan', name: 'Japan' },
  { id: 'Jordan', name: 'Jordan' },
  { id: 'Kazakhstan', name: 'Kazakhstan' },
  { id: 'Kenya', name: 'Kenya' },
  { id: 'Kuwait', name: 'Kuwait' },
  { id: 'Latvia', name: 'Latvia' },
  { id: 'Libya', name: 'Libya' },
  { id: 'Lithuania', name: 'Lithuania' },
  { id: 'Luxembourg', name: 'Luxembourg' },
  { id: 'Malaysia', name: 'Malaysia' },
  { id: 'Mali', name: 'Mali' },
  { id: 'Mexico', name: 'Mexico' },
  { id: 'Moldova', name: 'Moldova' },
  { id: 'Netherlands', name: 'Netherlands' },
  { id: 'New Zealand', name: 'New Zealand' },
  { id: 'Nicaragua', name: 'Nicaragua' },
  { id: 'Niger', name: 'Niger' },
  { id: 'Nigeria', name: 'Nigeria' },
  { id: 'North Macedonia', name: 'North Macedonia' },
  { id: 'Norway', name: 'Norway' },
  { id: 'Pakistan', name: 'Pakistan' },
  { id: 'Panama', name: 'Panama' },
  { id: 'Peru', name: 'Peru' },
  { id: 'Philippines', name: 'Philippines' },
  { id: 'Poland', name: 'Poland' },
  { id: 'Portugal', name: 'Portugal' },
  { id: 'Qatar', name: 'Qatar' },
  { id: 'Romania', name: 'Romania' },
  { id: 'Russia', name: 'Russia' },
  { id: 'Saudi Arabia', name: 'Saudi Arabia' },
  { id: 'Senegal', name: 'Senegal' },
  { id: 'Serbia', name: 'Serbia' },
  { id: 'Singapore', name: 'Singapore' },
  { id: 'Slovakia', name: 'Slovakia' },
  { id: 'Slovenia', name: 'Slovenia' },
  { id: 'Somalia', name: 'Somalia' },
  { id: 'South Africa', name: 'South Africa' },
  { id: 'South Korea', name: 'South Korea' },
  { id: 'Spain', name: 'Spain' },
  { id: 'Sri Lanka', name: 'Sri Lanka' },
  { id: 'Sudan', name: 'Sudan' },
  { id: 'Sweden', name: 'Sweden' },
  { id: 'Switzerland', name: 'Switzerland' },
  { id: 'Thailand', name: 'Thailand' },
  { id: 'Turkey', name: 'Turkey' },
  { id: 'Uganda', name: 'Uganda' },
  { id: 'United Arab Emirates', name: 'United Arab Emirates' },
  { id: 'United Kingdom', name: 'United Kingdom' },
  { id: 'Uruguay', name: 'Uruguay' },
  { id: 'Venezuela', name: 'Venezuela' },
  { id: 'Vietnam', name: 'Vietnam' },
  { id: 'Yemen', name: 'Yemen' },
  { id: 'Zimbabwe', name: 'Zimbabwe' },
  { id: 'other', name: 'Other country' }
];

export default function CountrySelector({ value, onChange, placeholder = "Search for your country...", className }: CountrySelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const bilateralStatus = useBilateralAgreement(value);

  const selectedCountry = allCountries.find(country => country.id === value);

  // Filter countries based on search term
  const filteredCountries = useMemo(() => {
    if (!searchTerm.trim()) {
      // Show popular countries first when no search term
      const popular = quebecPopularCountries;
      const others = allCountries.filter(country => !country.isPopular);
      return [...popular, ...others];
    }

    const term = searchTerm.toLowerCase();
    return allCountries.filter(country =>
      country.name.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Handle country selection
  const handleSelect = (countryId: string) => {
    onChange(countryId);
    setIsOpen(false);
    setSearchTerm('');
    setFocusedIndex(-1);
  };

  // Handle input changes - allow editing after selection
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setIsOpen(true);
    setFocusedIndex(-1);
    
    // Clear selection when user starts typing different text
    if (selectedCountry && term !== selectedCountry.name) {
      onChange('');
    }
  };

  // Handle keyboard navigation with proper scroll prevention
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown') {
        setIsOpen(true);
        setFocusedIndex(0);
        e.preventDefault();
      }
      // Allow backspace to clear selection and enable editing
      if (e.key === 'Backspace' && selectedCountry) {
        onChange('');
        setSearchTerm('');
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault(); // Prevent page scroll
        setFocusedIndex(prev => 
          prev < filteredCountries.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault(); // Prevent page scroll
        setFocusedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && filteredCountries[focusedIndex]) {
          handleSelect(filteredCountries[focusedIndex].id);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Clear selection
  const handleClear = () => {
    onChange('');
    setSearchTerm('');
    setIsOpen(false);
    setFocusedIndex(-1);
    inputRef.current?.focus();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update search term when value changes externally
  useEffect(() => {
    if (!value) {
      setSearchTerm('');
    }
  }, [value]);

  // Get bilateral agreement message
  const agreementMessage = value ? getBilateralAgreementMessage(bilateralStatus.agreement, value) : null;

  return (
    <div className={cn("relative w-full mb-20", className)} ref={dropdownRef}>
      {/* Input Field */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            ref={inputRef}
            type="text"
            value={selectedCountry ? selectedCountry.name : searchTerm}
            onChange={handleInputChange}
            onFocus={() => {
              if (searchTerm.length > 0 || !selectedCountry) {
                setIsOpen(true);
              }
            }}
            onClick={() => {
              if (!isOpen) {
                setIsOpen(true);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              "pl-10 pr-12 h-12 sm:h-11 text-base sm:text-sm touch-manipulation",
              value && "bg-primary/5 border-primary"
            )}
            autoComplete="off"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 touch-manipulation"
                tabIndex={-1}
                aria-label="Clear selection"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <ChevronDown 
              className={cn(
                "h-4 w-4 text-gray-400 transition-transform duration-200",
                isOpen && "transform rotate-180"
              )} 
            />
          </div>
        </div>

        {/* Loading State */}
        {value && bilateralStatus.isLoading && !isOpen && (
          <div className="mt-2">
            <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 bg-gray-50 animate-pulse">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        )}

        {/* Bilateral Agreement Status */}
        {value && agreementMessage && !bilateralStatus.isLoading && !isOpen && (
          <div className="mt-2">
            <div className={cn(
              "flex items-start space-x-3 p-4 rounded-lg text-sm border-2 transition-all duration-300",
              agreementMessage.type === 'success' && "bg-green-50 text-green-900 border-green-300 shadow-sm",
              agreementMessage.type === 'warning' && "bg-yellow-50 text-yellow-900 border-yellow-300 shadow-sm",
              agreementMessage.type === 'error' && "bg-blue-50 text-blue-900 border-blue-300 shadow-sm"
            )}>
              <span className="text-lg mt-0.5 flex-shrink-0">{agreementMessage.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold mb-1 text-base">
                  {agreementMessage.type === 'success' ? '🟢 No Waiting Period!' :
                   agreementMessage.type === 'warning' ? '🟡 Partial Agreement' :
                   '🔴 Standard 3-Month Wait'}
                </p>
                <p className="text-sm leading-relaxed">
                  {bilateralStatus.agreement?.notes || agreementMessage.message}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 sm:max-h-64 overflow-y-auto touch-manipulation"
          style={{ 
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}
          onScroll={(e) => e.stopPropagation()}
        >
          {filteredCountries.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>No countries found</p>
              <p className="text-sm">Try a different search term</p>
            </div>
          ) : (
            <>
              {!searchTerm && (
                <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Popular Quebec destinations
                  </p>
                </div>
              )}
              
              {filteredCountries.map((country, index) => {
                // Simple lookup for agreement status without hooks
                const hasFullAgreement = ['France', 'Belgium', 'Denmark', 'Finland', 'Greece', 'Luxembourg', 'Norway', 'Portugal', 'Sweden', 'Austria'].includes(country.id);
                const hasPartialAgreement = ['Germany', 'Netherlands', 'Italy'].includes(country.id);
                const isPopularSection = !searchTerm && country.isPopular;
                const isOtherSection = !searchTerm && !country.isPopular && index === quebecPopularCountries.length;

                return (
                  <div key={country.id}>
                    {isOtherSection && (
                      <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
                        <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                          All countries
                        </p>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => handleSelect(country.id)}
                      className={cn(
                        "w-full px-4 py-4 sm:py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors flex items-center justify-between group touch-manipulation min-h-[48px]",
                        focusedIndex === index && "bg-primary/10",
                        value === country.id && "bg-primary/20"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-900">
                          {country.name}
                        </span>
                        {value === country.id && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {hasFullAgreement && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 text-xs">
                            No wait
                          </Badge>
                        )}
                        {hasPartialAgreement && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                            Partial
                          </Badge>
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
}