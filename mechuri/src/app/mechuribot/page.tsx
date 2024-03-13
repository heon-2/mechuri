import React from 'react';
import NavBar from '@/components/commons/NavBar';
import ChatBot from '@/components/main/ChatBot';
import MechuriBot from './MechuriBot';
export default function Page() {
  return (
    <div className="h-screen">
      <NavBar />
      <MechuriBot />
    </div>
  );
}
