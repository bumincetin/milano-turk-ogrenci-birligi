'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'

interface User {
    id: number
    name: string
    lastname: string
    email: string
    profileImage?: string
    username: string
    telephone: string
    universityName: string
    universityDepartment: string
    universityYear: string
}

interface AuthContextType {
    user: User | null
    login: (token: string) => Promise<void>
    logout: () => void
}

const COOKIE_NAME = process.env.NEXT_PUBLIC_USER_COOKIE_NAME || 'mtob_user'
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    const checkAuth = async (token: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Kullanıcı bilgileri alınamadı');
            }

            const userData = await response.json();
            console.log('Alınan kullanıcı bilgileri:', userData);
            
            setUser({
                id: userData.id,
                name: userData.name,
                lastname: userData.lastname,
                email: userData.email,
                username: userData.username,
                profileImage: userData.profileImage,
                telephone: userData.telephone,
                universityName: userData.universityName,
                universityDepartment: userData.universityDepartment,
                universityYear: userData.universityYear
            });
        } catch (error) {
            console.error('Kullanıcı bilgileri alma hatası:', error);
            Cookies.remove(COOKIE_NAME);
            setUser(null);
        }
    };

    useEffect(() => {
        const token = Cookies.get(COOKIE_NAME);
        console.log('Mevcut token:', token); // Debug için
        
        if (token) {
            checkAuth(token);
        } else {
            console.log('Token bulunamadı');
        }
    }, []);

    const login = async (token: string) => {
        try {
            console.log('Login fonksiyonu çağrıldı, token:', token)
            
            // Cookie'yi ayarla
            const cookieOptions = {
                expires: 7,
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax' as const
            }
            
            Cookies.set(COOKIE_NAME, token, cookieOptions)
            console.log('Cookie kaydedildi:', Cookies.get(COOKIE_NAME))
            
            // Kullanıcı bilgilerini al
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            
            if (!response.ok) {
                throw new Error('Kullanıcı bilgileri alınamadı')
            }

            const userData = await response.json()
            console.log('Alınan kullanıcı bilgileri:', userData)
            
            // User state'ini güncelle
            setUser({
                id: userData.id,
                name: userData.name,
                lastname: userData.lastname,
                email: userData.email,
                username: userData.username,
                profileImage: userData.profileImage,
                telephone: userData.telephone,
                universityName: userData.universityName,
                universityDepartment: userData.universityDepartment,
                universityYear: userData.universityYear
            })
            
            console.log('User state güncellendi')
            
            return userData
        } catch (error) {
            console.error('Login hatası:', error)
            Cookies.remove(COOKIE_NAME)
            setUser(null)
            throw error
        }
    };

    const logout = () => {
        Cookies.remove(COOKIE_NAME);
        setUser(null);
        console.log('Çıkış yapıldı');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 