'use client'
import { useEffect, useState } from 'react';

const LanguageSwitcher = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      if (
        typeof window.google !== 'undefined' &&
        typeof window.google.translate !== 'undefined' &&
        typeof window.google.translate.TranslateElement !== 'undefined'
      ) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'tr',
            includedLanguages: 'en,tr,de,fr',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
          },
          'google_translate_element'
        );

        // Style ekleme
        const styleGoogleTranslate = () => {
          // Gereksiz elementleri gizle
          const elements = document.querySelectorAll('.goog-te-gadget span, .goog-te-gadget img, .goog-te-gadget br, .goog-te-gadget-simple img, .goog-te-gadget-simple span:not(.text)');
          elements.forEach((element) => {
            if (element instanceof HTMLElement) {
              element.style.display = 'none';
            }
          });

          // Dropdown'ı özelleştir
          const combobox = document.querySelector('.goog-te-combo') as HTMLSelectElement;
          if (combobox) {
            combobox.className = 'block w-24 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white';
          }
        };

        // Google Translate yüklendikten sonra stilleri uygula
        setTimeout(styleGoogleTranslate, 1000);
      }
    };
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative inline-block">
      <div 
        id="google_translate_element" 
        className="min-w-[120px] h-10 flex items-center justify-center"
      />
    </div>
  );
};

export default LanguageSwitcher; 