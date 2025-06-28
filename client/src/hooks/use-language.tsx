import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.resources': 'Resources',
    'nav.help': 'Help',
    'nav.french': 'Français',
    
    // Landing page
    'landing.title': "Navigate Quebec Healthcare with Confidence",
    'landing.subtitle': 'Don\'t face unexpected medical bills in Quebec during your RAMQ waiting period. Get personalized insurance recommendations and avoid $3,000-8,000+ medical expenses during your first 3 months in Quebec.',
    'landing.startAssessment': 'Start Free Assessment',
    'landing.viewResources': 'View Resources',
    'landing.trustedBy': 'Trusted by 50,000+ New Quebecers',
    
    // Common
    'common.loading': 'Loading...',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.complete': 'Complete',
    'common.save': 'Save',
    'common.share': 'Share',
    
    // Footer
    'footer.description': 'Helping new Canadian residents navigate their healthcare coverage transition with accurate, up-to-date information.',
    'footer.disclaimer': 'This tool provides general information only. Always consult official provincial health offices for authoritative guidance.',
  },
  fr: {
    // Navigation
    'nav.resources': 'Ressources',
    'nav.help': 'Aide',
    'nav.french': 'English',
    
    // Landing page
    'landing.title': "Naviguez les Soins de Santé du Québec avec Confiance",
    'landing.subtitle': 'Évitez les factures médicales inattendues au Québec pendant votre période d\'attente RAMQ. Obtenez des recommandations d\'assurance personnalisées et évitez $3,000-8,000+ en frais médicaux pendant vos premiers 3 mois au Québec.',
    'landing.startAssessment': 'Commencer l\'Évaluation Gratuite',
    'landing.viewResources': 'Voir les Ressources',
    'landing.trustedBy': 'Fait confiance par 50 000+ Nouveaux Québécois',
    
    // Common
    'common.loading': 'Chargement...',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.complete': 'Terminer',
    'common.save': 'Sauvegarder',
    'common.share': 'Partager',
    
    // Footer
    'footer.description': 'Aider les nouveaux résidents canadiens à naviguer leur transition de couverture de soins de santé avec des informations précises et à jour.',
    'footer.disclaimer': 'Cet outil fournit des informations générales seulement. Consultez toujours les bureaux de santé provinciaux officiels pour des conseils faisant autorité.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('healthbridge-language');
    if (saved === 'fr' || saved === 'en') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('healthbridge-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}