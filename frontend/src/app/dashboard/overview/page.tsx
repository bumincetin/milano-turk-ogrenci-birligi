'use client'
import { FC } from 'react';
import DashboardInfoCards from '@/components/common/dashboard/DashboardInfoCards';
import DashboardForm from '@/components/common/dashboard/DashboardForm';
import DashboardProfileCards from '@/components/common/dashboard/DashboardProfileCards';
import DashboardFooter from '@/components/common/dashboard/DashboardFooter'; 

const OverviewPage: FC = () => {
  return (
    <>
      <DashboardInfoCards />
      <DashboardProfileCards />
      <DashboardFooter />
    </>
  );
};

export default OverviewPage; 