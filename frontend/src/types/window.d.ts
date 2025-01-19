declare namespace google.translate {
  namespace TranslateElement {
    enum InlineLayout {
      SIMPLE,
      HORIZONTAL,
      VERTICAL
    }
  }
}

declare global {
  function googleTranslateElementInit(): void;
  interface Window {
    googleTranslateElementInit: () => void;
    __GOOGLE_TRANSLATE_CONFIG__: {
      languages: Array<{
        code: string;
        name: string;
        flag: string;
      }>;
      defaultLanguage: string;
    };
    google: {
      translate: {
        TranslateElement: {
          new (options: {
            pageLanguage: string;
            includedLanguages: string;
            layout: google.translate.TranslateElement.InlineLayout;
            autoDisplay: boolean;
          }, element: string): void;
          InlineLayout: {
            SIMPLE: number;
            HORIZONTAL: number;
            VERTICAL: number;
          };
        };
      };
    };
  }
}

export {}; 