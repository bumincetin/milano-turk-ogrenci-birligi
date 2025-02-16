import Image from 'next/image'

interface Partner {
    name: string
    logo: string
}

export default function IndexSectionLogoCloudsWhitePattern6() {
    const partners: Partner[] = [
        {
            name: "Turkish Airlines",
            logo: "/mtob-images/turkish-airlines-logo.jpeg"
        },
        {
            name: "Hanedan",
            logo: "/mtob-images/hanedan-logo.jpeg"
        }
    ]

    return (

        <div>

         <section 
            className="py-20 xl:pt-24 bg-white" 
            style={{
                backgroundImage: 'url("/flex-ui-assets/elements/pattern-white.svg")', 
                backgroundPosition: 'center'
            }}
        >
            <div className="container px-4 mx-auto">
               
                <div className="mb-8 text-center">
                    <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-primary-500 bg-primary-100 font-medium uppercase rounded-9xl">
                        İş Birliklerimiz
                    </span>
                    <h3 className="mb-4 text-4xl md:text-5xl text-black-900 font-bold tracking-tighter">
                        İş Birliklerimiz ve Bize Destek Olan Kurumlar
                    </h3>
                </div>

                
                <div className="flex flex-wrap justify-center -mx-4">
                    {partners.map((partner, index) => (
                        <div 
                            key={index} 
                            className="w-1/2 md:w-1/3 lg:w-1/5 px-4 mb-8 lg:mb-0"
                        >
                            <div className="flex items-center h-40 md:h-48 px-4 md:px-8 rounded-md bg-black-50 shadow-md">
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
        </div>
    )
} 