'use client'
import React from 'react'
import Image from 'next/image'
import { ActionButton } from './ActionButton'

interface UserCardProps {
  name: string
  title: string
  role: string
  avatar: string
}

const DashboardUserCard: React.FC<UserCardProps> = ({ name, title, role, avatar }) => {
  return (
    <div className="w-full md:w-1/2 xl:w-1/4 p-3">
      <div className="bg-white border border-coolGray-100 shadow-dashboard rounded-md">
        <div className="flex flex-col justify-center items-center px-4 pt-8 pb-6 border-b border-coolGray-100">
          <Image 
            className="mb-4"
            src={avatar}
            alt={`${name}'s avatar`}
            width={64}
            height={64}
          />
          <h2 className="text-sm font-medium text-coolGray-900">{name}</h2>
          <h3 className="mb-3 text-xs font-medium text-coolGray-400">{title}</h3>
          <p className="px-2 py-px mb-6 text-xs text-green-500 font-medium bg-green-100 rounded-full shadow-sm">
            {role}
          </p>
          <div className="flex flex-wrap justify-between w-full -m-2">
            <div className="w-full md:w-1/2 p-2">
              <ActionButton text="Mesaj" />
            </div>
            <div className="w-full md:w-1/2 p-2">
              <ActionButton text="Ara" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardUserCard 