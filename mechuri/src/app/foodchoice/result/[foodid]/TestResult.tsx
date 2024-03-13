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
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { Result } from 'postcss';
import LoadingUi from '@/components/commons/LoadingUi';
import React, { useEffect, useState } from 'react';

export default function TestResult({ foodId }: ResultPageProps) {
  const fetchData = async () => {
    if (foodId) {
      const response = await fetch(`/api/foodchoice/result?foodId=${foodId}`);
      if (response.ok) {
        return await response.json();
      }
    }
  };
  const {
    data: resultData,
    isLoading,
    isSuccess,
  } = useQuery<ResultFoodData>({
    queryKey: ['testResult', foodId],
    queryFn: fetchData,
  });

  return (
    <div className="h-[calc(100vh-4rem)] bg-[#FEECE2]">
      {isSuccess ? (
        <>{resultData && <FoodChoiceResult resultData={resultData} />}</>
      ) : (
        <LoadingUi />
      )}
    </div>
  );
}
