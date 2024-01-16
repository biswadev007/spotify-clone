'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';

import Button from './Button';

interface HeaderProps {
  className?: string;
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Will handle Logout functions
  };

  return (
    <header
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      <div className='w-full md-4 flex items-center justify-between'>
        <div className='hidden md:flex gap-x-2 items-center'>
          <button className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'>
            <RxCaretLeft size={35} />
          </button>
          <button className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'>
            <RxCaretRight size={35} />
          </button>
        </div>
        <div className='flex md:hidden gap-x-2 items-center'>
          <button className='flex justify-center items-center rounded-full p-2 bg-white hover:opacity-75 transition'>
            <HiHome size={20} className='text-black' />
          </button>
          <button className='flex justify-center items-center rounded-full p-2 bg-white hover:opacity-75 transition'>
            <BiSearch size={20} className='text-black' />
          </button>
        </div>
        <div className='flex justify-between items-center gap-x-4'>
          <>
            <div>
              <Button className='bg-transparent text-neutral-300 font-medium'>
                Sign up
              </Button>
            </div>
            <div>
              <Button className='bg-white px-6 py-2 hover:scale-105'>Log in</Button>
            </div>
          </>
        </div>
      </div>
      {children}
    </header>
  );
};

export default Header;
