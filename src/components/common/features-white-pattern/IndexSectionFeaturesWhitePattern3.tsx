import Image from 'next/image'

interface Feature {
    icon: JSX.Element
    title: string
    description: string
}

export default function IndexSectionFeaturesWhitePattern3() {
    const features: Feature[] = [
        {
            icon: (
                <svg width={24} height={21} viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 18.63H5C4.20435 18.63 3.44129 18.3139 2.87868 17.7513C2.31607 17.1887 2 16.4257 2 15.63V7.63C2 7.36479 1.89464 7.11043 1.70711 6.9229C1.51957 6.73536 1.26522 6.63 1 6.63C0.734784 6.63 0.48043 6.73536 0.292893 6.9229C0.105357 7.11043 0 7.36479 0 7.63L0 15.63C0 16.9561 0.526784 18.2279 1.46447 19.1655C2.40215 20.1032 3.67392 20.63 5 20.63H17C17.2652 20.63 17.5196 20.5246 17.7071 20.3371C17.8946 20.1496 18 19.8952 18 19.63C18 19.3648 17.8946 19.1104 17.7071 18.9229C17.5196 18.7354 17.2652 18.63 17 18.63Z" fill="currentColor" />
                </svg>
            ),
            title: "Öğrenci Dayanışma Sistemi",
            description: "Ekibinizle bağlantıda kalın ve nerede olursanız olun hızlı kararlar alın."
        },
        {
            icon: (
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 18H9.24C9.37161 18.0008 9.50207 17.9755 9.62391 17.9258C9.74574 17.876 9.85656 17.8027 9.95 17.71L16.87 10.78L19.71 8C19.8037 7.90704 19.8781 7.79644 19.9289 7.67458C19.9797 7.55272 20.0058 7.42201 20.0058 7.29C20.0058 7.15799 19.9797 7.02728 19.9289 6.90542C19.8781 6.78356 19.8037 6.67296 19.71 6.58L15.47 2.29C15.377 2.19627 15.2664 2.12188 15.1446 2.07111C15.0227 2.02034 14.892 1.9942 14.76 1.9942C14.628 1.9942 14.4973 2.02034 14.3754 2.07111C14.2536 2.12188 14.143 2.19627 14.05 2.29L11.23 5.12L4.29 12.05C4.19732 12.1434 4.12399 12.2543 4.07423 12.3761C4.02446 12.4979 3.99924 12.6284 4 12.76V17C4 17.2652 4.10536 17.5196 4.29289 17.7071C4.48043 17.8946 4.73478 18 5 18Z" fill="currentColor" />
                </svg>
            ),
            title: "Eğitim ve Gelişim",
            description: "Web tasarımı veya programlama hakkında hiçbir şey bilmeseniz bile hayal ettiğiniz web sitesini oluşturmanızı sağlayan bir araç."
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
                <div className="xl:max-w-4xl mb-12 mx-auto text-center">
                    <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm">
                        Değerlerimiz
                    </span>
                    <h1 className="mb-4 text-3xl md:text-4xl leading-tight font-bold tracking-tighter">
                        Topluluğumuzun sizlere faydalı olabilmesi için kullandığımız yöntemler
                    </h1>
                    <p className="text-lg md:text-xl text-coolGray-500 font-medium">
                        Topluluk olarak beraber güzel işler başarabilmek için vizyonumuz, misyonumuz, hedeflerimiz ve değerlerimiz anlaşılır ve ortak olmalıdır.
                    </p>
                </div>

                <div className="flex flex-wrap -mx-4">
                    {/* Sol Taraf */}
                    <div className="w-full lg:w-1/3 px-4 lg:pt-6 mb-8 lg:mb-0">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                        ))}
                    </div>

                    {/* Orta Resim */}
                    <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
                        <Image 
                            className="mx-auto"
                            src="/flex-ui-assets/images/features/stock.png"
                            alt="Özellikler görseli"
                            width={400}
                            height={500}
                        />
                    </div>

                    {/* Sağ Taraf */}
                    <div className="w-full lg:w-1/3 lg:pt-6 px-4">
                        {/* Sağ taraftaki özellikler için benzer kartlar */}
                    </div>
                </div>
            </div>
        </section>
    )
}

function FeatureCard({ icon, title, description }: Feature) {
    return (
        <div className="p-8 lg:mb-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200">
            <div className="inline-flex h-16 w-16 mb-6 mx-auto items-center justify-center text-white bg-green-500 rounded-lg">
                {icon}
            </div>
            <h3 className="mb-4 text-xl md:text-2xl leading-tight font-bold">
                {title}
            </h3>
            <p className="text-coolGray-500 font-medium">
                {description}
            </p>
        </div>
    )
} 