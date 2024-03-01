'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import Select from './Select';
import ResultModal from '@/components/roulette/ResultModal';
import NavBar from '@/components/commons/NavBar';
import { Caveat } from 'next/font/google';

// export interface FoodData {
//   _id: string;
//   foodId: number;
//   name: string;
//   foodTypePreference: string;
//   soupPreference: string;
//   noodlesOrRice: string;
//   meatOrSeafood: string;
//   diningCompanion: string;
//   leastFavoriteCuisine: string;
// }

export default function Roulette() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const product = ['떡볶이', '돈가스', '초밥', '피자', '냉면', '치킨', '족발', '삼겹살'];
  const colors = [
    '#dc0936',
    '#e6471d',
    '#f7a416',
    '#efe61f',
    '#60b236',
    '#209b6c',
    '#169ed8',
    '#3f297e',
    '#87207b',
    '#be107f',
    '#e7167b',
  ];

  useEffect(() => {
    drawRoulette();
  }, []);

  const drawRoulette = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 500;
    canvas.height = 500;
    const [cw, ch] = [canvas.width / 2, canvas.height / 2];
    const radius = cw - 10; // 룰렛의 반지름
    const arc = (2 * Math.PI) / product.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    product.forEach((item, i) => {
      ctx.beginPath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.moveTo(cw, ch);
      ctx.arc(cw, ch, radius, arc * i, arc * (i + 1));
      ctx.fill();

      // Text
      ctx.save();
      ctx.fillStyle = '#fff';
      ctx.translate(
        cw + (Math.cos(arc * i + arc / 2) * radius) / 1.5,
        ch + (Math.sin(arc * i + arc / 2) * radius) / 1.5,
      );
      ctx.rotate(arc * i + arc / 2 + Math.PI / 2);
      ctx.fillText(item, -ctx.measureText(item).width / 2, 0);
      ctx.restore();
    });
  };

  // const rotateRoulette = () => {
  //   const totalRotation = 360 * 5; // 총 회전할 각도 (예: 5바퀴)
  //   const randomDegrees = Math.floor(Math.random() * 360); // 추가 회전 각도
  //   const endRotation = totalRotation + randomDegrees;

  //   const canvas = canvasRef.current;
  //   if (!canvas) return;

  //   canvas.style.transition = 'transform 4s ease-out';
  //   canvas.style.transform = `rotate(${endRotation}deg)`;

  //   // 회전 애니메이션 종료 후에 결과 계산 및 설정
  //   setTimeout(() => {
  //     const degreesPerItem = 360 / product.length;
  //     // 캔버스가 마지막으로 실제로 정지한 각도를 계산
  //     const finalRotationDegrees = endRotation % 360;
  //     // 화살표가 가리키는 항목을 결정
  //     const selectedItemIndex = Math.floor(
  //       (finalRotationDegrees / degreesPerItem) % product.length,
  //     );
  //     setSelectedItem(product[selectedItemIndex]);

  //     alert(`오늘의 메뉴는: ${product[selectedItemIndex]}`);
  //   }, 4000); // 회전 애니메이션 시간에 맞춰 지연
  // };

  const rotate = () => {
    const ran = Math.floor(Math.random() * product.length);
    const arc = 360 / product.length;
    const rotate = ran * arc + 3600 + arc * 3 - arc / 4;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.style.transition = 'transform 2s ease-out';
    canvas.style.transform = `rotate(-${rotate}deg)`;

    setTimeout(() => {
      alert(`오늘의 야식은?! ${product[ran]} 어떠신가요?`);
    }, 2000);
  };

  const resetRotation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.style.transition = 'none';
    canvas.style.transform = 'none';
    setSelectedItem(null);
  };

  return (
    <div>
      <div style={{ position: 'relative', width: '500px', height: '500px' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute' }} />
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '0',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '20px solid black',
          }}
        />
      </div>
      <button onClick={rotate}>룰렛 돌리기</button>
      <button onClick={resetRotation}>초기화</button>
      {selectedItem && <p>선택된 항목: {selectedItem}</p>}
    </div>
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

//   const handleAddClick = () => {
//     if (options.length < 10) {
//       const newPrizeNumber = Math.floor(Math.random() * options.length);
//       if (!options.includes(data[newPrizeNumber])) {
//         const newOption = [...options, data[newPrizeNumber]];
//         setOptions(newOption);
//         setMustSpin(false);
//         setResult(null);
//       }
//     }
//   };

//   const handleRemoveClick = () => {
//     if (options.length > 2) {
//       const removeIndex = Math.floor(Math.random() * options.length);
//       const newOptions = [...options];
//       console.log('지우기 전', newOptions);
//       newOptions.splice(removeIndex, 1);
//       console.log('지우고 난 후', newOptions);
//       setOptions(newOptions);
//       setMustSpin(false);
//       setResult(null);
//     }
//   };

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
