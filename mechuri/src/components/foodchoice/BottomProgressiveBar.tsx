import React from 'react';
interface BottomProgressiveBarProps {
  step: number;
  totalStep: number;
}
export default function BottomProgressiveBar({ step, totalStep }: BottomProgressiveBarProps) {
  return (
    <div className="flex flex-col grid-rows-1 justify-center items-center">
      <div className="mb-5">
        {step} / {totalStep}
      </div>
      <progress className="progress w-1/3" value={step} max={totalStep}></progress>
    </div>
  );
}
