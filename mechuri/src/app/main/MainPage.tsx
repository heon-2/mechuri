'use client';
import React, { useRef, RefObject } from 'react';
import Introduce from '@/components/main/Introduce';
import Roulette from '@/components/main/Roulette';
import FoodChoice from '@/components/main/FoodChoice';
import ChatBot from '@/components/main/ChatBot';
import FoodMap from '@/components/main/FoodMap';
import BottomContent from '@/components/main/BotttomContent';
export default function MainPage() {
  const secondSectionRef = useRef<HTMLDivElement>(null);
  return (
    <div className="bg-backGroundColor">
      <Introduce secondSectionRef={secondSectionRef} />
      <Roulette secondSectionRef={secondSectionRef} />
      <FoodChoice />
      <ChatBot />
      <FoodMap />
      <BottomContent />
    </div>
  );
}
