import React from 'react';
import Select from './Select';
import NavBar from '@/components/commons/NavBar';
import Roulette from './Roulette';

export default function RoulettePage() {
  return (
    <div className="h-screen">
      <NavBar></NavBar>
      <div className="grid grid-cols-3 items-center justify-center h-[calc(100vh-4rem)] bg-[#f6f6f6]">
        <div className="flex justify-center items-center">
          <Select></Select>
        </div>
        <div className="col-span-2">
          <Roulette></Roulette>
        </div>
      </div>
    </div>
  );
}
