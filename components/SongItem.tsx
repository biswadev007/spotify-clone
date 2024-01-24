'use client';
import React from 'react';
import Image from 'next/image';

import { Song } from '@/types';
import useLoadImage from '@/hooks/useLoadImage';
import PlayButton from './PlayButton';

interface SongItemProps {
  onClick: (id: string) => void;
  data: Song;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);

  return (
    <div
      onClick={() => onClick(data.id)}
      className='
    relative
    group
    flex
    flex-col
    items-center
    justify-center
    rounded-md
    overflow-hidden
    gap-x-4
    bg-neutral-400/5
    cursor-pointer
    hover:bg-neutral-400/10
    transition
    p-3
    '
    >
      <div className='w-full h-full relative aspect-square rounded-md overflow-hidden'>
        <Image
          src={imagePath || '/images/liked.png'}
          fill
          alt='song image'
          className='object-cover'
        />
      </div>
      <div className='flex flex-col items-start w-full pt-4 gap-y-1'>
        <p className='font-semibold truncate w-full'>
          {data.title}
        </p>
        <p className='text-neutral-400 text-sm pb-4 truncate w-full'>
          By {data.author}
        </p>
      </div>
      <div className='absolute bottom-24 right-5'>
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
