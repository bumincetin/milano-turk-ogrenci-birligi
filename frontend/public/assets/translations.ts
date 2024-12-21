export {};

window.googleTranslateElementInit = TranslateInit;

function loadGoogleTranslate(): Promise<void> {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

async function TranslateInit() {
  if (!window.__GOOGLE_TRANSLATE_CONFIG__) {
    return;
  }

  await loadGoogleTranslate();
  
  if (!window.google?.translate) {
    console.error('Google Translate API yüklenemedi');
    return;
  }
  
  new window.google.translate.TranslateElement({
    pageLanguage: window.__GOOGLE_TRANSLATE_CONFIG__.defaultLanguage,
    includedLanguages: window.__GOOGLE_TRANSLATE_CONFIG__.languages.map(lang => lang.code).join(','),
    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}