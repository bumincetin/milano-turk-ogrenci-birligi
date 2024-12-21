interface LanguageConfig {
  code: string;
  name: string;
  flag: string;
}

interface GoogleTranslateConfig {
  languages: LanguageConfig[];
  defaultLanguage: string;
}

declare global {
  function googleTranslateElementInit(): void;
  interface Window {
    googleTranslateElementInit: () => void;
    __GOOGLE_TRANSLATE_CONFIG__: GoogleTranslateConfig;
    google: {
      translate: {
        TranslateElement: {
          new (options: {
            pageLanguage: string;
            includedLanguages: string;
            layout: any;
          }, element: string): void;
          InlineLayout: {
            SIMPLE: any;
          };
        };
      };
    };
  }
}

export {}; 