'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { User } from '@/types/user'
import { userService } from '@/services/userService'
import Cookies from 'js-cookie'
import { jwtDecode, JwtPayload } from 'jwt-decode'

interface AuthContextType {
  user: User | null;
  logout: () => void;
}

interface NavLink {
    text: string
    href: string
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const COOKIE_NAME = process.env.NEXT_PUBLIC_USER_COOKIE_NAME || 'mtob_user'

// JWT için özel tip tanımlama
interface CustomJwtPayload extends JwtPayload {
  id: string;
  email?: string;
}

const getImageUrl = (avatar: User['avatar']) => {
  if (!avatar?.url) return "/flex-ui-assets/images/profile/avatar.jpg";
  if (avatar.url.startsWith('http')) return avatar.url;
  return `${STRAPI_URL}${avatar.url}`;
};

export default function IndexSectionHeadersWhitePattern2() {
    const { user, logout } = useAuth() as AuthContextType
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [userData, setUserData] = useState<any>(null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get(COOKIE_NAME)
                if (token) {
                    const decodedUser = jwtDecode<CustomJwtPayload>(token)
                    if (decodedUser.id) {
                        const data = await userService.getProfile(decodedUser.id, token)
                        console.log('Header için kullanıcı verileri yüklendi:', data)
                        setUserData(data)
                    }
                }
            } catch (error) {
                console.error('Kullanıcı bilgileri yüklenirken hata:', error)
            }
        }

        fetchUserData()
    }, [])

    const navLinks: NavLink[] = [
        { text: "Anasayfa", href: "/" },
        { text: "Etkinlikler", href: "/etkinlikler" },
        { text: "SSS", href: "/sss" },
        { text: "İletişim", href: "/iletisim" },
        { text: "Hakkımızda", href: "/hakkimizda"}
    ]

    const renderAuthSection = () => {
        if (user) {
            return (
                <div className="flex items-center space-x-4">
                    <Link href="/dashboard/profile" className="flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                            <Image 
                                src={getImageUrl(userData?.avatar)}
                                alt="Profil Fotoğrafı"
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-700 font-medium">
                                {userData?.name} {userData?.lastname}
                            </span>
                            <span className="text-gray-700 text-sm">
                                {userData?.email}
                            </span>
                        </div>
                    </Link>
                    <button 
                        onClick={() => {
                            logout()
                            window.location.href = '/'
                        }}
                        className="text-white bg-red-700 hover:bg-red-800 py-2 px-4 rounded-md font-medium transition duration-300"
                    >
                        Çıkış Yap
                    </button>
                </div>
            )
        }

        return (
            <>
                <Link 
                    href="/giris" 
                    className="inline-block py-2 px-4 mr-2 leading-5 text-gray-700 hover:text-gray-700 bg-transparent font-medium rounded-md"
                >
                    Giriş Yap
                </Link>
                <Link 
                    href="/kayit" 
                    className="inline-block py-2 px-4 text-sm leading-5 text-primary-50 bg-primary-500 hover:bg-primary-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
                >
                    Kayıt Ol
                </Link>
            </>
        )
    }

    const menuButton = (
        <button 
            className="navbar-burger self-center xl:hidden"
            onClick={() => setIsMenuOpen(true)}
        >
            <svg width={35} height={35} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width={32} height={32} rx={6} fill="transparent" />
                <path className="text-gray-700" d="M7 12H25C25.2652 12 25.5196 11.8946 25.7071 11.7071C25.8946 11.5196 26 11.2652 26 11C26 10.7348 25.8946 10.4804 25.7071 10.2929C25.5196 10.1054 25.2652 10 25 10H7C6.73478 10 6.48043 10.1054 6.29289 10.2929C6.10536 10.4804 6 10.7348 6 11C6 11.2652 6.10536 11.5196 6.29289 11.7071C6.48043 11.8946 6.73478 12 7 12Z" fill="currentColor" />
                <path className="text-gray-700" d="M25 15H7C6.73478 15 6.48043 15.1054 6.29289 15.2929C6.10536 15.4804 6 15.7348 6 16C6 16.2652 6.10536 16.5196 6.29289 16.7071C6.48043 16.8946 6.73478 17 7 17H25C25.2652 17 25.5196 16.8946 25.7071 16.7071C25.8946 16.5196 26 16.2652 26 16C26 15.7348 25.8946 15.4804 25.7071 15.2929C25.5196 15.1054 25.2652 15 25 15Z" fill="currentColor" />
                <path className="text-gray-700" d="M25 20H7C6.73478 20 6.48043 20.1054 6.29289 20.2929C6.10536 20.4804 6 20.7348 6 21C6 21.2652 6.10536 21.5196 6.29289 21.7071C6.48043 21.8946 6.73478 22 7 22H25C25.2652 22 25.5196 21.8946 25.7071 21.7071C25.8946 21.5196 26 21.2652 26 21C26 20.7348 25.8946 20.4804 25.7071 20.2929C25.5196 20.1054 25.2652 20 25 20Z" fill="currentColor" />
            </svg>
        </button>
    )

    const mobileMenu = (
        <AnimatePresence>
            {isMenuOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="navbar-menu fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <motion.div 
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-white z-50"
                    >
                        <nav className="relative p-6 h-full overflow-y-auto">
                            <div className="flex flex-col justify-between h-full">
                                <Link href="/" className="inline-block">
                                    <Image 
                                        className="h-16"
                                        src="/flex-ui-assets/logos/Milano-Turk-Ogrenci-Birligi-Logo.png"
                                        alt="Logo"
                                        width={64}
                                        height={64}
                                    />
                                </Link>
                                <ul className="py-6">
                                    {navLinks.map((link, index) => (
                                        <li key={index}>
                                            <Link 
                                                href={link.href}
                                                className="block py-3 px-4 text-gray-700 hover:text-gray-700 font-medium hover:bg-gray700-50 rounded-md"
                                            >
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap">
                                    {user ? (
                                        <div className="w-full flex items-center space-x-4 px-4">
                                            <Link href="/dashboard/profile" className="flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                                                <span className="text-gray-700 font-medium">{user.name}</span>
                                                <div className="h-10 w-10 rounded-full overflow-hidden">
                                                    <Image 
                                                        src={getImageUrl(user.avatar)}
                                                        alt="Profil Fotoğrafı"
                                                        width={40}
                                                        height={40}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            </Link>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-full mb-2">
                                                <Link 
                                                    href="/giris"
                                                    className="inline-block py-2 px-4 w-full text-sm leading-5 text-gray-700 hover:text-gray-700 bg-transparent font-medium text-center rounded-md"
                                                >
                                                    Giriş Yap
                                                </Link>
                                            </div>
                                            <div className="w-full">
                                                <Link 
                                                    href="/kayit"
                                                    className="inline-block py-2 px-4 w-full text-sm leading-5 text-white bg-primary-500 hover:bg-primary-600 font-medium text-center focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
                                                >
                                                    Kayıt Ol
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </nav>
                        <motion.button 
                            className="navbar-close absolute top-5 p-4 right-3"
                            onClick={() => setIsMenuOpen(false)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.94004 6L11.14 1.80667C11.2656 1.68113 11.3361 1.51087 11.3361 1.33333C11.3361 1.1558 11.2656 0.985537 11.14 0.860002C11.0145 0.734466 10.8442 0.66394 10.6667 0.66394C10.4892 0.66394 10.3189 0.734466 10.1934 0.860002L6.00004 5.06L1.80671 0.860002C1.68117 0.734466 1.51091 0.663941 1.33337 0.663941C1.15584 0.663941 0.985576 0.734466 0.860041 0.860002C0.734505 0.985537 0.66398 1.1558 0.66398 1.33333C0.66398 1.51087 0.734505 1.68113 0.860041 1.80667L5.06004 6L0.860041 10.1933C0.797555 10.2553 0.747959 10.329 0.714113 10.4103C0.680267 10.4915 0.662842 10.5787 0.662842 10.6667C0.662842 10.7547 0.680267 10.8418 0.714113 10.9231C0.747959 11.0043 0.797555 11.078 0.860041 11.14C0.922016 11.2025 0.99575 11.2521 1.07699 11.2859C1.15823 11.3198 1.24537 11.3372 1.33337 11.3372C1.42138 11.3372 1.50852 11.3198 1.58976 11.2859C1.671 11.2521 1.74473 11.2025 1.80671 11.14L6.00004 6.94L10.1934 11.14C10.2554 11.2025 10.3291 11.2521 10.4103 11.2859C10.4916 11.3198 10.5787 11.3372 10.6667 11.3372C10.7547 11.3372 10.8419 11.3198 10.9231 11.2859C11.0043 11.2521 11.0781 11.2025 11.14 11.14C11.2025 11.078 11.2521 11.0043 11.286 10.9231C11.3198 10.8418 11.3372 10.7547 11.3372 10.6667C11.3372 10.5787 11.3198 10.4915 11.286 10.4103C11.2521 10.329 11.2025 10.2553 11.14 10.1933L6.94004 6Z" fill="#556987" />
                            </svg>
                        </motion.button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )

    return (
        <section 
            className="relative bg-white overflow-hidden" 
            style={{
                backgroundImage: 'url("/flex-ui-assets/elements/pattern-white.svg")', 
                backgroundPosition: 'center'
            }}
        >
            {/* Navbar */}
            <nav className="flex justify-between p-6 px-4">
                <div className="flex justify-between items-center w-full">
                    {/* Logo */}
                    <div className="w-1/2 xl:w-1/3">
                        <Link href="/" className="block max-w-max">
                            <Image 
                                className="h-16"
                                src="/flex-ui-assets/logos/Milano-Turk-Ogrenci-Birligi-Logo.png"
                                alt="Milano Türk Öğrenci Birliği Logo"
                                width={64}
                                height={64}
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="w-1/2 xl:w-1/3">
                        <ul className="hidden xl:flex xl:justify-center">
                            {navLinks.map((link, index) => (
                                <li key={index} className={index !== navLinks.length - 1 ? "mr-12" : ""}>
                                    <Link 
                                        href={link.href}
                                        className="text-gray-700 hover:text-gray-700 font-medium"
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Auth Buttons */}
                    <div className="w-1/2 xl:w-1/3">
                        <div className="hidden xl:flex items-center justify-end">
                            {renderAuthSection()}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                {menuButton}
            </nav>

            {mobileMenu}

        </section>
    )
} 