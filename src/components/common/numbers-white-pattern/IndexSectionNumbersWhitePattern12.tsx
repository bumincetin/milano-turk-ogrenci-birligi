interface Statistic {
    value: string
    label: string
}

export default function IndexSectionNumbersWhitePattern12() {
    const statistics: Statistic[] = [
        {
            value: "235.000",
            label: "Tamamlanan Proje"
        },
        {
            value: "₺10M",
            label: "Yıllık Gelir"
        },
        {
            value: "+50.000",
            label: "Yıllık Tasarruf Edilen Saat"
        },
        {
            value: "3.500",
            label: "Tekil Kullanıcı"
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
                    <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-9xl">
                        İstatistikler
                    </span>
                    <h3 className="mb-4 text-4xl md:text-5xl text-coolGray-900 font-bold tracking-tighter">
                        Verinin Gücüne İnanıyoruz
                    </h3>
                    <p className="mb-16 xl:mb-24 mx-auto text-lg md:text-xl text-coolGray-500 font-medium max-w-4xl">
                        Flex, işletmenizi tüm dijital kanallarda sorunsuz bir şekilde tek bir platformda yönetmenizi sağlayan tek iş platformudur.
                    </p>

                    {/* İstatistik Kartları */}
                    <div className="flex flex-wrap justify-center -mx-4">
                        {statistics.map((stat, index) => (
                            <div 
                                key={index} 
                                className="w-full md:w-1/3 lg:w-1/4 px-4 mb-8 lg:mb-0"
                            >
                                <h2 className="mb-2 text-4xl md:text-5xl text-green-600 font-bold tracking-tighter">
                                    {stat.value}
                                </h2>
                                <p className="text-lg md:text-xl text-coolGray-500 font-medium">
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