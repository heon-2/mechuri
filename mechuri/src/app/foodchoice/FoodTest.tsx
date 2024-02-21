'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
export default function FoodTest() {
  // let [step, setStep] = useState(0);
  // let [selected, setSelected] = useState([]);

  // // api 테스트 코드
  // useEffect(() => {
  //   fetch('/api/foodchoice').then((data) => {
  //     console.log(data);
  //   });
  // }, []);

  const [foodChoices, setFoodChoices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/foodchoice');
        console.log(response, '리스폰스');
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const data = await response.json();
        setFoodChoices(data); // 응답 데이터를 상태에 저장
        // console.log(foodChoices, '푸드초이스');
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // 의존성 배열이 비어있으므로 컴포넌트 마운트 시 한 번만 호출됩니다.

  return (
    <div className="grid grid-rows-5 grid-cols-2 h-full">
      <div className="row-span-1 col-span-2 flex items-end justify-center">
        Q. 질문 리스트를 뭘 해야 할까요 ?
        {foodChoices.map((foodChoice: { question: string }) => {
          return <div>{foodChoice.question}</div>;
        })}
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
