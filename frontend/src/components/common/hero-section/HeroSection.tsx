'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    }

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    }

    const stats = [
        { value: "500+", label: "Aktif Üye" },
        { value: "50+", label: "Etkinlik" },
        { value: "10+", label: "Üniversite" },
    ]

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-hero-gradient">
            {/* Background decorations */}
            <div className="absolute inset-0 pattern-dots opacity-40" />
            <div className="absolute top-20 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl" />
            
            {/* Floating decorative elements */}
            <motion.div 
                className="absolute top-32 left-10 hidden lg:block"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30 flex items-center justify-center">
                    <span className="text-2xl">🇹🇷</span>
                </div>
            </motion.div>
            
            <motion.div 
                className="absolute bottom-40 right-20 hidden lg:block"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-400 to-accent-500 shadow-lg shadow-accent-500/30 flex items-center justify-center">
                    <span className="text-xl">🇮🇹</span>
                </div>
            </motion.div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Content */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center lg:text-left"
                    >
                        <motion.div variants={itemVariants}>
                            <span className="badge-primary mb-6 inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                                Milano Türk Öğrenci Birliği
                            </span>
                        </motion.div>

                        <motion.h1 
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-6 tracking-tight text-balance"
                        >
                            Milano'da{' '}
                            <span className="gradient-text">Birlikte</span>
                            {' '}Daha Güçlüyüz
                        </motion.h1>

                        <motion.p 
                            variants={itemVariants}
                            className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            Milano Türk Öğrenci Birliği, İtalya'da öğrenim gören Türk öğrencilerin 
                            dayanışmasını güçlendiren, kariyer ve sosyal fırsatlar sunan bir topluluktur.
                        </motion.p>

                        <motion.div 
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
                        >
                            <Link 
                                href="/kayit"
                                className="btn-primary text-base px-8 py-4 pulse-glow"
                            >
                                <span>Hemen Üye Ol</span>
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <Link 
                                href="/etkinlikler"
                                className="btn-secondary text-base px-8 py-4"
                            >
                                <span>Etkinlikleri Keşfet</span>
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div 
                            variants={itemVariants}
                            className="flex flex-wrap justify-center lg:justify-start gap-8"
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl sm:text-4xl font-bold text-slate-900">{stat.value}</div>
                                    <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Image/Visual */}
                    <motion.div 
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative"
                    >
                        <div className="relative">
                            {/* Main image container */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <div className="aspect-[4/3] relative">
                                    <Image 
                                        src="/mtob-images/milano-turk-ogrenci-birligi-kahvalti.jpg"
                                        alt="MTÖB Topluluğu"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                                </div>
                                
                                {/* Floating card */}
                                <motion.div 
                                    className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-xl"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div 
                                                    key={i}
                                                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white flex items-center justify-center"
                                                >
                                                    <span className="text-white text-xs font-bold">
                                                        {String.fromCharCode(64 + i)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">Topluluğumuza Katıl</p>
                                            <p className="text-xs text-slate-500">500+ öğrenci üye oldu</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-accent-400/20 blur-2xl" />
                            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-primary-500/20 blur-2xl" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Social proof / Partners strip */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/50 backdrop-blur-sm border-t border-slate-100">
                <div className="container-custom py-4">
                    <div className="flex items-center justify-center gap-8 flex-wrap">
                        <span className="text-sm text-slate-400 font-medium">Bizi Takip Edin:</span>
                        <div className="flex items-center gap-6">
                            <Link href="https://www.instagram.com/milanoturkogrencibirligi/" target="_blank" className="text-slate-400 hover:text-primary-500 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </Link>
                            <Link href="https://linkedin.com/company/milano-türk-öğrenci-birliği" target="_blank" className="text-slate-400 hover:text-primary-500 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </Link>
                            <Link href="https://chat.whatsapp.com/GABp3SSF9QH6KWMWVJ5Jgp" target="_blank" className="text-slate-400 hover:text-green-500 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
