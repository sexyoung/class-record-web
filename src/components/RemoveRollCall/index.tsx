import { FC } from 'react';
import cx from 'classnames';
import style from './style.module.css';
import btnStyle from 'components/btn.module.css';

interface RemoveRollCallProps {
  confirm: () => void;
}

export const RemoveRollCall: FC<RemoveRollCallProps> = ({ confirm }) => {
  return (
    <div className={style.RemoveRollCall}>
      <div className={style.title}>刪除點名</div>
      <div className={style.name}>確定刪除嗎?</div>
      <button className={cx(btnStyle.btn, "w-full mt-3")} onClick={confirm}>
        刪除
      </button>
    </div>
  );
};
