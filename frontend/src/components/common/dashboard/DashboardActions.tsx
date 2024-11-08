'use client'
import React from 'react'
import { ActionButton } from './ActionButton'

const DashboardActions: React.FC = () => {
  return (
    <div className="w-full md:w-1/2 p-2">
      <div className="flex flex-wrap justify-end -m-2">
        <div className="w-full md:w-auto p-2">
          <ActionButton text="Mesaj" />
        </div>
        <div className="w-full md:w-auto p-2">
          <ActionButton text="Ara" isPrimary />
        </div>
      </div>
    </div>
  )
}

export default DashboardActions 