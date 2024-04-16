'use client';
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import ResultModal from '@/components/roulette/ResultModal';
import { useRecoilState } from 'recoil';
import { categoryState } from '@/stores/atoms/rouletteState';

export interface FoodData {
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

interface RouletteProps {
  data: FoodData[] | undefined;
}

export default function Roulette({ data }: RouletteProps) {
  // const [data, setData] = useState<FoodData[]>([]);
  const [rouletteData, setRouletteData] = useState<FoodData[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedItem, setSelectedItem] = useState<FoodData | null>(null);
  const [rouletteSize, setRouletteSize] = useState<number>(10); // 룰렛 칸 개수 초기값 설정
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectCategory, setSelectCategory] = useRecoilState(categoryState);
  const colors = ['#FF8989', '#FFC7C7', '#FCAEAE', '#FFE2E2', '#FFB4B4'];
  const [canvasSize, setCanvasSize] = useState<any>({ width: 500, height: 500 });

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   // try {
  //   const response = await fetch('/api/roulette');
  //   if (!response.ok) {
  //     throw new Error('에러가 발생했습니다.');
  //   }
  //   return await response.json();
  //   // const fetchData: FoodData[] = await response.json();
  //   // setData(fetchData);
  //   // console.log(fetchData);
  //   // } catch (error) {
  //   // console.error(error);
  //   // }
  // };
  // const { data: data, isLoading } = useQuery<FoodData[]>({
  //   queryKey: ['roulette'],
  //   queryFn: fetchData,
  // });

  useEffect(() => {
    if (data && data.length > 0) {
      randomDataRoulette();
    }
  }, [data, rouletteSize, selectCategory]);

  const randomDataRoulette = () => {
    if (!data) return;

    let filteredData = data;

    if (selectCategory) {
      filteredData = data.filter((item) => item.category === selectCategory);
    }
    const size = Math.min(rouletteSize, filteredData.length);
    const selectedItems: FoodData[] = [];
    const clonedData = [...filteredData];
    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * clonedData.length);
      selectedItems.push(clonedData.splice(randomIndex, 1)[0]);
    }

    setRouletteData(selectedItems);
    console.log('rouletteData', rouletteData);
    console.log('category', selectCategory);
    console.log('ddfdf', filteredData);
  };

  const resetRoulette = () => {
    setSelectCategory('');
    setRouletteSize(10);
    randomDataRoulette();
    setSelectedItem(null);
  };

  useEffect(() => {
    canvasResize();
    window.addEventListener('resize', canvasResize);

    return () => window.removeEventListener('resize', canvasResize);
  }, []);

  const canvasResize = () => {
    const { innerWidth, innerHeight } = window;

    const size = Math.min(innerWidth, innerHeight) * 0.63;
    setCanvasSize({ width: size, height: size });
  };

  useEffect(() => {
    if (rouletteData.length > 0) {
      drawRoulette();
    }
  }, [rouletteData]);

  const drawRoulette = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    const [cw, ch] = [canvas.width / 2, canvas.height / 2];
    const radius = cw - 10; // 룰렛의 반지름
    const arc = (2 * Math.PI) / rouletteData.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const fontSize = canvasSize.width / 28;
    ctx.font = `${fontSize}px Arial`;

    rouletteData.forEach((item, i) => {
      ctx.beginPath();
      ctx.arc(cw, ch, radius, arc * i, arc * (i + 1));
      ctx.lineTo(cw, ch);
      ctx.fillStyle = colors[i % colors.length];
      ctx.moveTo(cw, ch);
      ctx.fill();

      // Text
      ctx.save();
      ctx.fillStyle = '#000';
      // ctx.font = '18px Arial';
      ctx.translate(
        cw + (Math.cos(arc * i + arc / 2) * radius) / 1.5,
        ch + (Math.sin(arc * i + arc / 2) * radius) / 1.5,
      );
      ctx.rotate(arc * i + arc / 2 + Math.PI / 2);
      ctx.fillText(item.name, -ctx.measureText(item.name).width / 2, 0);
      ctx.restore();
    });
    for (let i = 0; i < rouletteData.length; i++) {
      ctx.beginPath();
      ctx.moveTo(cw, ch);
      ctx.arc(cw, ch, radius, arc * i, arc * (i + 1), false);
      ctx.lineWidth = 3; // 선의 두께를 지정합니다.
      ctx.strokeStyle = 'black'; // 선의 색상을 지정합니다.
      ctx.stroke();
    }

    drawCenterCircle();
  };

  const drawCenterCircle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const [cw, ch] = [canvas.width / 2, canvas.height / 2];
    const centerRadius = 30; // 중앙 원의 반지름, 크기는 적절히 조정할 수 있음

    ctx.beginPath();
    ctx.arc(cw, ch, centerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black'; // 중앙 원의 색상, 필요에 따라 변경 가능
    ctx.fill();
  };

  const rotate = () => {
    if (rouletteData.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.style.transition = 'none';
    canvas.style.transform = `rotate(0deg)`;

    setTimeout(() => {
      const ran = Math.floor(Math.random() * rouletteSize);
      const arc = 360 / rouletteSize;
      let offset;
      if (7 < rouletteSize && rouletteSize <= 10) {
        offset = -arc / 2 - arc;
      } else if (4 < rouletteSize && rouletteSize <= 7) {
        offset = -arc / 2 - arc / 2;
      } else {
        offset = -arc / 2 + arc / 2;
      }
      const rotate = 3600 - ((rouletteSize - ran - 1) * arc + offset);
      canvas.style.transition = 'transform 2s ease-out';
      canvas.style.transform = `rotate(-${rotate}deg)`;

      setTimeout(() => {
        setSelectedItem(rouletteData[ran]);
        setModalOpen(true);
      }, 2000);
    }, 10);
  };

  const addItems = () => {
    setRouletteSize((prev) => Math.min(10, prev + 1));
  };

  const removeItems = () => {
    setRouletteSize((prev) => Math.max(2, prev - 1));
  };

  return (
    <div className="flex justify-between items-center">
      {/* {isLoading ? (
        <LoadingUi></LoadingUi>
      ) : (
        <> */}
      {/* 룰렛과 버튼들 그리드 짜기 */}
      <div className="flex flex-col items-center justify-center roulette-container relative ml-6">
        <canvas className="relative z-10" ref={canvasRef} />
        <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={rotate}
            className="bg-[#FF856B] text-white text-xl w-20 h-20 rounded-full "
          >
            SPIN
          </button>
        </div>
        <Image
          src="/images/arrow.png"
          alt="arrow"
          width={90}
          height={90}
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20 ml-10 rotate-[15deg]"
          style={{ marginTop: '-20px' }}
        ></Image>
        {/* <div className="justify-around mt-4 z-10">
          <button
            onClick={rotate}
            className="bg-blue-500 text-white px-5 py-2 rounded-md mr-2 ml-2"
          >
            SPIN
          </button>
          <button onClick={resetRoulette} className="bg-red-500 text-white px-4 py-2 rounded-md ">
            RESET
          </button>
        </div> */}
      </div>
      <div className="flex flex-col gap-4">
        <button
          onClick={resetRoulette}
          className="bg-[#FF856B] text-white text-xl px-4 py-2 rounded-md "
        >
          RESET
        </button>
        <div className="flex justify-center items-center z-10">
          <button
            onClick={removeItems}
            className="bg-green-500 text-white w-12 h-12 rounded-md mr-2 text-4xl "
          >
            -
          </button>
          <p className="mr-2 text-3xl">{rouletteSize}/10</p>
          <button
            onClick={addItems}
            className="bg-yellow-500 text-white w-12 h-12 rounded-md text-4xl"
          >
            +
          </button>
        </div>
      </div>
      <ResultModal
        result={selectedItem}
        onClose={() => setModalOpen(false)}
        open={modalOpen}
      ></ResultModal>
      {/* </>
      )} */}
    </div>
  );
}
