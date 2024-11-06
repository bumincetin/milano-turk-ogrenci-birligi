import Image from 'next/image'

export default function ContactSectionContactsWhitePattern3() {
    return (
        <section className="pt-20 bg-white" style={{backgroundImage: 'url("/flex-ui-assets/elements/pattern-white.svg")', backgroundPosition: 'center'}}>
            <div className="container px-4 mx-auto">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-9xl">
                        İletişim
                    </span>
                    <h3 className="mb-4 text-4xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
                        Bağlantıda Kalalım
                    </h3>
                    <p className="text-lg md:text-xl text-coolGray-500 font-medium">
                        Bizimle iletişime geçmek hiç bu kadar kolay olmamıştı. Bizi arayın, canlı sohbet özelliğimizi kullanın veya e-posta gönderin, en kısa sürede size geri döneceğiz!
                    </p>
                </div>
                
                <div className="relative mx-auto h-72 md:h-[500px] -mb-32 md:-mb-80">
                    <Image 
                        src="/flex-ui-assets/images/contact/contact-map.png"
                        alt="Contact map"
                        fill
                        style={{ objectFit: 'cover' }}
                        quality={100}
                    />
                </div>
            </div>
            
            <div className="h-2 bg-green-500" />
            
            <div 
                className="py-24 md:py-64 bg-coolGray-900" 
                style={{
                    backgroundImage: 'url("/flex-ui-assets/elements/pattern-dark.svg")', 
                    backgroundPosition: 'center'
                }} 
            />
        </section>
    )
} 