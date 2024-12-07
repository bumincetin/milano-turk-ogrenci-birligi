declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (options: {
            pageLanguage: string;
            includedLanguages?: string;
            layout?: any;
          }, element: string): void;
          InlineLayout: {
            SIMPLE: string;
          };
        };
      };
    } | undefined;
    googleTranslateElementInit: () => void;
  }
}

export {}; 