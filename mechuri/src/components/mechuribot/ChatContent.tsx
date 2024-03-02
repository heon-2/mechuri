'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import OpenAI from 'openai';
export default function ChatContent() {
  const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_APIKEY as String;
  // 초기 데이터
  const [chat, setChat] = useState([
    {
      message: '안녕하세요👋 여러분의 메뉴 고민을 해소시켜 줄 저는 메추리봇이에요.',
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }, // 예시 시간, 실제 구현에서는 동적으로 설정
    {
      message: '오늘 여러분의 기분을 적어주시면, 그에 맞는 메뉴를 추천해드릴게요 !',
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [defaultMessage, setDefaultMessage] = useState(
    '오늘 내 기분에 맞는 음식메뉴를 한 단어로 추천해줘. 결과는 추천 음식/이유 형식으로 알려줘. 이유는 한 줄로 해줘.',
  );
  const [input, setInput] = useState('');

  // handleInput시 event의 타입은 any 말고도 이렇게 지정가능함.
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }
  async function handleSend() {
    if (!input.trim()) return;
    const fullMessage = defaultMessage + ' ' + input;
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    // 사용자 메시지를 채팅에 추가
    setChat((chat) => [...chat, { message: input, sender: 'user', time: currentTime }]);
    setInput(''); // 입력 필드 초기화

    // OpenAI API에 요청을 보내기 위한 데이터 준비
    const reqBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: defaultMessage },
        { role: 'system', content: 'You are a Someone who recommends a menu' },
      ],
      temperature: 1,
      max_tokens: 150,
    };

    try {
      // OpenAI API 호출
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify(reqBody),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from OpenAI');
      }

      const data = await response.json();
      const botReply = data.choices[0].message.content.trim();
      const parts = botReply.split('/');
      const recommendedFood = parts[0].trim(); // 추천 음식
      const reason = parts[1].trim(); // 이유
      const finalReply = `오늘의 메추리봇 추천 음식은 ${recommendedFood}입니다😊 제가 추천해드리는 이유는 ${reason}`;
      // 챗봇의 답변을 채팅에 추가
      setChat((chat) => [
        ...chat,
        {
          message: finalReply,
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (error) {
      console.error('Error:', error);
      // 오류 처리 및 사용자에게 피드백
      setChat((chat) => [
        ...chat,
        {
          message: '[사용자의 요청이 제대로 전달되지 않았습니다. 추후에 다시 시도해주세요!]',
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }
  return (
    <div className="flex flex-col h-4/5 w-2/5 ">
      <div className="flex-grow overflow-auto bg-slate-50">
        {chat.map((c, index) => (
          <div key={index} className={`chat ${c.sender === 'bot' ? 'chat-start' : 'chat-end'} `}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt={c.sender === 'bot' ? 'Chatbot' : 'User'}
                  src={
                    c.sender === 'bot'
                      ? 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                      : 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                  }
                />
              </div>
            </div>
            <div className="chat-header">
              {c.sender === 'bot' ? '메추리봇' : '사용자'}
              <time className="text-xs opacity-50 ml-1">{c.time}</time>
            </div>
            <div className="chat-bubble">{c.message}</div>
          </div>
        ))}
      </div>
      <div className="flex w-full shadow-lg bg-slate-50 rounded-b-xl gap-1">
        <input
          type="text"
          placeholder="오늘의 기분 상태를 상세하게 적어주세요! (ex. 행복, 슬픔, 짜증 등)"
          className="input input-bordered w-full "
          value={input}
          onChange={handleInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
        />
        <button className="btn btn-success w-28 text-white " onClick={handleSend}>
          전송
        </button>
      </div>
    </div>
  );
}
