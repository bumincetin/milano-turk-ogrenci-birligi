import LoginSectionSignUpWhitePattern1 from '@/components/common/sign-up-white-pattern/LoginSectionSignUpWhitePattern1';
import { Metadata } from 'next';

// Next.js 13+ için metadata export edilmeli
export const metadata: Metadata = {
  title: 'Giriş Yap',
  description: 'Kullanıcı giriş sayfası',
};

// Server Component olarak tanımlama
export default function LoginPage() {
  return <LoginSectionSignUpWhitePattern1 />;
}