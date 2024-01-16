'use Client';
import React from 'react';
import Modal from './Modal';

const AuthModal = () => {
  return (
    <Modal
      title='Welcome back'
      description='Login to your account!'
      isOpen={true}
      onChange={() => {}}
    >
      Auth modal children!
    </Modal>
  );
};

export default AuthModal;
