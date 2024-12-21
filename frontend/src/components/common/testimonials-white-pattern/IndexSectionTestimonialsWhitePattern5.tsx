interface Testimonial {
    quote: string
    name: string
    title: string
}

export default function IndexSectionTestimonialsWhitePattern5() {
    const testimonials: Testimonial[] = [
        {
            quote: "Akademik ve sosyal hayat adaptasyonu sürecinde bana yardımcı olan MTÖB'ye teşekkür ederim.",
            name: "Ali Omay",
            title: "Tasarım Öğrencisi"
        },
        {
            quote: "MTÖB etkinlikleri sayesinde yeni arkadaşlar edinip çevremi genişletebiliyorum.",
            name: "Dilşan Öksüzoğlu",
            title: "Bioinformatik Öğrencisi"
        },
        {
            quote: "MTÖB etkinlikleri sayesinde diğer Türk öğrenciler ile buluşma fırsatı yakaladım ve yalnız olmadığımı hissettim, teşekkürler.",
            name: "Onur Çelik",
            title: "Ekonomi Öğrencisi"
        },
        {
            quote: "Milano'ya geldikten sonraki tüm yasal prosedürler için beni bilgilendiren ve desteğini esirgemeyen MTÖB'ye gönülden teşekkür ederim.",
            name: "Anıl Egin",
            title: "Yapay Zeka Öğrencisi"
        },
        {
            quote: "Kendi yaşadıkları sorunları yeni gelen öğrencilerin yaşamaması için bir araya gelmiş şahane bir gönüllü grup.",
            name: "Mehmet Akif Acar",
            title: "Elektronik Mühendisliği Öğrencisi"
        },
        {
            quote: "Zorlu akademik süreçte yaptığı etkinlikler sayesinde bizleri motive eden ve evimizde hissettiren MTÖB'nin başarılarının devamını dilerim.",
            name: "Berkay Öztürk",
            title: "Siyaset Bilimi Öğrencisi"
        }
    ]

    return (
        <section 
            className="py-24 md:pb-28 bg-white" 
            style={{
                backgroundImage: 'url("/flex-ui-assets/elements/pattern-white.svg")', 
                backgroundPosition: 'center'
            }}
        >
            <div className="container px-4 mx-auto">
                {/* Başlık Bölümü */}
                <div className="mb-16">
                    <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-primary-500 bg-primary-100 font-medium uppercase rounded-9xl">
                        Referanslar
                    </span>
                    <h2 className="mb-4 text-4xl md:text-5xl leading-tight font-semibold tracking-tighter">
                        MTÖB Üyelerinden Yorumlar
                    </h2>
                    <p className="text-xl font-medium text-gray-500">
                        Milano Türk Öğrenci Birliği, üyelerimiz için güçlü bir destek ve dayanışma platformu sunmaktadır.
                    </p>
                </div>

                {/* Referans Kartları */}
                <div className="flex flex-wrap -mx-4">
                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={index} 
                            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 lg:mb-0"
                        >
                            <div className="flex flex-col h-full p-8 bg-black-50 shadow-md rounded-md">
                                <h3 className="pb-14 mb-auto text-xl md:text-2xl font-medium">
                                    {testimonial.quote}
                                </h3>
                                <h4 className="mb-1 text-lg font-semibold">
                                    {testimonial.name}
                                </h4>
                                <p className="text-lg text-gray-500">
                                    {testimonial.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
