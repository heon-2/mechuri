import React from 'react';
import NavBar from '@/components/commons/NavBar';
import MainPage from './MainPage';
import TestNav from '@/components/commons/NavBar';
export default function Page() {
  return (
    // STUDY: 'use client' 쓰고 안 쓰고의 차이 명확하게 이해하기.
    <div className="bg-backGroundColor">
      <NavBar />
      <MainPage />
    </div>
  );
}
