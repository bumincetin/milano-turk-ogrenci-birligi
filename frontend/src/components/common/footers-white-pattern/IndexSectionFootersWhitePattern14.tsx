'use client'

import { newsletterService } from '@/services/newsletterService'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface FooterLink {
    text: string
    href: string
}

interface FooterSection {
    title: string
    links: FooterLink[]
}

export default function IndexSectionFootersWhitePattern14() {
    const footerSections: FooterSection[] = [
        {
            title: "Topluluk",
            links: [
                { text: "Hakkımızda", href: "/hakkimizda" },
                { text: "Etkinlikler", href: "/etkinlikler" },
                { text: "Üyelik", href: "/kayit" },
                { text: "Neden Üye Olmalıyım?", href: "/neden-uye" }
            ]
        },
        {
            title: "Kaynaklar",
            links: [
                { text: "Blog", href: "/blog" },
                { text: "Sıkça Sorulan Sorular", href: "/sss" },
                { text: "İletişim", href: "/iletisim" }
            ]
        },
        {
            title: "Yasal",
            links: [
                { text: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
                { text: "Çerez Politikası", href: "/cerez-politikasi" }
            ]
        }
    ]

    const socialLinks = [
        { 
            name: "Instagram", 
            href: "https://www.instagram.com/milanoturkogrencibirligi/",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            )
        },
        { 
            name: "LinkedIn", 
            href: "https://linkedin.com/company/milano-türk-öğrenci-birliği",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
            )
        },
        { 
            name: "WhatsApp", 
            href: "https://chat.whatsapp.com/GABp3SSF9QH6KWMWVJ5Jgp",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
            )
        }
    ]

    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [status, setStatus] = useState<{
        message: string;
        type: 'success' | 'error' | null;
    }>({ message: '', type: null })

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!email) {
            setStatus({
                message: 'Lütfen bir e-posta adresi girin.',
                type: 'error'
            })
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setStatus({
                message: 'Lütfen geçerli bir e-posta adresi girin.',
                type: 'error'
            })
            return
        }

        setIsSubmitting(true)
        setStatus({ message: '', type: null })

        try {
            await newsletterService.subscribe(email)
            
            setStatus({
                message: 'Bültene başarıyla abone oldunuz!',
                type: 'success'
            })
            setEmail('')
        } catch (error: any) {
            setStatus({
                message: error.message || 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
                type: 'error'
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <footer className="relative bg-slate-900 text-white overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pattern-dots opacity-5" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />

            <div className="relative">
                {/* Main Footer Content */}
                <div className="container-custom pt-16 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Brand Section */}
                        <div className="lg:col-span-4">
                            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                                <Image 
                                    src="/flex-ui-assets/logos/Milano-Turk-Ogrenci-Birligi-Logo.png"
                                    alt="MTÖB Logo"
                                    width={48}
                                    height={48}
                                    className="transition-transform group-hover:scale-105"
                                />
                                <div>
                                    <span className="block text-lg font-bold text-white">MTÖB</span>
                                    <span className="block text-xs text-slate-400">Milano Türk Öğrenci Birliği</span>
                                </div>
                            </Link>
                            <p className="text-slate-400 mb-6 max-w-sm leading-relaxed">
                                Milano'da öğrenim gören Türk öğrencilerin dayanışmasını güçlendiren, 
                                kariyer ve sosyal fırsatlar sunan bir topluluk.
                            </p>
                            
                            {/* Social Links */}
                            <div className="flex items-center gap-3">
                                {socialLinks.map((social, index) => (
                                    <Link 
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-primary-500 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Links Sections */}
                        <div className="lg:col-span-5">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                                {footerSections.map((section, index) => (
                                    <div key={index}>
                                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                                            {section.title}
                                        </h4>
                                        <ul className="space-y-3">
                                            {section.links.map((link, linkIndex) => (
                                                <li key={linkIndex}>
                                                    <Link 
                                                        href={link.href}
                                                        className="text-slate-400 hover:text-white transition-colors text-sm hover-underline inline-block"
                                                    >
                                                        {link.text}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter Section */}
                        <div className="lg:col-span-3">
                            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                                Bültene Abone Ol
                            </h4>
                            <p className="text-slate-400 text-sm mb-4">
                                Etkinlikler ve duyurulardan haberdar olun.
                            </p>
                            <form onSubmit={handleSubscribe} className="space-y-3">
                                <div className="relative">
                                    <input 
                                        className={`w-full px-4 py-3 bg-slate-800 border ${
                                            status.type === 'error' ? 'border-red-500' : 'border-slate-700'
                                        } rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all`}
                                        placeholder="E-posta adresiniz"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                                        isSubmitting 
                                            ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                                            : 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/25'
                                    }`}
                                >
                                    {isSubmitting ? 'Gönderiliyor...' : 'Abone Ol'}
                                </button>
                                {status.message && (
                                    <p className={`text-sm ${
                                        status.type === 'success' ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                        {status.message}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800">
                    <div className="container-custom py-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-slate-500">
                                © {new Date().getFullYear()} Milano Türk Öğrenci Birliği. Tüm hakları saklıdır.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <span>Made with</span>
                                <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                                </svg>
                                <span>in Milano</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
