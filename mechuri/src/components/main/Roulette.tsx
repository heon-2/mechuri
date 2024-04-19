'use client';
interface RoulleteProps {
  secondSectionRef: RefObject<HTMLDivElement>;
}
import React, { useRef, RefObject } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useScrollVisible from '@/hooks/useScrollVisible';
export default function Roulette({ secondSectionRef }: RoulleteProps) {
  const visible = useScrollVisible(secondSectionRef);
  return (
    <div
      ref={secondSectionRef}
      className={`h-screen opacity-0 ${visible ? 'animate-scroll-fade-in' : ''}`}
    >
      <div className="flex h-[20vh] w-full justify-center items-center text-center font-bold text-xl lg:text-3xl bg-gray-200 leading-loose">
        메추리에서는 4가지 기능을 제공합니다.
        <br />
        룰렛, 테스트, 챗봇을 통해 메뉴를 추천받고, <br />
        지도를 통해 음식점을 검색해보세요 !
      </div>
      <div className="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 h-[80vh] w-[90vw] lg:w-[70vw] mx-auto">
        <div className="relative order-1 lg:order-none">
          <Image
            src="/images/mainPage/메추리룰렛.png"
            fill={true}
            style={{ objectFit: 'contain' }}
            alt="룰렛 사진"
          />
        </div>
        <div className="flex flex-col lg:mt-64 lg:ml-36 items-center lg:items-start order-2 lg:order-none">
          <div className="text-mainColor text-4xl lg:text-5xl text-left font-bold">룰렛 돌리기</div>
          <div className="text-xl lg:text-2xl text-left mt-5 lg:mt-10 leading-relaxed">
            메뉴는 메추리가 추려놨어요! <br />
            간단한 룰렛 돌리기 기능으로 <br />
            다양한 메뉴를 추천받으세요.
          </div>
          <Link href="/roulette" passHref>
            <button className="btn bg-mainColor text-white text-lg lg:text-xl h-16 w-full  mt-4 lg:mt-8">
              룰렛 시작하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
