import React from 'react';
import NavBar from '@/components/commons/NavBar';
import RouletteSubPage from '@/components/roulette/RouletteSubPage';

export default function RoulettePage() {
  return (
    <div className="h-screen">
      <NavBar></NavBar>
      <RouletteSubPage></RouletteSubPage>
    </div>
  );
}
