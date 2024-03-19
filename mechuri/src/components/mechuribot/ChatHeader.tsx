import React from 'react';
export default function ChatHeader() {
  return (
    <div className="mt-10 w-2/5 h-24 bg-mainColor shadow-md rounded-t-2xl flex items-center">
      <img
        src="/images/logo1.png"
        alt="Chatbot"
        className="ml-3 h-20 flex items-center rounded-full aspect-square object-cover"
      />
      <div className="ml-4">
        <p className="text-white font-semibold">메추리봇</p>
        <div className="flex items-center">
          <span className="block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
          <p className="text-white text-sm">Online</p>
        </div>
      </div>
    </div>
  );
}
