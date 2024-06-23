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
    <div className="bg-white w-1/2 h-full grid grid-rows-2 md:grid-rows-3 grid-cols-3 md:grid-cols-2 divide-x divide-y border-2 border-[#FFDCDC]">
      {['korean', 'japanese', 'western', 'chinese', 'snack', 'dessert'].map((food, idx) => (
        <div
          key={food}
          className={`flex flex-col justify-center items-center cursor-pointer ${
            category === food ? 'bg-[#FFDCDC]' : 'hover:bg-[#FFDCDC]'
          }`}
          onClick={() => selectCategory(food)}
        >
          <div className="w-16 h-16 md:w-20 md:h-20">
            <Image
              src={`/images/${food}.png`}
              alt={`${food} food`}
              width={100}
              height={100}
              className="object-contain"
            ></Image>
          </div>
          <p className="mt-2">
            {food === 'korean'
              ? '한식'
              : food === 'japanese'
                ? '일식'
                : food === 'western'
                  ? '양식'
                  : food === 'chinese'
                    ? '중식'
                    : food === 'snack'
                      ? '분식'
                      : '디저트'}
          </p>
        </div>
      ))}

      {/* <div
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
      </div> */}
    </div>
  );
}
