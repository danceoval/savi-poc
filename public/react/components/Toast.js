import React, { useState, useEffect } from 'react';


export const Toast = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className={`error-toast ${visible ? 'visible' : 'hidden'}`}>
      <p>{message}</p>
    </div>
  );
};