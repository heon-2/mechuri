import Link from 'next/link';
import React from 'react';
interface FoodChoiceResultProps {
  resultData: ResultFoodData | null;
}
// resultData 데이터 형식 정의
interface ResultFoodData {
  _id: string;
  foodId: number;
  name: string;
  foodTypePreference: string;
  soupPreference: string;
  noodlesOrRice: string;
  meatOrSeafood: string;
  diningCompanion: string;
  leastFavoriteCuisine: string;
}

export default function FoodChoiceResult({ resultData }: FoodChoiceResultProps) {
  return (
    <div className="flex justify-center items-center h-full w-screen">
      <div className="card w-1/4 h-5/6 glass">
        <figure>
          <img
            src={'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'}
            alt="car!"
          />
        </figure>
        <div className="card-body flex justify-evenly">
          <div className="flex flex-col justify-center text-center gap-4">
            <div className="text-2xl">메뉴 추천 테스트의 결과는?!</div>
            <div className="text-3xl font-bold">{resultData && resultData.name}</div>
            <div className="text-xl">오늘의 메뉴는 {resultData && resultData.name} 어때요?</div>
          </div>
          <div className="card-actions justify-center flex flex-col items-center">
            <div>
              {resultData && (
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(resultData.name)}&tbm=isch`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success"
                >
                  더 많은 {resultData.name} 사진 보기
                </a>
              )}
            </div>
            <div className="flex flex-row justify-center">
              <Link href="/main" passHref>
                <button className="btn btn-success">홈으로 이동</button>
              </Link>
              <Link href="/foodchoice" passHref>
                <button className="btn btn-success">다시하기</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
