'use client';

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => (
  <Toaster toastOptions={{
    style: {
      background: '#333',
      color: '#fff'
    }
  }} />
);

export default ToasterProvider;