export {};

declare global {
  interface Window {
    __GOOGLE_TRANSLATE_CONFIG__: {
      languages: Array<{
        code: string;
        name: string;
        flag: string;
      }>;
      defaultLanguage: string;
    };
  }
}

window.__GOOGLE_TRANSLATE_CONFIG__ = {
  languages: [
    {
      code: "en",
      name: "English",
      flag: "https://flagcdn.com/w320/us.png"
    },
    {
      code: "tr",
      name: "Türkçe",
      flag: "https://flagcdn.com/w320/tr.png"
    }
  ],
  defaultLanguage: "tr"
};