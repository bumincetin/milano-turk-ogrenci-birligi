interface Statistic {
    value: string
    label: string
}

export default function IndexSectionNumbersWhitePattern12() {
    const statistics: Statistic[] = [
        {
            value: "500+",
            label: "Aktif Üye"
        },
        {
            value: "100+",
            label: "Yıllık Etkinlik"
        },
        {
            value: "10.000+",
            label: "Topluluk Saatleri"
        },
        {
            value: "15",
            label: "Desteklenen Üniversite"
        }
    ]

    return (
        <section 
            className="py-20 xl:pt-24 xl:pb-32 bg-white" 
            style={{
                backgroundImage: 'url("/flex-ui-assets/elements/pattern-white.svg")', 
                backgroundPosition: 'center'
            }}
        >
            <div className="container px-4 mx-auto">
                <div className="text-center">
                    {/* Başlık Bölümü */}
                    <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-primary-500 bg-primary-100 font-medium uppercase rounded-9xl">
                        İstatistikler
                    </span>
                    <h3 className="mb-4 text-4xl md:text-5xl text-black-900 font-bold tracking-tighter">
                        Birlikte Güçleniyoruz
                    </h3>
                    <p className="mb-16 xl:mb-24 mx-auto text-lg md:text-xl text-gray-500 font-medium max-w-4xl">
                        Milano Türk Öğrenci Birliği olarak, üyelerimizin eğitimine ve topluluk gelişimine katkı sağlıyoruz.
                    </p>

                    {/* İstatistik Kartları */}
                    <div className="flex flex-wrap justify-center -mx-4">
                        {statistics.map((stat, index) => (
                            <div 
                                key={index} 
                                className="w-full md:w-1/3 lg:w-1/4 px-4 mb-8 lg:mb-0"
                            >
                                <h2 className="mb-2 text-4xl md:text-5xl text-primary-600 font-bold tracking-tighter">
                                    {stat.value}
                                </h2>
                                <p className="text-lg md:text-xl text-gray-500 font-medium">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
