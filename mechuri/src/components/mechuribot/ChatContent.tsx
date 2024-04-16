'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import OpenAI from 'openai';
import { useMutation, useQuery } from '@tanstack/react-query';
export default function ChatContent() {
  const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_APIKEY as String;
  // 초기 데이터
  const [chat, setChat] = useState([
    {
      message: '안녕하세요👋 여러분의 메뉴 고민을 해소시켜 줄 메추리봇이에요.',
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      message: '오늘의 기분을 10자 이상 적어주시면, 그에 맞는 메뉴를 추천해드릴게요 !',
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [defaultMessage, setDefaultMessage] = useState(
    '오늘 내 기분에 맞는 음식메뉴를 한 단어로 추천해줘. 결과는 추천음식/이유 형식으로 알려줘. 이유는 한 줄의 정갈한 문장으로 해줘.',
  );
  const [input, setInput] = useState('');

  // handleInput시 event의 타입은 any 말고도 이렇게 지정가능함.
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }
  async function handleSend() {
    if (!input.trim()) return;
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    // 사용자 메시지를 채팅에 추가
    setChat((chat) => [...chat, { message: input, sender: 'user', time: currentTime }]);
    setInput(''); // 입력 필드 초기화

    // OpenAI API에 요청을 보내기 위한 데이터 준비
    const reqBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: defaultMessage },
        { role: 'system', content: 'You are a Someone who recommends a food menu' },
      ],
      temperature: 0.4,
      max_tokens: 150,
      top_p: 0.5,
    };
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response from OpenAI');
    }
    return response.json();
  }

  const { mutate, isPending, isError } = useMutation({
    mutationFn: handleSend,
    onSuccess(data) {
      const botReply = data.choices[0].message.content.trim();
      const parts = botReply.split('/');
      const recommendedFood = parts[0].trim(); // 추천 음식
      const reason = parts[1].trim(); // 이유
      const finalReply = `오늘의 메추리봇 추천 음식은 ${recommendedFood}입니다😊 ${reason}`;
      // 챗봇의 답변을 채팅에 추가
      setChat((chat) => [
        ...chat,
        {
          message: finalReply,
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    },
    onError() {
      setChat((chat) => [
        ...chat,
        {
          message: '[사용자의 요청이 제대로 전달되지 않았습니다. 추후에 다시 시도해주세요!]',
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    },
  });
  return (
    <div className="flex flex-col h-4/5 w-2/5 ">
      <div className="flex-grow overflow-auto bg-white">
        {chat.map((c, index) => (
          <div
            key={index}
            className={`chat ${c.sender === 'bot' ? 'chat-start flex-start' : 'chat-end flex-end'}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt={c.sender === 'bot' ? 'Chatbot' : 'User'}
                  src={c.sender === 'bot' ? 'images/logo1.png' : 'images/user.png'}
                />
              </div>
            </div>
            <div className="chat-header">
              {c.sender === 'bot' ? '메추리봇' : '사용자'}
              <time className="text-xs opacity-50 ml-1">{c.time}</time>
            </div>
            <div className={`chat-bubble ${c.sender === 'bot' ? '' : 'bg-mainColor'} max-w-[75%]`}>
              {c.message}
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full shadow-lg bg-slate-50 rounded-b-xl gap-1">
        <input
          disabled={isPending}
          placeholder="오늘의 기분을 10자 이상 적어주세요! (ex. 행복, 슬픔, 짜증 등)"
          className="input input-bordered w-full h-12"
          value={input}
          onChange={handleInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input.trim().length >= 10) {
              mutate();
            }
          }}
        />
        <button
          className={`btn ${isPending ? 'bg-slate-400' : 'bg-[#05D686]'} w-28 h-12 text-white hover:bg-green-500`}
          onClick={() => mutate()}
          disabled={isPending || input.trim().length < 10}
        >
          {isPending ? '응답중...' : '전송'}
        </button>
      </div>
    </div>
  );
}
