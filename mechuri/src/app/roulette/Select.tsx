import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { categoryState } from '@/stores/atoms/categoryState';
import korean from '../../../public/images/korean.png';
import japanese from '../../../public/images/japanese.png';
import chinese from '../../../public/images/chinese.png';
import western from '../../../public/images/western.png';
import snack from '../../../public/images/snack.png';
import desert from '../../../public/images/desert.png';

export default function Select() {
  const [category, setCategory] = useRecoilState(categoryState);

  const selectCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  console.log(category);

  return (
    <div className="bg-gray-300 w-64 h-96 grid grid-rows-3 grid-cols-2 justify-center items-center">
      <div
        className="flex flex-col justify-center items-center"
        onClick={() => selectCategory('한식')}
      >
        <Image src="/images/korean.png" alt="korean food" width={60} height={60}></Image>
        <p>한식</p>
      </div>
      <div
        className="flex flex-col justify-center items-center"
        onClick={() => selectCategory('일식')}
      >
        <Image src="/images/japanese.png" alt="korean food" width={60} height={60}></Image>
        <p>일식</p>
      </div>
      <div
        className="flex flex-col justify-center items-center"
        onClick={() => selectCategory('양식')}
      >
        <Image src="/images/western.png" alt="korean food" width={60} height={60}></Image>
        <p>양식</p>
      </div>
      <div
        className="flex flex-col justify-center items-center"
        onClick={() => selectCategory('중식')}
      >
        <Image src="/images/chinese.png" alt="korean food" width={60} height={60}></Image>
        <p>중식</p>
      </div>
      <div
        className="flex flex-col justify-center items-center"
        onClick={() => selectCategory('분식')}
      >
        <Image src="/images/snack.png" alt="korean food" width={60} height={60}></Image>
        <p>분식</p>
      </div>
      <div
        className="flex flex-col justify-center items-center"
        onClick={() => selectCategory('디저트')}
      >
        <Image src="/images/desert.png" alt="korean food" width={60} height={60}></Image>
        <p>디저트</p>
      </div>
    </div>
  );
}
