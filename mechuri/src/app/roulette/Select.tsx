import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { categoryState } from '@/stores/atoms/categoryState';

export default function Select() {
  const [category, setCategory] = useRecoilState(categoryState);

  const selectCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  console.log(category);

  return (
    <div className="bg-gray-300 h-96 w-48 grid grid-rows-3 grid-cols-2 justify-center items-center">
      <div
        className="flex flex-col justify-center items-center"
        onClick={() => selectCategory('한식')}
      >
        <p>사진</p>
        <p>한식</p>
      </div>
      <div
        className="flex flex-col justify-center items-center"
        onClick={() => selectCategory('일식')}
      >
        <p>사진</p>
        <p>일식</p>
      </div>
      <div
        className="flex flex-col justify-center items-center"
        onClick={() => selectCategory('양식')}
      >
        <p>사진</p>
        <p>양식</p>
      </div>
      <div
        className="flex flex-col justify-center items-center"
        onClick={() => selectCategory('중식')}
      >
        <p>사진</p>
        <p>중식</p>
      </div>
      <div
        className="flex flex-col justify-center items-center"
        onClick={() => selectCategory('분식')}
      >
        <p>사진</p>
        <p>분식</p>
      </div>
      <div
        className="flex flex-col justify-center items-center"
        onClick={() => selectCategory('디저트')}
      >
        <p>사진</p>
        <p>디저트</p>
      </div>
    </div>
  );
}
