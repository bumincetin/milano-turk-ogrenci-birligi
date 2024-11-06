'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface NavLink {
    text: string
    href: string
}

export default function IndexSectionHeadersWhitePattern2() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navLinks: NavLink[] = [
        { text: "Anasayfa", href: "/" },
        { text: "Etkinlikler", href: "/etkinlikler" },
        { text: "SSS", href: "/sss" },
        { text: "İletişim", href: "/iletisim" }
    ]

    return (
        <section 
            className="relative bg-white overflow-hidden" 
            style={{
                backgroundImage: 'url("/flex-ui-assets/elements/pattern-white.svg")', 
                backgroundPosition: 'center'
            }}
        >
            {/* Navbar */}
            <nav className="flex justify-between p-6 px-4">
                <div className="flex justify-between items-center w-full">
                    {/* Logo */}
                    <div className="w-1/2 xl:w-1/3">
                        <Link href="/" className="block max-w-max">
                            <Image 
                                className="h-16"
                                src="/flex-ui-assets/logos/Milano-Turk-Ogrenci-Birligi-Logo.png"
                                alt="Milano Türk Öğrenci Birliği Logo"
                                width={64}
                                height={64}
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="w-1/2 xl:w-1/3">
                        <ul className="hidden xl:flex xl:justify-center">
                            {navLinks.map((link, index) => (
                                <li key={index} className={index !== navLinks.length - 1 ? "mr-12" : ""}>
                                    <Link 
                                        href={link.href}
                                        className="text-coolGray-500 hover:text-coolGray-900 font-medium"
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Auth Buttons */}
                    <div className="w-1/2 xl:w-1/3">
                        <div className="hidden xl:flex items-center justify-end">
                            <Link 
                                href="/giris" 
                                className="inline-block py-2 px-4 mr-2 leading-5 text-coolGray-500 hover:text-coolGray-900 bg-transparent font-medium rounded-md"
                            >
                                Giriş Yap
                            </Link>
                            <Link 
                                href="/kayit" 
                                className="inline-block py-2 px-4 text-sm leading-5 text-green-50 bg-green-500 hover:bg-green-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
                            >
                                Kayıt Ol
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="navbar-burger self-center xl:hidden"
                    onClick={() => setIsMenuOpen(true)}
                >
                    <svg width={35} height={35} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect className="text-coolGray-50" width={32} height={32} rx={6} fill="currentColor" />
                        <path className="text-coolGray-500" d="M7 12H25C25.2652 12 25.5196 11.8946 25.7071 11.7071C25.8946 11.5196 26 11.2652 26 11C26 10.7348 25.8946 10.4804 25.7071 10.2929C25.5196 10.1054 25.2652 10 25 10H7C6.73478 10 6.48043 10.1054 6.29289 10.2929C6.10536 10.4804 6 10.7348 6 11C6 11.2652 6.10536 11.5196 6.29289 11.7071C6.48043 11.8946 6.73478 12 7 12Z" fill="currentColor" />
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="navbar-menu fixed top-0 left-0 z-50 w-full h-full bg-coolGray-900 bg-opacity-50">
                    <div className="fixed top-0 left-0 bottom-0 w-4/6 max-w-xs bg-white">
                        <nav className="relative p-6 h-full overflow-y-auto">
                            <div className="flex flex-col justify-between h-full">
                                <Link href="/" className="inline-block">
                                    <Image 
                                        className="h-8"
                                        src="/flex-ui-assets/logos/flex-ui-green-light.svg"
                                        alt="Logo"
                                        width={32}
                                        height={32}
                                    />
                                </Link>
                                <ul className="py-6">
                                    {navLinks.map((link, index) => (
                                        <li key={index}>
                                            <Link 
                                                href={link.href}
                                                className="block py-3 px-4 text-coolGray-500 hover:text-coolGray-900 font-medium hover:bg-coolGray-50 rounded-md"
                                            >
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap">
                                    <div className="w-full mb-2">
                                        <Link 
                                            href="/giris"
                                            className="inline-block py-2 px-4 w-full text-sm leading-5 text-coolGray-500 hover:text-coolGray-900 bg-transparent font-medium text-center rounded-md"
                                        >
                                            Giriş Yap
                                        </Link>
                                    </div>
                                    <div className="w-full">
                                        <Link 
                                            href="/kayit"
                                            className="inline-block py-2 px-4 w-full text-sm leading-5 text-white bg-green-500 hover:bg-green-600 font-medium text-center focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
                                        >
                                            Kayıt Ol
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <button 
                            className="navbar-close absolute top-5 p-4 right-3"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.94004 6L11.14 1.80667C11.2656 1.68113 11.3361 1.51087 11.3361 1.33333C11.3361 1.1558 11.2656 0.985537 11.14 0.860002C11.0145 0.734466 10.8442 0.66394 10.6667 0.66394C10.4892 0.66394 10.3189 0.734466 10.1934 0.860002L6.00004 5.06L1.80671 0.860002C1.68117 0.734466 1.51091 0.663941 1.33337 0.663941C1.15584 0.663941 0.985576 0.734466 0.860041 0.860002C0.734505 0.985537 0.66398 1.1558 0.66398 1.33333C0.66398 1.51087 0.734505 1.68113 0.860041 1.80667L5.06004 6L0.860041 10.1933C0.797555 10.2553 0.747959 10.329 0.714113 10.4103C0.680267 10.4915 0.662842 10.5787 0.662842 10.6667C0.662842 10.7547 0.680267 10.8418 0.714113 10.9231C0.747959 11.0043 0.797555 11.078 0.860041 11.14C0.922016 11.2025 0.99575 11.2521 1.07699 11.2859C1.15823 11.3198 1.24537 11.3372 1.33337 11.3372C1.42138 11.3372 1.50852 11.3198 1.58976 11.2859C1.671 11.2521 1.74473 11.2025 1.80671 11.14L6.00004 6.94L10.1934 11.14C10.2554 11.2025 10.3291 11.2521 10.4103 11.2859C10.4916 11.3198 10.5787 11.3372 10.6667 11.3372C10.7547 11.3372 10.8419 11.3198 10.9231 11.2859C11.0043 11.2521 11.0781 11.2025 11.14 11.14C11.2025 11.078 11.2521 11.0043 11.286 10.9231C11.3198 10.8418 11.3372 10.7547 11.3372 10.6667C11.3372 10.5787 11.3198 10.4915 11.286 10.4103C11.2521 10.329 11.2025 10.2553 11.14 10.1933L6.94004 6Z" fill="#556987" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <div className="py-20 md:py-28">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-wrap xl:items-center -mx-4">
                        <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0">
                            <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-white bg-green-500 uppercase rounded-9xl">
                                Header
                            </span>
                            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight font-bold tracking-tight">
                                Milano Türk Öğrenci Birliğine Hoşgeldiniz!
                            </h1>
                            <p className="mb-8 text-lg md:text-xl text-coolGray-500 font-medium">
                                Unione degli Studenti Turchi di Milano
                                Milano'da öğrenim gören tüm Türk öğrencilerin dayanışmasını sağlamak amacıyla kurulmuş bir topluluktur.
                            </p>
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-auto py-1 md:py-0 md:mr-4">
                                    <Link 
                                        href="/whatsapp"
                                        className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-green-500 rounded-md shadow-sm"
                                    >
                                        WhatsApp
                                    </Link>
                                </div>
                                <div className="w-full md:w-auto py-1 md:py-0">
                                    <Link 
                                        href="/instagram"
                                        className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-coolGray-800 font-medium text-center bg-white hover:bg-coolGray-100 focus:ring-2 focus:ring-coolGray-200 focus:ring-opacity-50 border border-coolGray-200 rounded-md shadow-sm"
                                    >
                                        Instagram
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
                                        src="/flex-ui-assets/images/headers/placeholder-video.png"
                                        alt="Video önizleme"
                                        width={600}
                                        height={400}
                                    />
                                    <video 
                                        className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 min-h-full min-w-full max-w-none" 
                                        poster="/flex-ui-assets/images/testimonials/video-frame.jpeg" 
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
        </section>
    )
} 