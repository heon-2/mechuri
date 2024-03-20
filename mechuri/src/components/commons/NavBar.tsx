import React from 'react';
import Link from 'next/link';
export default function NavBar() {
  const components: { title: string; href: string; description: string }[] = [
    // {
    //   title: '홈',
    //   href: '/main',
    //   description: '메인 페이지입니다.',
    // },
    {
      title: '룰렛 돌리기',
      href: '/roulette',
      description:
        'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
      title: '메뉴 추천 테스트',
      href: '/foodchoice',
      description: 'For sighted users to preview content available behind a link.',
    },
    {
      title: '메추리 봇',
      href: '/mechuribot',
      description:
        'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    },
    {
      title: '메추리 지도',
      href: '/map',
      description: 'Visually or semantically separates content.',
    },
  ];

  return (
    <nav className="bg-[#f6f6f6] border-gray-200 dark:bg-gray-900 w-full h-16">
      <div className="flex items-center h-full justify-between mx-20">
        <Link href="/main">
          <div className="flex gap-2">
            <span>
              <img src="/images/logo1.png" alt="logo" className="h-16" />
            </span>
            <span className="self-center text-3xl font-semibold whitespace-nowrap text-[#FF5A5F]">
              Mechuri
            </span>
          </div>
        </Link>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:border-gray-700">
            {components.map((component, index) => (
              <li key={component.href}>
                <a
                  href={component.href}
                  className={`block py-2 px-3 rounded md:p-0 font-medium text-lg  
                  ${index === 0 ? 'text-[#FF5A5F] ' : 'text-[#FF5A5F]'}`}
                >
                  {component.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
