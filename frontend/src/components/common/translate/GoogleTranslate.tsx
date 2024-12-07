import React, { useEffect, useState } from 'react';
import { IoLanguage } from "react-icons/io5";

declare global {
    interface Window {
        googleTranslateElementInit: () => void;
        google: {
            translate: {
                TranslateElement: {
                    new (config: {
                        pageLanguage: string;
                        includedLanguages?: string;
                        layout?: any;
                        autoDisplay?: boolean;
                    }, elementId: string): any;
                    InlineLayout: {
                        SIMPLE: any;
                    };
                }
            };
        };
    }
}

const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
];

const GoogleTranslate: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState('tr');

    useEffect(() => {
        const addGoogleTranslateScript = () => {
            const script = document.createElement('script');
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);
        };

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                { 
                    pageLanguage: 'tr',
                    includedLanguages: languages.map(lang => lang.code).join(','),
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false
                },
                'google_translate_element'
            );
        };

        addGoogleTranslateScript();
    }, []);

    const changeLang = (langCode: string) => {
        setSelectedLang(langCode);
        
        // Google Translate widget'ını seç
        const iframe = document.querySelector('.goog-te-menu-frame') as HTMLIFrameElement;
        if (iframe && iframe.contentWindow) {
            // iframe içindeki elementi HTMLElement olarak belirt
            const element = iframe.contentWindow.document.querySelector(`div[value="${langCode}"]`) as HTMLElement;
            if (element) {
                element.click();
            }
        } else {
            // Alternatif yöntem: select elementi üzerinden değişim
            const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
            if (select) {
                select.value = langCode;
                select.dispatchEvent(new Event('change'));
            }
        }
        
        setIsOpen(false);
    };

    return (
        <div className="sticky bottom-8 right-8 mr-8 mb-8 flex justify-end">
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-full backdrop-blur-sm transition-all shadow-lg"
                >
                    <IoLanguage className="text-xl" />
                    <span>{languages.find(lang => lang.code === selectedLang)?.name || 'Dil Seçin'}</span>
                </button>
                
                <div 
                    className={`absolute bottom-full right-0 mb-2 bg-gray-800 backdrop-blur-sm rounded-lg shadow-lg transition-all ${
                        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                >
                    <div className="py-2">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLang(lang.code)}
                                className={`w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition-colors ${
                                    selectedLang === lang.code ? 'bg-gray-700' : ''
                                } text-gray-200`}
                            >
                                <span>{lang.flag}</span>
                                <span>{lang.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div id="google_translate_element" className="hidden" />
        </div>
    );
};

export default GoogleTranslate;