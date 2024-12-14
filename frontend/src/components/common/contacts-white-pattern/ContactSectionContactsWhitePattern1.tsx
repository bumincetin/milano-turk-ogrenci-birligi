'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ContactSectionContactsWhitePattern1() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Form gönderme işlemi burada yapılacak
        console.log('Form gönderildi:', { email, message })
    }

    return (
        <section className="py-20 bg-white" style={{backgroundImage: 'url("/flex-ui-assets/elements/pattern-white.svg")', backgroundPosition: 'center'}}>
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap mb-24 lg:mb-18 justify-between items-center">
                    <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
                        <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-primary-500 bg-primary-100 font-medium uppercase rounded-9xl">
                            İletişim
                        </span>
                        <h3 className="mb-4 text-4xl md:text-5xl text-black-900 font-bold tracking-tighter leading-tight">
                            Bağlantıda Kalalım
                        </h3>
                        <p className="text-lg md:text-xl text-gray-500 font-medium">
                            Bizimle iletişime geçmek hiç bu kadar kolay olmamıştı. Bizi arayın veya e-posta gönderin, en kısa sürede size geri döneceğiz!
                        </p>
                    </div>
                    <div className="w-full lg:w-auto">
                        <div className="flex flex-wrap justify-center items-center md:justify-start -mb-2">
                            <Link href="/hakkimizda" className="inline-block py-4 px-6 w-full md:w-auto text-lg leading-6 font-medium text-center text-gray-500 bg-white border border-black-200 hover:border-black-300 focus:ring-2 focus:ring-black-200 focus:ring-opacity-50 rounded-md shadow-sm">
                                Hakkımızda
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-4">
                    {/* Sol taraf - İletişim bilgileri */}
                    <div className="w-full lg:w-1/2 px-4 mb-14 lg:mb-0">
                        <div className="flex flex-wrap -mx-4">
                            {/* İletişim kartları */}
                            <ContactCard 
                                icon="email"
                                title="E-posta"
                                content={<Link href="mailto:iletisim@firma.com" className="text-lg md:text-xl text-gray-500 hover:text-black-600 font-medium">
                                    iletisim@firma.com
                                </Link>}
                            />
                            <ContactCard 
                                icon="phone"
                                title="Telefon"
                                content={<p className="text-lg md:text-xl text-gray-500 font-medium">+39 340 549 0695</p>}
                            />
                            <ContactCard 
                                icon="location"
                                title="Ofis"
                                content={<>
                                    <p className="text-lg md:text-xl text-gray-500 font-medium">Via Conservatorio 7</p>
                                    <p className="text-lg md:text-xl text-gray-500 font-medium">Milano</p>
                                </>}
                            />
                            <ContactCard 
                                icon="social"
                                title="Sosyal Medya"
                                content={<SocialLinks />}
                            />
                        </div>
                    </div>

                    {/* Sağ taraf - İletişim formu */}
                    <div className="w-full lg:w-1/2 px-4">
                        <div className="px-4 py-8 md:p-10 bg-black-50 rounded-md">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label className="block mb-2 text-black-800 font-medium leading-6">
                                        E-posta
                                    </label>
                                    <input 
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full py-2 px-3 appearance-none border border-black-200 rounded-lg shadow-md text-gray-500 leading-6 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                        placeholder="ornek@email.com"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-2 text-black-800 font-medium leading-6">
                                        Mesaj
                                    </label>
                                    <textarea 
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="block h-32 md:h-52 w-full py-2 px-3 appearance-none border border-black-200 rounded-lg shadow-md text-gray-500 leading-6 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 resize-none"
                                        placeholder="Mesajınız..."
                                    />
                                </div>
                                <button type="submit" className="block w-full py-4 px-6 text-lg leading-6 text-black-50 font-medium text-center bg-primary-500 hover:bg-primary-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm">
                                    Gönder
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// Alt komponentler
function ContactCard({ icon, title, content }: { icon: string, title: string, content: React.ReactNode }) {
    const getIcon = () => {
        switch (icon) {
            case 'email':
                return (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                )
            case 'phone':
                return (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                )
            case 'location':
                return (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                )
            case 'social':
                return (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                    </svg>
                )
            default:
                return null
        }
    }

    return (
        <div className="w-full md:w-1/2 px-4 mb-10">
            <div className="max-w-xs mx-auto">
                <div className="inline-flex mb-6 items-center justify-center w-12 h-12 bg-primary-500 rounded-full">
                    {getIcon()}
                </div>
                <h3 className="mb-4 text-2xl md:text-3xl font-bold leading-9 text-black-900">
                    {title}
                </h3>
                {content}
            </div>
        </div>
    )
}

function SocialLinks() {
    return (
        <div className="flex space-x-4">
            <SocialLink 
                href="https://www.instagram.com/milanoturkogrencibirligi/" 
                platform="instagram"
                icon={
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                }
            />
            <SocialLink 
                href="https://linkedin.com/company/milano-türk-öğrenci-birliği" 
                platform="linkedin"
                icon={
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                }
            />
        </div>
    )
}

function SocialLink({ href, platform, icon }: { href: string, platform: string, icon: React.ReactNode }) {
    return (
        <Link href={href} className="text-primary-500 hover:text-primary-600" aria-label={`${platform} sayfamızı ziyaret edin`}>
            {icon}
        </Link>
    )
}