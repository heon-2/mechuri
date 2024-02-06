'use client';
import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import Select from './Select';

interface Option {
  option: string;
}

export default function Roulette() {
  const data: Option[] = [
    { option: '치킨' },
    { option: '피자' },
    { option: '초밥' },
    { option: '족발' },
    { option: '라면' },
    { option: '김치찌개' },
    { option: '된장찌개' },
    { option: '삼겹살' },
    { option: '부대찌개' },
    { option: '닭볶음탕' },
    { option: '햄버거' },
    { option: '파스타' },
    { option: '닭발' },
    { option: '갈비' },
    { option: '찜닭' },
    { option: '떡볶이' },
    { option: '아구찜' },
    { option: '짜장면' },
    { option: '짬뽕' },
    { option: '마라탕' },
    { option: '쌀국수' },
    { option: '덮밥' },
    { option: '국밥' },
  ];

  const [options, setOptions] = useState<Option[]>(data);
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);
  const [result, setResult] = useState<Option | null>(null);

  useEffect(() => {
    resetOption();
  }, []);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * options.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const resetOption = () => {
    const newOptions: Option[] = [];
    while (newOptions.length < 10) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      if (!newOptions.includes(data[newPrizeNumber])) {
        newOptions.push(data[newPrizeNumber]);
      }
    }
    setOptions(newOptions);
    setMustSpin(false);
    setResult(null);
  };

  console.log('옵션', options);
  const handleStopSpinning = () => {
    setResult(options[prizeNumber]);
    setMustSpin(false);
  };

  const handleAddClick = () => {
    if (options.length < 10) {
      const newPrizeNumber = Math.floor(Math.random() * options.length);
      if (!options.includes(data[newPrizeNumber])) {
        const newOption = [...options, data[newPrizeNumber]];
        setOptions(newOption);
        setMustSpin(false);
        setResult(null);
      }
    }
  };

  const handleRemoveClick = () => {
    if (options.length > 2) {
      const removeIndex = Math.floor(Math.random() * options.length);
      const newOptions = [...options];
      console.log('지우기 전', newOptions);
      newOptions.splice(removeIndex, 1);
      console.log('지우고 난 후', newOptions);
      setOptions(newOptions);
      setMustSpin(false);
      setResult(null);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 items-center justify-center">
      <div className="flex justify-center items-center">
        <Select></Select>
      </div>
      <div className="col-span-2 flex flex-col items-center justify-center">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={options}
          onStopSpinning={handleStopSpinning}
        />
        <div className="justify-around mt-4">
          <button
            onClick={handleSpinClick}
            className="bg-blue-500 text-white px-5 py-2 rounded-md mr-2 ml-2"
          >
            SPIN
          </button>
          <button onClick={resetOption} className="bg-red-500 text-white px-4 py-2 rounded-md ">
            RESET
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={handleRemoveClick}
          className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 text-2xl"
        >
          -
        </button>
        <p className="mr-2 text-2xl">{options.length}/12</p>
        <button
          onClick={handleAddClick}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md text-2xl"
        >
          +
        </button>
      </div>
      {result && <p>결과: {result.option}</p>}
    </div>
  );
}
