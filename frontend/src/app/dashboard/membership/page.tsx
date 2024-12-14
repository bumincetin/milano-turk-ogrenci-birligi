'use client'
import { FC } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const MembershipPage: FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleMembershipRequest = () => {
    if (!user) {
      toast.error('Üyelik talebi göndermek için önce giriş yapmalısınız.');
      
      // 2 saniye bekle ve yönlendir
      setTimeout(() => {
        router.push('/giris');
      }, 2000);
      
      return;
    }

    // Kullanıcı bilgilerini içeren mail body'si oluştur
    const mailBody = `Sayın Milano Türk Öğrenci Birliği Yetkilileri,

Üyelik talebimi iletmek istiyorum.

Üye Bilgileri:
Ad Soyad: ${user.name} ${user.lastname}
E-posta: ${user.email}
${user.universityName ? `Üniversite: ${user.universityName}` : ''}
${user.universityDepartment ? `Bölüm: ${user.universityDepartment}` : ''}

Lütfen benimle iletişime geçer misiniz?

Teşekkürler,
${user.name} ${user.lastname}`;

    // Mail linkini oluştur
    const mailtoLink = `mailto:umut3a5@gmail.com?subject=Üyelik Talebi&body=${encodeURIComponent(mailBody)}`;
    
    // Yeni pencerede mail linkini aç
    window.open(mailtoLink, '_blank');
    
    toast.success('Üyelik talebiniz için maile yönlendiriliyorsunuz.');
  };

  return (
    <section className="bg-black-50 py-4">
      <div className="container px-4 mx-auto">
        <div className="p-6 h-full border border-black-100 overflow-hidden bg-white rounded-md shadow-dashboard">
          <h2 className="text-2xl font-bold mb-6">Üyelik İşlemleri</h2>
          <iframe
            src="/mtob-images/MTOBWelcomeForm.pdf"
            width="100%"
            height="1200px"
            style={{ border: 'none' }}
          />
          <div className="mt-6 text-center">
            <button
              onClick={handleMembershipRequest}
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
            >
              Üye Olmak İstiyorum
            </button>
            {!user && (
              <p className="mt-2 text-sm text-gray-600">
                Üyelik talebi göndermek için lütfen önce giriş yapın.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipPage;
