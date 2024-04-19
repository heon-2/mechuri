'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useScrollVisible from '@/hooks/useScrollVisible';
export default function MainPage() {
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const thirdSectionRef = useRef<HTMLDivElement>(null);
  const fourthSectionRef = useRef<HTMLDivElement>(null);
  const fifthSectionRef = useRef<HTMLDivElement>(null);

  const secondVisible = useScrollVisible(secondSectionRef);
  const thirdVisible = useScrollVisible(thirdSectionRef);
  const fourthVisible = useScrollVisible(fourthSectionRef);
  const fifthVisible = useScrollVisible(fifthSectionRef);
  const scrollToSecondSection = () => {
    secondSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className=" bg-backGroundColor">
      {/* 첫 화면 칸 */}
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
          <div className="text-5xl md:text-6xl font-bold text-white text-center ">
            오늘 뭐 먹지 ?
          </div>
          <div className="text-4xl md:text-6xl font-bold text-white text-center leading-tight ">
            <span className="text-mainColor">메추리</span>가
            <span className="block md:inline "> </span>
            대신 골라드릴게요 !
          </div>
          <div
            className="h-10 w-14 relative top-16 md:top-52 animate-bounce cursor-pointer"
            onClick={scrollToSecondSection}
          >
            <Image src="/images/mainPage/더블 다운2.png" fill={true} alt="더블다운"></Image>
          </div>
        </div>
      </div>
      {/* 두 번째 칸 */}
      <div
        ref={secondSectionRef}
        className={`h-screen opacity-0 ${secondVisible ? 'animate-scroll-fade-in' : ''}`}
      >
        <div className="flex h-[20vh] w-full justify-center items-center text-center font-bold text-xl md:text-3xl bg-gray-200 leading-relaxed">
          메추리에서는 4가지 기능을 제공합니다.
          <br />
          룰렛, 테스트, 챗봇을 통해 메뉴를 추천받고, 지도를 통해 음식점을 검색해보세요 !
        </div>
        <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 h-[80vh] w-[90vw] md:w-[70vw] mx-auto">
          <div className="relative order-1 md:order-none">
            <Image
              src="/images/mainPage/메추리룰렛.png"
              fill={true}
              style={{ objectFit: 'contain' }}
              alt="룰렛 사진"
            />
          </div>
          <div className="flex flex-col md:mt-64 md:ml-36 items-center md:items-start order-2 md:order-none">
            <div className="text-mainColor text-4xl md:text-5xl text-left font-bold">
              룰렛 돌리기
            </div>
            <div className="text-xl md:text-2xl text-left mt-5 md:mt-10 leading-relaxed">
              메뉴는 메추리가 추려놨어요! <br />
              간단한 룰렛 돌리기 기능으로 <br />
              다양한 메뉴를 추천받으세요.
            </div>
            <Link href="/roulette" passHref>
              <button className="btn bg-mainColor text-white text-lg md:text-xl h-16 w-full  mt-4 md:mt-8">
                룰렛 시작하기
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* 세 번째 칸 */}
      <div
        ref={thirdSectionRef}
        className={`grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 h-[80vh] w-[90vw] md:w-[70vw] mx-auto opacity-0 ${thirdVisible ? 'animate-scroll-fade-in' : ''}`}
      >
        <div className=" flex flex-col md:mt-64 items-center md:items-start order-2 md:order-none">
          <div className="text-mainColor text-4xl md:text-5xl text-left font-bold">
            메뉴 추천 테스트
          </div>
          <div className="md:text-2xl text-center md:text-left mt-5 md:mt-10 leading-relaxed">
            미리 준비된 2지 선다 테스트를 토대로
            <br />
            여러분의 취향에 근접한 메뉴를 추천해 드립니다.
            <br />약 200개의 메뉴가 준비되어 있어요 !
          </div>
          <Link href="/foodchoice" passHref>
            <button className="btn bg-mainColor text-white text-lg md:text-xl h-16 w-full  mt-4 md:mt-8">
              취향 테스트 하기
            </button>
          </Link>
        </div>

        <div className="relative order-1 md:order-none">
          <Image
            src="/images/mainPage/메뉴추천테스트.png"
            fill={true}
            style={{ objectFit: 'contain' }}
            alt="메뉴 추천 테스트"
          />
        </div>
      </div>

      {/* 네 번째 칸 */}

      <div
        ref={fourthSectionRef}
        className={`grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 h-[80vh] w-[90vw] md:w-[70vw] mx-auto opacity-0 ${fourthVisible ? 'animate-scroll-fade-in' : ''}`}
      >
        <div className="relative order-1 md:order-none">
          <Image
            src="/images/mainPage/메추리봇.png"
            fill={true}
            style={{ objectFit: 'contain' }}
            alt="메추리봇"
          />
        </div>

        <div className=" flex flex-col md:mt-64 md:ml-36 items-center md:items-start order-2 md:order-none">
          <div className="text-mainColor text-4xl md:text-5xl text-center md:text-left font-bold">
            메추리 봇<br />
            (음식 추천 봇)
          </div>
          <div className="text-lg md:text-2xl text-center md:text-left mt-5 md:mt-10 leading-relaxed">
            식사 메뉴가 고민되나요 ?
            <br />
            오늘의 기분을 간단하게 말해보세요.
            <br />
            메추리봇이 기분에 맞는 메뉴를 추천해드릴게요 !
          </div>
          <Link href="/mechuribot" passHref>
            <button className="btn bg-mainColor text-white text-lg md:text-xl h-16 w-full  mt-4 md:mt-8">
              챗봇 이용하기
            </button>
          </Link>
        </div>
      </div>

      {/* 다섯 번째 칸 */}
      <div
        ref={fifthSectionRef}
        className={`grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 h-[80vh] w-[90vw] md:w-[70vw] mx-auto opacity-0 ${fifthVisible ? 'animate-scroll-fade-in' : ''}`}
      >
        <div className=" flex flex-col md:mt-64 items-center md:items-start order-2 md:order-none">
          <div className="text-mainColor text-4xl md:text-5xl text-center md:text-left font-bold">
            메추리 지도
          </div>
          <div className="text-lg md:text-2xl text-center md:text-left mt-5 md:mt-10 leading-relaxed">
            실시간 위치를 기반으로 근처 음식점을 검색할 수 있어요.
            <br />
            지도를 보며 가까운 거리의 다양한 맛집을 손쉽게 찾아봐요.
          </div>
          <Link href="/map" passHref>
            <button className="btn bg-mainColor text-white text-lg md:text-xl h-16 w-full  mt-4 md:mt-8">
              음식점 검색하기
            </button>
          </Link>
        </div>

        <div className="relative order-1 md:order-none">
          <Image
            src="/images/mainPage/메추리지도.png"
            fill={true}
            style={{ objectFit: 'contain' }}
            alt="메추리지도"
          />
        </div>
      </div>

      {/* 여섯 번째 칸 */}
      <div className="flex flex-col h-[20vh] w-screen bg-gray-300  text-center font-bold">
        <div className="text-lg md:text-3xl">메뉴 추천 리스트, 메추리</div>
        <div className="text-sm md:text-xl">
          메추리는 여러분들에게 가볍게 메뉴 추천을 해주고자 만들었습니다.
        </div>
        <div className="text-sm md:text-xl">
          저희 서비스를 이용하시다가 불편한 점이 있었다면,
          <br /> 아래 남겨진 메일 중 한 곳으로 피드백을 남겨주시면 더욱 더 발전하는 메추리가
          되겠습니다.
        </div>
        <div>[ E-mail ]</div>
        <div>
          개발자1 : @heonxyz@gmail.com
          <br />
          개발자2 : @cjjss11@naver.com
        </div>
      </div>
    </div>
  );
}
