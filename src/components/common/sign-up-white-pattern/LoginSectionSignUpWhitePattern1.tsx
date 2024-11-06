'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface FormData {
    email: string
    password: string
    rememberMe: boolean
}

export default function LoginSectionSignUpWhitePattern1() {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        rememberMe: false
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Giriş işlemleri burada yapılacak
        console.log('Form gönderimi:', formData)
    }

    return (
        <section 
            className="relative pt-16 pb-0 md:py-32 bg-white" 
            style={{
                backgroundImage: 'url("/flex-ui-assets/elements/pattern-white.svg")', 
                backgroundPosition: 'center'
            }}
        >
            <div className="container px-4 mx-auto mb-16">
                <div className="w-full md:w-3/5 lg:w-1/2">
                    <div className="max-w-sm mx-auto">
                        {/* Logo ve Başlık */}
                        <div className="mb-6 text-center">
                            <Link href="/" className="inline-block mb-6">
                                <Image 
                                    className="h-16"
                                    src="/flex-ui-assets/logos/flex-circle-green.svg"
                                    alt="Logo"
                                    width={64}
                                    height={64}
                                />
                            </Link>
                            <h3 className="mb-4 text-2xl md:text-3xl font-bold">
                                Hesabınıza Giriş Yapın
                            </h3>
                            <p className="text-lg text-coolGray-500 font-medium">
                                Demo sürümünü başlatın
                            </p>
                        </div>

                        {/* Giriş Formu */}
                        <form onSubmit={handleSubmit}>
                            {/* E-posta */}
                            <div className="mb-6">
                                <label 
                                    className="block mb-2 text-coolGray-800 font-medium" 
                                    htmlFor="email"
                                >
                                    E-posta
                                </label>
                                <input 
                                    id="email"
                                    type="email" 
                                    placeholder="ornek@mail.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                    required
                                />
                            </div>

                            {/* Şifre */}
                            <div className="mb-4">
                                <label 
                                    className="block mb-2 text-coolGray-800 font-medium" 
                                    htmlFor="password"
                                >
                                    Şifre
                                </label>
                                <input 
                                    id="password"
                                    type="password" 
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                    required
                                />
                            </div>

                            {/* Beni Hatırla ve Şifremi Unuttum */}
                            <div className="flex flex-wrap items-center justify-between mb-6">
                                <div className="w-full md:w-1/2">
                                    <label className="relative inline-flex items-center">
                                        <input 
                                            type="checkbox"
                                            checked={formData.rememberMe}
                                            onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                                            className="form-checkbox appearance-none"
                                        />
                                        <Image 
                                            className="absolute top-1/2 transform -translate-y-1/2 left-0"
                                            src="/flex-ui-assets/elements/sign-up/checkbox-icon.svg"
                                            alt="Checkbox"
                                            width={16}
                                            height={16}
                                        />
                                        <span className="ml-7 text-xs text-coolGray-800 font-medium">
                                            Beni hatırla
                                        </span>
                                    </label>
                                </div>
                                <div className="w-full md:w-auto mt-1">
                                    <Link 
                                        href="/sifremi-unuttum"
                                        className="inline-block text-xs font-medium text-green-500 hover:text-green-600"
                                    >
                                        Şifrenizi mi unuttunuz?
                                    </Link>
                                </div>
                            </div>

                            {/* Giriş Butonu */}
                            <button 
                                type="submit"
                                className="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
                            >
                                Giriş Yap
                            </button>

                            {/* Kayıt Ol Linki */}
                            <p className="text-center">
                                <span className="text-xs font-medium">
                                    Hesabınız yok mu?
                                </span>
                                <Link 
                                    href="/kayit"
                                    className="inline-block ml-1 text-xs font-medium text-green-500 hover:text-green-600 hover:underline"
                                >
                                    Kayıt olun
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Yan Görsel */}
            <Image 
                className="md:absolute md:top-0 md:right-0 mx-auto md:h-full md:w-2/5 lg:w-1/2 md:object-cover"
                src="/flex-ui-assets/images/sign-up/photo-sign-up-side.png"
                alt="Giriş sayfası yan görseli"
                width={800}
                height={600}
            />
        </section>
    )
} 