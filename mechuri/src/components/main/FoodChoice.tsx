'use client';
import useScrollVisible from '@/hooks/useScrollVisible';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
export default function FoodChoice() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useScrollVisible(ref);
  return (
    <div
      ref={ref}
      className={`grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 h-[80vh] w-[90vw] lg:w-[70vw] mx-auto opacity-0 ${visible ? 'animate-scroll-fade-in' : ''}`}
    >
      <div className=" flex flex-col lg:mt-64 items-center lg:items-start order-2 lg:order-none">
        <div className="text-mainColor text-4xl lg:text-5xl text-left font-bold">
          메뉴 추천 테스트
        </div>
        <div className="lg:text-2xl text-center lg:text-left mt-5 lg:mt-10 leading-relaxed">
          미리 준비된 2지 선다 테스트를 토대로
          <br />
          여러분의 취향에 근접한 메뉴를 추천해 드립니다.
          <br />약 200개의 메뉴가 준비되어 있어요 !
        </div>
        <Link href="/foodchoice" passHref>
          <button className="btn bg-mainColor text-white text-lg lg:text-xl h-16 w-full  mt-4 lg:mt-8">
            취향 테스트 하기
          </button>
        </Link>
      </div>

      <div className="relative order-1 lg:order-none">
        <Image
          src="/images/mainPage/메뉴추천테스트.png"
          fill={true}
          style={{ objectFit: 'contain' }}
          alt="메뉴 추천 테스트"
        />
      </div>
    </div>
  );
}
