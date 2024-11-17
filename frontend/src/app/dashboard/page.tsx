'use client'
import { FC } from 'react';
import DashHeader from '@/components/common/dashboard/DashHeader';
import DashboardInfoCards from '@/components/common/dashboard/DashboardInfoCards';
import DashboardForm from '@/components/common/dashboard/DashboardForm';
import DashboardProfileCards from '@/components/common/dashboard/DashboardProfileCards';
import DashboardFooter from '@/components/common/dashboard/DashboardFooter';
import DashboardSidebar from '@/components/common/dashboard/DashboardSidebar';

const Dashboard: FC = () => {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="ml-64 flex-1">
        <DashHeader />
        <DashboardInfoCards />
        <DashboardForm />
        <DashboardProfileCards />
        <DashboardFooter />
      </div>
    </div>
  );
};

export default Dashboard;
