'use client';
import React from 'react';
import { useState } from 'react';

interface AddressProps {
  onSearch: (address: string) => void;
}

export default function Search({ onSearch }: AddressProps) {
  const [inputAddress, setInputAddress] = useState<string>('');

  return (
    <div>
      <label className="input input-bordered flex items-center gap-2 w-[500px]">
        <input
          type="text"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          className="grow"
          placeholder="주소를 입력하세요"
        ></input>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
          onClick={() => {
            onSearch(inputAddress);
            setInputAddress('');
          }}
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    </div>
  );
}
