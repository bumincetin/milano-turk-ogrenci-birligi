import Image from 'next/image'
import Link from 'next/link'

interface TeamMember {
    name: string
    title: string
    quote: string
    avatar: string
    linkedin: string
    instagram: string
}

export default function IndexSectionTeamWhitePattern9() {
    const teamMembers: TeamMember[] = [
        {
            name: "Mustafa Şandırlı",
            title: "Başkan",
            quote: "Kültürümüzle Milano'da birleşiyor, dayanışmayla güçleniyoruz.",
            avatar: "/mtob-team/Mustafa_Sandirli.jpg",
            linkedin: "https://www.linkedin.com/in/mustafa-%C5%9Fand%C4%B1rl%C4%B1-38b94919b/",
            instagram: "https://www.instagram.com/msandirli/"
        },
        {
            name: "Muhammed Talha Çoğalmış",
            title: "Başkan Yardımcısı",
            quote: "Hep birlikte Milano'da  güçlü bir öğrenci topluluğu inşa etmek için burdayız.",
            avatar: "/mtob-team/Muhammet_Talha_Cogalmis.jpg",
            linkedin: "https://www.linkedin.com/in/muhammed-talha-çoğalmış-1ba09b1b1",
            instagram: "https://www.instagram.com/talhacogalmis/"
        },
        {
            name: "Bumin Kağan Çetin",
            title: "Genel Sekreter",
            quote: "Gelenekten Geleceğe, Birlikte İlham Veriyoruz!",
            avatar: "/mtob-team/Bumin_Kagan.jpg",
            linkedin: "https://www.linkedin.com/in/buminkcetin/",
            instagram: "https://www.instagram.com/boomincetin/"
        },
        {
            name: "Aleyna Şenol",
            title: "Etkinlik Koordinatörü",
            quote: "Kültürlerarası köprüler kuruyor, geleceğe birlikte yürüyoruz.",
            avatar: "/mtob-team/Aleyna_Senol.jpg",
            linkedin: "https://www.linkedin.com/in/aleyna-%C5%9Fenol-a53315256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            instagram: "https://www.instagram.com/alleynasnll/"
        },
        {
            name: "Alize Ataç",
            title: "Tanıtım ve Sosyal Medya Koordinatörü",
            quote: "Gücümüz birbirimize verdiğimiz destekten gelir, çünkü birlikte her şey mümkün.",
            avatar: "/mtob-team/Alize_Atac.jpg",
            linkedin: "https://www.linkedin.com/in/alize-atac-18621918a/",
            instagram: "https://www.instagram.com/alize.atac/"
        },
        {
            name: "Pınar Ürün",
            title: "Akademik ve Öğrenci İşleri Koordinatörü",
            quote: "Akademik Başarıdan Toplumsal Dayanışmaya, Her Alanda Birlikteyiz!",
            avatar: "/mtob-team/Pinar_Urun.jpg",
            linkedin: "https://www.linkedin.com/in/p%C4%B1nar-%C3%BCr%C3%BCn-412668168/",
            instagram: "https://www.instagram.com/pinar.urn/"
        }
    ]

    return (
        <section 
            className="py-24 bg-white" 
            style={{
                backgroundImage: 'url("/flex-ui-assets/elements/pattern-white.svg")', 
                backgroundPosition: 'center'
            }}
        >
            <div className="container px-4 mx-auto">
                {/* Başlık Bölümü */}
                <div className="mb-16 text-center">
                    <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-primary-500 bg-primary-100 font-medium uppercase rounded-9xl">
                        Ekibimiz
                    </span>
                    <h3 className="mb-4 text-3xl md:text-5xl leading-tight text-black-900 font-bold tracking-tighter">
                        MTÖB Yönetim Ekibi ile Tanışın
                    </h3>
                    <p className="mb-8 text-lg md:text-xl text-gray-500 font-medium">
                        Milano'da öğrenim gören Türk öğrenciler için çalışan gönüllü ve tutkulu bir ekip.
                    </p>
                </div>

                {/* Ekip Üyeleri */}
                <div className="flex flex-wrap -mx-4">
                    {teamMembers.map((member, index) => (
                        <div 
                            key={index} 
                            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-10 lg:mb-3"
                        >
                            <div className="h-full py-8 px-10 bg-black-50 rounded-md text-center flex flex-col">
                                <Image 
                                    className="w-24 h-24 mx-auto mb-6 rounded-full"
                                    src={member.avatar}
                                    alt={`${member.name} fotoğrafı`}
                                    width={96}
                                    height={96}
                                />
                                <h3 className="text-2xl md:text-3xl leading-tight font-semibold min-h-[4rem] flex items-center justify-center">
                                    {member.name}
                                </h3>
                                <span className="inline-block mb-3 text-lg font-medium text-primary-500 min-h-[3.5rem] flex items-center justify-center">
                                    {member.title}
                                </span>
                                <p className="mb-4 text-gray-500 font-medium line-clamp-4 min-h-[6rem]">
                                    {member.quote}
                                </p>
                                <div className="flex items-center justify-center mt-auto">
                                    <Link 
                                        href={member.instagram} 
                                        className="inline-block mr-6 hover:opacity-80"
                                    >
                                        <Image 
                                            src="/flex-ui-assets/brands/instagram.svg"
                                            alt="Instagram"
                                            width={24}
                                            height={24}
                                        />
                                    </Link>
                                    <Link 
                                        href={member.linkedin} 
                                        className="inline-block hover:opacity-80"
                                    >
                                        <Image 
                                            src="/flex-ui-assets/brands/linkedin.svg"
                                            alt="LinkedIn"
                                            width={24}
                                            height={24}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
