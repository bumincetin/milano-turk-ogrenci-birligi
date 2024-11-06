interface Testimonial {
    quote: string
    name: string
    title: string
}

export default function IndexSectionTestimonialsWhitePattern5() {
    const testimonials: Testimonial[] = [
        {
            quote: "Esnek bir programda çalışmak isteyen ancak tam zamanlı gelir elde etmek isteyenler için en iyi çözüm.",
            name: "Ahmet Yılmaz",
            title: "CEO & Kurucu"
        },
        {
            quote: "Flex'e doyamıyorum. Herkese gösterebilmek için üzerinde Flex yazan bir tişört istiyorum. Tüm meslektaşlarıma tavsiye edeceğim.",
            name: "Mehmet Demir",
            title: "CTO"
        },
        {
            quote: "Pişman olmayacaksınız. Şimdiden harika sonuçlar görmeye başladık. Teşekkürler ekip, harika iş çıkarıyorsunuz!",
            name: "Ayşe Kaya",
            title: "CPO"
        },
        {
            quote: "Flex beni birçok açıdan etkiledi. Flex'i sık sık kullanıyorum. Flex olmadan kaybolurdum. Flex gerçekten harika!",
            name: "Zeynep Aydın",
            title: "Müşteri Başarısı Yöneticisi"
        },
        {
            quote: "Flex şirketimiz için çok değerli oldu. Bundan daha iyisini isteyemezdim.",
            name: "Elif Yıldız",
            title: "Backend Geliştirici"
        },
        {
            quote: "Harika hizmet için teşekkürler. Flex tam olarak söylediğiniz gibi çalışıyor. Tam da aradığım şeydi.",
            name: "Selin Öztürk",
            title: "Ürün Tasarımcısı"
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
                    <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-9xl">
                        Referanslar
                    </span>
                    <h2 className="mb-4 text-4xl md:text-5xl leading-tight font-semibold tracking-tighter">
                        Flex kullanıcılarından yorumlar
                    </h2>
                    <p className="text-xl font-medium text-coolGray-500">
                        Flex ile kod yazmadan web siteleri oluşturabilirsiniz.
                    </p>
                </div>

                {/* Referans Kartları */}
                <div className="flex flex-wrap -mx-4">
                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={index} 
                            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 lg:mb-0"
                        >
                            <div className="flex flex-col h-full p-8 bg-coolGray-50 shadow-md rounded-md">
                                <h3 className="pb-14 mb-auto text-xl md:text-2xl font-medium">
                                    {testimonial.quote}
                                </h3>
                                <h4 className="mb-1 text-lg font-semibold">
                                    {testimonial.name}
                                </h4>
                                <p className="text-lg text-coolGray-400">
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