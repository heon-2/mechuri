import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
interface FoodChoiceResultProps {
  resultData: ResultFoodData | null;
}
// resultData 데이터 형식 정의
interface ResultFoodData {
  _id: string;
  foodId: number;
  name: string;
  foodFeeling: string;
  soupPreference: string;
  noodlesOrRice: string;
  meatOrSeafood: string;
  mealTime: string[];
  isRedColor: string;
  imageUrl: string;
  category: string;
}

export default function FoodChoiceResult({ resultData }: FoodChoiceResultProps) {
  return (
    <div className="flex justify-center items-center h-full w-screen">
      <div className="card w-1/4 h-5/6 glass ">
        <figure className="h-1/2">
          <div className="relative h-full aspect-[4/3]">
            <Image src={resultData?.imageUrl!!} alt="Description" fill objectFit="cover" />
          </div>
        </figure>
        <div className="card-body flex justify-evenly">
          <div className="flex flex-col justify-center text-center gap-4">
            <div className="text-2xl text-gray-800">메뉴 추천 테스트의 결과는?!</div>
            <div className="text-3xl font-bold text-mainColor">{resultData && resultData.name}</div>
            <div className="text-xl text-gray-800">
              오늘의 메뉴는 {resultData && resultData.name} 어때요?
            </div>
          </div>
          <div className="card-actions justify-center flex flex-col items-center ">
            {/* <div>
              {resultData && (
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(resultData.name)}&tbm=isch`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-[#FF856B] text-white"
                >
                  더 많은 {resultData.name} 사진 보기
                </a>
              )}
            </div> */}
            <div>
              <Link href="/main" passHref>
                <button className="btn bg-mainColor text-white">
                  {resultData && resultData.name} 음식점 찾기
                </button>
              </Link>
            </div>
            <div className="flex flex-row justify-center gap-0">
              <Link href="/main" passHref>
                <button className="btn bg-mainColor text-white">홈으로 이동</button>
              </Link>
              <Link href="/foodchoice" passHref>
                <button className="btn bg-mainColor text-white">다시하기</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
