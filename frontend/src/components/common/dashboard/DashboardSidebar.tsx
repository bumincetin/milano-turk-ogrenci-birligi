'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from 'next-auth/react'
import { userService } from '@/services/userService'
import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode';
import { useAuth } from '@/contexts/AuthContext'

const COOKIE_NAME = process.env.NEXT_PUBLIC_USER_COOKIE_NAME || 'mtob_user'

const Sidebar: React.FC = () => {
  const { data: session } = useSession()
  const [userData, setUserData] = useState<any>(null)
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const { logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          let token :string = Cookies.get(COOKIE_NAME) as string;
          let user : any = jwtDecode(token as string);
          const data = await userService.getProfile(user.id,token)
          console.log('Gelen kullanıcı verileri:', data)
          setUserData(data)
        } catch (error) {
          console.error('Kullanıcı bilgileri yüklenirken hata:', error)
        }
      }
    }

    fetchUserData()
  }, [session])

  return (
    <>
      {/* Mobil Menü Butonu */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-900 text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Overlay - Mobilde menü açıkken arka planı karartır */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-screen w-64 bg-gray-900 z-50
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo Bölümü */}
        <div className="p-6">
          <Link href="/" className="block">
            <Image
              src="/flex-ui-assets/logos/Milano-Turk-Ogrenci-Birligi-Logo.png"
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
            {/* Dashboard Dropdown */}
            <li>
              <button 
                onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                className="w-full p-3 py-4 flex items-center justify-between text-gray-600 hover:text-primary-500 hover:bg-gray-800 rounded-md"
              >
                <div className="flex items-center">
                  <Image src="/flex-ui-assets/elements/dashboard/icons/dashboard-icon.svg" alt="Dashboard" width={24} height={24} />
                  <p className="text-white font-medium text-base ml-2">Dashboard</p>
                </div>
                <svg className={`w-4 h-4 transition-transform ${isDashboardOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDashboardOpen && (
                <ul className="ml-8 mt-2 space-y-2">
                  <li><Link href="/dashboard/overview" className="text-gray-400 hover:text-primary-500 block py-2">Overview</Link></li>
                  <li><Link href="/dashboard/notifications" className="text-gray-400 hover:text-primary-500 block py-2">Notifications</Link></li>
                </ul>
              )}
            </li>
            <li>
              <Link href="/dashboard/projects" className="p-3 py-4 flex items-center text-gray-600 hover:text-primary-500 hover:bg-gray-800 rounded-md">
                <div className="flex items-center">
                  <Image 
                    src="/flex-ui-assets/elements/dashboard/icons/layer-icon.svg" 
                    alt="Projects" 
                    width={24} 
                    height={24} 
                    className="mr-2"
                  />
                  <p className="text-white font-medium text-base">Projects</p>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/tasks" className="p-3 py-4 flex items-center text-gray-600 hover:text-primary-500 hover:bg-gray-800 rounded-md">
                <div className="flex items-center">
                  <Image 
                    src="/flex-ui-assets/elements/dashboard/icons/check-box.svg" 
                    alt="Tasks" 
                    width={24} 
                    height={24} 
                    className="mr-2"
                  />
                  <p className="text-white font-medium text-base">Tasks</p>
                </div>
              </Link>
            </li>
          </ul>

          {/* Çalışma Alanı */}
          <p className="px-8 mb-2 text-xs font-medium text-gray-500 uppercase">Çalışma Alanı</p>
          <ul className="px-4 pb-8">
            <li>
              <Link href="/dashboard/community" className="p-3 py-4 flex items-center text-gray-600 hover:text-primary-500 hover:bg-gray-800 rounded-md">
                <div className="flex items-center">
                  <Image 
                    src="/flex-ui-assets/elements/dashboard/icons/community-icon.svg" 
                    alt="Community" 
                    width={24} 
                    height={24} 
                    className="mr-2"
                  />
                  <p className="text-white font-medium text-base">Community</p>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/calendar" className="p-3 py-4 flex items-center text-gray-600 hover:text-primary-500 hover:bg-gray-800 rounded-md">
                <div className="flex items-center">
                  <Image 
                    src="/flex-ui-assets/elements/dashboard/icons/calendar-icon.svg" 
                    alt="Calendar" 
                    width={24} 
                    height={24} 
                    className="mr-2"
                  />
                  <p className="text-white font-medium text-base">Calendar</p>
                </div>
              </Link>
            </li>
            {/* Pages Dropdown */}
            <li>
              <button 
                onClick={() => setIsPagesOpen(!isPagesOpen)}
                className="w-full p-3 py-4 flex items-center justify-between text-gray-600 hover:text-primary-500 hover:bg-gray-800 rounded-md"
              >
                <div className="flex items-center">
                  <Image 
                    src="/flex-ui-assets/elements/dashboard/icons/pages-icon.svg" 
                    alt="Pages" 
                    width={24} 
                    height={24} 
                    className="mr-2"
                  />
                  <p className="text-white font-medium text-base">Pages</p>
                </div>
                <svg className={`w-4 h-4 transition-transform ${isPagesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isPagesOpen && (
                <ul className="ml-8 mt-2 space-y-2">
                  <li><Link href="/dashboard/pages/page1" className="text-gray-400 hover:text-primary-500 block py-2">Page 1</Link></li>
                  <li><Link href="/dashboard/pages/page2" className="text-gray-400 hover:text-primary-500 block py-2">Page 2</Link></li>
                </ul>
              )}
            </li>
            <li>
              <Link href="/dashboard/analytics" className="p-3 py-4 flex items-center text-gray-600 hover:text-primary-500 hover:bg-gray-800 rounded-md">
                <div className="flex items-center">
                  <Image 
                    src="/flex-ui-assets/elements/dashboard/icons/analytics-icon.svg" 
                    alt="Analytics" 
                    width={24} 
                    height={24} 
                    className="mr-2"
                  />
                  <p className="text-white font-medium text-base">Analytics</p>
                </div>
              </Link>
            </li>
          </ul>

          {/* Ayarlar */}
          <p className="px-8 mb-2 text-xs font-medium text-gray-500 uppercase">Ayarlar</p>
          <ul className="px-4 pb-28">
            <li>
              <Link href="/dashboard/profile" className="p-3 py-4 flex items-center justify-between text-gray-600 hover:text-primary-500 hover:bg-gray-800 rounded-md">
                <div className="flex items-center">
                  <Image 
                    src="/flex-ui-assets/elements/dashboard/icons/account-icon.svg" 
                    alt="Profile" 
                    width={24} 
                    height={24} 
                    className="mr-2"
                  />
                  <p className="text-white font-medium text-base">Accounts</p>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/settings" className="p-3 py-4 flex items-center justify-between text-gray-600 hover:text-primary-500 hover:bg-gray-800 rounded-md">
                <div className="flex items-center">
                  <Image 
                    src="/flex-ui-assets/elements/dashboard/icons/settings-icon.svg" 
                    alt="Settings" 
                    width={24} 
                    height={24} 
                    className="mr-2"
                  />
                  <p className="text-white font-medium text-base">Settings</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        {/* Alt Profil Bölümü */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-800">
          <div className="flex items-center">
            <Image
              src={userData?.avatar?.url || "/flex-ui-assets/images/dashboard/navigations/avatar.png"}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-semibold text-white">
                {userData ? `${userData.firstName} ${userData.lastName}` : 'Yükleniyor...'}
              </p>
              <p className="text-xs text-gray-500">
                {userData?.email}
              </p>
            </div>
            <button className="ml-auto text-gray-600 hover:text-gray-400">
              {/* Logout Button */}
              <svg 
                onClick={() => {
                  logout()
                  window.location.href = '/'
                }}
                className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
