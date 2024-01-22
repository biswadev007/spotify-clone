'use client';
import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';

import Box from './Box';
import SidebarItems from './SidebarItems';
import Library from './Library';
import { Song } from '@/types';

interface SideBarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar: React.FC<SideBarProps> = ({ children, songs }) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        label: 'Home',
        active: pathname !== '/search',
        href: '/',
        icon: HiHome,
      },
      {
        label: 'Search',
        active: pathname === '/search',
        href: '/search',
        icon: BiSearch,
      },
    ],
    [pathname]
  );

  return (
    <div className='flex h-full'>
      <div className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2'>
        <Box className='flex flex-col gap-y-4 px-5 py-4'>
          {routes.map((item) => (
            <SidebarItems key={item.label} {...item} />
          ))}
        </Box>
        <Box className='overflow-y-auto h-full'>
          <Library songs={songs} />
        </Box>
      </div>
      <main className='h-full overflow-y-auto flex-1 py-2'>
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
