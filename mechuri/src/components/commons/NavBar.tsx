'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { MdRestaurantMenu } from 'react-icons/md';
import MENU_LIST from '@/constants/MENU_LIST';
export default function NavBar() {
  return (
    <nav className="bg-backGroundColor border-gray-200 dark:bg-gray-900 w-full h-16">
      <div className="flex items-center h-full justify-between md:mx-20">
        <Link href="/main">
          <div className="flex gap-2">
            <span>
              <img src="/images/logo1.png" alt="logo" className="h-16" />
            </span>
            <span className="self-center text-3xl font-semibold whitespace-nowrap text-mainColor">
              Mechuri
            </span>
          </div>
        </Link>

        <details className="dropdown dropdown-bottom dropdown-end md:hidden">
          <summary className="m-1 btn">
            {' '}
            <MdRestaurantMenu size={30} color="#FF5A5F" />
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-60">
            {MENU_LIST.map((menu, index) => (
              <li key={menu.href}>
                <Link
                  href={menu.href}
                  className="block py-2 px-3 rounded md:p-0 text-center text-lg  
                  "
                >
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>
        </details>
        <div
          className={`
           absolute top-full right-0 w-full hidden md:block md:static md:w-auto bg-backGroundColor dark:bg-gray-900`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:border-gray-700">
            {MENU_LIST.map((menu, index) => (
              <li key={menu.href}>
                <Link
                  href={menu.href}
                  className="block py-2 px-3 rounded md:p-0 font-medium text-lg  text-mainColor"
                >
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
