'use client';
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
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import NavBar from '@/components/commons/NavBar';

export default function ResultPage({ params }: { params: { foodid: Number } }) {
  const router = useRouter();
  // const { id } = router.query; // URL로부터 결과 값의 ID를 얻음
  const [resultData, setResultData] = useState<ResultFoodData | null>(null);
  const foodId = useSearchParams().get('foodid'); // params 가져오기
  // const foodId = 5; // URL로부터 결과 값의 ID를 얻음

  // 결과 ID를 사용해 서버로부터 결과 데이터를 불러옴
  useEffect(() => {
    const fetchData = async () => {
      console.log(params.foodid);
      if (params.foodid) {
        // URL 파라미터가 존재할 때만 실행
        // 서버로 쿼리문 전송 foodId = params.foodId -> 서버에서는 useSearchParams().get('foodId')로 받음
        const response = await fetch(`/api/foodchoice/result?foodId=${params.foodid}`);
        // const response = await fetch(`/api/foodchoice/result?foodId=${foodId}`);
        if (response.ok) {
          const data = await response.json();
          setResultData(data);
        }
      }
    };
    fetchData();
  }, [params.foodid]);

  return (
    <div className="h-screen">
      <NavBar />
      <div className="grid grid-rows-5 grid-cols-2 h-full">
        <div className="row-span-4 col-span-2 bg-gray-100">
          {/* 결과 데이터를 렌더링 */}
          {resultData ? <div>결과: {resultData.name}</div> : <div>결과를 불러오는 중...</div>}
        </div>
        <div className="row-span-1 col-span-2 flex items-end justify-center">결과가 나오는 곳</div>
      </div>
    </div>
  );
}
