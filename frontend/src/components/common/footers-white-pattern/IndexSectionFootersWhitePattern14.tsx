import Image from 'next/image'
import Link from 'next/link'

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
                { text: "İletişim", href: "/iletisim" },
                { text: "Sıkça Sorulan Sorular", href: "/sss" }
            ]
        },
        {
            title: "Kaynaklar",
            links: [
                { text: "Blog", href: "/blog" },
                { text: "Duyurular", href: "/duyurular" },
                { text: "Yardım Merkezi", href: "/yardim" },
                { text: "Gönüllü Olun", href: "/gonullu" },
                { text: "Destek", href: "/destek" }
            ]
        }
    ]

    return (
        <section 
            className="bg-white" 
            style={{
                backgroundImage: 'url("/flex-ui-assets/elements/pattern-white.svg")', 
                backgroundPosition: 'center'
            }}
        >
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap pt-24 pb-12 -mx-4">
                    {/* Logo ve Açıklama */}
                    <div className="w-full md:w-1/2 lg:w-4/12 px-4 mb-16 lg:mb-0">
                        <Link href="/" className="inline-block mb-4">
                            <Image 
                                className="h-16"
                                src="/flex-ui-assets/logos/Milano-Turk-Ogrenci-Birligi-Logo.png"
                                alt="MTÖB Logo"
                                width={60}
                                height={60}
                            />
                        </Link>
                        <p className="text-base md:text-lg text-coolGray-500 font-medium lg:w-64">
                            Milano Türk Öğrenci Birliği, Milano'da öğrenim gören Türk öğrencilerin dayanışmasını ve kültürel paylaşımlarını artırmayı amaçlamaktadır.
                        </p>
                    </div>

                    {/* Footer Bağlantıları */}
                    {footerSections.map((section, index) => (
                        <div key={index} className="w-full md:w-1/4 lg:w-2/12 px-4 mb-16 lg:mb-0">
                            <h3 className="mb-5 text-lg font-bold text-coolGray-900">
                                {section.title}
                            </h3>
                            <ul>
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex} className="mb-4 last:mb-0">
                                        <Link 
                                            href={link.href}
                                            className="inline-block text-coolGray-500 hover:text-coolGray-600 font-medium"
                                        >
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Bülten Kaydı */}
                    <div className="w-full md:w-1/3 lg:w-4/12 px-4">
                        <h3 className="mb-5 text-lg font-bold text-coolGray-900">
                            Bülten
                        </h3>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:flex-1 py-1 lg:py-0 lg:mr-3">
                                <input 
                                    className="px-3 w-full h-12 text-coolGray-900 outline-none placeholder-coolGray-500 border border-coolGray-200 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-xsm" 
                                    placeholder="E-posta adresiniz"
                                />
                            </div>
                            <div className="w-full lg:w-auto py-1 lg:py-0">
                                <button className="inline-block py-4 px-5 w-full leading-4 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm">
                                    Abone Ol
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alt Çizgi ve Telif Hakkı */}
            <div className="border-b border-coolGray-100" />
            <p className="py-10 md:pb-16 text-sm text-coolGray-400 font-medium text-center">
                © 2024 Milano Türk Öğrenci Birliği. Tüm hakları saklıdır.
            </p>
        </section>
    )
}
