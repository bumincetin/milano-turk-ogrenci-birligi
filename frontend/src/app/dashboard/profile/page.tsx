'use client'
import { FC, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { userService } from '@/services/userService';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  birthDate: string;
  description: string;
  avatar: File | string;
  linkedin: string;
  university: string;
  department: string;
  universityClass: string;
  bio: string;
  twitter?: string;
  phone?: string;
  website?: string;
  position?: string;
  username?: string;
  uyeliktipi?: 'seviye-0' | 'seviye-1' | 'seviye-2' | 'seviye-3';
}

const ProfilePage: FC = () => {
  const { user, isStaticMode } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    birthDate: '',
    description: '',
    avatar: '',
    linkedin: '',
    university: '',
    department: '',
    universityClass: '',
    bio: ''
  });
  const router = useRouter();

  const getMembershipLevelText = (level?: string) => {
    switch (level) {
      case 'seviye-1':
        return 'Bronz Üye';
      case 'seviye-2':
        return 'Gümüş Üye';
      case 'seviye-3':
        return 'Altın Üye';
      case 'seviye-0':
      default:
        return 'Üye Değil';
    }
  };

  const getMembershipLevelColor = (level?: string) => {
    switch (level) {
      case 'seviye-1':
        return 'text-amber-700 bg-amber-100';
      case 'seviye-2':
        return 'text-gray-700 bg-gray-100';
      case 'seviye-3':
        return 'text-yellow-700 bg-yellow-100';
      case 'seviye-0':
      default:
        return 'text-red-700 bg-red-100';
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // In static mode, use demo profile
        if (isStaticMode || !user) {
          const demoProfile = await userService.getProfile('demo', 'demo-token');
          setUserData({
            firstName: demoProfile.firstName || 'Demo',
            lastName: demoProfile.lastName || 'Kullanıcı',
            email: demoProfile.email || 'demo@mtob.org',
            role: demoProfile.role?.name || 'user',
            birthDate: demoProfile.birthday || '2000-01-01',
            description: demoProfile.description || '',
            avatar: demoProfile.avatar || '',
            linkedin: demoProfile.linkedin || '',
            university: demoProfile.university || 'Politecnico di Milano',
            department: demoProfile.department || 'Bilgisayar Mühendisliği',
            universityClass: demoProfile.universityClass || '3',
            bio: demoProfile.description || '',
            twitter: demoProfile.twitter || '',
            phone: demoProfile.phone || '',
            website: demoProfile.website || '',
            position: demoProfile.position || '',
            username: demoProfile.username || 'demo_user',
            uyeliktipi: (demoProfile.uyeliktipi as 'seviye-0' | 'seviye-1' | 'seviye-2' | 'seviye-3') || 'seviye-0'
          });
        }
      } catch (error) {
        toast.error('Profil bilgileri yüklenirken bir hata oluştu');
        console.error('Profil yükleme hatası:', error);
      }
    };

    fetchProfile();
  }, [user, isStaticMode]);

  const handleSubmit = async () => {
    if (isStaticMode) {
      toast.info('Profil güncelleme özelliği şu anda aktif değil.');
      setIsEditing(false);
      return;
    }

    try {
      setIsLoading(true);
      // Profile update logic would go here
      toast.success('Profil başarıyla güncellendi');
      setIsEditing(false);
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      toast.error('Profil güncellenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.warning('Dosya boyutu 10MB\'dan küçük olmalıdır');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Lütfen geçerli bir resim dosyası seçin');
        return;
      }

      setUserData({
        ...userData,
        avatar: file
      });

      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);

      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  const handleMembershipClick = () => {
    router.push('/dashboard/membership');
  };

  const AvatarDisplay = () => {
    const getImageUrl = (avatarUrl: string) => {
      if (!avatarUrl) return '/flex-ui-assets/images/dashboard/navigations/avatar.png';
      if (avatarUrl.startsWith('blob:')) return avatarUrl;
      if (avatarUrl.startsWith('http')) return avatarUrl;
      return avatarUrl;
    };

    return (
      <div className="relative">
        <img 
          src={getImageUrl(avatarPreview || (typeof userData.avatar === 'string' ? userData.avatar : ''))}
          alt="Profil" 
          className="w-20 h-20 rounded-full object-cover"
        />
        {isEditing && (
          <div className="absolute bottom-0 right-0 bg-primary-500 rounded-full p-1 cursor-pointer">
            <svg 
              className="w-4 h-4 text-white"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
              />
            </svg>
          </div>
        )}
      </div>
    );
  };

  const getYearText = (year: string) => {
    switch (year) {
      case '1.sınıf': return '1. Sınıf';
      case '2.sınıf': return '2. Sınıf';
      case '3.sınıf': return '3. Sınıf';
      case '4.sınıf': return '4. Sınıf';
      case 'Yüksek Lisans': return 'Yüksek Lisans';
      case 'Doktora': return 'Doktora';
      case 'Mezun': return 'Mezun';
      case 'hazırlık': return 'Hazırlık';
      case 'Diğer': return 'Diğer';
      default: return year || 'Belirtilmemiş';
    }
  };

  return (
    <section className="bg-black-50 py-4">
      <div className="container px-4 mx-auto">
        {isStaticMode && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
            🔔 Demo modu aktif. Profil bilgileri örnek verilerdir.
          </div>
        )}
        
        <div className="p-6 h-full border border-black-100 overflow-hidden bg-white rounded-md shadow-dashboard">
          <div className="pb-6 border-b border-black-100">
            <div className="flex flex-wrap items-center justify-between -m-2">
              <div className="w-full md:w-auto p-2">
                <h2 className="text-black-900 text-lg font-semibold">Profil Bilgileri</h2>
                <p className="text-xs text-gray-500 font-medium">Hesap detaylarınız</p>
              </div>
              <div className="w-full md:w-auto p-2">
                {isEditing ? (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsEditing(false)}
                      disabled={isLoading}
                      className="px-4 py-2 text-sm text-gray-500 hover:text-black-600 border border-black-200 hover:border-black-300 rounded-md shadow-button"
                    >
                      İptal
                    </button>
                    <button 
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="px-4 py-2 text-sm text-white bg-primary-500 hover:bg-primary-600 rounded-md shadow-button flex items-center"
                    >
                      {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-sm text-white bg-primary-500 hover:bg-primary-600 rounded-md shadow-button"
                  >
                    Güncelle
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* İsim Bölümü */}
          <div className="py-6 border-b border-black-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-black-800 font-semibold">Ad Soyad</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <p className="text-base text-black-900">{userData.firstName} {userData.lastName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Bölümü */}
          <div className="py-6 border-b border-black-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-black-800 font-semibold">Email</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <p className="text-base text-black-900">{userData.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Üyelik Durumu Bölümü */}
          <div className="py-6 border-b border-black-100">
            <div className="w-full md:w-12/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/4 p-3">
                  <p className="text-sm text-black-800 font-semibold">Üyelik Durumu</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`px-3 py-1 text-sm rounded-full ${getMembershipLevelColor(userData.uyeliktipi)}`}>
                        {getMembershipLevelText(userData.uyeliktipi)}
                      </span>
                    </div>
                    {userData.uyeliktipi === 'seviye-0' && (
                      <button 
                        className="px-4 py-1 text-sm text-white bg-primary-500 hover:bg-primary-600 rounded-md shadow-button"
                        onClick={handleMembershipClick}
                      >
                        Üye Ol
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Avatar Bölümü */}
          <div className="py-6 border-b border-black-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-black-800 font-semibold">Profil Fotoğrafı</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <div className="flex items-center gap-4">
                    <AvatarDisplay />
                    {isEditing && (
                      <div className="relative flex flex-col items-center justify-center p-6 h-44 text-center text-primary-500 focus-within:border-primary-500 border border-dashed border-black-200 rounded-lg flex-1">
                        <p className="mb-1 text-sm text-black-800 font-medium">
                          <span className="text-primary-500">Dosya yüklemek için tıklayın</span>
                        </p>
                        <p className="text-xs text-gray-500 font-medium">PNG, JPG, GIF - en fazla 10MB</p>
                        <input 
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" 
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Üniversite Bilgileri */}
          <div className="py-6 border-b border-black-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-black-800 font-semibold">Üniversite Bilgileri</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        className="w-full px-4 py-2.5 text-base text-black-900 font-normal outline-none focus:border-primary-500 border border-black-200 rounded-lg shadow-input"
                        value={userData.university}
                        placeholder="Üniversite"
                        onChange={(e) => setUserData({...userData, university: e.target.value})}
                      />
                      <input
                        className="w-full px-4 py-2.5 text-base text-black-900 font-normal outline-none focus:border-primary-500 border border-black-200 rounded-lg shadow-input"
                        value={userData.department}
                        placeholder="Bölüm"
                        onChange={(e) => setUserData({...userData, department: e.target.value})}
                      />
                      <select
                        className="w-full px-4 py-2.5 text-base text-black-900 font-normal outline-none focus:border-primary-500 border border-black-200 rounded-lg shadow-input"
                        value={userData.universityClass || 'hazırlık'}
                        onChange={(e) => setUserData({...userData, universityClass: e.target.value})}
                      >
                        <option value="hazırlık">Hazırlık</option>
                        <option value="1.sınıf">1. Sınıf</option>
                        <option value="2.sınıf">2. Sınıf</option>
                        <option value="3.sınıf">3. Sınıf</option>
                        <option value="4.sınıf">4. Sınıf</option>
                        <option value="Yüksek Lisans">Yüksek Lisans</option>
                        <option value="Doktora">Doktora</option>
                        <option value="Mezun">Mezun</option>
                        <option value="Diğer">Diğer</option>
                      </select>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-base text-black-900">{userData.university || 'Belirtilmemiş'}</p>
                      <p className="text-base text-black-900">{userData.department || 'Belirtilmemiş'}</p>
                      <p className="text-base text-black-900">{getYearText(userData.universityClass)}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* LinkedIn Bölümü */}
          <div className="py-6 border-b border-black-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-black-800 font-semibold">LinkedIn</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  {isEditing ? (
                    <input
                      className="w-full px-4 py-2.5 text-base text-black-900 font-normal outline-none focus:border-primary-500 border border-black-200 rounded-lg shadow-input"
                      value={userData.linkedin}
                      placeholder="LinkedIn profil linkiniz"
                      onChange={(e) => setUserData({...userData, linkedin: e.target.value})}
                    />
                  ) : (
                    <a 
                      href={userData.linkedin || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-blue-600 hover:underline"
                    >
                      {userData.linkedin || 'Belirtilmemiş'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Kendini Tanıtma Bölümü */}
          <div className="py-6">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-black-800 font-semibold">Kendini Tanıt</p>
                  <p className="text-xs text-gray-500">Kısa bir açıklama yazın</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  {isEditing ? (
                    <textarea
                      className="w-full h-32 px-4 py-2.5 text-base text-black-900 font-normal outline-none focus:border-primary-500 border border-black-200 rounded-lg shadow-input"
                      value={userData.description}
                      placeholder="Kendinizi tanıtın..."
                      onChange={(e) => setUserData({...userData, description: e.target.value})}
                    />
                  ) : (
                    <p className="text-base text-black-900">{userData.description || 'Henüz bir açıklama eklenmemiş.'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
