import Image from 'next/image'
import Link from 'next/link'

interface TeamMember {
    name: string
    title: string
    quote: string
    avatar: string
}

export default function IndexSectionTeamWhitePattern9() {
    const teamMembers: TeamMember[] = [
        {
            name: "Ahmet Yılmaz",
            title: "Başkan",
            quote: "Dayanışma, Milano'daki tüm Türk öğrencilerin en büyük gücüdür.",
            avatar: "/flex-ui-assets/images/teams/avatar1.png"
        },
        {
            name: "Mehmet Demir",
            title: "Etkinlik Koordinatörü",
            quote: "Birlikte güzel anılar biriktirmek için buradayız.",
            avatar: "/flex-ui-assets/images/teams/avatar2.png"
        },
        {
            name: "Ayşe Kaya",
            title: "İletişim Sorumlusu",
            quote: "MTÖB olarak, her zaman yanınızdayız.",
            avatar: "/flex-ui-assets/images/teams/avatar3.png"
        },
        {
            name: "Zeynep Aydın",
            title: "Akademik Danışman",
            quote: "Akademik başarı, dayanışmayla daha anlamlı hale gelir.",
            avatar: "/flex-ui-assets/images/teams/avatar4.png"
        },
        {
            name: "Elif Yıldız",
            title: "Kariyer Danışmanı",
            quote: "Geleceğinizi şekillendirirken yanınızdayız.",
            avatar: "/flex-ui-assets/images/teams/avatar5.png"
        },
        {
            name: "Selin Öztürk",
            title: "Sosyal Medya Uzmanı",
            quote: "MTÖB'nin sesini her platformda duyurmak için buradayız.",
            avatar: "/flex-ui-assets/images/teams/avatar6.png"
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
                    <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-9xl">
                        Ekibimiz
                    </span>
                    <h3 className="mb-4 text-3xl md:text-5xl leading-tight text-coolGray-900 font-bold tracking-tighter">
                        MTÖB Yönetim Ekibi ile Tanışın
                    </h3>
                    <p className="mb-8 text-lg md:text-xl text-coolGray-500 font-medium">
                        Milano'da öğrenim gören Türk öğrenciler için çalışan gönüllü ve tutkulu bir ekip.
                    </p>
                </div>

                {/* Ekip Üyeleri */}
                <div className="flex flex-wrap -mx-4">
                    {teamMembers.map((member, index) => (
                        <div 
                            key={index} 
                            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-10 lg:mb-0"
                        >
                            <div className="h-full py-8 px-10 bg-coolGray-50 rounded-md text-center">
                                <Image 
                                    className="w-24 h-24 mx-auto mb-6 rounded-full"
                                    src={member.avatar}
                                    alt={`${member.name} fotoğrafı`}
                                    width={96}
                                    height={96}
                                />
                                <h3 className="mb-2 text-2xl md:text-3xl leading-tight font-semibold">
                                    {member.name}
                                </h3>
                                <span className="inline-block mb-6 text-lg font-medium text-green-500">
                                    {member.title}
                                </span>
                                <p className="mb-8 text-coolGray-500 font-medium">
                                    {member.quote}
                                </p>
                                <div className="flex items-center justify-center">
                                    <Link 
                                        href="#" 
                                        className="inline-block mr-6 hover:opacity-80"
                                    >
                                        <Image 
                                            src="/flex-ui-assets/brands/facebook.svg"
                                            alt="Facebook"
                                            width={24}
                                            height={24}
                                        />
                                    </Link>
                                    <Link 
                                        href="#" 
                                        className="inline-block hover:opacity-80"
                                    >
                                        <Image 
                                            src="/flex-ui-assets/brands/twitter.svg"
                                            alt="Twitter"
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
