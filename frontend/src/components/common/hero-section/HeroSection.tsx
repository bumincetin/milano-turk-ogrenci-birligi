import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {

    return (
        <div className="py-20 md:py-28">
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap xl:items-center -mx-4">
                    <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0">
                        <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-white bg-primary-500 uppercase rounded-9xl">
                            YENİ SİTEMİZE HOŞGELDİNİZ
                        </span>
                        <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight font-bold tracking-tight">
                            Milano Türk Öğrenci Birliğine Hoşgeldiniz!
                        </h1>
                        <p className="mb-8 text-lg md:text-xl text-gray-500 font-medium">
                            Milano'da öğrenim gören tüm Türk öğrencilerin dayanışmasını sağlamak amacıyla kurulmuş bir topluluktur.
                        </p>
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-auto py-1 md:py-0 md:mr-4">
                                <Link 
                                    href="https://chat.whatsapp.com/GABp3SSF9QH6KWMWVJ5Jgp"
                                    className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-primary-50 font-medium text-center bg-primary-500 hover:bg-primary-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-primary-500 rounded-md shadow-sm"
                                >
                                    WhatsApp
                                </Link>
                            </div>
                            <div className="w-full md:w-auto py-1 md:py-0 md:mr-4">
                                <Link 
                                    href="https://www.instagram.com/milanoturkogrencibirligi/"
                                    className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-black-800 font-medium text-center bg-white hover:bg-black-100 focus:ring-2 focus:ring-black-200 focus:ring-opacity-50 border border-black-200 rounded-md shadow-sm"
                                >
                                    Instagram
                                </Link>
                            </div>
                            <div className="w-full md:w-auto py-1 md:py-0 md:mr-4">
                                <Link 
                                    href="https://linkedin.com/company/milano-türk-öğrenci-birliği"
                                    className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-black-800 font-medium text-center bg-white hover:bg-black-100 focus:ring-2 focus:ring-black-200 focus:ring-opacity-50 border border-black-200 rounded-md shadow-sm"
                                >
                                    LinkedIn
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Video Section */}
                    <div className="w-full md:w-1/2 px-4">
                        <div className="relative mx-auto md:mr-0 max-w-max">
                            <Image 
                                className="absolute z-10 -left-14 -top-12 w-28 md:w-auto"
                                src="/flex-ui-assets/elements/circle3-yellow.svg"
                                alt="Dekoratif daire"
                                width={112}
                                height={112}
                            />
                            <Image 
                                className="absolute z-10 -right-7 -bottom-8 w-28 md:w-auto"
                                src="/flex-ui-assets/elements/dots3-blue.svg"
                                alt="Dekoratif noktalar"
                                width={112}
                                height={112}
                            />
                            
                            <div className="relative overflow-hidden rounded-7xl">
                                <Image 
                                    src="/mtob-images/milano-turk-ogrenci-birligi-kahvalti.jpg"
                                    alt="Video önizleme"
                                    width={600}
                                    height={400}
                                />
                                <video 
                                    className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2" 
                                    poster="/mtob-images/milano-turk-ogrenci-birligi-kahvalti.jpg" 
                                    muted
                                >
                                    <source src="/video-placeholder.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 