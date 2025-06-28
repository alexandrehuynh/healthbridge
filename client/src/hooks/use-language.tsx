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
    'landing.title': "Don't Face Unexpected Medical Bills",
    'landing.subtitle': 'Navigate healthcare coverage during your transition. Many provinces now offer immediate coverage, while others have waiting periods. Get personalized guidance and avoid unexpected medical bills.',
    'landing.startAssessment': 'Start Free Assessment',
    'landing.viewResources': 'View Resources',
    'landing.trustedBy': 'Trusted by 400,000+ New Canadians',
    
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
    'landing.title': "Évitez les Factures Médicales Inattendues",
    'landing.subtitle': 'Naviguez la couverture de soins de santé pendant votre transition. Plusieurs provinces offrent maintenant une couverture immédiate, tandis que d\'autres ont des périodes d\'attente. Obtenez des conseils personnalisés et évitez les factures médicales inattendues.',
    'landing.startAssessment': 'Commencer l\'Évaluation Gratuite',
    'landing.viewResources': 'Voir les Ressources',
    'landing.trustedBy': 'Fait confiance par 400 000+ Nouveaux Canadiens',
    
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