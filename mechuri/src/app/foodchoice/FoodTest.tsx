'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
export default function FoodTest() {
  let [step, setStep] = useState(0);
  let [selected, setSelected] = useState([]);

  // api 테스트 코드
  useEffect(() => {
    fetch('/api/foodchoice')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div className="grid grid-rows-5 grid-cols-2 h-full">
      <div className="row-span-1 col-span-2 flex items-end justify-center">
        Q. 질문 리스트를 뭘 해야 할까요 ?
      </div>

      <div className="row-span-3 flex items-center justify-center">
        <div className="w-1/2 aspect-square flex flex-col items-center justify-center border border-red-500">
          <div className="w-56">
            <img src="/images/떡볶이.jpg" />
          </div>
          <div>떡볶이 먹을래?</div>
        </div>
      </div>
      <div className="row-span-3 flex items-center justify-center">
        <div className="w-1/2 aspect-square flex flex-col items-center justify-center border border-red-500">
          <div className="w-56">
            <img src="/images/떡볶이.jpg" />
          </div>
          <div>피자 먹을래?</div>
        </div>
      </div>
      <div className="row-span-1 col-span-2 flex flex-col justify-center items-center">
        <div>진행바</div>
        <div>1 / 12</div>
      </div>
    </div>
  );
}
