'use client'
import { useEffect, useState } from 'react';

const LanguageSwitcher = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Google Translate API'sinin yüklenmesini bekle
    const checkGoogleTranslate = setInterval(() => {
      if (window.google?.translate) {
        setIsLoaded(true);
        clearInterval(checkGoogleTranslate);
      }
    }, 100);

    return () => clearInterval(checkGoogleTranslate);
  }, []);

  const changeLanguage = (languageCode: string) => {
    const iframe = document.querySelector('.goog-te-menu-frame') as HTMLIFrameElement;
    if (!iframe) return;

    const wrapper = document.getElementById('google_translate_element');
    if (!wrapper) return;

    // Google Translate dropdown'ını programatik olarak değiştir
    const selectElement = wrapper.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = languageCode;
      selectElement.dispatchEvent(new Event('change'));
    }
  };

  if (!isClient || !isLoaded) return null;

  return (
    <div className="flex gap-2">
      {window.__GOOGLE_TRANSLATE_CONFIG__?.languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-gray-100 rounded-md shadow-sm transition-colors"
        >
          <img 
            src={lang.flag} 
            alt={lang.name} 
            className="w-5 h-5 object-cover rounded-sm" 
          />
          <span>{lang.name}</span>
        </button>
      ))}
      <div id="google_translate_element" className="hidden" />
    </div>
  );
};

export default LanguageSwitcher; 