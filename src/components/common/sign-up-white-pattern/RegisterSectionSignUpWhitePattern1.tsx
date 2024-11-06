'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface FormData {
    name: string
    email: string
    password: string
    rememberMe: boolean
}

interface Testimonial {
    quote: string
    author: string
    title: string
    avatar: string
}

export default function RegisterSectionSignUpWhitePattern1() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        rememberMe: false
    })

    const testimonial: Testimonial = {
        quote: "Hizmetin basitliğini ve hızlı müşteri desteğini seviyoruz. Artık bu olmadan çalışamayız.",
        author: "Ahmet Yılmaz",
        title: "CEO & Kurucu",
        avatar: "/flex-ui-assets/images/sign-up/avatar-men-sign-up.png"
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Kayıt işlemleri burada yapılacak
        console.log('Form gönderimi:', formData)
    }

    return (
        <section 
            className="relative pt-16 md:py-32 bg-white" 
            style={{
                backgroundImage: 'url("/flex-ui-assets/elements/pattern-white.svg")', 
                backgroundPosition: 'center'
            }}
        >
            {/* Sol Taraf - Kayıt Formu */}
            <div className="container px-4 mx-auto mb-16 md:mb-0">
                <div className="w-full md:w-1/2 md:pr-4">
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
                                Topluluğumuza Katılın
                            </h3>
                            <p className="text-lg text-coolGray-500 font-medium">
                                Ürünümüzle yolculuğunuza başlayın
                            </p>
                        </div>

                        {/* Kayıt Formu */}
                        <form onSubmit={handleSubmit}>
                            {/* İsim */}
                            <div className="mb-6">
                                <label className="block mb-2 text-coolGray-800 font-medium" htmlFor="name">
                                    İsim*
                                </label>
                                <input 
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                    placeholder="Adınız"
                                    required
                                />
                            </div>

                            {/* E-posta */}
                            <div className="mb-6">
                                <label className="block mb-2 text-coolGray-800 font-medium" htmlFor="email">
                                    E-posta*
                                </label>
                                <input 
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                    placeholder="ornek@mail.com"
                                    required
                                />
                            </div>

                            {/* Şifre */}
                            <div className="mb-4">
                                <label className="block mb-2 text-coolGray-800 font-medium" htmlFor="password">
                                    Şifre*
                                </label>
                                <input 
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                    placeholder="••••••••"
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

                            {/* Kayıt Ol Butonu */}
                            <button 
                                type="submit"
                                className="inline-block py-3 px-7 mb-4 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
                            >
                                Kayıt Ol
                            </button>

                            {/* Google ile Giriş */}
                            <button 
                                type="button"
                                className="inline-flex items-center justify-center py-3 px-7 mb-6 w-full text-base text-coolGray-500 font-medium text-center leading-6 bg-white border border-coolGray-100 hover:border-coolGray-200 rounded-md shadow-sm"
                            >
                                <Image 
                                    className="mr-2"
                                    src="/flex-ui-assets/elements/sign-up/google-icon-sign-up.svg"
                                    alt="Google"
                                    width={20}
                                    height={20}
                                />
                                <span>Google ile Giriş Yap</span>
                            </button>

                            {/* Giriş Yap Linki */}
                            <p className="text-center">
                                <span className="text-xs font-medium">
                                    Zaten hesabınız var mı?
                                </span>
                                <Link 
                                    href="/giris"
                                    className="inline-block ml-1 text-xs font-medium text-green-500 hover:text-green-600 hover:underline"
                                >
                                    Giriş yapın
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Sağ Taraf - Referans */}
            <div className="md:absolute md:top-0 md:right-0 md:w-1/2 md:h-full md:pl-4">
                <div className="flex items-center justify-center h-full px-8 py-14 bg-coolGray-50">
                    <div className="md:max-w-xl mx-auto text-center">
                        <span className="relative z-10 inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm">
                            Referanslar
                        </span>
                        <div className="relative mb-16">
                            <Image 
                                className="absolute -top-10 left-0 2xl:-left-12"
                                src="/flex-ui-assets/elements/sign-up/quotes-top.svg"
                                alt="Üst tırnak"
                                width={40}
                                height={40}
                            />
                            <Image 
                                className="absolute -bottom-16 right-0"
                                src="/flex-ui-assets/elements/sign-up/quotes-bottom.svg"
                                alt="Alt tırnak"
                                width={40}
                                height={40}
                            />
                            <h3 className="relative text-2xl md:text-3xl leading-tight font-medium text-coolGray-800">
                                {testimonial.quote}
                            </h3>
                        </div>
                        <div className="relative text-center">
                            <Image 
                                className="w-24 h-24 mb-6 mx-auto rounded-full"
                                src={testimonial.avatar}
                                alt={testimonial.author}
                                width={96}
                                height={96}
                            />
                            <h4 className="mb-2 text-lg text-coolGray-800 font-semibold">
                                {testimonial.author}
                            </h4>
                            <span className="block mb-8 text-lg text-coolGray-400">
                                {testimonial.title}
                            </span>
                            <div className="flex items-center justify-center">
                                <Link href="#" className="w-3 h-3 mr-3 bg-coolGray-100 rounded-full" />
                                <Link href="#" className="w-3 h-3 mr-3 bg-green-500 rounded-full" />
                                <Link href="#" className="w-3 h-3 bg-coolGray-100 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 