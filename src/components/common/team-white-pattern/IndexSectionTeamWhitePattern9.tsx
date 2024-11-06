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
            title: "CEO & Kurucu",
            quote: "Başarı, her gün küçük adımlar atmaktır.",
            avatar: "/flex-ui-assets/images/teams/avatar1.png"
        },
        {
            name: "Mehmet Demir",
            title: "CTO",
            quote: "İstediğiniz her şey, korkularınızın diğer tarafındadır.",
            avatar: "/flex-ui-assets/images/teams/avatar2.png"
        },
        {
            name: "Ayşe Kaya",
            title: "CPO",
            quote: "Harika işler yapmanın tek yolu, yaptığınız işi sevmektir.",
            avatar: "/flex-ui-assets/images/teams/avatar3.png"
        },
        {
            name: "Zeynep Aydın",
            title: "Müşteri Başarısı",
            quote: "Ekstra mil boyunca trafik sıkışıklığı yoktur.",
            avatar: "/flex-ui-assets/images/teams/avatar4.png"
        },
        {
            name: "Elif Yıldız",
            title: "Backend Geliştirici",
            quote: "Zihin her şeydir. Ne düşünürseniz o olursunuz.",
            avatar: "/flex-ui-assets/images/teams/avatar5.png"
        },
        {
            name: "Selin Öztürk",
            title: "iOS Geliştirici",
            quote: "Yapabileceğinizi veya yapamayacağınızı düşünün, her iki durumda da haklısınız.",
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
                        Sektörün en iyi ekibiyle tanışın
                    </h3>
                    <p className="mb-8 text-lg md:text-xl text-coolGray-500 font-medium">
                        İşletmenizi tüm dijital kanallarda yönetebilecek profesyonel ve yetenekli bir ekip.
                    </p>
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full md:w-auto py-1 md:py-0 md:mr-4">
                            <Link 
                                href="/kariyer"
                                className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-green-500 rounded-md shadow-sm"
                            >
                                Açık Pozisyonlar
                            </Link>
                        </div>
                        <div className="w-full md:w-auto py-1 md:py-0">
                            <Link 
                                href="/hakkimizda"
                                className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-coolGray-800 font-medium text-center bg-white hover:bg-coolGray-100 focus:ring-2 focus:ring-coolGray-200 focus:ring-opacity-50 border border-coolGray-200 rounded-md shadow-sm"
                            >
                                Hakkımızda
                            </Link>
                        </div>
                    </div>
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