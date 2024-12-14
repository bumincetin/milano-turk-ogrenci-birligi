'use client'
import { FC } from 'react';

const CalendarPage: FC = () => {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-6">Takvim</h1>
      
      <div className="text-center">
        <div className="text-6xl mb-4">🚧</div>
        <p className="text-gray-600 text-lg">Bu sayfa yapım aşamasındadır</p>
        <p className="text-gray-500">Çok yakında burada olacak!</p>
      </div>
    </div>
  );
};

export default CalendarPage; 