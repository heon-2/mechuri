import { connectDB } from '@/lib/connectDB';
import { Collection } from 'mongodb';
import React from 'react';
export default async function Page() {
  // 데이터베이스에서 데이터를 가져오는 로직

  const { db } = await connectDB(); // 데이터베이스 연결
  const test = db.collection('foods');
  const foods = await test
    .find(
      {},
      {
        projection: { foodId: 1, name: 1, imageUrl: 1 },
      },
    )
    .toArray();

  // 페이지 컴포넌트에 props로 전달할 데이터
  return (
    <div className="flex items-center flex-col">
      {foods &&
        foods.map((food) => (
          <div key={food.foodId}>
            <p>Food ID: {food.foodId}</p>
            <p>{food.name}</p>
            <img src={food.imageUrl} className="h-40" alt={food.name} />
          </div>
        ))}
    </div>
  );
}
