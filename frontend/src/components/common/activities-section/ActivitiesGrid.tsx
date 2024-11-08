import React from 'react';
import Image from 'next/image';

export default function EtkinliklerGrid() {
  const icons = [
    "/flex-ui-assets/elements/activities/mail-icon.svg",
    "/flex-ui-assets/elements/activities/linechart-icon.svg",
    "/flex-ui-assets/elements/activities/team-icon.svg",
    "/flex-ui-assets/elements/activities/write-icon.svg",
    "/flex-ui-assets/elements/activities/multi-square-icon.svg",
    "/flex-ui-assets/elements/activities/settings-icon.svg",
  ];

  return (
    <section className="py-24 md:pb-32 bg-white" style={{backgroundImage: "url('flex-ui-assets/elements/pattern-white.svg')", backgroundPosition: "center"}}>
      <div className="container px-4 mx-auto">
        <div className="md:max-w-4xl mb-12 mx-auto text-center">
          <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm">
            Etkinlikler
          </span>
          <h1 className="mb-4 text-3xl md:text-4xl leading-tight font-bold tracking-tighter">
            Etkinliklerimiz
          </h1>
          <p className="text-lg md:text-xl text-coolGray-500 font-medium">
            Bu sayfa şu anda yapım aşamasındadır. Yakında hizmetinizde
          </p>
        </div>
        
        <div className="flex flex-wrap -mx-4">
          {icons.map((icon, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4">
              <div className="h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200">
                <div className="inline-flex h-16 w-16 mb-6 mx-auto items-center justify-center text-white bg-green-500 rounded-lg">
                  <Image 
                    src={icon} 
                    alt={`Etkinlik İkonu ${index + 1}`} 
                    width={24} 
                    height={21}
                    className="brightness-0 invert"
                  />
                </div>
                <h3 className="mb-4 text-xl md:text-2xl leading-tight font-bold">
                  Yakında
                </h3>
                <p className="text-coolGray-500 font-medium">
                  Etkinlik detayları yakında burada olacak
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}