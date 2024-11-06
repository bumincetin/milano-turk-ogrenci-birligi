import RegisterSectionSignUpWhitePattern1 from '@/components/common/sign-up-white-pattern/RegisterSectionSignUpWhitePattern1';
import { Metadata } from 'next';

// metadata'yı Next.js 13+ formatında tanımlıyoruz
export const metadata: Metadata = {
  title: 'Kayıt Ol', // sayfa başlığını buraya ekleyebilirsiniz
};

export default function Register() {
  return (
    <>
      <RegisterSectionSignUpWhitePattern1 />
    </>
  );
}
