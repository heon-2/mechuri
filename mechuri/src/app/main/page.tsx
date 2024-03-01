import React from 'react';
import NavBar from '@/components/commons/NavBar';
import MainPage from './MainPage';
import TestNav from '@/components/commons/NavBar';
export default function Page() {
  return (
    <div className="bg-[#F6F6F6]">
      <NavBar />
      {/* <TestNav /> */}
      <MainPage />
    </div>
  );
}
