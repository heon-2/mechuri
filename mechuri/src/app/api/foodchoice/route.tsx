import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB'; // 연결 모듈 임포트

type Question = {
  _id: string;
  step: number;
  question: string;
};
// GET
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
// POST
export async function POST(request: NextRequest) {
  try {
    const { db } = await connectDB(); // 데이터베이스 연결
    const answers = await request.json();
    const result = {
      foodId: '1234',
    };
    return new Response(JSON.stringify(result), {
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
