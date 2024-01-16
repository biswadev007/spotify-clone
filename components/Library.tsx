'use client';
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlaylist } from 'react-icons/tb';

const Library = () => {
  const handleClick = () => {
    // Click to add song in library!;
  }

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between px-5 pt-4'>
        <div className='inline-flex items-center gap-x-2'>
          <TbPlaylist size={26} className='text-neutral-400' />
          <p className='text-neutral-400 font-medium text-base'>Your Library!</p>
        </div>
        <AiOutlinePlus onClick={handleClick} size={20} className='text-neutral-400 cursor-pointer transition hover:text-white' />
      </div>
      <div className='flex flex-col gap-y-2 mt-4 px-3'>
        List of Songs!
      </div>
    </div>
  )
}

export default Library;