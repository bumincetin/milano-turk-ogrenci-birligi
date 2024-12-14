'use client'
import { FC } from 'react';
import { toast } from 'sonner';

const MembershipPage: FC = () => {
  const handleMembershipRequest = () => {
    toast.success('Üyelik talebiniz alınmıştır. En kısa sürede sizinle iletişime geçilecektir.');
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipPage;
