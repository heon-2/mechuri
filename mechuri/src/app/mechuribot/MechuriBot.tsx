import React from 'react';
import NavBar from '@/components/commons/NavBar';
import ChatContent from '@/components/mechuribot/ChatContent';
import ChatHeader from '@/components/mechuribot/ChatHeader';
export default function MechuriBot() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] items-center mx-auto bg-backGroundColor">
      <ChatHeader />
      <ChatContent />
    </div>
  );
}
