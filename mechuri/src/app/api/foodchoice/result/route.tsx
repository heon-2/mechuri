// 'use client';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB'; // 연결 모듈 임포트
// import { useSearchParams } from 'next/navigation';
// GET
type foodId = string | number;
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const { db } = await connectDB(); // 데이터베이스 연결
    const foodsCollection = db.collection('foods');
    const foodId = parseInt(request.nextUrl.searchParams.get('foodId') ?? '0'); // 코드 수정해야할 부분. parseInt 깔끔하게 정리하기
    const resultFood = await foodsCollection.findOne({ foodId: foodId });
    // console.log(resultFood);
    console.log(typeof foodId);
    return new Response(JSON.stringify(resultFood), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // return new Response(JSON.stringify({ foodId: 1 }), {
    //   status: 200,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch questions' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
