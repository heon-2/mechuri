// import { NextRequest, NextResponse } from 'next/server';
// import connectDB from '@/lib/connectDB'; // MongoDB 연결
// import Question from '@/models/Question'; // FoodChoice 모델
// import { MongoClient } from 'mongodb';

// export async function GET(request: NextRequest) {
//   await connectDB();
//   try {
//     console.log('1');
//     const questions = await Question.find({}); // 'questions' 컬렉션에서 모든 문서 조회
//     console.log('2');
//     // const questions = [
//     //   { id: 1, step: 1, question: '더미 질문 1' },
//     //   // 실제 데이터베이스 조회 없이 반환할 추가적인 더미 데이터를 여기에 추가할 수 있습니다.
//     // ];
//     return new Response(JSON.stringify(questions), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   } catch (error) {
//     console.log('디비 에러');
//     console.error('Error fetching questions:', error);
//     return new Response(JSON.stringify({ error: 'Failed to fetch questions' }), {
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }
// }
// MongoDB URI 및 데이터베이스 이름 설정
// api/foodchoice/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB'; // 연결 모듈 임포트

type Question = {
  _id: string;
  step: number;
  question: string;
};

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectDB(); // 데이터베이스 연결
    const questionsCollection = db.collection('questions');
    const questions = await questionsCollection.find({}).toArray();

    return new Response(JSON.stringify(questions), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
