import React from "react";
import Image from "next/image";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900">
      {/* Logo Bölümü */}
      <div className="p-6">
        <Link href="/" className="block">
          <Image
            src="/flex-ui-assets/logos/dashboard/flex-ui-green.svg"
            alt="Logo"
            width={120}
            height={40}
          />
        </Link>
      </div>

      {/* Ana Menü */}
      <div className="mt-10">
        <p className="px-8 mb-2 text-xs font-medium text-gray-500 uppercase">Ana Menü</p>
        <ul className="px-4 mb-8">
          <li>
            <Link href="/dashboard" className="p-3 py-4 flex items-center justify-between text-gray-600 hover:text-green-500 hover:bg-gray-800 rounded-md">
              <div className="flex items-center">
                <Image src="/flex-ui-assets/elements/dashboard/icons/dashboard-icon.svg" alt="Dashboard" width={24} height={24} />
                <p className="text-white font-medium text-base">Dashboard</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/gorevler" className="p-3 py-4 flex items-center justify-between text-gray-600 hover:text-green-500 hover:bg-gray-800 rounded-md">
              <div className="flex items-center">
                <p className="text-white font-medium text-base">Görevler</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/projeler" className="p-3 py-4 flex items-center justify-between text-gray-600 hover:text-green-500 hover:bg-gray-800 rounded-md">
              <div className="flex items-center">
                <p className="text-white font-medium text-base">Projeler</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/takvim" className="p-3 py-4 flex items-center justify-between text-gray-600 hover:text-green-500 hover:bg-gray-800 rounded-md">
              <div className="flex items-center">
                <p className="text-white font-medium text-base">Takvim</p>
              </div>
            </Link>
          </li>
        </ul>

        {/* Çalışma Alanı */}
        <p className="px-8 mb-2 text-xs font-medium text-gray-500 uppercase">Çalışma Alanı</p>
        <ul className="px-4 pb-8">
          <li>
            <Link href="/ekip" className="p-3 py-4 flex items-center justify-between text-gray-600 hover:text-green-500 hover:bg-gray-800 rounded-md">
              <div className="flex items-center">
                <p className="text-white font-medium text-base">Ekip</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/dokumanlar" className="p-3 py-4 flex items-center justify-between text-gray-600 hover:text-green-500 hover:bg-gray-800 rounded-md">
              <div className="flex items-center">
                <p className="text-white font-medium text-base">Dökümanlar</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/raporlar" className="p-3 py-4 flex items-center justify-between text-gray-600 hover:text-green-500 hover:bg-gray-800 rounded-md">
              <div className="flex items-center">
                <p className="text-white font-medium text-base">Raporlar</p>
              </div>
            </Link>
          </li>
        </ul>

        {/* Ayarlar */}
        <p className="px-8 mb-2 text-xs font-medium text-gray-500 uppercase">Ayarlar</p>
        <ul className="px-4 pb-28">
          <li>
            <Link href="/profil" className="p-3 py-4 flex items-center justify-between text-gray-600 hover:text-green-500 hover:bg-gray-800 rounded-md">
              <div className="flex items-center">
                <p className="text-white font-medium text-base">Profil</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/ayarlar" className="p-3 py-4 flex items-center justify-between text-gray-600 hover:text-green-500 hover:bg-gray-800 rounded-md">
              <div className="flex items-center">
                <p className="text-white font-medium text-base">Genel Ayarlar</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      {/* Alt Profil Bölümü */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-800">
        <div className="flex items-center">
          <Image
            src="/flex-ui-assets/images/dashboard/navigations/avatar.png"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-semibold text-white">John Doe</p>
            <p className="text-xs text-gray-500">johndoe@flex.co</p>
          </div>
          <button className="ml-auto text-gray-600 hover:text-gray-400">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
