import { FC, useEffect } from 'react';

import style from "./style.module.css";

interface Modal {
  onClose?: () => void;
}

export const Modal:FC<Modal> = ({ children, onClose = () => {} }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClick: React.MouseEventHandler = ({ target }) => {
    (target === document.getElementById('modalBG')) && onClose();
  };

  return (
    <div className={style.modalBG} id="modalBG" onClick={handleClick}>
      <div className={style.modal}>
        {children}
      </div>
    </div>
  );
};
