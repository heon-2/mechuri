'use client';
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
interface ResultPageProps {
  foodId: Number;
}
import FoodChoiceResult from '@/components/foodchoice/foodchoiceresult/FoodChoiceResult';
import { useRouter, useSearchParams } from 'next/navigation';
import { Result } from 'postcss';

import React, { useEffect, useState } from 'react';

export default function TestResult({ foodId }: ResultPageProps) {
  const [resultData, setResultData] = useState<ResultFoodData | null>(null);
  // const foodId = useSearchParams().get('foodid'); // params 가져오기
  // const foodId = 5; // URL로부터 결과 값의 ID를 얻음

  // 결과 ID를 사용해 서버로부터 결과 데이터를 불러옴
  useEffect(() => {
    const fetchData = async () => {
      console.log(foodId);
      if (foodId) {
        // URL 파라미터가 존재할 때만 실행
        // 서버로 쿼리문 전송 foodId = params.foodId -> 서버에서는 useSearchParams().get('foodId')로 받음
        const response = await fetch(`/api/foodchoice/result?foodId=${foodId}`);
        // const response = await fetch(`/api/foodchoice/result?foodId=${foodId}`);
        if (response.ok) {
          const data = await response.json();
          setResultData(data);
        }
      }
    };
    fetchData();
  }, [foodId]);

  return (
    <div className="h-[calc(100vh-4rem)]">
      <FoodChoiceResult resultData={resultData} />
    </div>
  );
}
