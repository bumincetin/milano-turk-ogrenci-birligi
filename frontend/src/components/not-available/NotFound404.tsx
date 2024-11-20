import Link from 'next/link'
import Image from 'next/image'

export default function UnderConstruction() {
    return (
        <section 
          className="relative py-24 md:py-44 lg:py-64 bg-white" 
          style={{backgroundImage: "url('/flex-ui-assets/elements/pattern-white.svg')", backgroundPosition: "center"}}
        >
          <div className="relative z-10 container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="mb-4 text-4xl md:text-5xl leading-tight font-bold tracking-tighter">
                Sayfa Yapım Aşamasında
              </h2>
              <p className="mb-12 text-lg md:text-xl text-gray-500">
                Yakında Hizmetinizde
              </p>
              <div className="flex flex-wrap justify-center">
                <div className="w-full md:w-auto py-1 md:py-0 md:mr-6">
                  <Link 
                    href="/" 
                    className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-primary-50 font-medium text-center bg-primary-500 hover:bg-primary-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-primary-500 rounded-md shadow-sm"
                  >
                    Ana Sayfaya Dön
                  </Link>
                </div>
                <div className="w-full md:w-auto py-1 md:py-0">
                  <Link 
                    href="#" 
                    className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-black-800 font-medium text-center bg-white hover:bg-coolGray-100 focus:ring-2 focus:ring-coolGray-200 focus:ring-opacity-50 border border-coolGray-200 rounded-md shadow-sm"
                  >
                    Tekrar Dene
                  </Link>
                </div>
              </div>
            </div>
          </div>
    
          <Image 
            src="/flex-ui-assets/elements/wave2-yellow.svg"
            alt=""
            width={112}
            height={112}
            className="absolute top-0 left-0 w-28 md:w-auto"
          />
          <Image 
            src="/flex-ui-assets/elements/dots3-green.svg"
            alt=""
            width={112}
            height={112}
            className="absolute right-6 top-6 w-28 md:w-auto"
          />
          <Image 
            src="/flex-ui-assets/elements/wave3-red.svg"
            alt=""
            width={112}
            height={112}
            className="absolute right-0 bottom-0 w-28 md:w-auto"
          />
          <Image 
            src="/flex-ui-assets/elements/dots3-violet.svg"
            alt=""
            width={112}
            height={112}
            className="absolute left-6 bottom-6 w-28 md:w-auto"
          />
        </section>
    )
}