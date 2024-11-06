'use client'
import Image from 'next/image'

interface Step {
    number: number
    title: string
    description: string
}

export default function IndexSectionHowItWorksWhitePattern4() {
    const steps: Step[] = [
        {
            number: 1,
            title: "Performansınızı Ölçün",
            description: "Ekibinizle bağlantıda kalın ve nerede olursanız olun hızlı kararlar alın."
        },
        {
            number: 2,
            title: "Özel Analizler",
            description: "Bulutta eksiksiz bir satış paneli edinin. Aktivite, gelir ve sosyal metrikleri tek bir yerden görün."
        },
        {
            number: 3,
            title: "Ekip Yönetimi",
            description: "Takvimimiz, müşteriler ve projelerle ilgili neler olduğunu bilmenizi sağlar."
        },
        {
            number: 4,
            title: "Web Sitenizi Oluşturun",
            description: "Web tasarımı veya programlama hakkında hiçbir şey bilmeseniz bile hayal ettiğiniz web sitesini oluşturmanızı sağlayan bir araç."
        },
        {
            number: 5,
            title: "Çoklu Uygulama Bağlantısı",
            description: "Tüm ürünlerinizi tek bir yerden bir araya getiren ilk iş platformu."
        },
        {
            number: 6,
            title: "Kolay Kurulum",
            description: "Uçtan Uca İş Platformu, Satış Yönetimi, Pazarlama Otomasyonu, Yardım Masası"
        }
    ]

    return (
        <section 
            className="py-24 bg-white" 
            style={{
                backgroundImage: 'url("/flex-ui-assets/elements/pattern-white.svg")', 
                backgroundPosition: 'center'
            }}
        >
            <div className="container px-4 mx-auto">
                {/* Üst Bölüm */}
                <div className="flex flex-wrap items-center -mx-4 mb-16">
                    <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0">
                        <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm">
                            Nasıl Çalışır
                        </span>
                        <h2 className="mb-6 text-4xl md:text-5xl leading-tight font-bold tracking-tighter">
                            İnsanların nasıl kullandığı hakkında daha fazla bilgi edinin
                        </h2>
                        <p className="text-lg md:text-xl text-coolGray-500 font-medium">
                            Entegre CRM, proje yönetimi, işbirliği ve faturalama özelliklerimizle işletmenizi tek bir güvenli platformda yönetebilirsiniz.
                        </p>
                    </div>

                    {/* Video Bölümü */}
                    <div className="w-full md:w-1/2 px-4">
                        <div className="relative mx-auto md:mr-0 max-w-max overflow-hidden rounded-7xl">
                            <Image 
                                src="/flex-ui-assets/images/how-it-works/placeholder-video.png"
                                alt="Video önizleme"
                                width={600}
                                height={400}
                            />
                            <video 
                                className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 min-h-full min-w-full max-w-none" 
                                poster="/flex-ui-assets/images/testimonials/video-frame.jpeg" 
                                muted
                            >
                                <source src="/video-placeholder.mp4" type="video/mp4" />
                            </video>
                            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full">
                                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.5 11.13L5.50001 3.05C5.34799 2.96223 5.17554 2.91603 5.00001 2.91603C4.82447 2.91603 4.65203 2.96223 4.50001 3.05C4.3474 3.1381 4.22079 3.26497 4.13299 3.41775C4.04518 3.57052 3.99931 3.74379 4.00001 3.92V20.08C3.99931 20.2562 4.04518 20.4295 4.13299 20.5823C4.22079 20.735 4.3474 20.8619 4.50001 20.95C4.65203 21.0378 4.82447 21.084 5.00001 21.084C5.17554 21.084 5.34799 21.0378 5.50001 20.95L19.5 12.87C19.6539 12.7828 19.7819 12.6563 19.871 12.5035C19.96 12.3506 20.007 12.1769 20.007 12C20.007 11.8231 19.96 11.6494 19.871 11.4965C19.7819 11.3437 19.6539 11.2172 19.5 11.13Z" fill="white" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Adımlar */}
                <div className="flex flex-wrap -mx-4 text-center md:text-left">
                    {steps.map((step) => (
                        <div key={step.number} className="w-full md:w-1/2 md:w-1/3 px-4 mb-8">
                            <div className="inline-flex items-center justify-center mb-4 w-12 h-12 text-xl text-white bg-green-500 font-semibold rounded-full">
                                {step.number}
                            </div>
                            <h3 className="mb-2 text-xl font-bold">
                                {step.title}
                            </h3>
                            <p className="font-medium text-coolGray-500">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 