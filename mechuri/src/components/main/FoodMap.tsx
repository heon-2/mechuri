'use client';
import React, { use, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useScrollVisible from '@/hooks/useScrollVisible';

export default function FoodMap() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useScrollVisible(ref);
  return (
    <div
      ref={ref}
      className={`grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 h-[80vh] w-[90vw] lg:w-[70vw] mx-auto opacity-0 ${visible ? 'animate-scroll-fade-in' : ''}`}
    >
      <div className=" flex flex-col lg:mt-64 items-center lg:items-start order-2 lg:order-none">
        <div className="text-mainColor text-4xl lg:text-5xl text-center lg:text-left font-bold">
          메추리 지도
        </div>
        <div className="text-lg lg:text-2xl text-center lg:text-left mt-5 lg:mt-10 leading-relaxed">
          실시간 위치를 기반으로 근처 음식점을 검색할 수 있어요.
          <br />
          지도를 보며 가까운 거리의 다양한 맛집을 손쉽게 찾아봐요.
        </div>
        <Link href="/map" passHref>
          <button className="btn bg-mainColor text-white text-lg lg:text-xl h-16 w-full  mt-4 lg:mt-8">
            음식점 검색하기
          </button>
        </Link>
      </div>

      <div className="relative order-1 lg:order-none">
        <Image
          src="/images/mainPage/메추리지도.png"
          fill={true}
          style={{ objectFit: 'contain' }}
          alt="메추리지도"
        />
      </div>
    </div>
  );
}
