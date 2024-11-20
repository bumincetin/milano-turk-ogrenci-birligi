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
    <div className="flex">
      <DashboardSidebar />
      <div className="ml-64 flex-1">
        <DashHeader />
        <main className="min-h-screen bg-coolGray-50">
          {children}
        </main>
      </div>
    </div>
  );
};