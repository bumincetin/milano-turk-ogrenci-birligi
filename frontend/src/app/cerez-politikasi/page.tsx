'use client'
import { FC } from 'react';
import DashboardHeader from '@/components/common/dashboard/DashboardHeader';
import DashboardNavbar from '@/components/common/dashboard/DashboardNavbar';
import Link from 'next/link';
import IndexSectionNavigationsWhite1 from '@/components/common/navigations-white/IndexSectionNavigationsWhite1';
import IndexSectionHeadersWhitePattern2 from '@/components/common/headers-white-pattern/IndexSectionHeadersWhitePattern2';
import HeroSection from '@/components/common/hero-section/HeroSection';

const CookiePolicy: FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <IndexSectionNavigationsWhite1 />
      <IndexSectionHeadersWhitePattern2 />


      {/* Sayfa Başlığı */}
      <div className="container px-4 mx-auto py-16">
        <h1 className="text-4xl font-bold text-black-900 mb-6">Çerez Politikası</h1>
        <p className="text-lg text-gray-500 font-medium mb-12">
          MTÖB web sitesinde çerezlerin nasıl kullanıldığını ve çerez tercihlerinizi nasıl yönetebileceğinizi öğrenin.
        </p>

        {/* Çerezlerin Kullanımı */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black-800 mb-4">Çerezlerin Kullanımı</h2>
          <p className="text-gray-500 font-medium mb-4">
            Çerezler, web sitemizi nasıl kullandığınızı anlamamıza ve deneyiminizi kişiselleştirmemize yardımcı olan küçük veri dosyalarıdır. Çerezler, tercihlerinizi hatırlamamıza ve sizlere en uygun içeriği sunmamıza olanak tanır.
          </p>
        </section>

        {/* Çerez Türleri */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black-800 mb-4">Çerez Türleri</h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-500 font-medium">
            <li><span className="font-semibold text-black-800">Kesinlikle Gerekli Çerezler:</span> Web sitemizin doğru çalışması için zorunludur. Bu çerezler, sitenin temel işlevlerini sağlar.</li>
            <li><span className="font-semibold text-black-800">Performans Çerezleri:</span> Web sitemizin performansını izlememizi sağlar ve kullanıcı deneyimini geliştirmemize yardımcı olur.</li>
            <li><span className="font-semibold text-black-800">Fonksiyonel Çerezler:</span> Siteye giriş yaparken tercihlerinizi ve diğer kişiselleştirilmiş özelliklerinizi hatırlamamızı sağlar.</li>
            <li><span className="font-semibold text-black-800">Hedefleme ve Reklam Çerezleri:</span> İlginizi çekebilecek içerik ve reklamları sunmamızı sağlar.</li>
          </ul>
        </section>

        {/* Çerez Tercihlerinizi Yönetme */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black-800 mb-4">Çerez Tercihlerinizi Yönetme</h2>
          <p className="text-gray-500 font-medium mb-4">
            Çerez ayarlarınızı tarayıcınız üzerinden yönetebilirsiniz. Tarayıcı ayarlarınızdan bazı çerezleri engelleyebilir veya silebilirsiniz; ancak bu durumda sitemizin bazı özellikleri beklediğiniz gibi çalışmayabilir.
          </p>
          <button className="inline-block py-3 px-5 text-base text-primary-50 font-medium text-center bg-primary-500 hover:bg-primary-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm">
            Çerez Ayarlarını Yönet
          </button>
        </section>

        {/* İletişim */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black-800 mb-4">İletişim</h2>
          <p className="text-gray-500 font-medium">
            Çerez politikamız hakkında daha fazla bilgi almak için <Link href="/iletisim" className="text-primary-500 hover:text-primary-600">bizimle iletişime geçebilirsiniz.</Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;
