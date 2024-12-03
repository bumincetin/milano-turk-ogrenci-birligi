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
                            Bizimle iletişime geçmek hiç bu kadar kolay olmamıştı. Bizi arayın, canlı sohbet özelliğimizi kullanın veya e-posta gönderin, en kısa sürede size geri döneceğiz!
                        </p>
                    </div>
                    <div className="w-full lg:w-auto">
                        <div className="flex flex-wrap justify-center items-center md:justify-start -mb-2">
                            <Link href="/pozisyonlar" className="inline-block py-4 px-6 mb-2 md:mb-0 w-full md:w-auto md:mr-5 text-lg leading-6 text-black-50 font-medium text-center bg-primary-500 hover:bg-primary-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-transparent rounded-md shadow-sm">
                                Açık Pozisyonlar
                            </Link>
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
                                content={<p className="text-lg md:text-xl text-gray-500 font-medium">+90 555 123 45 67</p>}
                            />
                            <ContactCard 
                                icon="location"
                                title="Ofis"
                                content={<>
                                    <p className="text-lg md:text-xl text-gray-500 font-medium">Maslak, Büyükdere Cad.</p>
                                    <p className="text-lg md:text-xl text-gray-500 font-medium">İstanbul, 34485</p>
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
    return (
        <div className="w-full md:w-1/2 px-4 mb-10">
            <div className="max-w-xs mx-auto">
                <div className="inline-flex mb-6 items-center justify-center w-12 h-12 bg-primary-500 rounded-full">
                    {/* İkon SVG'leri buraya gelecek */}
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
            <SocialLink href="#" platform="facebook" />
            <SocialLink href="#" platform="twitter" />
            <SocialLink href="#" platform="instagram" />
            <SocialLink href="#" platform="linkedin" />
        </div>
    )
}

function SocialLink({ href, platform }: { href: string, platform: string }) {
    return (
        <Link href={href} className="text-primary-500 hover:text-primary-600">
            {/* Sosyal medya ikonları buraya gelecek */}
        </Link>
    )
} 