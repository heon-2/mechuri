import React from 'react';
import NavBar from '@/components/commons/NavBar';
import FoodTest from './FoodTest';
export default function Page() {
  return (
    <div className="h-screen bg-backGroundColor">
      <NavBar />
      <FoodTest />
    </div>
  );
}
