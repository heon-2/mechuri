'use client';
interface FoodChoice {
  _id: string;
  step: number;
  question: string;
}

import React, { useEffect } from 'react';
import { useState } from 'react';
export default function FoodTest() {
  let [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<number[]>([]); // 선택한 음식
  const [foodChoices, setFoodChoices] = useState<FoodChoice[]>([]);
  const totalStep = foodChoices.length; // 전체 질문 개수.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/foodchoice');
        console.log(response, '리스폰스');
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const data: FoodChoice[] = await response.json(); // 응답을 FoodChoice[] 타입으로 가정
        setFoodChoices(data); // 응답 데이터를 상태에 저장
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const foods = [
    { name: '떡볶이', image: '/images/떡볶이.jpg' },
    { name: '피자', image: '/images/떡볶이.jpg' },
  ];

  const handleClick = (idx: number) => {
    // step 상태 업데이트
    setStep((prevStep) => prevStep + 1);
    // 선택한 음식을 상태에 추가
    setAnswers([...answers, idx + 1]);
  };

  return (
    <div className="grid grid-rows-5 grid-cols-2 h-full">
      <div className="row-span-1 col-span-2 flex items-end justify-center">
        질문이 적히는 곳 : {foodChoices[step - 1]?.question}
        <br></br>// 선택한 것 : {answers}
      </div>

      {/* 음식 선택지 */}
      {foods.map((food, idx) => (
        <div
          key={idx}
          className="row-span-3 flex items-center justify-center"
          onClick={() => handleClick(idx)}
        >
          <div className="w-1/2 aspect-square flex flex-col items-center justify-center border border-red-500">
            <div className="w-56">
              <img src={food.image} alt={food.name} />
            </div>
            <div>{food.name} 먹을래?</div>
          </div>
        </div>
      ))}
      <div className="row-span-1 col-span-2 flex flex-col justify-center items-center">
        <div>진행바 위치할 곳</div>
        <div>
          현재 : {step} / 총 질문 : {totalStep}
        </div>
      </div>
    </div>
  );
}
