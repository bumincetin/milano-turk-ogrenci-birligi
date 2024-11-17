import React from 'react';

const ProfileCards: React.FC = () => {
  return (
    <section className="bg-coolGray-50 py-4">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -m-3">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="w-full md:w-1/2 xl:w-1/4 p-3">
              <div className="bg-white border border-coolGray-100 shadow-dashboard rounded-md">
                <div className="flex flex-col justify-center items-center px-4 pt-8 pb-6 border-b border-coolGray-100">
                  <img
                    className="mb-4"
                    src="flex-ui-assets/images/dashboard/cards/avatar.png"
                    alt="Profile Avatar"
                  />
                  <h2 className="text-sm font-medium text-coolGray-900">John Doe</h2>
                  <h3 className="mb-3 text-xs font-medium text-coolGray-400">CEO & Founder</h3>
                  <p className="px-2 py-px mb-6 text-xs text-green-500 font-medium bg-green-100 rounded-full shadow-sm">
                    Admin
                  </p>
                  <div className="flex flex-wrap justify-between w-full -m-2">
                    <div className="w-full md:w-1/2 p-2">
                      <button className="flex flex-wrap justify-center w-full px-4 py-2 font-medium text-sm text-coolGray-500 hover:text-coolGray-600 border border-coolGray-200 hover:border-coolGray-300 rounded-md shadow-button">
                        <p>Message</p>
                      </button>
                    </div>
                    <div className="w-full md:w-1/2 p-2">
                      <button className="flex flex-wrap justify-center w-full px-4 py-2 font-medium text-sm text-coolGray-500 hover:text-coolGray-600 border border-coolGray-200 hover:border-coolGray-300 rounded-md shadow-button">
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
