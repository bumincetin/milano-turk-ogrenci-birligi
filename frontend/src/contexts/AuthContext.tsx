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
    UniversityName: string
    UniversityDepartment: string
    UniversityClass: string
}

interface AuthContextType {
    user: User | null
    login: (credentials: { identifier: string; password: string }) => Promise<any>
    logout: () => void
    loading?: boolean
}

const COOKIE_NAME = process.env.NEXT_PUBLIC_USER_COOKIE_NAME || 'mtob_user'
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const login = async (credentials: { identifier: string; password: string }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (data.jwt) {
                Cookies.set('jwt', data.jwt, { 
                    expires: 7,
                    path: '/',
                    sameSite: 'lax'
                });

                console.log('Login - JWT Token:', Cookies.get('jwt'));
                setUser(data.user);
                return data;
            } else {
                throw new Error(data.error?.message || 'Giriş başarısız');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        Cookies.remove('jwt', { path: '/' });
        setUser(null);
    };

    // Sayfa yüklendiğinde veya yenilendiğinde token kontrolü
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = Cookies.get('jwt');
                
                // Debug için
                console.log('CheckAuth - JWT Token:', token);

                if (token) {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users/me`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                    } else {
                        // Token geçersizse veya süresi dolmuşsa
                        Cookies.remove('jwt', { path: '/' });
                        setUser(null);
                    }
                }
            } catch (error) {
                console.error('Auth check error:', error);
                Cookies.remove('jwt', { path: '/' });
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
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