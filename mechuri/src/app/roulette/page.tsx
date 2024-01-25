'use client'
import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';

interface Option {
    option: string;
}

const Home: React.FC = () => {
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

    const [option, setOption] = useState<Option[]>((data))
    const [mustSpin, setMustSpin] = useState<boolean>(false);
    const [prizeNumber, setPrizeNumber] = useState<number>(0);
    const [result, setResult] = useState<Option | null>(null)

    useEffect(() => {
        resetOption()
    },[])

    const handleSpinClick = () => {
        if (!mustSpin) {
            setMustSpin(true)
        }
    };

    const resetOption = () => {
        const newOption: Option[] = []
        while (newOption.length < 10) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            if (!newOption.includes(data[newPrizeNumber])) {
                newOption.push(data[newPrizeNumber])
            }
        }
        setOption(newOption)
        setMustSpin(false)
        setResult(null)
    }

    const handleStopSpinning = () => {
        setResult(option[prizeNumber])
        setMustSpin(false)
    }

    // const handleAddClick = () => {
    //     if (option.length < 8) {
    //         const newPrizeNumber = Math.floor(Math.random() * data.length)
    //         if (!option.includes(data[newPrizeNumber])) {

    //             const newOption = [...option, data[newPrizeNumber]]
    //             setOption(newOption)
    //             setMustSpin(false)
    //             setResult(null)
    //         }
    //     }
    // }

    // const handleRemoveClick = () => {
    //     if (option.length > 2) {
    //         const removeIndex = Math.floor(Math.random() * option.length)
    //         const newOption = [...option]
    //         console.log('지우기 전',newOption)
    //         newOption.splice(removeIndex, 1)
    //         console.log('지우고 난 후', newOption)
    //         setOption(newOption)
    //         setMustSpin(false)
    //         setResult(null)
    //     }
    // }

    return (
        <div>
            <Wheel mustStartSpinning={mustSpin} prizeNumber={prizeNumber} data={option} onStopSpinning={handleStopSpinning} />
            <div>
                <button onClick={handleSpinClick}>SPIN</button>
            </div>
            <div>
                <button onClick={resetOption}>RESET</button>
            </div>
            {/* <div>
                <button onClick={handleAddClick}>ADD</button>
            </div>
            <div>
                <button onClick={handleRemoveClick}>REMOVE</button>
            </div> */}

            {result && <p>결과: {result.option}</p>}
        </div>
    );
};

export default Home;
