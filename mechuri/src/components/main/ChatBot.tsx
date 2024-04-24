'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useScrollVisible from '@/hooks/useScrollVisible';
export default function ChatBot() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useScrollVisible(ref);
  return (
    <div
      ref={ref}
      className={`grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 h-[80vh] w-[90vw] lg:w-[70vw] mx-auto opacity-0 ${visible ? 'animate-scroll-fade-in' : ''}`}
    >
      <div className="relative order-1 lg:order-none">
        <Image
          src="/images/mainPage/메추리봇.png"
          fill={true}
          style={{ objectFit: 'contain' }}
          alt="메추리봇"
        />
      </div>

      <div className=" flex flex-col lg:mt-64 lg:ml-36 items-center lg:items-start order-2 lg:order-none">
        <div className="text-mainColor text-4xl lg:text-5xl text-center lg:text-left font-bold">
          메추리 봇<br />
        </div>
        <div className="text-lg lg:text-2xl text-center lg:text-left mt-5 lg:mt-10 leading-relaxed">
          식사 메뉴가 고민되나요 ?
          <br />
          오늘의 기분을 간단하게 말해보세요.
          <br />
          메추리봇이 기분에 맞는 메뉴를 추천해드릴게요 !
        </div>
        <Link href="/mechuribot" passHref>
          <button className="btn bg-mainColor text-white text-lg lg:text-xl h-16 w-full  mt-4 lg:mt-8">
            챗봇 이용하기
          </button>
        </Link>
      </div>
    </div>
  );
}
