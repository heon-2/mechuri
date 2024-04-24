export interface ChatMessage {
  message: string;
  sender: 'bot' | 'user';
  time: string;
}
