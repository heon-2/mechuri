'use client';
interface Questionnaire {
  step: number;
  Question: QuestionDetail;
  Answers: AnswerDetail[];
}
interface QuestionDetail {
  questionId: number;
  longQuestion: string;
  shortQuestion: string;
}
interface AnswerDetail {
  answerId: number;
  longAnswer: string;
  shortAnswer: string;
}

// 서버에 보내지는 데이터 예시
/* 
{
  "answers": [
    {
      "step": 1,
      "shortQuestion": "foodTypePreference",
      "shortAnswer": "light"
    },
    {
      "step": 2,
      "shortQuestion": "soupPreference",
      "shortAnswer": "yes"
    },
    // 이하 답변들...
  ]
}
*/

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function FoodTest() {
  let [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<
    Array<{ step: number; shortQuestion: string; shortAnswer: string }>
  >([]);
  const [questionnaire, setQuestionnaire] = useState<Questionnaire[]>([]);
  const totalStep = questionnaire.length; // 전체 질문 개수.
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/foodchoice');
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const data: Questionnaire[] = await response.json(); // 응답을 FoodChoice[] 타입으로 가정
        setQuestionnaire(data); // 응답 데이터를 상태에 저장
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // 모든 질문에 대한 답변이 완료되었을 때만 서버로 데이터를 전송
    if (answers.length === questionnaire.length && questionnaire.length > 0) {
      const sendAnswers = async () => {
        const response = await fetch('/api/foodchoice/result', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answers }),
        });

        if (response.ok) {
          const { foodId: resultFoodId } = await response.json();
          router.push(`/foodchoice/result/${resultFoodId}`);
        }
      };

      sendAnswers();
    }
  }, [answers, questionnaire.length, router]);

  const foods = [
    { name: '떡볶이', image: '/images/떡볶이.jpg' },
    { name: '피자', image: '/images/떡볶이.jpg' },
  ];

  const handleClick = async (selectedAnswerId: number) => {
    const selectedAnswer = currentQuestion?.Answers.find(
      (answer) => answer.answerId === selectedAnswerId,
    );

    if (selectedAnswer) {
      const newAnswer = {
        step: currentQuestion.step,
        shortQuestion: currentQuestion.Question.shortQuestion,
        shortAnswer: selectedAnswer.shortAnswer,
      };

      setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
    }

    if (step < questionnaire.length) {
      setStep((currentStep) => currentStep + 1);
    }
    // 마지막 단계에서의 서버 요청 로직은 이제 useEffect에서 처리합니다.
  };
  const currentQuestion = questionnaire[step - 1];
  return (
    <div className="grid grid-rows-5 grid-cols-2 h-full">
      {/* 질문 표시 */}
      {currentQuestion && (
        <div className="row-span-1 col-span-2 flex items-end justify-center">
          질문이 적히는 곳 : {currentQuestion?.Question?.longQuestion}
          <br />
          {currentQuestion.Question.shortQuestion}
          {/* <br></br>// 선택한 것 : {answers.join(', ')} */}
        </div>
      )}

      {/* 선택지 */}
      {currentQuestion?.Answers?.map((answer, idx) => (
        <div key={idx} className="row-span-3 flex items-center justify-center">
          <div
            className="w-1/2 aspect-square flex flex-col items-center justify-center border border-red-500"
            onClick={() => handleClick(answer.answerId)}
          >
            {/* 예시로 이미지와 이름을 표시하는 부분은 실제 응답 데이터에 맞게 조정해야 합니다. */}
            <div className="w-56">
              {/* <img src={`/images/${answer.answer}.jpg`} alt={answer.answer} /> */}
              <img src="/images/떡볶이.jpg" alt={answer.longAnswer} />
            </div>
            <div>
              {answer.longAnswer}
              <hr />
              {answer.shortAnswer}
            </div>
          </div>
        </div>
      ))}

      <div className="row-span-1 col-span-2 flex flex-col justify-center items-center">
        <div>진행바 위치할 곳</div>
        <div>
          현재 : {step} / 총 질문 : {questionnaire.length}
        </div>
      </div>
    </div>
  );
}
