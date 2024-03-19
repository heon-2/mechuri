import type { Metadata } from 'next';
import { Inter, Sunflower, Gowun_Dodum, Noto_Sans_KR } from 'next/font/google';

import './globals.css';
import RecoilRootProvider from '../utils/RecoilRootProvider';
import ReactQueryProviders from '@/utils/ReactQueryProvider';

const inter = Inter({ subsets: ['latin'] });
const sunflower = Sunflower({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  style: ['normal'],
  display: 'swap',
});
const gowunDodum = Gowun_Dodum({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
  display: 'swap',
});
const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal'],
  display: 'swap',
});
export const metadata: Metadata = {
  title: '메뉴 추천 리스트, Mechuri',
  description: '여러분의 취향에 맞게 고르기 힘든 메뉴 추천을 메추리가 도와드립니다',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={gowunDodum.className}>
        <ReactQueryProviders>
          <RecoilRootProvider>{children}</RecoilRootProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
