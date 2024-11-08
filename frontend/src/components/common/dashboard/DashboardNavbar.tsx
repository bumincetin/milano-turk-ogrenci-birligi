'use client'
import React from 'react'
import Image from 'next/image'

interface NavbarProps {
  onMenuToggle: () => void
}

const DashboardNavbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  return (
    <div className="relative z-50 flex items-center justify-between xl:hidden bg-coolGray-900 px-8 py-5 -mx-3">
      <div className="w-auto px-3">
        <a className="block max-w-max" href="#">
          <Image 
            src="/flex-ui-assets/logos/dashboard/flex-ui-green.svg"
            alt="Logo"
            width={120}
            height={40}
          />
        </a>
      </div>
      <button 
        className="navbar-burger self-center ml-auto block xl:hidden"
        onClick={onMenuToggle}
      >
        <svg width="35" height="35" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect className="text-coolGray-800" width="32" height="32" rx="6" fill="currentColor"/>
          <path className="text-coolGray-400" d="M7 12H25C25.2652 12 25.5196 11.8946 25.7071 11.7071C25.8946 11.5196 26 11.2652 26 11C26 10.7348 25.8946 10.4804 25.7071 10.2929C25.5196 10.1054 25.2652 10 25 10H7C6.73478 10 6.48043 10.1054 6.29289 10.2929C6.10536 10.4804 6 10.7348 6 11C6 11.2652 6.10536 11.5196 6.29289 11.7071C6.48043 11.8946 6.73478 12 7 12Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  )
}

export default DashboardNavbar