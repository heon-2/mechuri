import React from 'react';
import NavBar from '@/components/commons/NavBar';
import MainPage from './MainPage';
import TestNav from '@/components/commons/NavBar';
export default function Page() {
  return (
    <div className="bg-[#f6f6f6]">
      <NavBar />
      {/* <TestNav /> */}
      <MainPage />
    </div>
  );
}
