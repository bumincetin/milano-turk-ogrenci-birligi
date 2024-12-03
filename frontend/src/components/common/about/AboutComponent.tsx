import React from 'react';

const AboutComponent: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Biz Kimiz?</h2>
          <p className="text-gray-700">
            Milano Türk Öğrenci Birliği, İtalya'da yaşayan Türk toplumunun sosyal, kültürel ve eğitim
            alanlarındaki ilerlemesine katkıda bulunmayı amaçlayan bir topluluktur. Birliğimiz, Türk
            öğrencilerin İtalya'ya uyumunu sağlamak için sosyal, kültürel, eğitimsel ve sportif
            faaliyetlerde bulunmaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Misyonumuz</h2>
          <p className="text-gray-700">
            Misyonumuz, Türkiye'den gelen öğrencilere rehberlik ve destek sunarak entegrasyonlarını
            sağlamaktır. Bu kapsamda öğrencilere İtalyan eğitim sistemi ve İtalya'da yaşam hakkında
            rehberlik etmekteyiz. Ayrıca Türk gençlerinin kariyer gelişimlerine destek olmak amacıyla
            yerel şirketlerle işbirlikleri kurmaktayız.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Vizyonumuz</h2>
          <p className="text-gray-700">
            Vizyonumuz, İtalya'da eğitim gören Türk öğrencilere, bilimsel, sosyal ve kültürel alanlarda
            destek sağlamaktır. Hedefimiz, Türk ve İtalyan toplumları arasında hoşgörü ve diyaloğun
            gelişmesine katkıda bulunmaktır. Eğitimde fırsat eşitliğini sağlamak ve Türk toplumunun
            Avrupa'daki varlığını güçlendirmek amacıyla hareket etmekteyiz.
          </p>
        </section>

      </div>
    </div>
  );
};

export default AboutComponent;
