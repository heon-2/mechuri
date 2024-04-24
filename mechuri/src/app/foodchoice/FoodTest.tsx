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
import Image from 'next/image';
import LoadingUi from '@/components/commons/LoadingUi';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomProgressiveBar from '@/components/foodchoice/BottomProgressiveBar';
import { useQuery } from '@tanstack/react-query';

export default function FoodTest() {
  let [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<
    Array<{ step: number; shortQuestion: string; shortAnswer: string }>
  >([]);
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
  const getQuestionnaire = async () => {
    const response = await fetch('/api/foodchoice');
    if (!response.ok) {
      throw new Error('에러가 발생했습니다.');
    }
    return await response.json();
  };
  const { data: questionnaire, isLoading } = useQuery<Questionnaire[]>({
    queryKey: ['foodchoice'],
    queryFn: getQuestionnaire,
  });

  const totalStep = questionnaire?.length ?? 0; // 전체 질문 개수.
  const currentQuestion = questionnaire?.[step - 1];
  const router = useRouter();
  useEffect(() => {
    // 모든 질문에 대한 답변이 완료되었을 때만 서버로 데이터를 전송
    if (answers.length === questionnaire?.length && questionnaire.length > 0) {
      sendAnswers();
    }
  }, [answers]);

  const handleClick = async (selectedAnswerId: number) => {
    const selectedAnswer = currentQuestion?.Answers.find(
      (answer) => answer.answerId === selectedAnswerId,
    );
    if (selectedAnswer) {
      const newAnswer = {
        step: currentQuestion?.step ?? 0,
        shortQuestion: currentQuestion?.Question?.shortQuestion ?? '',
        shortAnswer: selectedAnswer.shortAnswer,
      };
      setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
    }
    if (step < (questionnaire?.length ?? 0)) {
      setStep((currentStep) => currentStep + 1);
    }
  };
  return (
    // calc을 사용한 높이 조절 -> 4rem은 NavBar의 높이
    <div className="grid grid-rows-5 w-screen h-[calc(100%-4rem)]">
      {isLoading ? (
        <LoadingUi />
      ) : (
        <>
          {/* 질문 표시 */}
          {currentQuestion && (
            <div className="row-span-1 flex items-center justify-center mx-auto w-4/5 font-bold text-3xl lg:text-5xl text-center">
              Q{step}. {currentQuestion?.Question?.longQuestion}
            </div>
          )}

          {/* 선택지 */}
          <div className="row-span-3 flex items-center justify-center">
            <div
              className={`flex  lg:gap-2 flex-col lg:flex-row w-2/5 lg:w-3/5 ${currentQuestion?.Answers?.length!! > 3 ? 'h-full gap-4 lg:h-1/2' : 'gap-10 h-4/5'} justify-center  lg:justify-around `}
            >
              {currentQuestion?.Answers?.map((answer, idx) => (
                <div
                  key={idx}
                  className="flex  justify-center items-center cursor-pointer   lg:hover:scale-105 transition-all duration-300 ease-in-out bg-backGroundColor rounded-2xl shadow-xl lg:shadow-2xl "
                  style={{ flexBasis: `${80 / currentQuestion?.Answers?.length}%` }}
                  onClick={() => handleClick(answer.answerId)}
                >
                  <div className="h-full w-full flex flex-col items-center justify-center gap-2 lg:gap-10">
                    {answer.image && (
                      <Image
                        className="rounded-xl h-4/5 lg:h-2/3 aspect-[4/3]"
                        src={answer.image}
                        alt="음식 사진"
                        width={350}
                        height={200}
                      />
                    )}
                    <div className="font-semibold text-xl lg:text-4xl text-gray-800">
                      {answer.longAnswer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <BottomProgressiveBar step={step} totalStep={totalStep} />
        </>
      )}
    </div>
  );
}
