import React, { useState } from 'react';
import { IoLanguage } from "react-icons/io5";

const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
];

const GoogleTranslate: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState('tr');

    const changeLang = (langCode: string) => {
        setSelectedLang(langCode);
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-8 right-8">
            <div className="relative">
                <label className="absolute -top-6 left-0 text-xs text-gray-400">Çeviri</label>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-full"
                >
                    <IoLanguage className="text-xl" />
                    <span>{languages.find(lang => lang.code === selectedLang)?.name || 'Dil Seçin'}</span>
                </button>
                
                {isOpen && (
                    <div className="absolute bottom-full right-0 mb-2 bg-gray-800 rounded-lg shadow-lg">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLang(lang.code)}
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-700"
                            >
                                <span>{lang.flag}</span>
                                <span>{lang.name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GoogleTranslate;