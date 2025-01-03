'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { newsletterService } from '@/services/newsletterService'

export default function IndexSectionNewsletterWhitePattern11() {
    const [email, setEmail] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        
        try {
            await newsletterService.subscribe(email)
            setShowSuccess(true)
            setEmail('')
            setTimeout(() => setShowSuccess(false), 3000)
        } catch (error: any) {
            console.error(error)
            setError(error?.response?.data?.error?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.')
        }
    }

    return (
        <section 
            className="relative py-24 bg-white" 
            style={{
                backgroundImage: 'url("/flex-ui-assets/elements/pattern-white.svg")', 
                backgroundPosition: 'center'
            }}
        >
            {/* Dekoratif Görseller */}
            <Image 
                className="absolute top-6 left-6 w-24 md:w-auto"
                src="/flex-ui-assets/elements/dots3-violet.svg"
                alt="Mor nokta deseni"
                width={96}
                height={96}
            />
            <Image 
                className="absolute bottom-6 right-6 w-24 md:w-auto"
                src="/flex-ui-assets/elements/dots3-blue.svg"
                alt="Mavi nokta deseni"
                width={96}
                height={96}
            />

            {/* İçerik */}
            <div className="container relative z-10 px-4 mx-auto">
                <div className="mx-auto max-w-xl text-center">
                    <h3 className="mb-4 text-3xl md:text-4xl leading-tight text-black-900 font-bold tracking-tighter">
                        Bültenimize Abone Olun
                    </h3>
                    <p className="mb-8 text-lg md:text-xl text-gray-500 font-medium">
                        Tüm gelişmelerden haberdar olmak için bültenimize katılın.
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

                        {/* Hata mesajını form'dan sonra ekleyin */}
                        {error && (
                            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                                {error}
                            </div>
                        )}

                        {showSuccess && (
                            <div className="mt-4 p-4 bg-primary-100 text-primary-700 rounded-lg">
                                Bülten kaydınız başarıyla tamamlandı!
                            </div>
                        )}

                        {/* Gizlilik Politikası */}
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
        </section>
    )
} 