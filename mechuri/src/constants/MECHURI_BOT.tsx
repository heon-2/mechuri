import { ChatMessage } from '@/types/mechuribot';
const INITIAL_MESSAGE: ChatMessage[] = [
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
];

const DEFAULT_REQUEST_MESSAGE: string =
  '오늘 내 기분에 맞는 음식메뉴를 한 단어로 추천해줘. 결과는 추천음식/이유 형식으로 알려줘. 이유는 한 줄의 정갈한 문장으로 해줘.';

export { INITIAL_MESSAGE, DEFAULT_REQUEST_MESSAGE };
