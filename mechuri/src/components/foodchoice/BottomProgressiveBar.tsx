import React from 'react';
interface BottomProgressiveBarProps {
  step: number;
  totalStep: number;
}
export default function BottomProgressiveBar({ step, totalStep }: BottomProgressiveBarProps) {
  return (
    <div className="flex flex-col grid-rows-1 justify-center items-center">
      <div className="mb-5 font-bold text-lg text-orange-300">
        {step} / {totalStep}
      </div>
      <progress
        className="progress progress-warning w-1/3 bg-[#F7DED0]"
        value={step}
        max={totalStep}
      ></progress>
    </div>
  );
}
