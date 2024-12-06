'use client'
import { FC } from 'react';
import { EventsList } from '@/components/EventsList';

const CommunityPage: FC = () => {
  return (
    <div className='max-w-7xl px-4 bg-white'>
      <EventsList />
    </div>
  );
};

export default CommunityPage; 