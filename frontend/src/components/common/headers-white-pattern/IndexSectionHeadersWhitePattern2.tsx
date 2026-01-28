'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { User } from '@/types/user'
import { userService } from '@/services/userService'

interface AuthContextType {
  user: User | null;
  logout: () => void;
  isStaticMode?: boolean;
}

interface NavLink {
    text: string
    href: string
}

const getImageUrl = (avatar: User['avatar']) => {
  if (!avatar?.url) return "/flex-ui-assets/images/profile/avatar.jpg";
  if (avatar.url.startsWith('http')) return avatar.url;
  return avatar.url;
};

export default function IndexSectionHeadersWhitePattern2() {
    const { user, logout, isStaticMode } = useAuth() as AuthContextType
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [userData, setUserData] = useState<any>(null)
    const [isScrolled, setIsScrolled] = useState(false)

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await userService.getProfile('demo', 'demo-token')
                if (data) {
                    setUserData(data)
                }
            } catch (error) {
                console.error('Kullanıcı bilgileri yüklenirken hata:', error)
            }
        }

        if (user) {
            fetchUserData()
        }
    }, [user])

    const navLinks: NavLink[] = [
        { text: "Anasayfa", href: "/" },
        { text: "Etkinlikler", href: "/etkinlikler" },
        { text: "Blog", href: "/blog" },
        { text: "Hakkımızda", href: "/hakkimizda"},
        { text: "SSS", href: "/sss" },
        { text: "İletişim", href: "/iletisim" },
    ]

    const renderAuthSection = () => {
        if (user) {
            return (
                <div className="flex items-center gap-3">
                    <Link 
                        href="/dashboard/profile" 
                        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
                    >
                        <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-primary-500/20">
                            <Image 
                                src={getImageUrl(userData?.avatar)}
                                alt="Profil"
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <span className="text-slate-700 font-medium hidden lg:block">
                            {userData?.firstName || 'Profil'}
                        </span>
                    </Link>
                    <button 
                        onClick={() => {
                            logout()
                            window.location.href = '/'
                        }}
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                        Çıkış
                    </button>
                </div>
            )
        }

        return (
            <div className="flex items-center gap-3">
                <Link 
                    href="/giris" 
                    className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors"
                >
                    Giriş Yap
                </Link>
                <Link 
                    href="/kayit" 
                    className="btn-primary text-sm px-5 py-2.5"
                >
                    Üye Ol
                </Link>
            </div>
        )
    }

    return (
        <>
            {/* Sticky Navbar */}
            <header 
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled 
                        ? 'bg-white/95 backdrop-blur-lg shadow-soft py-3' 
                        : 'bg-transparent py-5'
                }`}
            >
                <nav className="container-custom">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <Image 
                                    src="/flex-ui-assets/logos/Milano-Turk-Ogrenci-Birligi-Logo.png"
                                    alt="MTÖB"
                                    width={48}
                                    height={48}
                                    className="transition-transform group-hover:scale-105"
                                />
                            </div>
                            <div className="hidden sm:block">
                                <span className="block text-lg font-bold text-slate-900">MTÖB</span>
                                <span className="block text-xs text-slate-500">Milano Türk Öğrenci Birliği</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden xl:flex items-center gap-1">
                            {navLinks.map((link, index) => (
                                <Link 
                                    key={index}
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 rounded-lg hover:bg-slate-50 transition-colors"
                                >
                                    {link.text}
                                </Link>
                            ))}
                        </div>

                        {/* Auth Buttons - Desktop */}
                        <div className="hidden xl:flex items-center">
                            {renderAuthSection()}
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setIsMenuOpen(true)}
                            className="xl:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                            aria-label="Menüyü aç"
                        >
                            <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>

            {/* Spacer for fixed navbar */}
            <div className="h-20" />

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        
                        {/* Menu Panel */}
                        <motion.div 
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-2xl"
                        >
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                                    <Link href="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                                        <Image 
                                            src="/flex-ui-assets/logos/Milano-Turk-Ogrenci-Birligi-Logo.png"
                                            alt="MTÖB"
                                            width={40}
                                            height={40}
                                        />
                                        <span className="font-bold text-slate-900">MTÖB</span>
                                    </Link>
                                    <button 
                                        onClick={() => setIsMenuOpen(false)}
                                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                                        aria-label="Menüyü kapat"
                                    >
                                        <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Navigation Links */}
                                <nav className="flex-1 overflow-y-auto p-6">
                                    <ul className="space-y-1">
                                        {navLinks.map((link, index) => (
                                            <motion.li 
                                                key={index}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <Link 
                                                    href={link.href}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="flex items-center px-4 py-3 text-lg font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                                                >
                                                    {link.text}
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </nav>

                                {/* Footer Actions */}
                                <div className="p-6 border-t border-slate-100 bg-slate-50">
                                    {user ? (
                                        <div className="space-y-3">
                                            <Link 
                                                href="/dashboard/profile"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200"
                                            >
                                                <Image 
                                                    src={getImageUrl(user.avatar)}
                                                    alt="Profil"
                                                    width={44}
                                                    height={44}
                                                    className="rounded-full"
                                                />
                                                <div>
                                                    <p className="font-medium text-slate-900">{user.name}</p>
                                                    <p className="text-sm text-slate-500">Profili Görüntüle</p>
                                                </div>
                                            </Link>
                                            <button 
                                                onClick={() => {
                                                    logout()
                                                    setIsMenuOpen(false)
                                                    window.location.href = '/'
                                                }}
                                                className="w-full py-3 text-center text-primary-600 font-medium hover:bg-primary-50 rounded-xl transition-colors"
                                            >
                                                Çıkış Yap
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <Link 
                                                href="/kayit"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="btn-primary w-full text-center"
                                            >
                                                Üye Ol
                                            </Link>
                                            <Link 
                                                href="/giris"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="btn-secondary w-full text-center"
                                            >
                                                Giriş Yap
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
