import React from 'react';
interface BottomProgressiveBarProps {
  step: number;
  totalStep: number;
}
export default function BottomProgressiveBar({ step, totalStep }: BottomProgressiveBarProps) {
  return (
    <div className="flex flex-col grid-rows-1 justify-center items-center">
      <div className="mb-5 font-bold text-lg text-mainColor">
        {step} / {totalStep}
      </div>
      <progress
        className="progress progress-error w-1/3 bg-[#F7DED0]"
        // className="progress progress-warning w-1/3 bg-mainColor"
        value={step}
        max={totalStep}
      ></progress>
    </div>
  );
}
