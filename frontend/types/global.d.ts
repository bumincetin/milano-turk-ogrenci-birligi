interface Window {
  google: {
    translate: {
      TranslateElement: {
        new (options: {
          pageLanguage: string;
          includedLanguages: string;
          layout: any;
        }, element: string): any;
        InlineLayout: {
          SIMPLE: any;
        };
      };
    };
  };
  googleTranslateElementInit: () => void;
} 