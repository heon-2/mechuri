'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import NavBar from '@/components/commons/NavBar';

export default function ResultPage({ params }: { params: { foodId: Number } }) {
  const router = useRouter();
  // const { id } = router.query; // URL로부터 결과 값의 ID를 얻음
  const [resultData, setResultData] = useState(null);

  // 결과 ID를 사용해 서버로부터 결과 데이터를 불러옴
  useEffect(() => {
    const fetchData = async () => {
      if (params.foodId) {
        // URL 파라미터가 존재할 때만 실행
        const response = await fetch(`/api/foodchoice/result/${params.foodId}`);
        const data = await response.json();
        setResultData(data);
      }
    };
    fetchData();
  }, [params.foodId]);

  return (
    <div className="h-screen">
      <NavBar />
      <div className="grid grid-rows-5 grid-cols-2 h-full">
        <div className="row-span-4 col-span-2 bg-gray-100">
          {/* 결과 데이터를 렌더링 */}
          {resultData ? <div>결과: {resultData}</div> : <div>결과를 불러오는 중...</div>}
        </div>
        <div className="row-span-1 col-span-2 flex items-end justify-center">결과가 나오는 곳</div>
      </div>
    </div>
  );
}
