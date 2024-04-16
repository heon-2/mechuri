'use client';
import React from 'react';
import Select from './Select';
import Roulette from './Roulette';
import { useQuery } from '@tanstack/react-query';
import LoadingUi from '../commons/LoadingUi';
import { FoodData } from './Roulette';

export default function RouletteSubPage() {
  const fetchData = async () => {
    const response = await fetch('/api/roulette');
    if (!response.ok) {
      throw new Error('에러가 발생했습니다.');
    }
    return await response.json();
  };
  const { data, isLoading } = useQuery<FoodData[]>({
    queryKey: ['roulette'],
    queryFn: fetchData,
  });

  return (
    <div className="grid grid-cols-3 items-center justify-center h-[calc(100vh-4rem)] bg-[#f6f6f6]">
      {isLoading ? (
        <div className="col-span-3">
          <LoadingUi></LoadingUi>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center h-3/4">
            <Select></Select>
          </div>
          <div className="col-span-2">
            <Roulette data={data}></Roulette>
          </div>
        </>
      )}
    </div>
  );
}
