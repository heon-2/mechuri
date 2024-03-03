import React from 'react';
import NavBar from '@/components/commons/NavBar';
import ChatContent from '@/components/mechuribot/ChatContent';
import ChatHeader from '@/components/mechuribot/ChatHeader';
export default function MechuriBot() {
  return (
    <div className="flex flex-col h-full items-center mx-auto">
      <ChatHeader />
      <ChatContent />
    </div>
  );
}
