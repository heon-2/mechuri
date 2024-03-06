'use client';

import React from 'react';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { categoryState } from '@/stores/atoms/rouletteState';

export default function Select() {
  const [category, setCategory] = useRecoilState(categoryState);

  const selectCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  console.log(category);

  return (
    <div className="bg-gray-300 w-64 h-96 grid grid-rows-3 grid-cols-2 justify-center items-center rounded-3xl">
      <div
        className="flex flex-col justify-center items-center cursor-pointer"
        onClick={() => selectCategory('korean')}
      >
        <Image src="/images/korean.png" alt="korean food" width={60} height={60}></Image>
        <p>한식</p>
      </div>
      <div
        className="flex flex-col justify-center items-center cursor-pointer"
        onClick={() => selectCategory('japanese')}
      >
        <Image src="/images/japanese.png" alt="korean food" width={60} height={60}></Image>
        <p>일식</p>
      </div>
      <div
        className="flex flex-col justify-center items-center cursor-pointer"
        onClick={() => selectCategory('western')}
      >
        <Image src="/images/western.png" alt="korean food" width={60} height={60}></Image>
        <p>양식</p>
      </div>
      <div
        className="flex flex-col justify-center items-center cursor-pointer"
        onClick={() => selectCategory('chinese')}
      >
        <Image src="/images/chinese.png" alt="korean food" width={60} height={60}></Image>
        <p>중식</p>
      </div>
      <div
        className="flex flex-col justify-center items-center cursor-pointer"
        onClick={() => selectCategory('snack')}
      >
        <Image src="/images/snack.png" alt="korean food" width={60} height={60}></Image>
        <p>분식</p>
      </div>
      <div
        className="flex flex-col justify-center items-center cursor-pointer"
        onClick={() => selectCategory('dessert')}
      >
        <Image src="/images/desert.png" alt="korean food" width={60} height={60}></Image>
        <p>디저트</p>
      </div>
    </div>
  );
}
