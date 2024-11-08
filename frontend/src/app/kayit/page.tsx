import RegisterSectionSignUpWhitePattern1 from '@/components/common/sign-up-white-pattern/RegisterSectionSignUpWhitePattern1';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kayıt Ol',
};

export default function Register() {
  return (
        <>
            <RegisterSectionSignUpWhitePattern1 />
        </>
    );
}
