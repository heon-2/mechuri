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
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="card w-1/3 h-3/4 glass">
        <figure>
          <img
            src={'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'}
            alt="car!"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{resultData && resultData.name}</h2>
          <p>오늘의 메뉴는 {resultData && resultData.name} 어때요?</p>
          <div className="card-actions justify-center">
            {resultData && (
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(resultData.name)}&tbm=isch`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                더 많은 {resultData.name} 사진 보기
              </a>
            )}
            <Link href="/main" passHref>
              <button className="btn btn-primary">홈으로 이동</button>
            </Link>

            <Link href="/foodchoice" passHref>
              <button className="btn btn-primary">다시하기</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
