export {};

function TranslateInit() {
  if (!window.__GOOGLE_TRANSLATE_CONFIG__) {
    console.error('Google Translate yapılandırması bulunamadı');
    return;
  }

  new window.google.translate.TranslateElement({
    pageLanguage: window.__GOOGLE_TRANSLATE_CONFIG__.defaultLanguage,
    includedLanguages: window.__GOOGLE_TRANSLATE_CONFIG__.languages.map(lang => lang.code).join(','),
    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: true,
  }, 'google_translate_element');
}

window.googleTranslateElementInit = TranslateInit;