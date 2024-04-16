import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB'; // 연결 모듈 임포트

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

type Answer = {
  step: number;
  shortQuestion: string;
  shortAnswer: string;
};
type Answers = Answer[];
// POST 요청 처리

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectDB();
    const requestBody = await request.json(); // 요청 본문 전체를 받아옴
    const receivedAnswers: Answers = requestBody.answers; // answers 배열을 직접 추출

    // 쿼리 조건 객체 생성
    const queryConditions: { [key: string]: any } = receivedAnswers.reduce(
      (acc, curr) => {
        if (curr.shortQuestion === 'noodlesOrRice' || curr.shortQuestion === 'meatOrSeafood') {
          // 이미 '$or' 조건이 설정되어 있으면 추가하지 않고, 현재 조건을 '$or' 배열에 추가
          if (!acc['$or']) {
            acc['$or'] = [];
          }
          acc['$or'].push(
            { [curr.shortQuestion]: curr.shortAnswer },
            { [curr.shortQuestion]: 'etc' },
          );
        } else if (curr.shortQuestion === 'mealTime') {
          // 'mealTime'이 배열 내에 포함되어 있는지 확인
          acc[curr.shortQuestion] = { $in: [curr.shortAnswer] };
        } else if (curr.shortQuestion === 'category') {
          // 'category'를 받은 값 제외하고 조회
          acc[curr.shortQuestion] = { $ne: curr.shortAnswer };
        } else {
          // 나머지 경우는 직접 조건에 추가
          acc[curr.shortQuestion] = curr.shortAnswer;
        }
        return acc;
      },
      {} as { [key: string]: any },
    );

    // 위의 식 공부용 코드
    /*
    [
  { "shortQuestion": "foodTypePreference", "shortAnswer": "light" },
  { "shortQuestion": "soupPreference", "shortAnswer": "no" }
]
위의 코드가
{
  "foodTypePreference": "light",
  "soupPreference": "no"
}
이렇게 생성됨 */

    // MongoDB에서 조건에 맞는 음식 중 랜덤하게 하나를 선택
    const randomFood = await db
      .collection('foods')
      .aggregate([{ $match: queryConditions }, { $sample: { size: 1 } }])
      .toArray();

    // 결과 확인 및 리턴
    if (randomFood.length > 0) {
      return new Response(JSON.stringify(randomFood[0]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      console.log(queryConditions);
      return new Response(JSON.stringify({ error: '매칭된 메뉴가 없습니다.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
