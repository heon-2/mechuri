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
    // TODO: 각 칸마다 컴포넌트화해서 분리하기
    // TODO: 반응형 뷰포트 기준 정하기. (현재, Tailwind CSS 기준 md)
    // STUDY: 맨 처음은 각 칸마다 second,third 등 ref 변수와 visible 변수를 만들어서 props 할 생각이었는데, 컴포넌트의 props를 통해 'ref'를 직접 전달하는 것은 권장되지 않는다고 함.
    // 'forwardRef' 나 컴포넌트 내부에서 'useRef' 사용하는 방법을 공부해보기. -> useRef 공식문서 읽어보기
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
