'use client'
import { FC, ReactNode } from 'react';
import DashHeader from '@/components/common/dashboard/DashHeader';
import DashboardSidebar from '@/components/common/dashboard/DashboardSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
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

export default DashboardLayout; 