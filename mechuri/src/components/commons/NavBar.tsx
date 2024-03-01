import React from 'react';
export default function NavBar() {
  const components: { title: string; href: string; description: string }[] = [
    {
      title: '홈',
      href: '/main',
      description: '메인 페이지입니다.',
    },
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
    <nav className="bg-[#CCD3CA] border-gray-200 dark:bg-gray-900 w-full h-16">
      <div className="flex items-center h-full justify-between mx-20">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#f6f6f6]">
            Mechuri
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:border-gray-700">
            {components.map((component, index) => (
              <li key={component.href}>
                <a
                  href={component.href}
                  className={`block py-2 px-3 rounded md:p-0 text-white hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent ${
                    index === 0
                      ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500'
                      : 'text-gray-900 md:hover:text-blue-700 md:dark:hover:text-blue-500'
                  }`}
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
