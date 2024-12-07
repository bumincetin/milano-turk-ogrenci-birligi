'use client'
import { FC, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { userService } from '@/services/userService';
import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode';
const COOKIE_NAME = process.env.NEXT_PUBLIC_USER_COOKIE_NAME || 'mtob_user'

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
  year: string;
  bio: string;
  twitter?: string;
  phone?: string;
  website?: string;
  position?: string;
  username?: string;
}

const ProfilePage: FC = () => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string>(''); // Avatar önizleme URL'i
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    birthDate: '',
    description: '',
    avatar: '', // Başlangıçta boş string
    linkedin: '',
    university: '',
    department: '',
    year: '',
    bio: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let token :string = Cookies.get(COOKIE_NAME) as string;
        let user : any = jwtDecode(token as string);
        if (user?.id) {
            console.log("GET USER DATAS")
            
          const data : any = await userService.getProfile(user.id,token);
          console.log("DATA : ",data);
          setUserData({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            role: data.role || '',
            birthDate: data.birthday || '',
            description: data.description || '',
            avatar: data.avatar || '',
            linkedin: data.linkedin || '',
            university: data.university || '',
            department: data.department || '',
            year: data.year || '',
            bio: data.description || '', // description'ı bio olarak kullanıyoruz
            twitter: data.twitter || '',
            phone: data.phone || '',
            website: data.website || '',
            position: data.position || '',
            username: data.username || ''
          });
          setAvatarPreview(data.avatar?.url || ''); // Önizleme için URL'i sakla
        }
      } catch (error) {
        toast.error('Profil bilgileri yüklenirken bir hata oluştu');
        console.error('Profil yükleme hatası:', error);
      }
    };

    fetchProfile();
  }, [session]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      let token :string = Cookies.get(COOKIE_NAME) as string;
      let user : any = jwtDecode(token as string);
      
      if (!user?.id) {
        throw new Error('Kullanıcı kimliği bulunamadı');
      }

      // Strapi'ye gönderilecek verileri hazırla
      const updateData = {
        universityName: userData.university || null,
        universityDepartment: userData.department || null,
        universityClass: userData.year || null,
        linkedin: userData.linkedin || null,
        twitter: userData.twitter || null,
        telephone: userData.phone || null,
        description: userData.description || null,
        website: userData.website || null,
        position: userData.position || null,
        birthday: userData.birthDate || null,
        username: userData.username || null
      };

      console.log('Gönderilecek veriler:', updateData);

      await userService.updateProfile(user.id, updateData, token);
      
      toast.success('Profil başarıyla güncellendi', {
        duration: 3000,
      });
      
      // Profili yeniden yükle
      const updatedProfile = await userService.getProfile(user.id, token);
      setUserData(prevData => ({
        ...prevData,
        university: updatedProfile.university,
        department: updatedProfile.department,
        year: updatedProfile.year,
        linkedin: updatedProfile.linkedin,
        twitter: updatedProfile.twitter,
        phone: updatedProfile.phone,
        description: updatedProfile.description,
        website: updatedProfile.website,
        position: updatedProfile.position,
        birthDate: updatedProfile.birthday,
        username: updatedProfile.username
      }));
      
      setIsEditing(false);
    } catch (error) {
      toast.error('Profil güncellenirken bir hata oluştu');
      console.error('Güncelleme hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Dosya boyutu kontrolü (10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.warning('Dosya boyutu 10MB\'dan küçük olmalıdır');
        return;
      }

      // Dosya tipi kontrolü
      if (!file.type.startsWith('image/')) {
        toast.error('Lütfen geçerli bir resim dosyası seçin');
        return;
      }

      // Dosyayı userData'da sakla
      setUserData({
        ...userData,
        avatar: file
      });

      // Önizleme için URL oluştur
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  };

  // Avatar görüntüleme komponenti
  const AvatarDisplay = () => (
    <img 
      src={avatarPreview || '/flex-ui-assets/images/dashboard/navigations/avatar.png'} // Önizleme URL'i veya varsayılan avatar
      alt="Profil" 
      className="w-20 h-20 rounded-full object-cover"
    />
  );

  return (
    <section className="bg-black-50 py-4">
      <div className="container px-4 mx-auto">
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
                      {isLoading ? (
                        <>
                          <span className="mr-2">Kaydediliyor...</span>
                          {/* Burada bir loading spinner ekleyebilirsiniz */}
                        </>
                      ) : (
                        'Kaydet'
                      )}
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
                        <svg
                          className="mb-1.5"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.71 7.71L11 5.41V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V5.41L15.29 7.71C15.383 7.80373 15.4936 7.87813 15.6154 7.92889C15.7373 7.97966 15.868 8.0058 16 8.0058C16.132 8.0058 16.2627 7.97966 16.3846 7.92889C16.5064 7.87813 16.617 7.80373 16.71 7.71C16.8037 7.61704 16.8781 7.50644 16.9289 7.38458C16.9797 7.26272 17.0058 7.13202 17.0058 7C17.0058 6.86799 16.9797 6.73729 16.9289 6.61543C16.8781 6.49357 16.8037 6.38297 16.71 6.29L12.71 2.29C12.6149 2.19896 12.5028 2.1276 12.38 2.08C12.1365 1.97999 11.8635 1.97999 11.62 2.08C11.4972 2.1276 11.3851 2.19896 11.29 2.29L7.29 6.29C7.19676 6.38324 7.1228 6.49393 7.07234 6.61575C7.02188 6.73758 6.99591 6.86814 6.99591 7C6.99591 7.13186 7.02188 7.26243 7.07234 7.38425C7.1228 7.50607 7.19676 7.61677 7.29 7.71C7.38324 7.80324 7.49393 7.8772 7.61575 7.92766C7.73757 7.97812 7.86814 8.00409 8 8.00409C8.13186 8.00409 8.26243 7.97812 8.38425 7.92766C8.50607 7.8772 8.61676 7.80324 8.71 7.71ZM21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13C4 12.7348 3.89464 12.4804 3.70711 12.2929C3.51957 12.1054 3.26522 12 3 12C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z"
                            fill="currentColor"
                          />
                        </svg>
                        <p className="mb-1 text-sm text-black-800 font-medium">
                          <span className="text-primary-500">Dosya yüklemek için tıklayın</span> veya sürükleyip bırakın
                        </p>
                        <p className="text-xs text-gray-500 font-medium">PNG, JPG, GIF veya en fazla 10MB</p>
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

          {/* Doğum Günü Bölümü */}
          <div className="py-6 border-b border-black-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-black-800 font-semibold">Doğum Tarihi</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  {isEditing ? (
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 text-base text-black-900 font-normal outline-none focus:border-primary-500 border border-black-200 rounded-lg shadow-input"
                      value={userData.birthDate}
                      onChange={(e) => setUserData({...userData, birthDate: e.target.value})}
                    />
                  ) : (
                    <p className="text-base text-black-900">
                      {new Date(userData.birthDate).toLocaleDateString('tr-TR')}
                    </p>
                  )}
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
                        value={userData.year}
                        onChange={(e) => setUserData({...userData, year: e.target.value})}
                      >
                        <option value="">Hazırlık</option>
                        <option value="1">1. Sınıf</option>
                        <option value="2">2. Sınıf</option>
                        <option value="3">3. Sınıf</option>
                        <option value="4">4. Sınıf</option>
                        <option value="5">Yüksek Lisans</option>
                        <option value="6">Doktora</option>
                        <option value="mezun">Mezun</option>
                      </select>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-base text-black-900">{userData.university}</p>
                      <p className="text-base text-black-900">{userData.department}</p>
                      <p className="text-base text-black-900">{userData.year}</p>
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
                      onChange={(e) => setUserData({...userData, linkedin: e.target.value})}
                    />
                  ) : (
                    <a 
                      href={userData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-blue-600 hover:underline"
                    >
                      {userData.linkedin}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Kendini Tanıtma Bölümü */}
          <div className="py-6 border-b border-black-100">
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
                      onChange={(e) => setUserData({...userData, description: e.target.value})}
                    />
                  ) : (
                    <p className="text-base text-black-900">{userData.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bio Bölümü */}
          <div className="py-6">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-black-800 font-semibold">Hakkında</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  {isEditing ? (
                    <textarea
                      className="w-full h-32 px-4 py-2.5 text-base text-black-900 font-normal outline-none focus:border-primary-500 border border-black-200 rounded-lg shadow-input"
                      value={userData.bio}
                      onChange={(e) => setUserData({...userData, bio: e.target.value})}
                    />
                  ) : (
                    <p className="text-base text-black-900">{userData.bio}</p>
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