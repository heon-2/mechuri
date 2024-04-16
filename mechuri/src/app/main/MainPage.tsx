'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
export default function MainPage() {
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const scrollToSecondSection = () => {
    console.log('Scrolling to second section'); // 디버깅을 위해 로그 추가
    secondSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className=" bg-backGroundColor">
      {/* 첫 화면 칸 */}
      <div className="h-[calc(100vh-4rem)] relative">
        {/* 이미지 */}
        <Image
          className="brightness-50 "
          src="/images/mainPage/메인.jpg"
          fill={true}
          style={{ objectFit: 'cover' }}
          alt={'메인화면 사진'}
        ></Image>
        {/* 텍스트 - opacity-0 을 추가해야 텍스트가 없는 상태에서 fade-in 됨.*/}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col gap-14 opacity-0 animate-fade-in">
          <div className="text-6xl font-bold text-white text-center ">오늘 뭐 먹지 ?</div>
          <div className="text-6xl font-bold text-white text-center">
            <span className="text-mainColor">메추리</span>가 대신 골라드릴게요 !
          </div>
          <div
            className="h-10 w-14 relative top-52 animate-bounce cursor-pointer"
            onClick={scrollToSecondSection}
          >
            <Image src="/images/mainPage/더블 다운2.png" fill={true} alt="더블다운"></Image>
          </div>
        </div>
      </div>
      {/* 두 번째 칸 */}
      <div ref={secondSectionRef} className="h-screen">
        <div className="flex h-[20vh] w-full justify-center items-center text-center font-bold text-3xl bg-gray-200 leading-relaxed">
          메뉴 추천 리스트, 메추리에서는 4가지 기능을 제공합니다.
          <br />
          룰렛, 테스트, 챗봇, 지도 기능을 통해 여러분의 메뉴 고민을 덜어드립니다.
        </div>
        <div className="grid grid-cols-2 h-[80vh] w-[70vw] mx-auto">
          <div className="relative col-span-1">
            <Image
              src="/images/mainPage/메추리룰렛.png"
              fill={true}
              quality={100}
              style={{ objectFit: 'contain' }}
              alt="룰렛 사진"
            />
          </div>
          <div className="col-span-1 flex flex-col mt-64 ml-36">
            <div className="text-mainColor text-5xl text-left font-bold">룰렛 돌리기</div>
            <div className="text-2xl text-left mt-10 leading-relaxed">
              메뉴는 메추리가 추려놨어요! <br />
              간단한 룰렛 돌리기 기능으로 <br />
              다양한 메뉴를 추천받으세요.
            </div>
            <Link href="/roulette" passHref>
              <button className="btn bg-mainColor text-white text-xl h-16 w-1/3 mt-8">
                룰렛 시작하기
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* 세 번째 칸 */}

      <div className="grid grid-cols-2 h-[80vh] w-[70vw] mx-auto">
        <div className="col-span-1 flex flex-col mt-64">
          <div className="text-mainColor text-5xl text-left font-bold">메뉴 추천 테스트</div>
          <div className="text-2xl text-left mt-10 leading-relaxed">
            미리 준비된 2지 선다 테스트를 토대로
            <br />
            여러분의 취향에 근접한 메뉴를 추천해 드립니다.
            <br />약 200개의 메뉴가 준비되어 있어요 !
          </div>
          <Link href="/foodchoice" passHref>
            <button className="btn bg-mainColor text-white text-xl h-16 w-1/3 mt-8">
              취향 테스트 하기
            </button>
          </Link>
        </div>

        <div className="relative col-span-1">
          <Image
            src="/images/mainPage/메뉴추천테스트.png"
            fill={true}
            quality={100}
            style={{ objectFit: 'contain' }}
            alt="메뉴 추천 테스트"
          />
        </div>
      </div>

      {/* 네 번째 칸 */}

      <div className="grid grid-cols-2 h-[80vh] w-[70vw] mx-auto">
        <div className="relative col-span-1">
          <Image
            src="/images/mainPage/메추리봇.png"
            fill={true}
            quality={100}
            style={{ objectFit: 'contain' }}
            alt="메뉴 추천 테스트"
          />
        </div>

        <div className="col-span-1 flex flex-col mt-64 ml-36">
          <div className="text-mainColor text-5xl text-left font-bold">메추리 봇(음식 추천 봇)</div>
          <div className="text-2xl text-left mt-10 leading-relaxed">
            식사 메뉴가 고민되나요 ?
            <br />
            오늘의 기분을 간단하게 말해보세요.
            <br />
            메추리봇이 기분에 맞는 메뉴를 추천해드릴게요 !
          </div>
          <Link href="/mechuribot" passHref>
            <button className="btn bg-mainColor text-white text-xl h-16 w-1/3 mt-8">
              챗봇 이용하기
            </button>
          </Link>
        </div>
      </div>

      {/* 다섯 번째 칸 */}

      <div className="grid grid-cols-2 h-[80vh] w-[70vw] mx-auto">
        <div className="col-span-1 flex flex-col mt-64">
          <div className="text-mainColor text-5xl text-left font-bold">메추리 지도</div>
          <div className="text-2xl text-left mt-10 leading-relaxed">
            실시간 위치를 기반으로 근처 음식점을 검색할 수 있어요.
            <br />
            지도를 보며 가까운 거리의 다양한 맛집을 손쉽게 찾아봐요.
          </div>
          <Link href="/map" passHref>
            <button className="btn bg-mainColor text-white text-xl h-16 w-1/3 mt-8">
              음식점 검색하기
            </button>
          </Link>
        </div>

        <div className="relative col-span-1">
          <Image
            src="/images/mainPage/메추리지도.png"
            fill={true}
            quality={100}
            style={{ objectFit: 'contain' }}
            alt="메뉴 추천 테스트"
          />
        </div>
      </div>

      {/* 여섯 번째 칸 */}

      <div className="h-[20vh] w-screen mx-auto bg-gray-400 text-5xl text-center font-bold">
        저작권 어쩌고 표시하는 곳
      </div>
    </div>
  );
}
