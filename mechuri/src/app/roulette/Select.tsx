import React, { useEffect, useState } from 'react';

export default function Select() {
  return (
    <div className="bg-gray-300 h-96 w-48 grid grid-rows-4 grid-cols-2 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <p>사진</p>
        <p>한식</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p>사진</p>
        <p>일식</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p>사진</p>
        <p>양식</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p>사진</p>
        <p>증식</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p>사진</p>
        <p>분식</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p>사진</p>
        <p>야식</p>
      </div>
      <div className="col-span-2 flex flex-col justify-center items-center">
        <p>사진</p>
        <p>패스트푸드</p>
      </div>
    </div>
  );
}
