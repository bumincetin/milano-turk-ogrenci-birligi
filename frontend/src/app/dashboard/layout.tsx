'use client'
import { FC, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import DashHeader from '@/components/common/dashboard/DashHeader';
import DashboardSidebar from '@/components/common/dashboard/DashboardSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    const path = pathname.split('/').pop() || 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <DashboardSidebar />
      <div className="w-full lg:ml-64">
        <DashHeader pageTitle={getPageTitle()} />
        <main className="min-h-screen bg-white p-4">
          {children}
        </main>
      </div>
    </div>
  );
};