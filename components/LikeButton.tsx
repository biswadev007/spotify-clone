'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionContext } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    (async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    })();
  }, [user, supabaseClient, songId]);

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }
    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId);

        if(error) return toast.error(error.message);
        setIsLiked(false);
    } else {
      const { error } = await supabaseClient.from('liked_songs').insert({ song_id: songId, user_id: user.id });
      if(error) return toast.error(error.message);
      setIsLiked(true);
      toast.success('Liked!');
    }
    router.refresh();
  };

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;
  return (
    <button className='transition hover:opacity-75' onClick={handleLike}>
      <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
    </button>
  );
};

export default LikeButton;
