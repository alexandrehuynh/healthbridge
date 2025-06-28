import { Clover, Info } from 'lucide-react';
import { Link } from 'wouter';
import { useLanguage } from '@/hooks/use-language';

export default function Footer() {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };
  const quickLinks = [
    { name: 'How It Works', href: '/wizard' },
    { name: 'Insurance Providers', href: '/results' },
    { name: 'Provincial Information', href: '/resources' },
    { name: 'Settlement Resources', href: '/resources' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/help' },
    { name: 'Privacy Policy', href: 'https://www.canada.ca/en/transparency/privacy.html' },
    { name: 'Terms of Service', href: 'https://www.canada.ca/en/transparency/terms.html' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-canadian-red rounded flex items-center justify-center">
                <Clover className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">HealthBridge</h3>
                <p className="text-gray-400 text-sm">Navigate Your Healthcare Coverage</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              HealthBridge helps new Canadian Permanent Residents navigate their healthcare coverage during the waiting period. This tool provides educational information only and is not a substitute for professional medical or legal advice.
            </p>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-300">
                <Info className="inline w-4 h-4 text-primary mr-2" />
                <strong>Disclaimer:</strong> This application provides general information only. Always consult with healthcare professionals and official government sources for medical advice and coverage details.
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              {supportLinks.map((link) => (
                link.href.startsWith('http') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; 2024 HealthBridge. Built for new Canadians with care.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400">Available in:</span>
            <button 
              onClick={handleLanguageToggle}
              className={`transition-colors ${language === 'en' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              English
            </button>
            <button 
              onClick={handleLanguageToggle}
              className={`transition-colors ${language === 'fr' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Français
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
