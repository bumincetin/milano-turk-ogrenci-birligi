'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

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
    isStaticMode: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo user for static mode
const DEMO_USER: User = {
    id: 1,
    name: 'Demo',
    lastname: 'Kullanıcı',
    email: 'demo@mtob.org',
    username: 'demo_user',
    telephone: '',
    universityName: 'Politecnico di Milano',
    universityDepartment: 'Bilgisayar Mühendisliği',
    universityClass: '3'
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)

    // Static mode login - simulates login with demo user
    const login = async (credentials: { identifier: string; password: string }) => {
        setLoading(true)
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // In static mode, accept any credentials and log in as demo user
        setUser(DEMO_USER)
        setLoading(false)
        
        return {
            jwt: 'static-demo-token',
            user: DEMO_USER
        }
    }

    const login_with_token = async (token: string) => {
        // In static mode, just set the demo user
        setUser(DEMO_USER)
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            logout, 
            loading, 
            login_with_token,
            isStaticMode: true 
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
