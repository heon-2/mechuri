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
      time: '12:00',
    }, // 예시 시간, 실제 구현에서는 동적으로 설정
    {
      message: '오늘 여러분의 기분을 적어주시면, 그에 맞는 메뉴를 추천해드릴게요 !',
      sender: 'bot',
      time: '12:01',
    },
  ]);
  const [defaultMessage, setDefaultMessage] = useState(
    '제발 내 글을 보고 음식 메뉴 추천해줘. 딱 한 단어 [오늘의 추천음식:] 하고 여기에 추천음식을 적어줘. 이후 줄바꿈을 진행하고 이유를 한줄로 설명해줘.',
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
      messages: [{ role: 'user', content: defaultMessage }],
      temperature: 0.7,
      max_tokens: 50,
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

      // 챗봇의 답변을 채팅에 추가
      setChat((chat) => [
        ...chat,
        {
          message: botReply,
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (error) {
      console.error('Error:', error);
      // 오류 처리 또는 사용자에게 피드백
    }
  }
  return (
    <div className="w-1/2">
      {chat.map((c, index) => (
        <div key={index} className={`chat ${c.sender === 'bot' ? 'chat-start' : 'chat-end'}`}>
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
            {c.sender === 'bot' ? 'Chatbot' : 'You'}
            <time className="text-xs opacity-50">{c.time}</time>
          </div>
          <div className="chat-bubble">{c.message}</div>
          {/* <div className="chat-footer opacity-50">{c.sender === 'bot' ? 'Delivered' : 'Seen'}</div> */}
        </div>
      ))}
      <div className="flex gap-4 w-full mt-4">
        <input
          type="text"
          placeholder="Type your message here..."
          className="input input-bordered w-full"
          value={input}
          onChange={handleInput}
        />
        <button className="btn btn-success w-20" onClick={handleSend}>
          💭
        </button>
      </div>
    </div>
  );
}

//
