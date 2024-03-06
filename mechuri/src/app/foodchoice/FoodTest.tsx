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
  image: string;
}

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomProgressiveBar from '@/components/foodchoice/BottomProgressiveBar';
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
        const response = await fetch('/api/foodchoice', {
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
  };
  const currentQuestion = questionnaire[step - 1];
  return (
    // calc을 사용한 높이 조절 -> 3rem은 NavBar의 높이
    <div className="grid grid-rows-5 w-screen h-[calc(100%-4rem)] bg-[#F6F6F6]">
      {/* 질문 표시 */}
      {currentQuestion && (
        <div className="row-span-1 flex items-center justify-center w-screen font-bold text-5xl">
          Q{step}. {currentQuestion?.Question?.longQuestion}
        </div>
      )}

      {/* 선택지 */}
      <div className="row-span-3 flex items-center justify-center">
        <div className="flex w-4/5 h-4/5 justify-around">
          {currentQuestion?.Answers?.map((answer, idx) => (
            <div
              key={idx}
              // 추후에 그림자를 뉴모피즘으로 변환예정.
              className="flex  justify-center items-center cursor-pointer  rounded-3xl bg-white shadow-2xl"
              style={{ flexBasis: `${80 / currentQuestion?.Answers?.length}%` }}
              onClick={() => handleClick(answer.answerId)}
            >
              <div className="h-full w-full flex flex-col items-center justify-center gap-10">
                {/* 선택지 내용 */}
                {answer.image && (
                  <img className="rounded-xl h-2/3" src={answer.image} alt="Sample Image" />
                )}

                <div className="font-semibold text-4xl">{answer.longAnswer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomProgressiveBar step={step} totalStep={totalStep} />
    </div>
  );
}
