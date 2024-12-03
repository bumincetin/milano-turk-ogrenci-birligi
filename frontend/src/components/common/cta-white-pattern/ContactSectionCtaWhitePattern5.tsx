import Image from 'next/image'
import Link from 'next/link'

export default function ContactSectionCtaWhitePattern5() {
    const features = [
        "Mauris pellentesque congue libero nec",
        "Suspendisse mollis tincidunt",
        "Praesent varius justo vel justo pulvinar"
    ]

    return (
        <section 
            className="py-24 bg-white overflow-hidden" 
            style={{
                backgroundImage: 'url("/flex-ui-assets/elements/pattern-white.svg")', 
                backgroundPosition: 'center'
            }}
        >
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap -mx-4">
                    {/* Sol Taraf */}
                    <div className="w-full md:w-1/2 px-4 mb-20 lg:mb-0">
                        <div className="max-w-md mx-auto">
                            <h2 className="mb-8 text-4xl md:text-5xl font-heading font-bold text-black-900 md:leading-15">
                                Milano'da Türk Öğrencilerle Tanışın ve Birlikte Güçlenin
                            </h2>
                            
                            <ul className="mb-8">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-center mb-4 last:mb-0">
                                        <Image 
                                            className="mr-3"
                                            src="/flex-ui-assets/elements/cta/checkbox-green.svg"
                                            alt="Checkbox"
                                            width={20}
                                            height={20}
                                        />
                                        <span className="text-lg md:text-xl font-heading text-gray-500">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap items-center">
                                <Link 
                                    href="/etkinlikler" 
                                    className="inline-flex items-center justify-center px-7 py-3 h-14 w-full md:w-auto mb-2 md:mb-0 md:mr-4 text-lg leading-7 text-black-800 bg-white hover:bg-black-100 font-medium focus:ring-2 focus:ring-black-200 focus:ring-opacity-50 border border-black-200 rounded-md shadow-sm"
                                >
                                    Daha Fazla Bilgi
                                </Link>
                                <Link 
                                    href="/uyelik" 
                                    className="inline-flex items-center justify-center px-7 py-3 h-14 w-full md:w-auto text-lg leading-7 text-primary-50 bg-primary-500 hover:bg-primary-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-transparent rounded-md shadow-sm"
                                >
                                    Üye Olun
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Sağ Taraf */}
                    <div className="w-full md:w-1/2 px-4">
                        <div className="relative max-w-max mx-auto">
                            <Image 
                                className="absolute top-0 right-0 -mt-6 lg:-mt-12 -mr-6 lg:-mr-12 z-10"
                                src="/flex-ui-assets/elements/circle3-yellow.svg"
                                alt="Decorative circle"
                                width={80}
                                height={80}
                            />
                            <Image 
                                className="absolute bottom-0 left-0 -mb-6 lg:-mb-10 -ml-6 lg:-ml-12"
                                src="/flex-ui-assets/elements/dots3-blue.svg"
                                alt="Decorative dots"
                                width={80}
                                height={80}
                            />
                            <Image 
                                className="relative"
                                src="/flex-ui-assets/elements/cta/photo-laptop-ph.png"
                                alt="Laptop"
                                width={600}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 