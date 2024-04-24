'use client';
import React, { useRef, RefObject } from 'react';
import Image from 'next/image';
interface IntroduceProps {
  secondSectionRef: RefObject<HTMLDivElement>;
}
export default function Introduce({ secondSectionRef }: IntroduceProps) {
  const scrollToSecondSection = () => {
    secondSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className={`h-[calc(100vh-4rem)] relative`}>
      {/* 이미지 */}
      <Image
        className="brightness-50 "
        src="/images/mainPage/메인.jpg"
        fill={true}
        quality={75}
        style={{ objectFit: 'cover' }}
        alt={'메인화면 사진'}
      ></Image>
      {/* 텍스트 - opacity-0 을 추가해야 텍스트가 없는 상태에서 fade-in 됨.*/}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col gap-14 opacity-0 animate-fade-in">
        <div className="text-5xl lg:text-6xl font-bold text-white text-center ">오늘 뭐 먹지 ?</div>
        <div className="text-4xl lg:text-6xl font-bold text-white text-center leading-tight ">
          <span className="text-mainColor">메추리</span>가
          <span className="block lg:inline "> </span>
          대신 골라드릴게요 !
        </div>
        <div
          className="h-10 w-14 relative top-16 lg:top-52 animate-bounce cursor-pointer"
          onClick={scrollToSecondSection}
        >
          <Image src="/images/mainPage/더블 다운2.png" fill={true} alt="더블다운"></Image>
        </div>
      </div>
    </div>
  );
}
