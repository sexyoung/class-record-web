import { FC, useEffect } from 'react';
import * as Icon from '@heroicons/react/outline';

import style from "./style.module.css";

interface Modal {
  onClose?: () => void;
}

export const Modal:FC<Modal> = ({ children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClick: React.MouseEventHandler = ({ target }) => {
    (target === document.getElementById('modalBG')) && onClose && onClose();
  };

  return (
    <div data-testid='modalBG' className={style.modalBG} id="modalBG" onClick={handleClick}>
      <div className={style.modal}>
        {onClose && <Icon.XIcon className={style.close} onClick={onClose} />}
        <p data-testid='children'>{children}</p>
      </div>
    </div>
  );
};
