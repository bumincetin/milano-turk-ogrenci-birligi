import React from 'react';

const Footer: React.FC = () => {
  return (
    <section className="bg-coolGray-50 py-4">
      <div className="container px-4 mx-auto">
        <div className="relative py-11 px-16 bg-green-500 rounded-md overflow-hidden">
          <img
            className="absolute z-10 left-4 top-4"
            src="flex-ui-assets/elements/dashboard/banners/dots-red.svg"
            alt="Red dots"
          />
          <img
            className="absolute z-10 right-4 bottom-4"
            src="flex-ui-assets/elements/dashboard/banners/dots-red.svg"
            alt="Red dots"
          />
          <img
            className="absolute h-64 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
            src="flex-ui-assets/elements/dashboard/banners/wave-basic.svg"
            alt="Wave"
          />
          <div className="relative z-20 flex flex-wrap items-center -m-3">
            <div className="w-full md:w-1/2 p-3">
              <h2 className="mb-6 text-4xl font-bold text-white tracking-tighter">
                Ideal banner asset for your dashboard project
              </h2>
              <p className="font-semibold text-coolGray-200">
                Go global with our UI Resources and solutions
              </p>
            </div>
            <div className="w-full md:w-1/2 p-3">
              <button className="block md:ml-auto px-7 py-4 font-medium text-lg text-coolGray-800 bg-white hover:bg-coolGray-50 rounded-md">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
