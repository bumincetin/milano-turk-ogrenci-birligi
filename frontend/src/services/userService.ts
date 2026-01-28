// Static mode user service - no actual backend calls

export const userService = {
  async updateProfile(userId: string, userData: any, token: string) {
    // In static mode, simulate success
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log('Static mode: Profile update simulated');
    return {
      success: true,
      message: 'Profil güncelleme özelliği şu anda aktif değil.'
    };
  },

  async getProfile(userId: string, token: string) {
    // Return mock profile data
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      firstName: 'Demo',
      lastName: 'Kullanıcı',
      email: 'demo@example.com',
      university: 'Politecnico di Milano',
      department: 'Bilgisayar Mühendisliği',
      universityClass: '3',
      linkedin: '',
      twitter: '',
      phone: '',
      description: 'Demo kullanıcı profili',
      website: '',
      position: 'Öğrenci',
      birthday: '',
      username: 'demo_user',
      avatar: '',
      role: { name: 'user' },
      uyeliktipi: 'seviye-0',
    };
  },

  async uploadAvatar(file: File, token: string) {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log('Static mode: Avatar upload simulated');
    return null;
  }
};
