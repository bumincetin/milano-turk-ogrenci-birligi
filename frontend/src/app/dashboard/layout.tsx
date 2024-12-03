'use client'
import { FC, ReactNode } from 'react';
import DashHeader from '@/components/common/dashboard/DashHeader';
import DashboardSidebar from '@/components/common/dashboard/DashboardSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <DashboardSidebar />
      <div className="w-full lg:ml-64">
        <DashHeader />
        <main className="min-h-screen bg-black-50 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};