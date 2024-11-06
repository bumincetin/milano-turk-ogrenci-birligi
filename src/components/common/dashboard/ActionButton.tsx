'use client'
import React from 'react'

interface ActionButtonProps {
  text: string
  isPrimary?: boolean
  onClick?: () => void
  icon?: React.ReactNode
}

export function ActionButton({ text, isPrimary = false, onClick, icon }: ActionButtonProps) {
  const baseClasses = "flex flex-wrap items-center justify-center py-3 px-4 w-full text-base font-medium rounded-md shadow-button"
  const primaryClasses = "text-white bg-green-500 hover:bg-green-600"
  const secondaryClasses = "text-coolGray-500 bg-white border border-gray-200 hover:border-gray-300"
  
  return (
    <button 
      className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{text}</span>
    </button>
  )
} 