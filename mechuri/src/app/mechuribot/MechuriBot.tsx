import React from 'react';
import NavBar from '@/components/commons/NavBar';
import ChatContent from '@/components/mechuribot/ChatContent';
import ChatHeader from '@/components/mechuribot/ChatHeader';
export default function MechuriBot() {
  return (
    <div className="flex items-center flex-col">
      <ChatHeader />
      <ChatContent />
    </div>
  );
}
