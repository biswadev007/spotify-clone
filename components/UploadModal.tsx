'use client';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import uniqid from 'uniqid';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';

import Modal from './Modal';
import Input from './Input';
import Button from './Button';

const UploadModal = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { isOpen, onClose } = useUploadModal();
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    },
  });

  const handleChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const songFile = values.song?.[0];
      const imageFile = values.image?.[0];

      if (!songFile || !imageFile) {
        return toast.error('Missing fields');
      }
      const uniqId = uniqid();
      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${values.title}-${uniqId}`, songFile, {
          cacheControl: '3600',
          upsert: false,
        });
      if (songError) {
        setIsLoading(false);
        return toast.error('Upload failed');
      }
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(`images-${values.title}-${uniqId}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error('Upload failed');
      }

      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user?.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success('Song uploaded');
      onClose();
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title='Add a song'
      description='Upload an mp3 file'
      isOpen={isOpen}
      onChange={handleChange}
    >
      <form className='flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
        <Input
          id='title'
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder='Song title'
        />
        <Input
          id='author'
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder='Song author'
        />
        <div>
          <div className='pb-1'>Select a song file</div>
          <Input
            id='song'
            type='file'
            accept='.mp3'
            disabled={isLoading}
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <div className='pb-1'>Select an image</div>
          <Input
            id='image'
            type='file'
            accept='image/*'
            disabled={isLoading}
            {...register('image', { required: true })}
          />
        </div>
        <Button type='submit' disabled={isLoading}>
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
