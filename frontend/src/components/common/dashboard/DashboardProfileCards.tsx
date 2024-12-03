import React from 'react';

const ProfileCards: React.FC = () => {
  return (
    <section className="bg-black-50 py-4">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -m-3">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="w-full md:w-1/2 xl:w-1/4 p-3">
              <div className="bg-white border border-black-100 shadow-dashboard rounded-md">
                <div className="flex flex-col justify-center items-center px-4 pt-8 pb-6 border-b border-black-100">
                  <img
                    className="mb-4"
                    src="flex-ui-assets/images/dashboard/cards/avatar.png"
                    alt="Profile Avatar"
                  />
                  <h2 className="text-sm font-medium text-black-900">John Doe</h2>
                  <h3 className="mb-3 text-xs font-medium text-gray-500">CEO & Founder</h3>
                  <p className="px-2 py-px mb-6 text-xs text-primary-500 font-medium bg-primary-100 rounded-full shadow-sm">
                    Admin
                  </p>
                  <div className="flex flex-wrap justify-between w-full -m-2">
                    <div className="w-full md:w-1/2 p-2">
                      <button className="flex flex-wrap justify-center w-full px-4 py-2 font-medium text-sm text-gray-500 hover:text-black-600 border border-black-200 hover:border-black-300 rounded-md shadow-button">
                        <p>Message</p>
                      </button>
                    </div>
                    <div className="w-full md:w-1/2 p-2">
                      <button className="flex flex-wrap justify-center w-full px-4 py-2 font-medium text-sm text-gray-500 hover:text-black-600 border border-black-200 hover:border-black-300 rounded-md shadow-button">
                        <p>Call</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileCards;
