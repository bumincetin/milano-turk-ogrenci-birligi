'use client'
import { useState } from 'react'

interface FAQ {
    question: string
    answer: string
}

export default function IndexSectionFaqsWhitePattern8() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const faqs: FAQ[] = [
        {
            question: "MTÖB'ye nasıl üye olabilirim?",
            answer: "MTÖB üyeliği için web sitemizden başvuru formunu doldurarak kayıt olabilirsiniz."
        },
        {
            question: "MTÖB hangi tür etkinlikler düzenliyor?",
            answer: "Akademik seminerler, kültürel geziler, sosyal buluşmalar ve kariyer etkinlikleri düzenlenmektedir."
        },
        {
            question: "Etkinliklere katılmak için üye olmam gerekiyor mu?",
            answer: "Etkinliklere öncelikle üyelerimiz katılabilmekte, yer durumuna göre misafir katılımcılar da kabul edilmektedir."
        },
        {
            question: "Milano'ya yeni gelen öğrencilere destek sağlıyor musunuz?",
            answer: "Evet, yeni gelen öğrencilerimize konaklama, ulaşım ve yaşamla ilgili rehberlik sağlıyoruz."
        },
        {
            question: "MTÖB üyelik ücreti var mı?",
            answer: "MTÖB üyeliği ücretsizdir ve tüm Türk öğrencilerimize açıktır."
        }
    ]

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section 
            className="py-24 bg-white" 
            style={{
                backgroundImage: 'url("/flex-ui-assets/elements/pattern-white.svg")', 
                backgroundPosition: 'center'
            }}
        >
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap -mx-4">
                    {/* Sol Taraf - Başlık */}
                    <div className="w-full md:w-1/2 px-4 mb-20 md:mb-0">
                        <div className="max-w-md">
                            <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium rounded-full shadow-sm">
                                SSS
                            </span>
                            <h2 className="mb-4 text-4xl md:text-5xl leading-tight text-coolGray-900 font-bold tracking-tighter">
                                Sıkça Sorulan Sorular
                            </h2>
                            <p className="text-lg md:text-xl text-coolGray-500 font-medium">
                                Milano Türk Öğrenci Birliği hakkında merak ettiklerinizi buradan öğrenebilirsiniz.
                            </p>
                        </div>
                    </div>

                    {/* Sağ Taraf - FAQ Listesi */}
                    <div className="w-full md:w-1/2 px-4">
                        {faqs.map((faq, index) => (
                            <div 
                                key={index}
                                className="flex flex-wrap w-full mb-10 text-left cursor-pointer"
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="flex items-center justify-between w-full pb-4">
                                    <h3 className="text-xl text-coolGray-900 font-bold">
                                        {faq.question}
                                    </h3>
                                    <span className={`text-green-500 transition duration-200 transform ${openIndex === index ? 'rotate-180' : ''}`}>
                                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.71 8.29C12.6149 8.19896 12.5028 8.12759 12.38 8.08C12.1365 7.97998 11.8635 7.97998 11.62 8.08C11.4972 8.12759 11.3851 8.19896 11.29 8.29L8.29 11.29C8.1017 11.4783 7.99591 11.7337 7.99591 12C7.99591 12.2663 8.1017 12.5217 8.29 12.71C8.4783 12.8983 8.7337 13.0041 9 13.0041C9.2663 13.0041 9.5217 12.8983 9.71 12.71L11 11.41L11 15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15L13 11.41L14.29 12.71C14.383 12.8037 14.4936 12.8781 14.6154 12.9289C14.7373 12.9797 14.868 13.0058 15 13.0058C15.132 13.0058 15.2627 12.9797 15.3846 12.9289C15.5064 12.8781 15.617 12.8037 15.71 12.71C15.8037 12.617 15.8781 12.5064 15.9289 12.3846C15.9797 12.2627 16.0058 12.132 16.0058 12C16.0058 11.868 15.9797 11.7373 15.9289 11.6154C15.8781 11.4936 15.8037 11.383 15.71 11.29L12.71 8.29Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </div>
                                <div className={`overflow-hidden transition-all duration-500 text-coolGray-500 font-medium ${openIndex === index ? 'max-h-40' : 'max-h-0'}`}>
                                    {faq.answer}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
