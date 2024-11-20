import Image from 'next/image'

export default function ContactSectionContactsWhitePattern3() {
    return (
        <section className="pt-20 bg-white" style={{backgroundImage: 'url("/flex-ui-assets/elements/pattern-white.svg")', backgroundPosition: 'center'}}>
            <div className="container px-4 mx-auto">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-primary-500 bg-primary-100 font-medium uppercase rounded-9xl">
                        İletişim
                    </span>
                    <h3 className="mb-4 text-4xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
                        Bağlantıda Kalalım
                    </h3>
                    <p className="text-lg md:text-xl text-gray-500 font-medium">
                        Bizimle iletişime geçmek hiç bu kadar kolay olmamıştı. Bizi arayın, canlı sohbet özelliğimizi kullanın veya e-posta gönderin, en kısa sürede size geri döneceğiz!
                    </p>
                </div>
                
                <div className="relative mx-auto h-72 md:h-[500px] -mb-32 md:-mb-80">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11583.123456789012!2d9.1899823!3d45.4642035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDI3JzUxLjIiTiA5wrAxMSc0Ni4wIkU!5e0!3m2!1str!2str!4v1611234567890!5m2!1str!2str"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
            
            <div className="h-2 bg-primary-500" />
            
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