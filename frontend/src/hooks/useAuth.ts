'use client'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

interface User {
    name: string
    profileImage: string
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(() => {
        if (typeof window !== 'undefined') {
            const userCookie = Cookies.get('user')
            return userCookie ? JSON.parse(userCookie) : null
        }
        return null
    })

    const login = (userData: User) => {
        Cookies.set('user', JSON.stringify(userData), { expires: 7 })
        setUser(userData)
    }

    const logout = () => {
        try {
            Cookies.remove('user')
            setUser(null)
            console.log('Çıkış yapıldı')
        } catch (error) {
            console.error('Çıkış yaparken hata:', error)
        }
    }

    useEffect(() => {
        const checkCookie = () => {
            const userCookie = Cookies.get('user')
            if (!userCookie) {
                setUser(null)
            } else if (userCookie && !user) {
                setUser(JSON.parse(userCookie))
            }
        }

        window.addEventListener('storage', checkCookie)
        return () => window.removeEventListener('storage', checkCookie)
    }, [user])

    return { user, login, logout }
} 