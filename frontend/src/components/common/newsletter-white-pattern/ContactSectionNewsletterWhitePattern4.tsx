'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ContactSectionNewsletterWhitePattern4() {
    const [email, setEmail] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Bülten kaydı işlemleri burada yapılacak
        console.log('Bülten kaydı:', email)
    }

    return (
        <section className="py-24 bg-black-900">
            <div className="container px-4 mx-auto">
                <div 
                    className="relative py-16 md:py-32 px-6 text-center bg-white overflow-hidden rounded-7xl" 
                    style={{
                        backgroundImage: 'url("/flex-ui-assets/elements/pattern-white.svg")', 
                        backgroundPosition: 'center'
                    }}
                >
                    {/* Dekoratif Görseller */}
                    <Image 
                        className="absolute top-0 left-0 w-28 md:w-auto"
                        src="/flex-ui-assets/elements/wave2-yellow.svg"
                        alt="Sarı dalga deseni"
                        width={112}
                        height={112}
                    />
                    <Image 
                        className="absolute right-6 top-6 w-28 md:w-auto"
                        src="/flex-ui-assets/elements/dots3-green.svg"
                        alt="Yeşil nokta deseni"
                        width={112}
                        height={112}
                    />
                    <Image 
                        className="absolute right-0 bottom-0 w-28 md:w-auto"
                        src="/flex-ui-assets/elements/wave3-red.svg"
                        alt="Kırmızı dalga deseni"
                        width={112}
                        height={112}
                    />
                    <Image 
                        className="absolute left-6 bottom-6 w-28 md:w-auto"
                        src="/flex-ui-assets/elements/dots3-violet.svg"
                        alt="Mor nokta deseni"
                        width={112}
                        height={112}
                    />

                    {/* İçerik */}
                    <div className="relative z-10 mx-auto md:max-w-2xl">
                        <h3 className="mb-4 text-3xl md:text-4xl leading-tight font-bold tracking-tighter">
                            Yeni Gelişmelerden İlk Siz Haberdar Olun
                        </h3>
                        <p className="mb-8 text-lg md:text-xl text-gray-500 font-medium">
                            Tüm güncellemeler ve haberler için bültenimize abone olun.
                        </p>

                        {/* Bülten Formu */}
                        <div className="mx-auto md:max-w-md text-left">
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-wrap mb-1">
                                    <div className="w-full md:flex-1 mb-3 md:mb-0 md:mr-6">
                                        <input 
                                            className="w-full py-3 px-4 text-gray-500 leading-tight placeholder-black-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-black-200 rounded-lg shadow-xsm" 
                                            type="email" 
                                            placeholder="E-posta adresiniz"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="w-full md:w-auto">
                                        <button 
                                            type="submit"
                                            className="inline-block py-3 px-5 w-full leading-5 text-white bg-primary-500 hover:bg-primary-600 font-medium text-center focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-transparent rounded-md shadow-sm"
                                        >
                                            Abone Ol
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* Gizlilik Politikası Linki */}
                            <span className="text-xs text-gray-500 font-medium">
                                <span>Verilerinizi nasıl kullandığımızı öğrenmek için </span>
                                <Link 
                                    href="/gizlilik-politikasi" 
                                    className="text-primary-500 hover:text-primary-600"
                                >
                                    gizlilik politikamızı
                                </Link>
                                <span> inceleyebilirsiniz.</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 