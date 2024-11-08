import Image from 'next/image'

interface Partner {
    name: string
    logo: string
}

export default function IndexSectionLogoCloudsWhitePattern6() {
    const partners: Partner[] = [
        {
            name: "Jiggle",
            logo: "/flex-ui-assets/brands/logo-clouds/jiggle-logo.svg"
        },
        {
            name: "Symtric",
            logo: "/flex-ui-assets/brands/logo-clouds/symtric-logo.svg"
        },
        {
            name: "Wishelp",
            logo: "/flex-ui-assets/brands/logo-clouds/wishelp-logo.svg"
        },
        {
            name: "Resecurb",
            logo: "/flex-ui-assets/brands/logo-clouds/resecurb-logo.svg"
        },
        {
            name: "Welytics",
            logo: "/flex-ui-assets/brands/logo-clouds/welytics-logo.svg"
        }
    ]

    return (
        <section 
            className="py-20 xl:pt-24 bg-white" 
            style={{
                backgroundImage: 'url("/flex-ui-assets/elements/pattern-white.svg")', 
                backgroundPosition: 'center'
            }}
        >
            <div className="container px-4 mx-auto">
                {/* Başlık Bölümü */}
                <div className="mb-8 text-center">
                    <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-9xl">
                        İş Birliklerimiz
                    </span>
                    <h3 className="mb-4 text-4xl md:text-5xl text-coolGray-900 font-bold tracking-tighter">
                        Güçlü iş ortaklarımızla hedeflerimize ulaşmayı destekliyoruz
                    </h3>
                    <p className="text-lg md:text-xl text-coolGray-500 font-medium">
                        Milano'da öğrenim gören Türk öğrenciler olarak eğitim ve kültürel alanlarda destek alıyoruz.
                    </p>
                </div>

                {/* Logo Bulutu */}
                <div className="flex flex-wrap justify-center -mx-4">
                    {partners.map((partner, index) => (
                        <div 
                            key={index} 
                            className="w-1/2 md:w-1/3 lg:w-1/5 px-4 mb-8 lg:mb-0"
                        >
                            <div className="flex items-center h-32 md:h-36 px-4 md:px-8 rounded-md bg-coolGray-50 shadow-md">
                                <Image 
                                    className="mx-auto"
                                    src={partner.logo}
                                    alt={`${partner.name} logosu`}
                                    width={160}
                                    height={80}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 