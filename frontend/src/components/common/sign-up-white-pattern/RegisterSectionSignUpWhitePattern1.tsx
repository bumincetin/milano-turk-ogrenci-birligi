'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

interface FormData {
    name: string
    email: string
    password: string
    rememberMe: boolean
    telephone: string
    universityName: string
    department: string
    year: string
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
        rememberMe: false,
        telephone: '',
        universityName: '',
        department: '',
        year: ''
    })

    const testimonial: Testimonial = {
        quote: "Milano'da Türk öğrencilerle bir araya gelerek sosyal, kültürel ve akademik açıdan kendimi geliştirdim. MTÖB sayesinde harika dostluklar kurdum!",
        author: "Ahmet Yılmaz",
        title: "MTÖB Üyesi",
        avatar: "/flex-ui-assets/images/sign-up/avatar-men-sign-up.png"
    }

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login, login_with_token } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const randomNum = Math.floor(Math.random() * 10000);
            const uniqueUsername = `${formData.name.toLowerCase().replace(/\s+/g, '-')}-${randomNum}`;
            const nameParts = formData.name.trim().split(' ');
            const lastname = nameParts.pop() || '';
            const firstname = nameParts.join(' ');

            const register_Data = {
                username: uniqueUsername,
                email: formData.email,
                password: formData.password,
                name: firstname,
                lastname: lastname,
                telephone: formData.telephone,
                universityName: formData.universityName,
                universityDepartment: formData.department,
                universityClass: formData.year
            };
            console.log(register_Data);
            const registerResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(register_Data)
            })
            .then(response => response.json())
            .then(async (data) => {
                console.log('Kayıt yanıtı:', data);

                const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        identifier: formData.email,
                        password: formData.password,
                    }),
                });
    
                const loginData = await loginResponse.json();
                console.log('Giriş yanıtı:', loginData);
    
                if (!loginResponse.ok) {
                    throw new Error(loginData.error?.message || 'Giriş sırasında bir hata oluştu');
                }
    
                await login_with_token(loginData.jwt);
                console.log('JWT token kaydedildi:', loginData.jwt);

                window.location.href = '/dashboard/profile';
            })
            .catch(error => {
                console.error('Kayıt hatası:', error);
            });

            // const registerData = await registerResponse.json();
            // console.log('Kayıt yanıtı:', registerData);

            // if (!registerResponse.ok) {
            //     throw new Error(registerData.error?.message || 'Kayıt sırasında bir hata oluştu');
            // }
        } catch (error) {
            console.error('Kayıt veya giriş hatası:', error);
            setError(error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu');
        } finally {
            setIsLoading(false);
        }
    };

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
                <div className="w-full md:w-7/12 md:pr-4">
                    <div className="max-w-xl mx-auto">
                        {/* Logo ve Başlık */}
                        <div className="mb-6 text-center">
                            <Link href="/" className="inline-block mb-6">
                                <Image 
                                    className="h-16"
                                    src="/flex-ui-assets/logos/Milano-Turk-Ogrenci-Birligi-Logo.png"
                                    alt="MTÖB Logo"
                                    width={64}
                                    height={64}
                                />
                            </Link>
                            <h3 className="mb-4 text-2xl md:text-3xl font-bold">
                                MTÖB Topluluğuna Katılın
                            </h3>
                            <p className="text-lg text-gray-500 font-medium">
                                Milano'daki Türk öğrencilere katılarak bir arada güçlenin
                            </p>
                        </div>

                        {/* Kayıt Formu */}
                        <form onSubmit={handleSubmit}>
                            {/* Hata Mesajı */}
                            {error && (
                                <div className="mb-6 p-4 text-red-700 bg-red-100 rounded-lg">
                                    {error}
                                </div>
                            )}

                            {/* İki sütunlu grid yapısı */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Sol Sütun */}
                                <div>
                                    {/* İsim */}
                                    <div className="mb-6">
                                        <label className="block mb-2 text-black-800 font-medium" htmlFor="name">
                                            İsim - Soyisim*
                                        </label>
                                        <input 
                                            id="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="appearance-none block w-full p-3 leading-5 text-black-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                            placeholder="İsim Soyisim"
                                            required
                                        />
                                    </div>

                                    {/* Şifre */}
                                    <div className="mb-6">
                                        <label className="block mb-2 text-black-800 font-medium" htmlFor="password">
                                            Şifre*
                                        </label>
                                        <input 
                                            id="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                                            className="appearance-none block w-full p-3 leading-5 text-black-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>

                                    {/* Üniversite */}
                                    <div className="mb-6">
                                        <label className="block mb-2 text-black-800 font-medium" htmlFor="university">
                                            Üniversite*
                                        </label>
                                        <input 
                                            id="university"
                                            type="text"
                                            value={formData.universityName}
                                            onChange={(e) => setFormData({...formData, universityName: e.target.value})}
                                            className="appearance-none block w-full p-3 leading-5 text-black-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                            placeholder="Universite Adı"
                                        />
                                    </div>

                                    {/* Sınıf */}
                                    <div className="mb-6">
                                        <label className="block mb-2 text-black-800 font-medium" htmlFor="year">
                                            Sınıf*
                                        </label>
                                        <select 
                                            id="year"
                                            value={formData.year}
                                            onChange={(e) => setFormData({...formData, year: e.target.value})}
                                            className="appearance-none block w-full p-3 leading-5 text-black-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                        >
                                            <option value="hazırlık">Hazırlık</option>
                                            <option value="1.sınıf">1. Sınıf</option>
                                            <option value="2.sınıf">2. Sınıf</option>
                                            <option value="3.sınıf">3. Sınıf</option>
                                            <option value="4.sınıf">4. Sınıf</option>
                                            <option value="Yüksek Lisans">Yüksek Lisans</option>
                                            <option value="Doktora">Doktora</option>
                                            <option value="Diğer">Diğer</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Sağ Sütun */}
                                <div>
                                    

                                    {/* E-posta */}
                                    <div className="mb-6">
                                        <label className="block mb-2 text-black-800 font-medium" htmlFor="email">
                                            E-posta*
                                        </label>
                                        <input 
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="appearance-none block w-full p-3 leading-5 text-black-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                            placeholder="ornek@gmail.com"
                                            required
                                        />
                                    </div>

                                     {/* Telefon */}
                                     <div className="mb-6">
                                        <label className="block mb-2 text-black-800 font-medium" htmlFor="phone">
                                            Telefon
                                        </label>
                                        <input 
                                            id="phone"
                                            type="tel"
                                            value={formData.telephone}
                                            onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                                            className="appearance-none block w-full p-3 leading-5 text-black-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                            placeholder="0535 123 23 34"
                                        />
                                    </div>

                                    {/* Bölüm */}
                                    <div className="mb-6">
                                        <label className="block mb-2 text-black-800 font-medium" htmlFor="department">
                                            Bölüm*
                                        </label>
                                        <input 
                                            id="department"
                                            type="text"
                                            value={formData.department}
                                            onChange={(e) => setFormData({...formData, department: e.target.value})}
                                            className="appearance-none block w-full p-3 leading-5 text-black-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                            placeholder="Bölüm Adı"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Kayıt Ol Butonu - Grid dışında */}
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="inline-block py-3 px-7 mb-4 w-full text-base text-primary-50 font-medium text-center leading-6 bg-primary-500 hover:bg-primary-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm disabled:opacity-50"
                            >
                                {isLoading ? 'Kaydediliyor...' : 'Kayıt Ol'}
                            </button>

                            {/* Google ile Giriş */}
                            {/* <button 
                                type="button"
                                className="inline-flex items-center justify-center py-3 px-7 mb-6 w-full text-base text-gray-500 font-medium text-center leading-6 bg-white border border-coolGray-100 hover:border-coolGray-200 rounded-md shadow-sm"
                            >
                                <Image 
                                    className="mr-2"
                                    src="/flex-ui-assets/elements/sign-up/google-icon-sign-up.svg"
                                    alt="Google"
                                    width={20}
                                    height={20}
                                />
                                <span>Google ile Kayıt Ol</span>
                            </button> */}

                            {/* Giriş Yap Linki */}
                            <p className="text-center">
                                <span className="text-xs font-medium">
                                    Zaten üye misiniz?
                                </span>
                                <Link 
                                    href="/giris"
                                    className="inline-block ml-1 text-xs font-medium text-primary-500 hover:text-primary-600 hover:underline"
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
                        <span className="relative z-10 inline-block py-px px-2 mb-4 text-xs leading-5 text-primary-500 bg-primary-100 font-medium uppercase rounded-full shadow-sm">
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
                            <h3 className="relative text-2xl md:text-3xl leading-tight font-medium text-black-800">
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
                            <h4 className="mb-2 text-lg text-black-800 font-semibold">
                                {testimonial.author}
                            </h4>
                            <span className="block mb-8 text-lg text-gray-500">
                                {testimonial.title}
                            </span>
                            <div className="flex items-center justify-center">
                                <Link href="#" className="w-3 h-3 mr-3 bg-coolGray-100 rounded-full" />
                                <Link href="#" className="w-3 h-3 mr-3 bg-primary-500 rounded-full" />
                                <Link href="#" className="w-3 h-3 bg-coolGray-100 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
