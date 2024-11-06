'use client'
import { useState } from 'react'
import DashboardNavbar from '../dashboard/DashboardNavbar'
import DashboardUserCard from '../dashboard/DashboardUserCard'

interface UserCard {
  name: string
  title: string
  role: string
  avatar: string
}

export default function DashboardSectionDashboardNavigations1() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const users: UserCard[] = Array(4).fill({
    name: "John Doe",
    title: "CEO & Founder",
    role: "Admin",
    avatar: "/flex-ui-assets/images/dashboard/cards/avatar.png"
  })

  return (
    <section className="overflow-hidden min-h-full">
      <DashboardNavbar onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      
      <section className="bg-coolGray-50 py-4">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap -m-3">
            {users.map((user, index) => (
              <DashboardUserCard key={index} {...user} />
            ))}
          </div>
        </div>
      </section>
    </section>
  )
} 