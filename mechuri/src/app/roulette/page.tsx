'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import Select from './Select';
import ResultModal from '@/components/roulette/ResultModal';
import NavBar from '@/components/commons/NavBar';
import { Caveat } from 'next/font/google';
import arrow from '../../../public/images/arrow.png';
import Image from 'next/image';
import Roulette from './Roulette';

export interface FoodData {
  _id: string;
  foodId: number;
  name: string;
  foodTypePreference: string;
  soupPreference: string;
  noodlesOrRice: string;
  meatOrSeafood: string;
  diningCompanion: string;
  leastFavoriteCuisine: string;
}

export default function page() {
  // const [data, setData] = useState<FoodData[]>([]);
  // const [rouletteData, setRouletteData] = useState<FoodData[]>([]);
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [selectedItem, setSelectedItem] = useState<string | null>(null);
  // const [rouletteSize, setRouletteSize] = useState<number>(10); // 룰렛 칸 개수 초기값 설정
  // const [modalOpen, setModalOpen] = useState<boolean>(false);

  // const colors = [
  //   '#dc0936',
  //   '#e6471d',
  //   '#f7a416',
  //   '#efe61f',
  //   '#60b236',
  //   '#209b6c',
  //   '#169ed8',
  //   '#3f297e',
  //   '#87207b',
  //   '#be107f',
  //   '#e7167b',
  // ];

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('/api/roulette');
  //     if (!response.ok) {
  //       throw new Error('Data could not be fetched');
  //     }
  //     const fetchData: FoodData[] = await response.json();
  //     setData(fetchData);
  //     console.log(fetchData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   if (data.length > 0) {
  //     randomDataRoulette();
  //   }
  // }, [data, rouletteSize]);

  // const randomDataRoulette = () => {
  //   const selectedItems = [];
  //   const clonedData = [...data];
  //   for (let i = 0; i < Math.min(rouletteSize, clonedData.length); i++) {
  //     const randomIndex = Math.floor(Math.random() * clonedData.length);
  //     selectedItems.push(clonedData.splice(randomIndex, 1)[0]);
  //   }
  //   setRouletteData(selectedItems);
  // };

  // const resetRoulette = () => {
  //   randomDataRoulette();
  //   setSelectedItem(null);
  // };

  // useEffect(() => {
  //   if (rouletteData.length > 0) {
  //     drawRoulette();
  //   }
  // }, [rouletteData]);

  // const drawRoulette = () => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;
  //   const ctx = canvas.getContext('2d');
  //   if (!ctx) return;

  //   canvas.width = 400;
  //   canvas.height = 400;
  //   const [cw, ch] = [canvas.width / 2, canvas.height / 2];
  //   const radius = cw - 10; // 룰렛의 반지름
  //   const arc = (2 * Math.PI) / rouletteData.length;

  //   ctx.clearRect(0, 0, canvas.width, canvas.height);

  //   rouletteData.forEach((item, i) => {
  //     ctx.beginPath();
  //     ctx.arc(cw, ch, radius, arc * i, arc * (i + 1));
  //     ctx.lineTo(cw, ch);
  //     ctx.fillStyle = colors[i % colors.length];
  //     ctx.moveTo(cw, ch);
  //     ctx.fill();

  //     // Text
  //     ctx.save();
  //     ctx.fillStyle = '#fff';
  //     ctx.font = '15px Arial';
  //     ctx.translate(
  //       cw + (Math.cos(arc * i + arc / 2) * radius) / 1.5,
  //       ch + (Math.sin(arc * i + arc / 2) * radius) / 1.5,
  //     );
  //     ctx.rotate(arc * i + arc / 2 + Math.PI / 2);
  //     ctx.fillText(item.name, -ctx.measureText(item.name).width / 2, 0);
  //     ctx.restore();
  //   });
  //   for (let i = 0; i < rouletteData.length; i++) {
  //     ctx.beginPath();
  //     ctx.moveTo(cw, ch);
  //     ctx.arc(cw, ch, radius, arc * i, arc * (i + 1), false);
  //     ctx.lineWidth = 8; // 선의 두께를 지정합니다.
  //     ctx.strokeStyle = 'black'; // 선의 색상을 지정합니다.
  //     ctx.stroke();
  //   }

  //   drawCenterCircle();
  // };

  // const drawCenterCircle = () => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;
  //   const ctx = canvas.getContext('2d');
  //   if (!ctx) return;

  //   const [cw, ch] = [canvas.width / 2, canvas.height / 2];
  //   const centerRadius = 30; // 중앙 원의 반지름, 크기는 적절히 조정할 수 있음

  //   ctx.beginPath();
  //   ctx.arc(cw, ch, centerRadius, 0, 2 * Math.PI);
  //   ctx.fillStyle = 'black'; // 중앙 원의 색상, 필요에 따라 변경 가능
  //   ctx.fill();
  // };

  // const rotate = () => {
  //   if (rouletteData.length === 0) return;

  //   const ran = Math.floor(Math.random() * rouletteSize);
  //   const arc = 360 / rouletteSize;
  //   let offset;
  //   if (7 < rouletteSize && rouletteSize <= 10) {
  //     offset = -arc / 2 - arc;
  //   } else if (4 < rouletteSize && rouletteSize <= 7) {
  //     offset = -arc / 2 - arc / 2;
  //   } else {
  //     offset = -arc / 2 + arc / 2;
  //   }
  //   const rotate = 3600 - ((rouletteSize - ran - 1) * arc + offset);

  //   const canvas = canvasRef.current;
  //   if (!canvas) return;

  //   canvas.style.transition = 'none';
  //   canvas.style.transform = `rotate(0deg)`;

  //   setTimeout(() => {
  //     canvas.style.transition = 'transform 2s ease-out';
  //     canvas.style.transform = `rotate(-${rotate}deg)`;

  //     setTimeout(() => {
  //       setSelectedItem(rouletteData[ran].name);
  //       alert(`오늘의 야식은?! ${rouletteData[ran].name} 어떠신가요?`);
  //     }, 2000);
  //   }, 10);
  // };

  // const addItems = () => {
  //   setRouletteSize((prev) => Math.min(10, prev + 1));
  // };

  // const removeItems = () => {
  //   setRouletteSize((prev) => Math.max(2, prev - 1));
  // };

  return (
    <div>
      <NavBar></NavBar>
      <div className="grid grid-cols-4 gap-4 items-center justify-center">
        <div className="flex justify-center items-center">
          <Select></Select>
        </div>
        <div className="col-span-3">
          <Roulette></Roulette>
        </div>
      </div>
    </div>
    // <div>
    //   <div style={{ position: 'relative', width: '500px', height: '500px' }}>
    //     <canvas ref={canvasRef} style={{ position: 'absolute' }} />
    //     <div
    //       style={{
    //         position: 'absolute',
    //         top: '0',
    //         left: '50%',
    //         width: '50px',
    //         height: '50px',
    //         transform: 'translateX(-50%), zIndex: 10',
    //       }}
    //     >
    //       <Image src={arrow} alt="Roulette Arrow"></Image>
    //     </div>
    //   </div>

    //   <div className="flex">
    //     <button onClick={rotate}>룰렛 돌리기</button>
    //     <button onClick={resetRoulette}>초기화</button>
    //   </div>
    //   <div className="flex">
    //     <button onClick={addItems}>추가</button>
    //     <button onClick={removeItems}>제거</button>
    //   </div>
    //   <div className="flex"></div>
    //   {selectedItem && <p>선택된 항목: {selectedItem}</p>}
    // </div>
  );
}

// export default function Roulette() {
//   const [data, setData] = useState<FoodData[]>([])
//   const [options, setOptions] = useState<FoodData[]>(data);
//   const [mustSpin, setMustSpin] = useState<boolean>(false);
//   const [prizeNumber, setPrizeNumber] = useState<number>(0);
//   const [result, setResult] = useState<FoodData | null>(null);
//   const [modalOpen, setModalOpen] = useState<boolean>(false);

//   const [testt, setTestt] = useState([]);

//   useEffect(() => {
//     const test = async () => {
//       try {
//         const response = await fetch('/api/roulette');
//         if (!response.ok) {
//           throw new Error('Data could no tbe fetched');
//         }
//         const data = await response.json();
//         setTestt(data);
//         console.log('dfafdas', data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     test();
//   }, []);

//   useEffect(() => {
//     resetOption();
//   }, []);

//   const handleSpinClick = () => {
//     if (!mustSpin) {
//       const newPrizeNumber = Math.floor(Math.random() * options.length);
//       setPrizeNumber(newPrizeNumber);
//       setMustSpin(true);
//     }
//   };

//   const resetOption = () => {
//     const newOptions: Option[] = [];
//     while (newOptions.length < 10) {
//       const newPrizeNumber = Math.floor(Math.random() * data.length);
//       if (!newOptions.includes(data[newPrizeNumber])) {
//         newOptions.push(data[newPrizeNumber]);
//       }
//     }
//     setOptions(newOptions);
//     setMustSpin(false);
//     setResult(null);
//   };

//   console.log('옵션', options);
//   const handleStopSpinning = () => {
//     setResult(options[prizeNumber]);
//     setMustSpin(false);
//     setModalOpen(true);
//   };

// const handleAddClick = () => {
//   if (options.length < 10) {
//     const newPrizeNumber = Math.floor(Math.random() * options.length);
//     if (!options.includes(data[newPrizeNumber])) {
//       const newOption = [...options, data[newPrizeNumber]];
//       setOptions(newOption);
//       setMustSpin(false);
//       setResult(null);
//     }
//   }
// };

// const handleRemoveClick = () => {
//   if (options.length > 2) {
//     const removeIndex = Math.floor(Math.random() * options.length);
//     const newOptions = [...options];
//     console.log('지우기 전', newOptions);
//     newOptions.splice(removeIndex, 1);
//     console.log('지우고 난 후', newOptions);
//     setOptions(newOptions);
//     setMustSpin(false);
//     setResult(null);
//   }
// };

//   return (
//     <div>
//       <NavBar></NavBar>
//       <div className="grid grid-cols-4 gap-4 items-center justify-center">
//         <div className="flex justify-center items-center">
//           <Select></Select>
//         </div>
//         <div className="col-span-2 flex flex-col items-center justify-center">
//           <Wheel
//             mustStartSpinning={mustSpin}
//             prizeNumber={prizeNumber}
//             data={options}
//             onStopSpinning={handleStopSpinning}
//           />
//           <div className="justify-around mt-4">
//             <button
//               onClick={handleSpinClick}
//               className="bg-blue-500 text-white px-5 py-2 rounded-md mr-2 ml-2"
//             >
//               SPIN
//             </button>
//             <button onClick={resetOption} className="bg-red-500 text-white px-4 py-2 rounded-md ">
//               RESET
//             </button>
//           </div>
//         </div>
//         <div className="flex justify-center items-center">
//           <button
//             onClick={handleRemoveClick}
//             className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 text-2xl"
//           >
//             -
//           </button>
//           <p className="mr-2 text-2xl">{options.length}/10</p>
//           <button
//             onClick={handleAddClick}
//             className="bg-yellow-500 text-white px-4 py-2 rounded-md text-2xl"
//           >
//             +
//           </button>
//         </div>
//         <ResultModal
//           result={result}
//           onClose={() => setModalOpen(false)}
//           open={modalOpen}
//         ></ResultModal>
//       </div>
//     </div>
//   );
// }
