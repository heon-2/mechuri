import React from 'react';
import NavBar from '@/components/commons/NavBar';
import MainPage from './MainPage';
import TestNav from '@/components/commons/TestNav';
export default function Page() {
  return (
    <div className="">
      <NavBar />
      {/* <TestNav /> */}
      <MainPage />
    </div>
  );
}
