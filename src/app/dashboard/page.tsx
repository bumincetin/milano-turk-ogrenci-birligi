'use client'
import { FC, useState } from 'react';
import DashboardHeader from '@/components/common/dashboard/DashboardHeader';
import DashboardNavbar from '@/components/common/dashboard/DashboardNavbar';
import DashboardSectionDashboardNavigations1 from '@/components/common/dashboard-navigations/DashboardSectionDashboardNavigations1';

const Dashboard: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <DashboardNavbar onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      <DashboardHeader />
      <DashboardSectionDashboardNavigations1 />
    </>
  );
};

export default Dashboard;
