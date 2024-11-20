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
    universityClass: string
}

interface AuthContextType {
    user: User | null
    login: (credentials: { identifier: string; password: string }) => Promise<any>
    login_with_token: (token: string) => void
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
                Cookies.set(COOKIE_NAME, data.jwt, { 
                    expires: 7,
                    path: '/',
                    sameSite: 'lax'
                });

                console.log('Login - JWT Token:', Cookies.get(COOKIE_NAME));
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

    const login_with_token = async (token: string) => {
        Cookies.set(COOKIE_NAME, token, { 
            expires: 7,
            path: '/',
            sameSite: 'lax'
        });
    }

    const logout = () => {
        Cookies.remove(COOKIE_NAME, { path: '/' });
        setUser(null);
    };

    // Sayfa yüklendiğinde veya yenilendiğinde token kontrolü
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = Cookies.get(COOKIE_NAME);
                
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
                        Cookies.remove(COOKIE_NAME, { path: '/' });
                        setUser(null);
                    }
                }
            } catch (error) {
                console.error('Auth check error:', error);
                Cookies.remove(COOKIE_NAME, { path: '/' });
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, login_with_token }}>
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