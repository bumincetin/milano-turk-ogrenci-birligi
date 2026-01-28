'use client'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

interface User {
    name: string
    profileImage: string
}

const DEMO_USER: User = {
    name: 'Demo Kullanıcı',
    profileImage: ''
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        // Check for existing session cookie
        if (typeof window !== 'undefined') {
            const userCookie = Cookies.get('mtob_demo_user')
            if (userCookie) {
                try {
                    setUser(JSON.parse(userCookie))
                } catch {
                    setUser(null)
                }
            }
        }
    }, [])

    const login = (userData?: User) => {
        const userToSet = userData || DEMO_USER
        Cookies.set('mtob_demo_user', JSON.stringify(userToSet), { expires: 7 })
        setUser(userToSet)
    }

    const logout = () => {
        try {
            Cookies.remove('mtob_demo_user')
            setUser(null)
            console.log('Çıkış yapıldı')
        } catch (error) {
            console.error('Çıkış yaparken hata:', error)
        }
    }

    return { user, login, logout, isStaticMode: true }
}
