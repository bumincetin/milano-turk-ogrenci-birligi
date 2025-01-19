'use client'
import { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]);
  const [isClient, setIsClient] = useState(false);
  const [isTranslateReady, setIsTranslateReady] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Google Translate elementini oluştur
    const createTranslateElement = () => {
      console.log('Google Translate elementi oluşturuluyor...');
      const div = document.createElement('div');
      div.id = 'google_translate_element';
      div.style.position = 'absolute';
      div.style.top = '0';
      div.style.left = '0';
      div.style.opacity = '0';  // Tamamen görünmez yap
      div.style.height = '0';   // Yüksekliği sıfırla
      div.style.overflow = 'hidden'; // Taşan içeriği gizle
      div.style.pointerEvents = 'none';
      document.body.appendChild(div);

      // Google Translate widget stillerini özelleştir
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        .goog-te-banner-frame { 
          display: none !important;
        }
        .goog-te-gadget {
          font-size: 0 !important;
        }
        .goog-te-gadget span {
          display: none !important;
        }
        .goog-te-gadget div {
          display: inline !important;
        }
        .goog-te-combo {
          display: none !important;
        }
      `;
      document.head.appendChild(styleSheet);
    };

    // Script yükleme
    const loadTranslateScript = () => {
      if (!document.getElementById('google-translate-script')) {
        console.log('Google Translate script yükleniyor...');
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    // Google Translate widget'ını başlat
    window.googleTranslateElementInit = () => {
      console.log('Google Translate başlatılıyor...');
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'tr',
            includedLanguages: languages.map(lang => lang.code).join(','),
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );
        console.log('Google Translate başlatıldı');
        
        // Translate elementinin hazır olduğunu kontrol et
        const checkTranslateElement = setInterval(() => {
          const element = document.querySelector('.goog-te-combo');
          if (element) {
            console.log('Translate elementi hazır');
            setIsTranslateReady(true);
            clearInterval(checkTranslateElement);
          }
        }, 100);

        // 10 saniye sonra kontrolü durdur
        setTimeout(() => clearInterval(checkTranslateElement), 10000);
      } catch (error) {
        console.error('Google Translate başlatılırken hata:', error);
      }
    };

    createTranslateElement();
    loadTranslateScript();
  }, []);

  const changeLang = (lang: Language) => {
    console.log('Dil değiştirme deneniyor:', lang.code);
    setCurrentLang(lang);
    setIsOpen(false);

    if (!isTranslateReady) {
      console.log('Google Translate henüz hazır değil');
      return;
    }

    const element = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (element) {
      console.log('Translate elementi bulundu, dil değiştiriliyor...');
      element.value = lang.code;
      
      // Tüm olası eventları tetikle
      ['change', 'click'].forEach(eventType => {
        const event = new Event(eventType, { bubbles: true });
        element.dispatchEvent(event);
      });
      
      console.log('Dil değiştirme eventi tetiklendi');
    } else {
      console.error('Translate elementi bulunamadı!');
    }
  };

  if (!isClient) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors bg-white"
        >
          <span>{currentLang.flag}</span>
          <span className="text-sm font-medium">{currentLang.code.toUpperCase()}</span>
          <Globe className="w-4 h-4 text-gray-500" />
        </button>

        {isOpen && (
          <div className="absolute bottom-full mb-1 w-48 rounded-lg border border-gray-200 bg-white shadow-lg py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLang(lang)}
                className={`w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors
                  ${currentLang.code === lang.code ? 'bg-blue-50' : ''}`}
              >
                <span>{lang.flag}</span>
                <span className="text-sm">{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSwitcher; 